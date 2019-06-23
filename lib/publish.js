const axios = require("axios");
const fs = require("fs");
const _ = require("lodash");

async function readFile(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, { encoding: "utf-8" }, function(err, data) {
            if (!err) {
                resolve(data.toString());
            } else {
                reject(err);
            }
        });
    });
}

function parseJSON(source) {
    try {
        return JSON.parse(source);
    } catch (error) {
        console.log(`the ${source} isn't JSON format, please check.`);
        return null;
    }
}

module.exports = async function publish(routing_key, options, cmd) {
    let exchange =
        cmd.exchange || require(process.env.RABBITMQ_CONFIG).exchange;
    let message;

    if (!!cmd.file) {
        try {
            message = await readFile(cmd.file);
        } catch (error) {
            console.log(error.message);
            return;
        }
    } else if (!!cmd.message) {
        message = cmd.message;
    } else {
        console.log("options not found");
        return;
    }

    if (options) {
        try {
            const replace = parseJSON(options);
            if (!replace) return;

            const messageObj = parseJSON(message);
            if (!messageObj) return;

            _.defaultsDeep(messageObj, replace);
            message = JSON.stringify(messageObj);
        } catch (error) {
            console.log(error);
            return;
        }
    }

    const res = await axios.post(`/api/exchanges/%2F/${exchange}/publish`, {
        properties: {},
        routing_key: routing_key,
        payload: message,
        payload_encoding: "string"
    });

    if (res.status >= 200 && res.data.routed) {
        return console.log(`publish successful:`, message);
    }
    return console.log("publish was failed");
};
