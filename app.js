#!/usr/bin/env node

if (!process.env.RABBITMQ_CONFIG) {
    console.log("Config is not defind, pleace check RABBITMQ_CONFIG path.");
    process.exit();
    return;
}
const Config = require(process.env.RABBITMQ_CONFIG);

const axios = require("axios");
axios.defaults.baseURL = Config.url;
axios.defaults.auth = {
    username: Config.username,
    password: Config.password
};

const program = require("commander");

program.version(require("./package.json").version);

program.command("list").action(require("./lib/list"));

program
    .command("delete [queue_name...]")
    .description("delete queue by name or regex")
    .option("-e, --regex", "delete by regex")
    .option("-N, --Name", "delete by name")
    .action(require("./lib/delete"));

program
    .command("publish <routing_key> [others_option]")
    .description("publish message to exchange")
    .option("-e, --exchange <string>", "assign exchange for publish")
    .option("-f, --file <string>", "set file path")
    .option("-m, --message <string>", "set publish message")
    .action(require("./lib/publish"));

program.parse(process.argv);
