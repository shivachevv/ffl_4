<template>
  <div>
    <div>
      <v-row
        justify="space-between"
        align="center"
        no-gutters
        class="mt-10 px-10"
      >
        <div class="mt-20">
          <v-btn @click="traverseBack" v-if="selectedPath.length" x-large>
            BACK
          </v-btn>
        </div>

        <h1 class="text-center font-weight-black text-h3">{{ topLabel }}</h1>
        <div class="mt-20">
          <v-btn @click="createPlayerModal" x-large> NEW PLAYER </v-btn>
        </div>
      </v-row>
    </div>
    <ListComp
      :passedItems="itemsForList"
      :itemProps="listItemsProps"
      @focus-club="focusClub"
      @focus-league="focusLeague"
      @focus-player="focusPlayer"
    >
      <v-avatar size="80" tile
        ><img src="../../../assets/images/user-transfers/leagues/ligue-1.png"
      /></v-avatar>
      <!-- <template v-slot:itemActions>
        <div class="item-actions">
          <v-btn elevation="2" outlined large class="amber darken-4 white--text"
            >EDIT</v-btn
          >
          <v-btn elevation="2" outlined large class="red white--text"
            >DELETE</v-btn
          >
        </div>
      </template> -->
    </ListComp>
    <FootballPlayerModal
      v-model="showModal.player"
      @close-modal="toggleModal('player')"
      @edit-player="editPlayer"
      @create-player="createPlayer"
      @delete-player="deletePlayer"
      @edit-points="editPlayerPoints"
      :passedPlayer="passedPlayer"
    >
    </FootballPlayerModal>
    <PlayerPointsModal
      v-model="showModal.playerPoints"
      @close-modal="toggleModal('playerPoints')"
      :passedPlayer="passedPlayer"
    >
    </PlayerPointsModal>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import ListComp from "../../common/ListComp.vue";
import FootballPlayerModal from "../../common/Modal/FootballPlayerModal.vue";
import PlayerPointsModal from "../../common/Modal/PlayerPointsModal.vue";

export default {
  name: "PlayersEdit",
  components: {
    ListComp,
    FootballPlayerModal,
    PlayerPointsModal,
  },
  data() {
    return {
      selectedPath: [],
      listItemsProps: {},
      itemsForList: null,
      focusedLeagueId: undefined,
      showModal: {
        player: false,
        playerPoints: false,
      },
      passedPlayer: {},
      blankPlayer: {
        id: "",
        name: "",
        footballLeagueId: "",
        club: "",
        position: "",
        shirt: "",
        whoscored_id: "",
      },
    };
  },
  methods: {
    ...mapActions("footballPlayers", {
      fetchAllPlayersAction: "fetchAllPlayers",
      createPlayerAction: "createPlayer",
      editPlayerAction: "editPlayer",
      deletePlayerAction: "deletePlayer",
    }),
    toggleModal(name) {
      this.showModal[name] = !this.showModal[name];
    },
    async focusLeague(leagueIndex) {
      this.itemsForList = null;
      this.focusedLeagueId = this.showLeagues[leagueIndex].id;
      this.selectedPath.push({
        type: "league",
        name: this.showLeagues[leagueIndex].name,
      });
      if (this.showPlayers.length == 0) {
        await this.fetchAllPlayersAction({
          priorityLeagueId: this.focusedLeagueId,
        });
      }
      if (this.selectedPath.length == 1) {
        this.itemsForList = this.showClubs;
        this.listItemsProps = { itemType: "club" };
      }
    },
    focusClub(clubKey) {
      this.itemsForList = this.showClubs[clubKey];
      let positions = this.getPositions;
      this.itemsForList.sort(function sortPlayers(a, b) {
        if (positions.indexOf(a.position) < positions.indexOf(b.position))
          return -1;
        if (positions.indexOf(a.position) > positions.indexOf(b.position))
          return 1;
        return 0;
      });
      this.selectedPath.push({ type: "club", name: clubKey });
      this.listItemsProps = { itemType: "player" };
    },
    focusPlayer(playerIndex) {
      const player = this.showClubs[this.selectedPath[1].name][playerIndex];
      this.passedPlayer = player;
      this.toggleModal("player");
    },
    traverseBack() {
      const backFrom = this.selectedPath.pop();
      switch (backFrom.type) {
        case "league":
          this.itemsForList = this.showLeagues;
          this.listItemsProps = { itemType: "league" };
          break;
        case "club":
          this.itemsForList = this.showClubs;
          this.listItemsProps = { itemType: "club" };
          break;
      }
    },
    createPlayerModal() {
      this.passedPlayer = this.blankPlayer;
      this.toggleModal("player");
    },
    editPlayer(player) {
      console.log("EDIT PLAYER: ", player);
      // this.editPlayerAction(player);
      this.editPlayerAction({
        club: player.club,
        football_league_id: player.footballLeagueId,
        id: player.id,
        league: player.league,
        name: player.name,
        position: player.position,
        shirt: player.shirt,
        whoscored_id: player.whoscoredId,
      });
    },
    createPlayer(player) {
      console.log("CREATE PLAYER: ", player);
      this.createPlayerAction(player);
    },
    deletePlayer(player) {
      console.log("DELETE PLAYER: ", player);
      this.deletePlayerAction(player);
    },
    editPlayerPoints() {
      console.log("EDIT PLAYER POINTS:");
      this.toggleModal("playerPoints");
    },
  },
  computed: {
    ...mapGetters("leagues", ["getLeagues"]),
    ...mapGetters("footballPlayers", [
      "getClubsByLeague",
      "getPlayersByLeague",
    ]),

    ...mapGetters(["getPositions"]),

    topLabel() {
      let label;
      switch (this.selectedPath.length) {
        case 0:
          label = "Select league";
          break;
        case 1:
          label = this.selectedPath[0].name;
          break;
        case 2:
          label = `${this.selectedPath[0].name} >> ${this.selectedPath[1].name}`;
      }
      return label;
    },

    showLeagues() {
      return this.getLeagues;
    },

    showPlayers() {
      return this.focusedLeagueId
        ? this.getPlayersByLeague(this.focusedLeagueId)
        : [];
    },

    showClubs() {
      return this.showPlayers.length
        ? this.getClubsByLeague(this.focusedLeagueId)
        : {};
    },
  },
  async created() {
    this.itemsForList = this.showLeagues;
    this.listItemsProps = { itemType: "league" };
  },
};
</script>

<style lang="scss">
$btn-color: #5ac683;

.league-panel {
  flex-direction: column;
  align-items: center;
  padding: 0rem 2rem;
}

.league-icon {
  width: 100%;

  .v-btn {
    display: flex;
    justify-content: space-between;
    align-content: center;
    width: 100%;
    min-height: 6rem;
    margin: 1rem 0rem;

    .v-btn__content {
      p {
        padding-top: 1rem;
      }
    }
  }
}

.item-actions {
  .v-btn {
    margin: 0rem 0.5rem;
    width: 5rem;
  }
}
</style>
