import Vue from "vue";
import Vuex from "vuex";
import rounds from "./modules/rounds";
import seasons from "./modules/seasons";
import leagues from "./modules/leagues";
import footballPlayers from "./modules/footballPlayers";
import userLeagues from "./modules/userLeagues";
import transfers from "./modules/transfers";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    positions: ["GK", "DL", "DC", "DR", "ML", "MC", "MR", "ST"],
  },
  getters: {
    getPositions: (state) => state.positions,
  },
  mutations: {},
  actions: {},
  modules: {
    rounds,
    seasons,
    leagues,
    footballPlayers,
    userLeagues,
    transfers,
  },
});
