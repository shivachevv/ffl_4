import { requestResource } from "../../utils/resourceRequests";
import { GET_RESOURCE_PATH } from "../../common/apiRequests";

const state = {
  transfers: null,
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
    const rounds = await requestResource({
      resourcePath: GET_RESOURCE_PATH.TRANSFERS_ALL,
    });

    commit("setTransfers", rounds?.data?.data);
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
