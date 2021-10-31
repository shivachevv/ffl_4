import { requestResource } from "../../utils/resourceRequests";
import { GET_RESOURCE_PATH } from "../../common/apiRequests";

const state = {
  userLeagues: [],
};

const getters = {
  getUserLeagues: (state) => state.userLeagues,
};

const actions = {
  async fetchUserLeagues({ commit }) {
    let userLeagues;
    await requestResource({
      resourcePath: GET_RESOURCE_PATH.LEAGUES_ALL,
    }).then((response) => {
      userLeagues = response.data.data;
    });
    commit("setUserLeagues", userLeagues);
  },
};

const mutations = {
  setUserLeagues: (state, userLeagues) => {
    state.userLeagues = userLeagues;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true,
};
