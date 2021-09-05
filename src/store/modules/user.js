import { requestResource } from "../../utils/loadResource";
import { GET_RECOURSE_PATH } from "../../common/apiRequests";

const state = {
  loggedUser: null,
};

const getters = {
  getLoggerUser: (state) => state.loggedUser,
};

const actions = {
  async fetchLoggedUser({ commit }) {
    const user = await requestResource(GET_RECOURSE_PATH.USER_PROFILE);
    commit("setLoggedUser", user);
  },
};

const mutations = {
  setLoggedUser: (state, u) => {
    state.loggedUser = u;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true,
};
