<template>
  <v-row class="no-gutters">
    <!---------------- USER TEAM SECTION -------------------------------------->
    <v-col cols="8">
      <UserTeam></UserTeam>
    </v-col>
  </v-row>
  <!-- <main v-if="user && users && currentRound && players">
    <div class="main-container"> -->
  <!---------------- USER TEAM SECTION -------------------------------------->

  <!---------------- USER DETAILS -------------------------------------->
  <!-- <section class="user-details"> -->
  <!-- <UserInfo
          :user="user"
          :currentRound="currentRound"
          :isThisLoggedTeam="isThisLoggedTeam"
        ></UserInfo> -->

  <!---------------- MATCH PREPARATION -------------------------------------->

  <!-- isAdminLogged is true for testing purposes-->
  <!-- <MatchPrep
          :isThisLoggedTeam="isThisLoggedTeam"
          :owner="user.userTeam"
          :user="user"
          :currentRound="currentRound"
          :players="players"
          :isAdminLogged="true"
        ></MatchPrep> -->

  <!-- TRANSFERS INFORMATION -->

  <!-- <TeamTransfers
          v-if="true"
          :user="user"
          :currentRound="currentRound"
        ></TeamTransfers> -->
  <!-- </section>
    </div>
  </main> -->
</template>

<script>
const UserTeam = () => import("../components/TeamDetails/UserTeam.vue");
// const UserInfo = () => import("./UserInfo");
// const MatchPrep = () => import("./MatchPrep");
// const TeamTransfers = () => import("./TeamTransfers");
// const PlayerPopup = () => import("../Popup/PlayerPopup");
import { mapState, mapActions } from "vuex";
export default {
  name: "TeamDetails",
  components: {
    UserTeam,
    // UserInfo,
    // MatchPrep,
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
    ...mapActions("user", ["fetchLoggedUser"]),
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
    ...mapState("user", ["loggedUser"]),
    // isThisLoggedTeam() {
    //   // console.log(this.user, this.loggedUser);
    //   // return this.user.uid === this.loggedUser.uid;
    //   return true;
    // },
    // user() {
    //   if (this.users) {
    //     const user = Object.values(this.users).filter((x) => {
    //       const routeTeam = this.$route.params.id;
    //       if (routeTeam === x.userLogo) {
    //         return x;
    //       }
    //     })[0];
    //     return user;
    //   } else {
    //     return undefined;
    //   }
    // },
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
  created() {
    // this.$vs.loading();
    // this.fetchUsers();
    this.fetchLoggedUser();
  },
  mounted() {
    // if ((this.players, this.users, this.currentRound)) {
    //   this.$vs.loading.close();
    //   console.log('here');
    // }
  },
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
