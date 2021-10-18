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
    return index || index == 0 ? rounds[index] : {};
  },
  getCurrentRoundIndex: (state) => state.currentRoundIndex,
};

const actions = {
  async fetchRounds({ commit }) {
    let rounds;
    await requestResource({
      resourcePath: GET_RESOURCE_PATH.ROUNDS_ALL,
    }).then((response) => {
      rounds = response.data.data;
      commit("setRounds", rounds);
    });
  },
  async createRound({ dispatch }, payload) {
    await postResource({
      resourcePath: POST_RESOURCE_PATH.ROUND_CREATE,
      payload,
    })
      .then(() => dispatch("fetchRounds"))
      .catch((err) => console.log(err.message));
  },
  async editRound({ dispatch }, payload) {
    await putResource({
      resourcePath: PUT_RESOURCE_PATH.ROUND_UPDATE,
      mainId: payload.id,
      payload,
    })
      .then(() => dispatch("fetchRounds"))
      .catch((err) => console.log(err.message));
  },
};

const mutations = {
  setRounds: (state, rounds) => {
    state.rounds = rounds;
    state.roundsH2H = rounds.filter(function getH2HRounds(round) {
      return round.head_to_head;
    });
    const currentRound = rounds.find(function findCurrentRound(round) {
      return (
        DateTime.fromISO(round.from_date) <=
          // DateTime.now() <=
          DateTime.fromISO("2021-05-11") &&
        // DateTime.now()
        DateTime.fromISO("2021-05-17") <= DateTime.fromISO(round.to_date)
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
  namespaced: true,
};
