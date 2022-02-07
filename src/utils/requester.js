import { API_URL } from "../common/apiRequests";
import axios from "axios";

const addHeaders = (headers, path) => {
  if (path === "login") {
    return headers;
  }

  return {
    ...headers,
    "Content-Type": "application/x-www-form-urlencoded",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Max-Age": "1800",
    // "Access-Control-Allow-Headers": "content-type",
    "Access-Control-Allow-Methods": "PUT, POST, GET, DELETE, PATCH, OPTIONS",
    "X-Requested-With": "XMLHttpRequest",
    "Access-Control-Allow-Headers":
      "Authorization,X-API-KEY,X-CSRF-Token, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, X-Socket-Id, X-Remember-Token",
  };
};

const requester = {
  get: (path, headers) =>
    axios.get(`https://${API_URL}${path}`, {
      headers: { ...addHeaders(headers, path) },
    }),
  post: (path, payload, headers) =>
    axios.post(`https://${API_URL}${path}`, payload, {
      headers: { ...addHeaders(headers, path) },
    }),
  put: (path, payload, headers) =>
    axios.put(`https://${API_URL}${path}`, payload, {
      headers: { ...addHeaders(headers, path) },
    }),
  delete: (path, headers) =>
    axios.delete(`https://${API_URL}${path}`, {
      headers: { ...addHeaders(headers, path) },
    }),
};

export default requester;
