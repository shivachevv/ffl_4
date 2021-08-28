import { API_URL } from "../common/apiRequests";
import axios from "axios";

const requester = {
  get: (path, headers) => {
    return axios.get(`http://${API_URL}${path}`, { headers });
  },
};

export default requester;
