import { requestResource } from "../../utils/resourceRequests";
import { GET_RESOURCE_PATH } from "../../common/apiRequests";

const state = {
  userLeagues: [],
};

const getters = {
  getUserLeagues: (state) => state.leagues,
};

const actions = {
  async fetchUserLeagues({ commit }) {
    const leagues = await requestResource({
      resourcePath: GET_RESOURCE_PATH.LEAGUES_ALL,
    });
    commit("setUserLeagues", leagues?.data?.data);
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
