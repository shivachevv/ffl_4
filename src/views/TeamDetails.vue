<template>
  <v-row class="no-gutters mt-4" v-if="!loading">
    <!---------------- USER TEAM SECTION -------------------------------------->
    <v-col cols="8">
      <!---------------- USER TEAM SECTION -------------------------------------->
      <UserTeam
        :currentRound="currentRoundIndex + 1"
        :user="user"
        :roundPlayersArray="roundPlayersArray"
        :captain="captain"
        :viceCaptain="viceCaptain"
      ></UserTeam>
    </v-col>
    <v-col cols="4" class="pl-4">
      <UserInfo :user="user" :currentRound="currentRoundIndex + 1"></UserInfo>
      <!---------------- MATCH PREPARATION -------------------------------------->
      <MatchPrep
        :user="user"
        :currentRound="currentRoundIndex + 1"
        :isAdminLogged="true"
        :roundPlayersArray="nextRoundUserTeam"
        :isThisLoggedTeam="isThisLoggedTeam"
        :nextH2hRoundId="nextH2hRoundId"
        :nextCupRoundId="nextCupRoundId"
      ></MatchPrep>

      <!-- TRANSFERS INFORMATION  -->
      <!-- <TeamTransfers
        v-if="true"
        :user="user"
        :currentRound="currentRound"
      ></TeamTransfers> -->
    </v-col>
  </v-row>
  <!-- <main v-if="user && users && currentRound && players">
    <div class="main-container"> -->

  <!---------------- USER DETAILS -------------------------------------->
  <!-- 
    </div>
  </main> -->
</template>

<script>
const UserTeam = () => import("../components/TeamDetails/UserTeam.vue");
const UserInfo = () => import("../components/TeamDetails/UserInfo.vue");
const MatchPrep = () => import("../components/TeamDetails/MatchPrep.vue");
// const PlayerPopup = () => import("../Popup/PlayerPopup");
import { mapState, mapActions } from "vuex";

