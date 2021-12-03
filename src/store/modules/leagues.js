import { requestResource } from "../../utils/resourceRequests";
import { GET_RESOURCE_PATH } from "../../common/apiRequests";

const state = {
  leagues: [
    {
      id: 1,
      name: "Primeira Liga",
      slug: "primeira-liga",
      leaguePlayers: "portugueseLeaguePlayers",
    },
    {
      id: 2,
      name: "Serie A",
      slug: "serie-a",
      leaguePlayers: "italianLeaguePlayers",
    },
    {
      id: 3,
      name: "Premier League",
      slug: "premier-league",
      leaguePlayers: "englishLeaguePlayers",
    },
    {
      id: 4,
      name: "Ligue 1",
      slug: "ligue-1",
      leaguePlayers: "frenchLeaguePlayers",
    },
    {
      id: 5,
      name: "Superlig",
      slug: "superlig",
      leaguePlayers: "turkishLeaguePlayers",
    },
    {
      id: 6,
      name: "La Liga",
      slug: "la-liga",
      leaguePlayers: "spanishLeaguePlayers",
    },
    {
      id: 7,
      name: "Bundesliga",
      slug: "bundesliga",
      leaguePlayers: "germanLeaguePlayers",
    },
    {
      id: 8,
      name: "Eredivisie",
      slug: "eredivisie",
      leaguePlayers: "dutchLeaguePlayers",
    },
  ],
};

const getters = {
  getLeagues: (state) => state.leagues,
};

const actions = {
  async fetchLeagues({ commit }) {
    let leagues;
    await requestResource({
      resourcePath: GET_RESOURCE_PATH.FOOTBALL_LEAGUES_ALL,
    }).then((response) => {
      leagues = response.data.data;
    });
    commit("setLeagues", leagues);
  },
};

const mutations = {
  setLeagues: (state, leagues) => {
    state.leagues = leagues;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true,
};
