import {
  requestResource,
  postResource,
  putResource,
} from "../../utils/resourceRequests";
import {
  GET_RESOURCE_PATH,
  POST_RESOURCE_PATH,
  PUT_RESOURCE_PATH,
} from "../../common/apiRequests";

const state = {
  transfers: [],
};

const getters = {};

const actions = {
  async fetchTransfers({ commit, dispatch, rootGetters }) {
    const transfers = await requestResource({
      resourcePath: GET_RESOURCE_PATH.TRANSFERS_ALL,
    }).then(async (response) => {
      await dispatch("user/fetchAllUsers", {}, { root: true });
      await dispatch("rounds/fetchRounds", {}, { root: true });
      const users = rootGetters["user/getAllUsers"];
      const rounds = rootGetters["rounds/getAllRounds"];

      return Promise.all(
        response.data.data.map(async (transfer) => {
          const user = users.find(({ id }) => id == transfer.user_id);
          const round = rounds.find(({ id }) => id == transfer.round_id);
          transfer.league_id = user.league_id;
          transfer.round = round;
          transfer.user = user;
          return transfer;
        })
      );
    });

    commit("setTransfers", transfers);
  },
  async updateTransfer({ dispatch }, payload) {
    await putResource({
      resourcePath: PUT_RESOURCE_PATH.TRANSFER_UPDATE,
      mainId: payload.id,
      payload: payload.status,
    })
      .then(() => dispatch("fetchTransfers"))
      .catch((err) => console.log(err.message));
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
