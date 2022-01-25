<template>
  <div class="main-container" v-if="leagues && allUsers">
    <div class="league-container">
      <!---------------- LEAGUE CHOICE -------------------------------------->

      <LeagueSelect
        :leagues="leagues"
        @selectedLeague="handleSelectedLeague($event)"
      ></LeagueSelect>

      <!---------------- STANDINGS -------------------------------------->

      <LeagueStandings
        v-if='selectedLeague && currentRound'
        :selectedLeague="selectedLeague"
        :currentRound="currentRound"
        :users="allUsers"
        :standings="standings"
      ></LeagueStandings>

      <!---------------- LEAGUE DETAILS -------------------------------------->

      <SelectedLgDetails
        v-if="frozenPlayers && selectedLeague && currentRound"
        :users="allUsers"
        :selectedLeague="selectedLeague"
        :players="frozenPlayers"
        :standings="standings"
        :currentRound="currentRound"
        @playerPopupSelected="playerPopupHandler($event)"
      ></SelectedLgDetails>
    </div>

    <!---------------- BEST TEAM OF THE WEEK -------------------------------------->

      <BestTeam
        v-if="frozenPlayers && currentRound"
        :players="frozenPlayers"
        :users="allUsers"
        :currentRound="currentRound"
        @playerPopupHandler="playerPopupHandler($event)"
      />
  </div>
  <!-- <transition name="slide-left" mode="out-in"> -->
  <!-- <vs-popup
      class="holamundo"
      :title="`${popupPlayer.name} Information`"
      :active.sync="popupShow"
      v-if="popupPlayer"
      @close="deselectPlayer"
    >
      <PlayerPopup :player="popupPlayer" />
    </vs-popup> -->
  <!-- <PlayerPopup
      v-if="popupShow"
      :popupPlayer="popupPlayer"
      :popupShow="popupShow"
      :selectedLeagueObj="selectedLeagueObj"
      @popupClose="popupShow = $event"
    ></PlayerPopup>-->
  <!-- </transition> -->
</template>

<script>
const LeagueSelect = () =>
  import("../components/Home/LeagueSelect/LeagueSelect");
const LeagueStandings = () =>
  import("../components/Home/LeagueStandings/LeagueStandings");
const SelectedLgDetails = () =>
  import("../components/Home/SelectedLgDetails/SelectedLgDetails");
const BestTeam = () => import("../components/Home/BestTeam/BestTeam");
// const PlayerPopup = () => import("../Popup/PlayerPopup");
import { mapState, mapActions } from "vuex";

export default {
  name: "Home",
  components: {
    LeagueSelect,
    LeagueStandings,
    SelectedLgDetails,
    // PlayerPopup,
    BestTeam,
  },
  data() {
    const selectedLeague = null;
    return {
      popupShow: false,
      popupPlayer: "",
      selectedLgTmp: "",
      selectedLeague,
    };
  },
  methods: {
    ...mapActions("user", ["fetchAllUsers"]),
    ...mapActions("leagues", ["fetchLeagues"]),
    ...mapActions("rounds", ["fetchRounds"]),
    ...mapActions("standings", ["fetchStandings", "fetchStanding"]),
    ...mapActions("userPlayers", ["fetchUserPlayers"]),

    async handleSelectedLeague(league) {
      this.selectedLeague = league;
    },

    playerPopupHandler(p) {
      this.popupShow = true;
      this.popupPlayer = p;
    },

    closePopup() {
      return (this.popupShow = false);
    },

    deselectPlayer() {
      return (this.popupPlayer = "");
    },
  },
  computed: {
    ...mapState("user", ["loggedUser", "userPlayers", "allUsers"]),
    ...mapState("leagues", ["leagues"]),
    ...mapState("rounds", ["rounds", "roundsH2H", "currentRoundIndex", "currentH2HRoundIndex"]),
    ...mapState("standings", ["standings"]),
    ...mapState("userPlayers", ["userPlayers"]),

    userId() {
      return this.loggedUser.id;
    },

    currentRound() {
      return this.rounds[this.currentRoundIndex] || this.rounds[0];
    },

    latestEndedRound() {
      return this.rounds[this.currentRoundIndex - 1] || this.rounds[0];
    },

    loading() {
      return !this.rounds[this.currentRoundIndex] && !this.leagues.length;
    },

    frozenPlayers() {
      if (this.userPlayers) {
        const result = Object.freeze(this.userPlayers);
        return result;
      } else {
        return [];
      }
    },
  },
  watch: {},
  async created() {
    await this.fetchLeagues();
    await this.fetchRounds();
    await this.fetchAllUsers();
    
    // await this.fetchStandings(); --> throws error

    await this.fetchUserPlayers(this.latestEndedRound);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
// @import "../../common/breakpoints.scss";

.main-container {
  padding-left: 25px;
  padding-right: 25px;
  box-sizing: border-box;
}

.league-container {
  width: 100%;
  background: none;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;

  // @media #{$mobile} {
  //   width: 100%;
  //   flex-direction: column;
  //   align-items: center;
  // }
}

//POPUP STYLES
.vs-popup {
  width: 50% !important;
  .vs-popup--content {
    font-size: 0.9em !important;
    -webkit-transition: all 0.23s ease 0.1s !important;
    transition: all 0.23s ease 0.1s !important;
    overflow: auto !important;
    max-height: calc(100vh - 100px) !important;
    padding: 0px !important;
    width: 100% !important;
    margin: 0px !important;
    background-color: #e0e0e0;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition-duration: 0.2s;
  transition-property: height, opacity, transform;
  transition-timing-function: cubic-bezier(0.55, 0, 0.1, 1);
  overflow: hidden;
}

.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  transform: translate(2em, 0);
}

.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  transform: translate(-2em, 0);
}
</style>
