import { DATA_URL } from "../../common";
import axios from "axios";

const requester = {
  get: (path, headers) => {
    return axios.get(`${DATA_URL}${path}.json`, { headers });
  },
  patch: (path, body) => {
    return axios.patch(`${DATA_URL}${path}.json`, body, {
      method: "PATCH",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
};

export default requester;
