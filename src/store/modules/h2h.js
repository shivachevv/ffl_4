import { postResource } from "../../utils/resourceRequests";
import { POST_RESOURCE_PATH } from "../../common/apiRequests";

const state = {};

const getters = {};

const actions = {
  async addH2HTeam(_, payload) {
    return await postResource({
      resourcePath: POST_RESOURCE_PATH.H2H_USERS_ADD_PLAYER,
      payload,
    });
  },
};

const mutations = {
  setRounds: (state, rounds) => {
    state.rounds = rounds;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true,
};
