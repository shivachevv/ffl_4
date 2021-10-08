import { postResource } from "../../utils/resourceRequests";
import {
  POST_RESOURCE_PATH,
} from "../../common/apiRequests";

const state = {
};

const getters = {
};

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
};

const mutations = {
};

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true,
};
