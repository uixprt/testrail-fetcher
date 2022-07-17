import axios from "axios";
import type { AxiosInstance } from "axios";

export function createTestrailClient(
  hostname: string,
  username: string,
  password: string
): AxiosInstance {
  if (!hostname) {
    throw new Error("hostname is undefined");
  }
  if (!username) {
    throw new Error("username is undefined");
  }
  if (!password) {
    throw new Error("password is undefined");
  }

  const client = axios.create({
    baseURL: `${hostname}/index.php?/api/v2/`,
    headers: {
      Authorization: `Basic ${Buffer.from(username + ":" + password).toString(
        "base64"
      )}`,
    },
  });

  return client;
}
