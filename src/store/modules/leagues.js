import { requestResource } from "../../utils/resourceRequests";
import { GET_RESOURCE_PATH } from "../../common/apiRequests";
// import { v4 as uuidv4 } from 'uuid';

const state = {
  leagues: [],
};

const getters = {
  getLeagues: (state) => state.leagues,
};

const actions = {
  async fetchLeagues({ commit }) {
    let leagues;
    await requestResource({
      resourcePath: GET_RESOURCE_PATH.LEAGUES_ALL,
    }).then((response) => {
      leagues = response.data.data;
    });
    commit("setLeagues", leagues);
  },
};

const mutations = {
  setLeagues: (state, leagues) => {
    state.leagues = [...leagues];
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true,
};
