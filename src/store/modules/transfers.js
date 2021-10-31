import { requestResource } from "../../utils/resourceRequests";
import { GET_RESOURCE_PATH } from "../../common/apiRequests";

const state = {
  transfers: [],
};

const getters = {
  getTransfers: (state) => state.transfers,
};

const actions = {
  async fetchTransfers({ commit, dispatch, rootGetters }) {
    let transfers;
    await requestResource({
      resourcePath: GET_RESOURCE_PATH.TRANSFERS_ALL,
    })
      .then(async (response) => {
        await dispatch("user/fetchAllUsers", {}, { root: true });
        const users = rootGetters["user/getAllUsers"];
        return Promise.all(
          response.data.data.map(async (transfer) => {
            const user = users.find(({ id }) => id == transfer.user_id);
            transfer.league_id = user.league_id;
            return transfer;
          })
        );
      })
      .then((response) => {
        transfers = response;
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
  namespaced: true,
};
