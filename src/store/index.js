import Vue from "vue";
import Vuex from "vuex";
import rounds from "./modules/rounds";
import user from "./modules/user";
import auth from "./modules/auth";
import seasons from "./modules/seasons";
import h2h from "./modules/h2h";
import cup from "./modules/cup";
import transfers from "./modules/transfers";
import leagues from "./modules/leagues";
import userLeagues from "./modules/userLeagues";
import footballPlayers from "./modules/footballPlayers";
import userPlayers from "./modules/userPlayers";
import notifications from "./modules/notifications";
import userLeagues from "./modules/userLeagues";

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
    auth,
    rounds,
    user,
    seasons,
    h2h,
    cup,
    transfers,
    leagues,
    footballPlayers,
    userPlayers,
    notifications,
    userLeagues,
  },
});
