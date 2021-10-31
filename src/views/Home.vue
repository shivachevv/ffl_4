<template>
  <main>
    <div>PESHO</div>
    <div class="main-container" v-if="leagues && users">
      <div class="league-container">
        <!---------------- LEAGUE CHOICE -------------------------------------->

        <LeagueSelect
          :leagues="leagues"
          :selectedLeague="selectedLeague"
          @selectedLeague="selectedLeague = $event"
        ></LeagueSelect>

        <!---------------- STANDINGS -------------------------------------->

        <LeagueStandings
          :selectedLeagueObj="selectedLeagueObj"
          :currentRound="currentRound"
          :users="users"
          :standings="standings"
        ></LeagueStandings>

        <!---------------- LEAGUE DETAILS -------------------------------------->

        <SelectedLgDetails
          v-if="frozenPlayers"
          :users="users"
          :selectedLeagueObj="selectedLeagueObj"
          :players="frozenPlayers"
          :standings="standings"
          :currentRound="currentRound"
          @playerPopupSelected="playerPopupHandler($event)"
        ></SelectedLgDetails>
      </div>

      <!---------------- BEST TEAM OF THE WEEK -------------------------------------->

      <BestTeam
        v-if="frozenPlayers"
        :players="frozenPlayers"
        :users="users"
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
  </main>
</template>

<script>
const LeagueSelect = () => import("../components/Home/LeagueSelect/LeagueSelect");
const LeagueStandings = () => import("../components/Home/LeagueStandings/LeagueStandings");
const SelectedLgDetails = () => import("../components/Home/SelectedLgDetails/SelectedLgDetails");
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
    return {
      popupShow: false,
      popupPlayer: "",
      selectedLgTmp: "",
    };
  },
  methods: {
    ...mapActions([
      "fetchLeagues",
      "fetchPlayers",
      "fetchCurrentRound",
      "fetchUsers",
      "fetchStandings",
      "fetchLoggedUser",
    ]),
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
    ...mapState([
      "loggedUser",
      "leagues",
      "players",
      "currentRound",
      "users",
      "standings",
      "loggedUser",
    ]),
    selectedLeagueObj() {
      return this.leagues[this.selectedLeague];
    },
    selectedLeague: {
      get: function () {
        if (this.loggedUser && !this.selectedLgTmp) {
          const result = Object.keys(this.leagues).filter((id) => {
            if (this.leagues[id].teams.includes(this.loggedUser.uid)) {
              return id;
            }
          })[0];

          // console.log(result);
          return result;
        } else {
          return this.selectedLgTmp
            ? this.selectedLgTmp
            : "33c46ff1-1756-41a1-a80f-01b2f4fb4b3c";
        }
      },
      set: function (v) {
        this.selectedLgTmp = v;
      },
    },
    frozenPlayers() {
      if (this.players) {
        const result = Object.freeze(this.players);
        return result;
      } else {
        return "";
      }
    },
  },
  watch: {
    // leagues(nv) {
    //   if (
    //     nv &&
    //     this.players &&
    //     this.currentRound &&
    //     this.users &&
    //     this.standings
    //   ) {
        
    //   }
    // },
    // players(nv) {
    //   if (
    //     nv &&
    //     this.leagues &&
    //     this.currentRound &&
    //     this.users &&
    //     this.standings
    //   ) {
        
    //   }
    // },
    // currentRound(nv) {
    //   if (nv && this.players && this.leagues && this.users && this.standings) {
        
    //   }
    // },
    // users(nv) {
    //   if (
    //     nv &&
    //     this.players &&
    //     this.leagues &&
    //     this.currentRound &&
    //     this.standings
    //   ) {
        
    //   }
    // },
    // standings(nv) {
    //   if (
    //     nv &&
    //     this.players &&
    //     this.leagues &&
    //     this.currentRound &&
    //     this.users
    //   ) {
        
    //   }
    // },
  },
  async created() {
    console.log(this.leagues);
    if (!this.leagues) {
      await this.fetchLeagues();
    }
    // if (!this.players) {
    //   this.$vs.loading();
    //   this.fetchPlayers();
    // }
    // if (!this.currentRound) {
    //   this.$vs.loading();
    //   this.fetchCurrentRound();
    // }
    if (!this.users) {
      await this.fetchUsers();
    }
    console.log(this.users);
    // if (!this.standings) {
    //   this.$vs.loading();
    //   this.fetchStandings();
    // }
    // if (!this.loggedUser) {
    //   this.$vs.loading();
    //   this.fetchLoggedUser();
    // }
    // this.fetchCurrentRound();
    // this.fetchUsers();
  },
  beforeDestroy() {
    // this.closePopup()
    // console.log('destroyed');
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
// @import "../../common/breakpoints.scss";

.league-container {
  width: 90%;
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
