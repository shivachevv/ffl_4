<template>
  <div class="user-stats elevation-8">
    <div class="user-name">
      <img src="@/assets/images/user-page/user-head.png" alt="user-head" />
      <h2 class="up">{{ `${user.first_name} ${user.last_name}` }}</h2>
    </div>

    <div class="league-name">League Pele</div>

    <div class="info-stat">
      <span class="up">Manager Age</span>
      <span class="pts-value up">{{ user.age }} years</span>
    </div>
    <div class="info-stat">
      <span class="up">Location</span>
      <span class="pts-value up">{{ user.location }}</span>
    </div>
    <div class="info-stat">
      <span class="up">Ocupation</span>
      <span class="pts-value up">{{ user.occupation }}</span>
    </div>
    <div class="info-stat">
      <span class="up">Favourite Team</span>
      <span class="pts-value up">{{ user.fav_team }}</span>
    </div>
    <div class="info-stat">
      <span class="up">Team Motto</span>
      <span class="pts-value up">{{ user.motto }}</span>
    </div>
    <div class="total-pts">
      <span class="up">Total points</span>
      <span class="pts-value">500 pts</span>
    </div>
    <div class="last-week-pts">
      <span class="up">Last week points</span>
      <span class="last-week-pts-value">110 pts</span>
    </div>
    <div class="league-pos">
      <span class="up">League position</span>
      <span class="league-pos-value">1</span>
    </div>
    <div class="cup-pos">
      <span class="up">Cup status</span>
      <span class="cup-pos-value">
        <router-link to="/cup">Cup Page</router-link>
      </span>
    </div>
    <div class="curr-round">
      <span class="up">Current round</span>
      <span class="curr-round-value">Round {{ currentRound }}</span>
    </div>
  </div>
</template>

<script>
// import "material-icons/iconfont/material-icons.css";
// import { mapGetters } from "vuex";
// import * as firebase from "firebase";
// import "firebase/auth";
export default {
  name: "UserInfo",
  props: {
    // isThisLoggedTeam: {
    //   type: Boolean,
    //   required: true,
    // },
    user: {
      type: Object,
      required: true,
    },
    currentRound: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      showPopup: false,
      oldPassword: "",
      newPassword: "",
      reNewPassword: "",
      error: false,
      errorMsg: "",
      success: false,
    };
  },
  computed: {
    // ...mapGetters(["standings", "leagues"]),
    // standingsStats() {
    //   if (this.standings && this.currentRound && this.leagues && this.user) {
    //     // const lastRndStandings = this.standings[`r${this.currentRound}`];
    //     const lastRndStandings = this.standings;
    //     const userLeagueId = Object.keys(lastRndStandings).filter(
    //       (leagueId) => {
    //         if (
    //           Object.keys(lastRndStandings[leagueId]).includes(this.user.uid)
    //         ) {
    //           return leagueId;
    //         }
    //       }
    //     )[0];
    //     const userStandingsStats =
    //       lastRndStandings[userLeagueId][this.user.uid];
    //     return {
    //       total: userStandingsStats.total,
    //       lastWeek: userStandingsStats.lastRndTotal,
    //       currentPos: userStandingsStats.place,
    //       league: this.leagues[userLeagueId].name,
    //     };
    //   } else {
    //     return "Loading";
    //   }
    // },
    // doPasswordsMatch() {
    //   return (
    //     this.newPassword === this.reNewPassword && this.newPassword.length > 0
    //   );
    // },
  },
  methods: {
    // changePassword() {
    //   const reauthenticate = (currentPassword) => {
    //     const user = firebase.auth().currentUser;
    //     const cred = firebase.auth.EmailAuthProvider.credential(
    //       user.email,
    //       currentPassword
    //     );
    //     return user.reauthenticateWithCredential(cred);
    //   };
    //   if (this.doPasswordsMatch) {
    //     reauthenticate(this.oldPassword)
    //       .then(() => {
    //         const user = firebase.auth().currentUser;
    //         user
    //           .updatePassword(this.newPassword)
    //           .then(() => {
    //             console.log("Password updated!");
    //             this.success = true;
    //           })
    //           .catch((error) => {
    //             console.log(error);
    //             (this.error = true), (this.errorMsg = error);
    //           });
    //       })
    //       .catch((error) => {
    //         console.log(error);
    //         (this.error = true), (this.errorMsg = error);
    //       });
    //   } else {
    //     this.error = true;
    //     this.errorMsg = "The two passwords do not match!";
    //   }
    // },
    // openPassPopupHandler() {
    //   return (this.showPopup = true);
    // },
  },
  created() {},
  watch: {
    // success(nv) {
    //   if (nv === true) {
    //     setTimeout(() => {
    //       this.success = false;
    //     }, 2000);
    //   }
    // },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
/**********************************************************
*************************  USER DETAILS SECTION **********/
.user-details {
  height: fit-content;
  width: 35%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin: 0 0 0 20px;
}
.user-stats {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  position: relative;
}
.user-name {
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #3c474d;
  color: #f1f0f1;
  font-size: 1rem;
  position: relative;

  img {
    margin: 0 20px;
    width: 60px;
    height: 60px;
  }
  h2 {
    margin: 0 40px;
  }
}
.league-name {
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #9fa5a9;
  color: #3c474d;
  font-size: 1rem;
  border-bottom: 2px solid #3a454b;
  font-size: 1.25rem;
  font-weight: bold;
}
.info-stat,
.total-pts,
.last-week-pts,
.league-pos,
.cup-pos,
.curr-round {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #d3d3d3;
  color: #3c474d;
  font-size: 0.875rem;
  margin: 0 0 2px 0;
  font-weight: bold;
  padding: 5px 10px 5px 10px;
  span:last-child {
    text-align: right;
  }
}
.info-stat:nth-child(7) {
  border-bottom: 2px solid #3a454b;
  margin: 0px;
}
.total-pts {
  border-top: 2px solid #3a454b;
  margin: 5px 0 2px 0;
}
.curr-round {
  margin: 0px;
  border-bottom: 2px solid #3a454b;
}
.cup-pos-value {
  width: 20%;
}
.cup-pos-value a {
  display: inline-block;
  text-align: end;
  width: 100%;
  color: #3c474d;
}
.cup-pos-value a:hover > img {
  background-color: #3c474d;
}
.cup-pos-value img {
  width: 20px;
}
</style>
