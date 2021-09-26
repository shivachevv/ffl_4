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
      <!-- <v-row class="league-panel" justify="center" no-gutters>
        <div class="league-icon">
          <v-btn min-width="300" @click="focusLeague(1)">
            <v-avatar size="80" tile
              ><img
                src="../../../assets/images/user-transfers/leagues/primeira-liga.png"
            /></v-avatar>
            <p class="font-weight-bold text-h6">Premiera Liga</p>
          </v-btn>
        </div>
        <div class="league-icon">
          <v-btn min-width="300" @click="focusLeague(2)">
            <v-avatar size="80" tile
              ><img
                src="../../../assets/images/user-transfers/leagues/serie-a.png"
            /></v-avatar>
            <p class="font-weight-bold text-h6">Serie A</p>
          </v-btn>
        </div>
        <div class="league-icon">
          <v-btn min-width="300" @click="focusLeague(3)">
            <v-avatar size="80" tile
              ><img
                src="../../../assets/images/user-transfers/leagues/premier-league.png"
            /></v-avatar>
            <p class="font-weight-bold text-h4">Premier League</p>
          </v-btn>
        </div>
        <div class="league-icon">
          <v-btn min-width="300" @click="focusLeague(4)">
            <v-avatar size="80" tile
              ><img
                src="../../../assets/images/user-transfers/leagues/ligue-1.png"
            /></v-avatar>
            <p class="font-weight-bold text-h6">Ligue 1</p>
          </v-btn>
        </div>
        <div class="league-icon">
          <v-btn min-width="300" @click="focusLeague(5)">
            <v-avatar size="80" tile
              ><img
                src="../../../assets/images/user-transfers/leagues/superlig.png"
            /></v-avatar>
            <p class="font-weight-bold text-h6">Superlig</p>
          </v-btn>
        </div>
        <div class="league-icon">
          <v-btn min-width="300" @click="focusLeague(6)">
            <v-avatar size="80" tile
              ><img
                src="../../../assets/images/user-transfers/leagues/la-liga.png"
            /></v-avatar>
            <p class="font-weight-bold text-h6">La Liga</p>
          </v-btn>
        </div>
        <div class="league-icon">
          <v-btn min-width="300" @click="focusLeague(7)">
            <v-avatar size="80" width="122" tile
              ><img
                src="../../../assets/images/user-transfers/leagues/bundesliga.png"
            /></v-avatar>
            <p class="font-weight-bold text-h6">Bundesliga</p>
          </v-btn>
        </div>
        <div class="league-icon">
          <v-btn min-width="300" @click="focusLeague(8)">
            <v-avatar size="80" tile
              ><img
                src="../../../assets/images/user-transfers/leagues/eredivisie.png"
            /></v-avatar>
            <p class="font-weight-bold text-h6">Eredivisie</p>
          </v-btn>
        </div>
      </v-row> -->
    </div>
    <list-comp
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
    </list-comp>
    <FootballPlayerModal
      v-model="showModal"
      @close-modal="toggleModal"
      @edit-player="editPlayer"
      @create-player="createPlayer"
      @delete-player="deletePlayer"
      @edit-points="editPlayerPoints"
      :passedPlayer="passedPlayer"
    >
    </FootballPlayerModal>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import ListComp from "../../common/ListComp.vue";
import FootballPlayerModal from "../../common/Modal/FootballPlayerModal.vue";

export default {
  name: "PlayersEdit",
  components: {
    ListComp,
    FootballPlayerModal,
  },
  data() {
    return {
      selectedPath: [],
      listItemsProps: {},
      itemsForList: [],
      focusedLeagueId: undefined,
      showModal: false,
      passedPlayer: {},
      blankPlayer: {
        id: "",
        name: "",
        football_league_id: "",
        club: "",
        position: "",
        shirt: "",
        whoscored_id: "",
      },
    };
  },
  methods: {
    ...mapActions({
      fetchAllPlayersAction: "fetchAllPlayers",
      createPlayerAction: "createPlayer",
      editPlayerAction: "editPlayer",
      deletePlayerAction: "deletePlayer",
    }),
    toggleModal() {
      this.showModal = !this.showModal;
    },
    async focusLeague(leagueIndex) {
      this.itemsForList = [];
      this.focusedLeagueId = this.showLeagues[leagueIndex].id;
      this.selectedPath.push({
        type: "league",
        name: this.showLeagues[leagueIndex].name,
      });
      if (this.showPlayers.length == 0) {
        await this.fetchAllPlayersAction(this.focusedLeagueId);
      }
      if (this.selectedPath.length == 1) {
        this.itemsForList = this.showClubs;
        this.listItemsProps = { itemType: "club" };
      }
    },
    focusClub(clubKey) {
      this.itemsForList = this.showClubs[clubKey];
      this.selectedPath.push({ type: "club", name: clubKey });
      this.listItemsProps = { itemType: "player" };
    },
    focusPlayer(playerIndex) {
      const player = this.showClubs[this.selectedPath[1].name][playerIndex];
      this.passedPlayer = player;
      this.toggleModal();
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
      this.toggleModal();
    },
    editPlayer(player) {
      console.log("EDIT PLAYER: ", player);
      this.editPlayerAction(player);
    },
    createPlayer(player) {
      console.log("CREATE PLAYER: ", player);
      this.createPlayerAction(player);
    },
    deletePlayer(player) {
      console.log("DELETE PLAYER: ", player);
      this.deletePlayerAction(player);
    },
    editPlayerPoints(player) {
      console.log("EDIT PLAYER POINTS: ", player);
    },
  },
  computed: {
    ...mapGetters(["getPlayersByLeague", "getClubsByLeague", "getLeagues"]),

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
