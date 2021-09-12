import { API_URL } from "../common/apiRequests";
import axios from "axios";

const requester = {
  get: (path, headers) => axios.get(`http://${API_URL}${path}`, { headers }),
  post: (path, payload, headers) =>
    axios.post(`http://${API_URL}${path}`, payload, { headers }),
  put: (path, payload, headers) =>
    axios.put(`http://${API_URL}${path}`, payload, { headers }),
};

export default requester;
