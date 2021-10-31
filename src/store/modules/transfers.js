import { requestResource, postResource } from "../../utils/resourceRequests";
import {
  GET_RESOURCE_PATH,
  POST_RESOURCE_PATH,
} from "../../common/apiRequests";

const state = {
  transfers: null,
};

const getters = {
  getTransfers: (state) => state.transfers,
};

const actions = {
  async fetchTransfers({ commit }) {
    const rounds = await requestResource({
      resourcePath: GET_RESOURCE_PATH.TRANSFERS_ALL,
    });

    commit("setTransfers", rounds?.data?.data);
  },
  async createTransfer({ dispatch }, payload) {
    console.log(payload);
    await postResource({
      resourcePath: POST_RESOURCE_PATH.TRANSFERS_USER_TR_REQUEST,
      payload,
    });

    await dispatch("fetchTransfers");
    // .catch((err) => console.log(err.message));
  },
};

const mutations = {
  setTransfers: (state, transfers) => {
    state.transfers = transfers;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true,
};
