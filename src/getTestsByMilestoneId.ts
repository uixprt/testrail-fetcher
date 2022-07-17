import type { AxiosInstance } from "axios";
import { getTestsByRunId } from "./getTestsByRunId";

export type BaseReturn = Promise<string | Error>;
type Run = {
  id: string;
};

export async function getTestsByMilestoneId(
  client: AxiosInstance,
  projectId: string,
  milestoneId: string
): BaseReturn {
  if (!milestoneId) {
    throw new Error("milestoneId is undefined");
  }
  if (!projectId) {
    throw new Error("projectId is undefined");
  }
  try {
    const { data } = await client.get(
      `/get_runs/${projectId}&milestoneId=${milestoneId}`
    );
    const runs: Run[] = data.runs;
    const tests: string[] = [];
    for (const run of runs) {
      const runTests = await getTestsByRunId(client, run.id);
      tests.push(runTests as string);
    }
    const testString = tests.join("|");
    return testString;
  } catch (e) {
    return e;
  }
}
