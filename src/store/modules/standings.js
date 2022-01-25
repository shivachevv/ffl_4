import {
  requestResource,
} from "../../utils/resourceRequests";
import {
  GET_RESOURCE_PATH,
} from "../../common/apiRequests";

const state = {
  standings: [
    {
      id: 1,
      teamName: "Team 1",
      firstName: "Gosho 1",
      lastName: "Petkov 1",
      total: 650,
      lastRound: 85,
      movement: -1,
    },
    {
      id: 2,
      teamName: "Team 2",
      firstName: "Gosho 2",
      lastName: "Petkov 2",
      total: 550,
      lastRound: 85,
      movement: -2,
    },
    {
      id: 3,
      teamName: "Team 3",
      firstName: "Gosho 3",
      lastName: "Petkov 3",
      total: 450,
      lastRound: 85,
      movement: -4,
    },
    {
      id: 4,
      teamName: "Team 4",
      firstName: "Gosho 4",
      lastName: "Petkov 4",
      total: 750,
      lastRound: 85,
      movement: 2,
    },
    {
      id: 5,
      teamName: "Team 5",
      firstName: "Gosho 5",
      lastName: "Petkov 5",
      total: 850,
      lastRound: 85,
      movement: 2,
    },
    {
      id: 6,
      teamName: "Team 6",
      firstName: "Gosho 6",
      lastName: "Petkov 6",
      total: 800,
      lastRound: 80,
      movement: 1,
    },
    {
      id: 7,
      teamName: "Team 7",
      firstName: "Gosho 7",
      lastName: "Petkov 7",
      total: 900,
      lastRound: 85,
      movement: 0,
    },
    {
      id: 8,
      teamName: "Team 8",
      firstName: "Gosho 8",
      lastName: "Petkov 8",
      total: 950,
      lastRound: 65,
      movement: -1,
    },
    {
      id: 9,
      teamName: "Team 9",
      firstName: "Gosho 9",
      lastName: "Petkov 9",
      total: 900,
      lastRound: 75,
      movement: 1,
    },
    {
      id: 10,
      teamName: "Team 10",
      firstName: "Gosho 10",
      lastName: "Petkov 10",
      total: 350,
      lastRound: 95,
      movement: 0,
    },
  ],
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
  async fetchStanding(_, { leagueId }) {
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
