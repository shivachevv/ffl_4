import {
  requestResource,
  postResource,
  putResource,
  deleteResource,
} from "../../utils/resourceRequests";
import {
  GET_RESOURCE_PATH,
  POST_RESOURCE_PATH,
  PUT_RESOURCE_PATH,
  DELETE_RESOURCE_PATH,
} from "../../common/apiRequests";

const state = {
  footballPlayers: [],
  portugueseLeaguePlayers: [],
  italianLeaguePlayers: [],
  englishLeaguePlayers: [],
  frenchLeaguePlayers: [],
  turkishLeaguePlayers: [],
  spanishLeaguePlayers: [],
  germanLeaguePlayers: [],
  dutchLeaguePlayers: [],
};

const getters = {
  getAllPlayers: (state) => state.footballPlayers,
  getPlayersByLeague: (state, _, rootState) => (leagueId) => {
    const league = rootState.leagues.leagues.find(({ id }) => id == leagueId);
    return state[league.leaguePlayers] ? state[league.leaguePlayers] : [];
  },

  getPlayerById: (state) => (playerId) =>
    state.footballPlayers.find(({ id }) => id == playerId),
  getClubsByLeague: (state, _, rootState) => (leagueId) => {
    const league = rootState.leagues.leagues.find(({ id }) => id == leagueId);
    const playersArr = state[league.leaguePlayers]
      ? state[league.leaguePlayers]
      : [];
    return playersArr.reduce((acc, player) => {
      if (!acc[player.club]) {
        acc[player.club] = [];
        acc[player.club].name = player.club;
      }
      acc[player.club].push(player);
      return acc;
    }, {});
  },
};

const actions = {
  async fetchAllPlayers(
    { commit, dispatch, rootGetters },
    { priorityLeagueId, queryParams }
  ) {
    let players = [];
    let leagueIdsArr = rootGetters["leagues/getLeagues"].map(
      (league) => league.id
    );
    if (priorityLeagueId) {
      await dispatch("fetchPlayersByLeague", priorityLeagueId);
      players = state.footballPlayers.filter(
        ({ footballLeagueId }) => footballLeagueId == priorityLeagueId
      );
      const indexOfPriorityLeague = leagueIdsArr.indexOf(priorityLeagueId);
      leagueIdsArr.splice(indexOfPriorityLeague, 1);
    }
    const allLeaguesArr = leagueIdsArr.map(
      async (leagueId) =>
        await requestResource({
          resourcePath: GET_RESOURCE_PATH.PLAYERS_BY_LEAGUE,
          mainId: leagueId,
          queryParams,
        })
    );
    Promise.allSettled(allLeaguesArr).then((response) => {
      response.forEach((leaguePlayers) => {
        const league = rootGetters["leagues/getLeagues"].find(
          ({ id }) =>
            id == leaguePlayers?.value?.data?.data[0]?.footballLeagueId
        );
        players.push(...leaguePlayers?.value?.data?.data);
        commit("setLeaguePlayers", {
          leagueString: league?.leaguePlayers,
          players: leaguePlayers?.value?.data?.data,
        });
      });
      commit("setFootballPlayers", players);
    });
  },
  async fetchPlayersByLeague({ commit, rootGetters }, leagueId) {
    let players = [];
    const league = rootGetters["leagues/getLeagues"].find(
      ({ id }) => id == leagueId
    );
    await requestResource({
      resourcePath: GET_RESOURCE_PATH.PLAYERS_BY_LEAGUE,
      mainId: leagueId,
    }).then((response) => {
      players = response.data.data;
      commit("setLeaguePlayers", {
        leagueString: league.leaguePlayers,
        players,
      });
      const allPlayers = state.footballPlayers.filter(
        ({ footballLeagueId }) => footballLeagueId != leagueId
      );
      commit("setFootballPlayers", [...allPlayers, ...players]);
    });
  },
  async fetchPlayerById({ commit }, playerId) {
    let player = {};
    await requestResource({
      resourcePath: GET_RESOURCE_PATH.PLAYER_BY_ID,
      mainId: playerId,
    }).then((response) => {
      player = response.data.data;
      commit("setFootballPlayer", player);
    });
  },
  async createPlayer({ dispatch }, payload) {
    await postResource({
      resourcePath: POST_RESOURCE_PATH.FOOTBALL_PLAYERS_CREATE_PLAYER,
      payload,
    })
      .then(() => dispatch("fetchPlayersByLeague", payload.footballLeagueId))
      .catch((err) => console.log(err.message));
  },
  async editPlayer({ dispatch }, payload) {
    await putResource({
      resourcePath: PUT_RESOURCE_PATH.FOOTBALL_PLAYER_UPDATE,
      mainId: payload.id,
      payload,
    })
      .then(() =>
        dispatch("fetchAllPlayers", {
          priorityLeagueId: payload.footballLeagueId,
        })
      )
      .catch((err) => console.log(err.message));
  },
  async deletePlayer({ dispatch }, payload) {
    console.log("deletePlayer");
    await deleteResource({
      resourcePath: DELETE_RESOURCE_PATH.FOOTBALL_PLAYER_DELETE,
      mainId: payload.id,
    })
      .then(() =>
        dispatch("fetchAllPlayers", {
          priorityLeagueId: payload.footballLeagueId,
        })
      )
      .catch((err) => console.log(err.message));
  },
};

const mutations = {
  setFootballPlayers: (state, players) => {
    state.footballPlayers = players;
  },
  setFootballPlayer: (state, player) => {
    let playerToChangeIndex = state.footballPlayers.indexOf(
      state.footballPlayers.find(({ id }) => id == player.id)
    );
    if (playerToChangeIndex != -1) {
      state.footballPlayers[playerToChangeIndex] = player;
    } else {
      state.footballPlayers.push(player);
    }
  },
  setLeaguePlayers: (state, payload) => {
    state[payload.leagueString] = payload.players;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true,
};
