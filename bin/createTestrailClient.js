"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTestrailClient = void 0;
const axios_1 = require("axios");
function createTestrailClient(hostname, username, password) {
    if (!hostname) {
        throw new Error("hostname is undefined");
    }
    if (!username) {
        throw new Error("username is undefined");
    }
    if (!password) {
        throw new Error("password is undefined");
    }
    const client = axios_1.default.create({
        baseURL: `${hostname}/index.php?/api/v2/`,
        headers: {
            Authorization: `Basic ${Buffer.from(username + ":" + password).toString("base64")}`,
        },
    });
    return client;
}
exports.createTestrailClient = createTestrailClient;
//# sourceMappingURL=createTestrailClient.js.map