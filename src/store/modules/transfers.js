import { requestResource } from "../../utils/resourceRequests";
import { GET_RESOURCE_PATH } from "../../common/apiRequests";

const state = {
<<<<<<< HEAD
  transfers: [],
=======
  transfers: null,
>>>>>>> d304ecb3ceb3d626025c0d7cd1caa87cbe74988e
};

const getters = {
  getTransfers: (state) => state.transfers,
};

const actions = {
  async fetchTransfers({ commit }) {
<<<<<<< HEAD
    let transfers;
    await requestResource({
      resourcePath: GET_RESOURCE_PATH.TRANSFERS_ALL,
    }).then((response) => {
      transfers = response.data.data;
    });
    commit("setTransfers", transfers);
=======
    const rounds = await requestResource({
      resourcePath: GET_RESOURCE_PATH.TRANSFERS_ALL,
    });

    commit("setTransfers", rounds?.data?.data);
>>>>>>> d304ecb3ceb3d626025c0d7cd1caa87cbe74988e
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
<<<<<<< HEAD
=======
  namespaced: true,
>>>>>>> d304ecb3ceb3d626025c0d7cd1caa87cbe74988e
};
