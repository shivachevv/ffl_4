import { postResource, requestResource } from "../../utils/resourceRequests";
import {
  POST_RESOURCE_PATH,
  GET_RESOURCE_PATH,
} from "../../common/apiRequests";

const state = {
  userPlayers: [],
};

const getters = {};

const actions = {
  async createNextRoundPlayers(_, payload) {
    return await postResource({
      resourcePath: POST_RESOURCE_PATH.PLAYER_CREATE,
      payload,
    });
  },
  async setSuperCpt(_, payload) {
    return await postResource({
      resourcePath: POST_RESOURCE_PATH.PLAYERS_SUPER_CPTN_ACTIVATE,
      payload,
    });
  },
  async fetchUserPlayers({ commit }, round) {
    let userPlayers;
    await requestResource({
      resourcePath: `${GET_RESOURCE_PATH.PLAYERS_ALL}?round_id=${round.id}`,
    }).then((response) => {
      userPlayers = response.data.data;
    });
    commit("setUserPlayers", userPlayers);
  },
};

const mutations = {
  setUserPlayers: (state, userPlayers) => {
    state.userPlayers = [...userPlayers];
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true,
};
