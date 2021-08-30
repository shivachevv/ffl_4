import { requestResource } from "../../utils/loadResource";
import { GET_RECOURSE_PATH } from "../../common/apiRequests";

const state = {
  rounds: [],
  roundsH2H: [],
  currentRoundIndex: null,
  currentH2HRoundIndex: null,
};

const getters = {
  getAllRounds: (state) => state.rounds,
  getRound: (state, { roundIndex, H2H }) => {
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
  async fetchRounds({ commit }) {
    const rounds = await requestResource(GET_RECOURSE_PATH.ROUNDS_ALL);
    commit("setRounds", rounds);
  },
};

const mutations = {
  setCurrentRound: (state, r) => {
    state.currentRound = r;
  },
  setRounds: (state, rounds) => {
    state.rounds = rounds;
    state.roundsH2H = rounds.filter(function getH2HRounds(round) {
      return round.h2h;
    });
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
