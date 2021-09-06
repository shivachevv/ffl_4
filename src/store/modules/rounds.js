import { requestResource } from "../../utils/loadResource";
import { GET_RESOURCE_PATH } from "../../common/apiRequests";
import { DateTime } from "luxon";

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
    console.log(index);
    return index || index == 0 ? rounds[index] : {};
  },
  getCurrentRoundIndex: (state) => state.currentRoundIndex,
};

const actions = {
  async fetchRounds({ commit }) {
    const rounds = await requestResource(GET_RESOURCE_PATH.ROUNDS_ALL);
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
    const currentRound = rounds.find(function findCurrentRound(round) {
      return (
        DateTime.fromISO(round.from_date) <=
          // DateTime.now() <=
          DateTime.fromISO("2021-05-06") &&
        // DateTime.now()
        DateTime.fromISO("2021-05-06") <= DateTime.fromISO(round.to_date)
      );
    });
    state.currentRoundIndex = rounds.indexOf(currentRound);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
