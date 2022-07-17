import type { AxiosInstance} from "axios";

export type BaseReturn = Promise<string | Error>;

export async function getTestsByRunId(
  client: AxiosInstance,
  runId: string|number
): BaseReturn {
  if (!runId) {
    throw new Error("runId is undefined");
  }
  try {
    const { data } = await client.get(`/get_tests/${runId}`);
    return data?.tests.map((test) => `(@${test.case_id})`).join("|");
  } catch (e) {
    return e;
  }
}
