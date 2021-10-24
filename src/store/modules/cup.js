import { postResource, requestResource } from "../../utils/resourceRequests";
import {
  POST_RESOURCE_PATH,
  GET_RESOURCE_PATH,
} from "../../common/apiRequests";

const state = {
  cupRounds: null,
};

const getters = {
  cupRounds: (state) => state.cupRounds,
};

const actions = {
  async addCupTeam(_, payload) {
    return await postResource({
      resourcePath: POST_RESOURCE_PATH.CUP_ADD_PLAYERS,
      payload,
    });
  },
  async fetchCupRounds({ commit }) {
    const rounds = await requestResource({
      resourcePath: GET_RESOURCE_PATH.CUP_ROUNDS_ALL,
    })

    commit("setRounds", rounds?.data?.data);
  },
};

const mutations = {
  setRounds: (state, rounds) => {
    state.cupRounds = rounds;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true,
};
