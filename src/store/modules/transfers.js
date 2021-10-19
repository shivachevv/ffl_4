import { requestResource } from "../../utils/resourceRequests";
import { GET_RESOURCE_PATH } from "../../common/apiRequests";

const state = {
  transfers: [],
};

const getters = {
  getTransfers: (state) => state.transfers,
};

const actions = {
  async fetchTransfers({ commit }) {
    let transfers;
    await requestResource({
      resourcePath: GET_RESOURCE_PATH.TRANSFERS_ALL,
    }).then((response) => {
      transfers = response.data.data;
    });
    commit("setTransfers", transfers);
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
};
