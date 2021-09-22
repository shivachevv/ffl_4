import {
  requestResource,
  // postResource,
  // putResource,
} from "../../utils/resourceRequests";
import {
  GET_RESOURCE_PATH,
  // POST_RESOURCE_PATH,
  // PUT_RESOURCE_PATH,
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
  getPlayersByLeague: (state, rootState) => (leagueId) => {
    const league = rootState.getLeagues.find(({ id }) => id == leagueId);
    return state[league.leaguePlayers] ? state[league.leaguePlayers] : [];
  },

  getPlayerById: (state) => (playerId) =>
    state.footballPlayers.find(({ id }) => id == playerId),
  getClubsByLeague: (state, rootState) => (leagueId) => {
    const league = rootState.getLeagues.find(({ id }) => id == leagueId);
    const playersArr = state[league.leaguePlayers]
      ? state[league.leaguePlayers]
      : [];
    const testArr = playersArr.reduce((acc, player) => {
      if (!acc[player.club]) {
        acc[player.club] = [];
        acc[player.club].name = player.club;
      }
      acc[player.club].push(player);
      return acc;
    }, {});
    console.log("HERE: ", testArr);
    return testArr;
  },
};

const actions = {
  async fetchAllPlayers({ commit, dispatch, rootGetters }, priorityLeagueId) {
    let players = [];
    let leagueIdsArr = rootGetters.getLeagues.map((league) => league.id);
    if (priorityLeagueId) {
      await dispatch("fetchPlayersByLeague", priorityLeagueId);
      players = state.footballPlayers.filter(
        ({ football_league_id }) => football_league_id == priorityLeagueId
      );
      const indexOfPriorityLeague = leagueIdsArr.indexOf(priorityLeagueId);
      leagueIdsArr.splice(indexOfPriorityLeague, 1);
    }
    const allLeaguesArr = leagueIdsArr.map(
      async (leagueId) =>
        await requestResource({
          resourcePath: GET_RESOURCE_PATH.PLAYERS_BY_LEAGUE,
          mainId: leagueId,
        })
    );
    Promise.allSettled(allLeaguesArr).then((response) => {
      response.forEach((leaguePlayers) => {
        const league = rootGetters.getLeagues.find(
          ({ id }) => id == leaguePlayers.value.data.data[0].football_league_id
        );
        players.push(...leaguePlayers.value.data.data);
        commit("setLeaguePlayers", {
          leagueString: league.leaguePlayers,
          players: leaguePlayers.value.data.data,
        });
      });
      commit("setFootballPlayers", players);
    });
  },
  async fetchPlayersByLeague({ commit, rootGetters }, leagueId) {
    let players = [];
    const league = rootGetters.getLeagues.find(({ id }) => id == leagueId);
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
        ({ football_league_id }) => football_league_id != leagueId
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
};
