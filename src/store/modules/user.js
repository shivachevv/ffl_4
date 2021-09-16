import { requestResource } from "../../utils/resourceRequests";
import { GET_RESOURCE_PATH } from "../../common/apiRequests";

const state = {
  loggedUser: null,
  userPlayers: null,
};

const getters = {
  getLoggerUser: (state) => state.loggedUser,
  getUserPlayers: (state) => state.userPlayers,
};

const actions = {
  async fetchLoggedUser({ commit }) {
    const user = await requestResource({
      resourcePath: GET_RESOURCE_PATH.USER_PROFILE,
    });
    commit("setLoggedUser", user);
  },
  async fetchUserPlayers({ commit }, { userId }) {
    const userPlayers = await requestResource({
      resourcePath: GET_RESOURCE_PATH.USER_PLAYERS_BY_USER,
      mainId: userId,
    });
    commit("setUserPlayers", userPlayers);
  },
};

const mutations = {
  setLoggedUser: (state, u) => {
    state.loggedUser = u;
  },
  setUserPlayers: (state, up) => {
    state.userPlayers = up;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true,
};
