#!/usr/bin/env node
import "dotenv/config";
import { getTestsByRunId } from "./getTestsByRunId";
import { getVersion } from "./getVersion";
import { createTestrailClient } from "./createTestrailClient";
import { getTestsByMilestoneId } from "./getTestsByMilestoneId";

const getArgs = () => {
  // We retrieve all the command arguments except the first 2
  const args = process.argv.slice(2);
  return args;
};

/**
 * Command Help
 */
const printCommandHelp = () => {
  const version = getVersion();
  const help = `
 playwright-testrail-reporter (version: ${version})

    Usage:
        $ playwright-testrail-reporter [options]
            runId: getting tests by runId
`;
  console.log(help);
};

const client = createTestrailClient(
  process.env.TESTRAIL_HOSTNAME,
  process.env.TESTRAIL_USERNAME,
  process.env.TESTRAIL_PASSWORD
);

const args = getArgs();

// Print help if no arguments
if (args.length === 0) {
  printCommandHelp();
  getVersion();
  process.exit(0);
}

args.forEach(async (arg) => {
  switch (arg) {
    case "runId":
      const runIds = await getTestsByRunId(client, process.env.TESTRAIL_RUN_ID);
      console.log(runIds);
      break;
    case "milestoneId":
      const milestoneIds = await getTestsByMilestoneId(
        client,
        process.env.TESTRAIL_PROJECT_ID,
        process.env.TESTRAIL_MILESTONE_ID
      );
      console.log(milestoneIds);
      break;
    default:
      console.log(`Unknown argument: ${arg}`);
      printCommandHelp();
      getVersion();
      process.exit(0);
  }
});
