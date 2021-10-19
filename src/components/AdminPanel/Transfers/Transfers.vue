<template>
  <div>
    <div>
      <v-row
        align="center"
        justify="space-between"
        no-gutters
        class="mt-10 px-10"
      >
        <div>
          <h1 class="font-weight-black text-h3">
            {{ topLabel }}
          </h1>
        </div>
      </v-row>
    </div>
    <div class="list-wrapper">
      {{ itemsForTransfersList.length }}
      <list-comp
        :passedItems="itemsForList"
        v-if="!itemsForTransfersList.length"
        :itemProps="listItemsProps"
        @focus-round="focusRound"
        @focus-user-league="focusUserLeague"
      >
      </list-comp>
      <transfers-list
        :passedItems="itemsForTransfersList"
        :itemProps="listItemsProps"
        @focus-transfer="focusTransfer"
      >
      </transfers-list>
    </div>

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
import TransfersList from "../../common/TransfersList.vue";

export default {
  name: "PlayersEdit",
  components: {
    ListComp,
    FootballPlayerModal,
    PlayerPointsModal,
    TransfersList,
  },
  data() {
    return {
      selectedPath: [],
      listItemsProps: {},
      itemsForList: [],
      itemsForTransfersList: [],
      secondItemsProps: {},
      focusedUserLeagueId: undefined,
      focusedRoundId: undefined,
      showModal: {
        player: false,
        playerPoints: false,
      },
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
    toggleModal(name) {
      this.showModal[name] = !this.showModal[name];
    },
    async focusUserLeague(userLeagueIndex) {
      this.itemsForList = [];
      this.focusedUserLeagueId = this.showUserLeagues[userLeagueIndex].id;
      this.selectedPath.push({
        type: "user-league",
        name: this.showUserLeagues[userLeagueIndex].name,
      });
      if (this.selectedPath.length == 1) {
        this.itemsForTransfersList = {
          rounds: this.showRounds,
          transfers: this.showTransfers,
        };
        this.listItemsProps = { itemType: "transfer" };
      }
    },
    focusRound() {
      this.itemsForTransfersList = this.showTransfers;
      // let positions = this.getPositions;
      // this.itemsForList.sort(function sortPlayers(a, b) {
      //   if (positions.indexOf(a.position) < positions.indexOf(b.position))
      //     return -1;
      //   if (positions.indexOf(a.position) > positions.indexOf(b.position))
      //     return 1;
      //   return 0;
      // });
      // this.selectedPath.push({ type: "club", name: roundIndex });
      // this.listItemsProps = { itemType: "player" };
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
    editPlayerPoints() {
      console.log("EDIT PLAYER POINTS:");
      this.toggleModal("playerPoints");
    },
  },
  computed: {
    ...mapGetters([
      "getAllRounds",
      "getUserLeagues",
      "getSeasons",
      "getTransfers",
    ]),

    topLabel() {
      let label;
      switch (this.selectedPath.length) {
        case 0:
          label = "Select User League:";
          break;
        case 1:
          label = this.selectedPath[0].name;
          break;
      }
      return label;
    },

    showUserLeagues() {
      return this.getUserLeagues;
    },
    showRounds() {
      const allRounds = this.getAllRounds;
      const activeSeason = this.getSeasons.find(({ active }) => active);
      return activeSeason
        ? allRounds.filter(({ season_id }) => season_id == activeSeason.id)
        : [];
    },

    showTransfers() {
      return this.fousedRoundId
        ? this.getTransfers
            .filter(({ round_id }) => round_id == this.fousedRoundId)
            .map((transfer) => {
              transfer.name = `From user ${transfer.user_id}: Player ${transfer.from_player_id} for player ${transfer.to_player_id}`;
              return transfer;
            })
        : [];
    },
  },
  async created() {
    await Promise.all([
      this.$store.dispatch("fetchUserLeagues"),
      this.$store.dispatch("fetchRounds"),
      this.$store.dispatch("fetchSeasons"),
      this.$store.dispatch("fetchTransfers"),
    ]);
    this.itemsForList = this.showUserLeagues;
    this.listItemsProps = { itemType: "user-league" };
    // this.fousedRoundId = this.getSeasons.find(
    //   ({ active }) => active
    // ).current_round;
    this.fousedRoundId = "7";
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
.list-wrapper {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  .v-list {
    flex-grow: 2;
  }
}
</style>
