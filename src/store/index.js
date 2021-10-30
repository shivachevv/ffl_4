import Vue from "vue";
import Vuex from "vuex";
import rounds from "./modules/rounds";
import user from "./modules/user";
import seasons from "./modules/seasons";
import h2h from "./modules/h2h";
import cup from "./modules/cup";
import transfers from "./modules/transfers";
import leagues from "./modules/leagues";
import footballPlayers from "./modules/footballPlayers";
<<<<<<< HEAD
import userLeagues from "./modules/userLeagues";
import transfers from "./modules/transfers";
=======
import userPlayers from "./modules/userPlayers";
import notifications from "./modules/notifications";
>>>>>>> d304ecb3ceb3d626025c0d7cd1caa87cbe74988e

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
<<<<<<< HEAD
    seasons,
    leagues,
    footballPlayers,
    userLeagues,
    transfers,
=======
    user,
    seasons,
    h2h,
    cup,
    transfers,
    leagues,
    footballPlayers,
    userPlayers,
    notifications,
>>>>>>> d304ecb3ceb3d626025c0d7cd1caa87cbe74988e
  },
});
