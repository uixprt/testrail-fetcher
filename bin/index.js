#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const getTestsByRunId_1 = require("./getTestsByRunId");
const getVersion_1 = require("./getVersion");
const createTestrailClient_1 = require("./createTestrailClient");
const getTestsByMilestoneId_1 = require("./getTestsByMilestoneId");
const getArgs = () => {
    // We retrieve all the command arguments except the first 2
    const args = process.argv.slice(2);
    return args;
};
/**
 * Command Help
 */
const printCommandHelp = () => {
    const version = (0, getVersion_1.getVersion)();
    const help = `
 playwright-testrail-reporter (version: ${version})

    Usage:
        $ playwright-testrail-reporter [options]
            runId: getting tests by runId
`;
    console.log(help);
};
const client = (0, createTestrailClient_1.createTestrailClient)(process.env.TESTRAIL_HOSTNAME, process.env.TESTRAIL_USERNAME, process.env.TESTRAIL_PASSWORD);
const args = getArgs();
// Print help if no arguments
if (args.length === 0) {
    printCommandHelp();
    (0, getVersion_1.getVersion)();
    process.exit(0);
}
args.forEach(async (arg) => {
    switch (arg) {
        case "runId":
            const runIds = await (0, getTestsByRunId_1.getTestsByRunId)(client, process.env.TESTRAIL_RUN_ID);
            console.log(runIds);
            break;
        case "milestoneId":
            const milestoneIds = await (0, getTestsByMilestoneId_1.getTestsByMilestoneId)(client, process.env.TESTRAIL_PROJECT_ID, process.env.TESTRAIL_MILESTONE_ID);
            console.log(milestoneIds);
            break;
        default:
            console.log(`Unknown argument: ${arg}`);
            printCommandHelp();
            (0, getVersion_1.getVersion)();
            process.exit(0);
    }
});
//# sourceMappingURL=index.js.map