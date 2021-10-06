import Vue from "vue";
import Vuex from "vuex";
import rounds from "./modules/rounds";
import user from "./modules/user";
import seasons from "./modules/seasons";
import h2h from "./modules/h2h";
import cup from "./modules/cup";
import transfers from "./modules/transfers";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: { rounds, user, seasons, h2h, cup, transfers },
});