export default {
  name: "TeamDetails",
  components: {
    UserTeam,
    UserInfo,
    MatchPrep,
    // PlayerPopup,
    // TeamTransfers,
  },
  props: {},
  data() {
    return {
      popupShow: false,
      popupPlayer: "",
    };
  },
  methods: {
    ...mapActions("user", ["fetchLoggedUser", "fetchUserPlayers"]),
    ...mapActions("rounds", ["fetchRounds"]),
    ...mapActions("cup", ["fetchCupRounds"]),
    ...mapActions("transfers", ["fetchTransfers"]),
    // "fetchLeagues",
    // "fetchPlayers",
    //   "fetchCurrentRound",
    //   "fetchUsers",
    // "fetchStandings",
    // "fetchLoggedUser"
    // playerPopupHandler(p) {
    //   this.popupShow = true;
    //   this.popupPlayer = this.players[p];
    // },
    // deselectPlayer() {
    //   return (this.popupPlayer = "");
    // },
    // closePopup() {
    //   return (this.popupShow = false);
    // },
  },
  computed: {
    ...mapState("user", ["loggedUser", "userPlayers"]),
    ...mapState("rounds", ["currentRoundIndex", "rounds"]),
    ...mapState("cup", ["cupRounds"]),
    ...mapState("transfers", ["transfers"]),
    isThisLoggedTeam() {
      // console.log(this.user, this.loggedUser);
      // return this.user.uid === this.loggedUser.uid;
      return true;
    },
    user() {
      return this.loggedUser?.data?.data;
    },
    roundPlayers() {
      return this.userPlayers?.data?.data[0];
    },
    roundPlayersArray() {
      const positions = [
        "dc1",
        "dc2",
        "dl1",
        "dl2",
        "dr1",
        "dr2",
        "gk",
        "mc1",
        "mc2",
        "ml1",
        "ml2",
        "mr1",
        "mr2",
        "st1",
        "st2",
        "st3",
      ];
      return this.roundPlayers
        ? Object.entries(this.roundPlayers)
            .filter(([position]) => positions.includes(position))
            .map(([position, player]) => {
              return { position, player: player[0] };
            })
        : [];
    },
    captain() {
      return this.roundPlayers?.cpt[0];
    },
    viceCaptain() {
      return this.roundPlayers?.vice_cpt[0];
    },
    loading() {
      return !this.user || !this.roundPlayers;
    },
    nextH2hRoundId() {
      const isNextRoundH2h =
        this.rounds[this.currentRoundIndex + 1]?.head_to_head;
      return isNextRoundH2h
        ? this.rounds[this.currentRoundIndex + 1]?.id
        : null;
    },
    nextCupRoundId() {
      const nextRoundEndDate = this.rounds[this.currentRoundIndex + 1]?.to_date;
      return this.cupRounds.find(
        (cupRound) => cupRound.to_date == nextRoundEndDate
      )?.id;
    },
    nextRoundUserTeam() {
      const newPlayers = this.transfers
        .filter(
          ({ round_id, user_id }) =>
            +round_id === this.currentRoundIndex + 1 &&
            +this.user.id === +user_id
          // && status === "approved"
        )
        .reduce((acc, { to_player, position }) => {
          acc[position] = to_player;
          return acc;
        }, {});

      const updatedPlayers = this.roundPlayersArray.map(
        ({ position, player }) => {
          if (newPlayers[position]) {
            return {
              position,
              player: newPlayers[position],
            };
          }
          return { position, player };
        }
      );

      return updatedPlayers;
    },
  },
  watch: {
    // loggedUser(nv){
    //   if (nv) {
    //     const WCStatus =  this.loggedUser.rounds[`r${this.currentRound}`].wildCard
    //     this.wildcard = WCStatus
    //     console.log(this.wildcard);
    //   }
    // },
    // currentRound(nv) {
    //   if (nv && this.players && this.users) {
    //     this.$vs.loading.close();
    //   }
    // },
    // players(nv) {
    //   if (nv && this.users && this.currentRound) {
    //     this.$vs.loading.close();
    //   }
    // },
    // users(nv) {
    //   if (nv && this.players && this.currentRound) {
    //     this.$vs.loading.close();
    //   }
    // },
  },
  async created() {
    await this.fetchCupRounds();
    await this.fetchTransfers();
    await this.fetchLoggedUser();
    await this.fetchRounds();
    await this.fetchUserPlayers(this.user?.id);
  },
  mounted() {},
};
</script>

<style scoped lang="scss">
@import "@/common/breakpoints.scss";

// .main-container {
//   display: flex;
//   flex-direction: row;
//   align-items: flex-start;
//   justify-content: space-between;
//   @media #{$mobile} {
//     width: 100%;
//     flex-direction: column;
//     align-items: center;
//   }
//   .user-details {
//     height: fit-content;
//     width: 35%;
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: flex-start;
//     margin: 0 0 0 20px;
//     @media #{$mobile} {
//       width: 96%;
//       margin: 0px;
//     }
//   }
// } //POPUP STYLES
// .vs-popup {
//   width: 50% !important;
//   .vs-popup--content {
//     font-size: 0.9em !important;
//     -webkit-transition: all 0.23s ease 0.1s !important;
//     transition: all 0.23s ease 0.1s !important;
//     overflow: auto !important;
//     max-height: calc(100vh - 100px) !important;
//     padding: 0px !important;
//     width: 100% !important;
//     margin: 0px !important;
//     background-color: red !important;
//     // background-color: #e0e0e0;
//   }
// }
// .fade-enter-active,
// .fade-leave-active {
//   transition-duration: 0.3s;
//   transition-property: opacity;
//   transition-timing-function: ease;
// }
// .fade-enter,
// .fade-leave-active {
//   opacity: 0;
// }
// .slide-left-enter-active,
// .slide-left-leave-active,
// .slide-right-enter-active,
// .slide-right-leave-active {
//   transition-duration: 0.2s;
//   transition-property: height, opacity, transform;
//   transition-timing-function: cubic-bezier(0.55, 0, 0.1, 1);
//   overflow: hidden;
// }
// .slide-left-enter,
// .slide-right-leave-active {
//   opacity: 0;
//   transform: translate(2em, 0);
// }
// .slide-left-leave-active,
// .slide-right-enter {
//   opacity: 0;
//   transform: translate(-2em, 0);
// }
</style>
