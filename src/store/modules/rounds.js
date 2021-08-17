// import { getCurrentRound } from "../../utils/getCurrentRound";
import loadResource from "../../utils/resources/loadResource";


const state = {
  rounds: [],
  roundsH2H: [],
  currentRoundIndex: null,
  currentH2HRoundIndex: null,
};

const getters = {
  getAllRounds: (state) => state.rounds,
  getRound: (state, roundIndex, H2H) => {
    const rounds = H2H ? state.roundsH2H : state.rounds;
    const index =
      roundIndex && roundIndex < rounds.length
        ? roundIndex
        : H2H
        ? state.currentH2HRoundIndex
        : state.currentRoundIndex;
    return index ? rounds[index] : {};
  },
};

const actions = {
    async getRounds () {
        api.ff-legends.com/api/

    }
  async fetchCurrentRound({ commit }) {
    const round = await loadResource("round");
    commit("setCurrentRound", round.currentRound);
  },
};

const mutations = {
  setCurrentRound: (state, r) => {
    state.currentRound = r;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
