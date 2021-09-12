import { requestResource } from "../../utils/resourceRequests";
import { GET_RESOURCE_PATH } from "../../common/apiRequests";

const state = {
  seasons: [],
};

const getters = {
  getSeasons: (state) => state.seasons,
};

const actions = {
  async fetchSeasons({ commit }) {
    let seasons;
    await requestResource({
      resourcePath: GET_RESOURCE_PATH.SEASONS_ALL,
    }).then((response) => {
      seasons = response.data.data;
    });
    commit("setSeasons", seasons);
  },
};

const mutations = {
  setSeasons: (state, seasons) => {
    state.seasons = seasons;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
