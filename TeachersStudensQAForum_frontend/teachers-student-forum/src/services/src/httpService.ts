import axios from "axios";
import { SessionTag } from "./Enums";
import { localGet, NavigateToPath } from "./commonService";

const configJSON = require("./config");
const ApiClient = axios.create({
  baseURL: `${configJSON.baseUrl}`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "bearer " + localGet(SessionTag.JwtToken, SessionTag.JwtToken),
  },
});

export default ApiClient;

/*
 * Adding a response interceptor
 */

ApiClient.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    if (error.response && [401, 419].includes(error.response.status)) {
      NavigateToPath("/login");
    }
    return Promise.reject(error);
  }
);
