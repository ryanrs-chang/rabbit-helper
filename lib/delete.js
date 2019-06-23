const axios = require("axios");

/**
 *
 * @param {Array<string>} regExps
 */
async function fetchQueueListByRegExp(regExps) {
    const queues = [];
    const regexps = regExps.map(regexp => new RegExp(regexp));
    const res = await axios.get("/api/queues");

    res.data
        .filter(queue => regexps.some(r => r.test(String(queue.name))))
        .forEach(queue => queues.push(queue.name));
    return queues;
}

/**
 * @param {Array<string>} queues_name
 */
module.exports = async function del(queues_name, cmd) {
    let queues = [];
    if (!!cmd.regex) {
        queues = queues.concat(await fetchQueueListByRegExp(queues_name));
    } else if (!!cmd.Name) {
        queues = queueus.concat(queues_name);
    }

    for (let queue of queues) {
        try {
            const res = await axios.delete(`/api/queues/%2F/${queue}`);
            if (res.status >= 200) {
                console.log(`${queue} Deleted`);
            }
        } catch (error) {
            console.log(error.response.statusText);
        }
    }
};
