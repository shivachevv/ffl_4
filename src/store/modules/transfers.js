import { requestResource } from "../../utils/resourceRequests";
import { GET_RESOURCE_PATH } from "../../common/apiRequests";

const state = {
  transfers: [],
};

const getters = {};

const actions = {
  async fetchTransfers({ commit }) {
    await requestResource({
      resourcePath: GET_RESOURCE_PATH.TRANSFERS_ALL,
    }).then(transfers => {
      commit("setTransfers", transfers);
    });
  },
};

const mutations = {
  setTransfers: (state, transfers) => {
    state.transfers = transfers.data.data;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true,
};
