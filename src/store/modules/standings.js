import {
    requestResource,
  } from "../../utils/resourceRequests";
  import {
    GET_RESOURCE_PATH,
  } from "../../common/apiRequests";

  const state = {
    standings: [],
  };
  
  const getters = {
    getAllStandings: (state) => state.standings,
  };
  
  const actions = {
    async fetchStandings({ commit }) {
      const response = await requestResource({
        resourcePath: GET_RESOURCE_PATH.STANDINGS_ALL,
      });
      commit("setStandings", response?.data?.data);
    },
    async fetchStanding(_, {leagueId}) {
      const response = await requestResource({
        resourcePath: GET_RESOURCE_PATH.STANDINGS_BY_LEAGUE,
        mainId: leagueId,
      });
      return response?.data?.data;
    },
  };
  
  const mutations = {
    setStandings: (state, standings) => {
      state.standings = standings;
    },
  };
  
  export default {
    state,
    getters,
    actions,
    mutations,
    namespaced: true,
  };
  