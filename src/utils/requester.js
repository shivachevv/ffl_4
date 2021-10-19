import { API_URL } from "../common/apiRequests";
import axios from "axios";

const requester = {
  get: (path, headers) => axios.get(`https://${API_URL}${path}`, { headers }),
  post: (path, payload, headers) =>
    axios.post(`https://${API_URL}${path}`, payload, { headers }),
  put: (path, payload, headers) =>
    axios.put(`https://${API_URL}${path}`, payload, { headers }),
  delete: (path, headers) =>
    axios.delete(`https://${API_URL}${path}`, { headers }),
};

export default requester;
