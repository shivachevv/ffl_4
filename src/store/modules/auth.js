import { postResource } from "../../utils/resourceRequests";
import { POST_RESOURCE_PATH } from "../../common/apiRequests";

const state = {};

const getters = {};

const actions = {
  async login(_, payload) {
    try {
      const response = await postResource({
        resourcePath: POST_RESOURCE_PATH.LOGIN,
        payload,
      });
      localStorage.setItem("Access-Token", response?.accessToken);
      location.reload();
    } catch (error) {
      console.log(error);
    }
  },
  async logout() {
    try {
      await postResource({
        resourcePath: POST_RESOURCE_PATH.LOGOUT,
      });
      console.log(1);
      localStorage.removeItem("Access-Token");
      location.reload();
    } catch (error) {
      console.log(error);
    }
  },
};

const mutations = {};

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true,
};
