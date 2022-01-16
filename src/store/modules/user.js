import { requestResource } from "../../utils/resourceRequests";
import { GET_RESOURCE_PATH } from "../../common/apiRequests";

const state = {
  loggedUser: null, 
  allUsers: null,
};

const getters = {
  getLoggerUser: (state) => state.loggedUser,
  getAllUsers: (state) => state.allUsers,
};

const actions = {
  async fetchAllUsers({ commit }) {
    const response = await requestResource({
      resourcePath: GET_RESOURCE_PATH.USER,
    });
    commit("setAllUsers", response?.data?.data);
  },
  async fetchLoggedUser({ commit }) {
    const response = await requestResource({
      resourcePath: GET_RESOURCE_PATH.USER_PROFILE,
    });
    commit("setLoggedUser", response?.data?.data);
  },
  async fetchUser(_, { userId }) {
    const response = await requestResource({
      resourcePath: GET_RESOURCE_PATH.USER,
      mainId: userId,
    });
    return response?.data?.data;
  },
};

const mutations = {
  setAllUsers: (state, users) => {
    state.allUsers = users;
  },
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
