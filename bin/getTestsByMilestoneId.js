"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTestsByMilestoneId = void 0;
const getTestsByRunId_1 = require("./getTestsByRunId");
async function getTestsByMilestoneId(client, projectId, milestoneId) {
    if (!milestoneId) {
        throw new Error("milestoneId is undefined");
    }
    if (!projectId) {
        throw new Error("projectId is undefined");
    }
    try {
        const { data } = await client.get(`/get_runs/${projectId}&milestoneId=${milestoneId}`);
        const runs = data.runs;
        const tests = [];
        for (const run of runs) {
            const runTests = await (0, getTestsByRunId_1.getTestsByRunId)(client, run.id);
            tests.push(runTests);
        }
        const testString = tests.join("|");
        return testString;
    }
    catch (e) {
        return e;
    }
}
exports.getTestsByMilestoneId = getTestsByMilestoneId;
//# sourceMappingURL=getTestsByMilestoneId.js.map