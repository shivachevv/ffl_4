import { API_URL } from "../common/apiRequests";
import axios from "axios";

const addHeaders = (headers) => ({
  ...headers,
  "Content-Type": "application/x-www-form-urlencoded",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Credentials": "true",
  "Access-Control-Max-Age": "1800",
  // "Access-Control-Allow-Headers": "content-type",
  "Access-Control-Allow-Methods": "PUT, POST, GET, DELETE, PATCH, OPTIONS",
  "X-Requested-With": "XMLHttpRequest",
  "Access-Control-Allow-Headers": "X-Requested-With, content-type",
});

const requester = {
  get: (path, headers) =>
    axios.get(`https://${API_URL}${path}`, {
      headers: { ...addHeaders(headers) },
    }),
  post: (path, payload, headers) =>
    axios.post(`https://${API_URL}${path}`, payload, {
      headers: { ...addHeaders(headers) },
    }),
  put: (path, payload, headers) =>
    axios.put(`https://${API_URL}${path}`, payload, {
      headers: { ...addHeaders(headers) },
    }),
  delete: (path, headers) =>
    axios.delete(`https://${API_URL}${path}`, {
      headers: { ...addHeaders(headers) },
    }),
};

export default requester;
