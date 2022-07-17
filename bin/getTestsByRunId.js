"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTestsByRunId = void 0;
async function getTestsByRunId(client, runId) {
    if (!runId) {
        throw new Error("runId is undefined");
    }
    try {
        const { data } = await client.get(`/get_tests/${runId}`);
        return data === null || data === void 0 ? void 0 : data.tests.map((test) => `(@${test.case_id})`).join("|");
    }
    catch (e) {
        return e;
    }
}
exports.getTestsByRunId = getTestsByRunId;
//# sourceMappingURL=getTestsByRunId.js.map