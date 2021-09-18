<template>
  <div class="preparation sha">
    <div class="prep-header up">
      <h2>Next round preparation</h2>
    </div>
    <div class="deadline up">
      <span>Deadline for round {{ currentRound + 1 }}</span>
    </div>
    <div v-if="getRound.from_date && getRound.to_date" class="countdown-cont">
      <img src="@/assets/images/user-page/swords.png" alt="countdown-img" />
      <Timer
        :starttime="getRound.from_date"
        :endtime="getRound.to_date"
      ></Timer>
    </div>
    <div class="captain-selected" v-if="isThisLoggedTeam">
      <h2>Next Round Captains:</h2>
      <h2>Captain: Del Piero</h2>
      <h2>Vice Captain: Del Piero</h2>
      <h2>Super Captain: Not Active</h2>
    </div>
{{captainsError}}
    <!---------------- CAPTAIN SELECTION -------------------------------------->
    {{ nextRound }}
    <form class="captain-select" v-if="isThisLoggedTeam">
      <div class="form-up">
        <img
          v-if="!nextRound.superCpt"
          src="@/assets/images/user-page/cpt.png"
          alt="captain-img"
          id="cpt-image"
        />
        <img
          v-else
          src="@/assets/images/user-page/cpt1.png"
          alt="captain-img"
          id="cpt-image"
        />

        <v-select
          label="Choose your Captain!"
          class="cpt-field"
          attach=".cpt-field"
          v-model="nextRound.cpt"
          :items="teamDropdownData"
          chips
          :menu-props="{ bottom: true, offsetY: true }"
          :rules="[validation.areCaptainsTheSame]"
        >
        </v-select>

        <v-select
          label="Choose your Vice Captain!"
          class="vice-cpt-field"
          attach=".vice-cpt-field"
          v-model="nextRound.viceCpt"
          :items="teamDropdownData"
          chips
          :menu-props="{ bottom: true, offsetY: true }"
          :rules="[validation.areCaptainsTheSame]"
          ref="viceCaptainSelect"
        >
        </v-select>
      </div>
      <div class="form-down">
        <div v-if="isSuperCptAvailable">
          <v-checkbox
            v-model="nextRound.superCpt"
            label="SUPER CAPTAIN"
          ></v-checkbox>
        </div>
        <div v-else>
          <label class="up">SUPER CAPTAIN<br />TAKEN</label>
        </div>

        <v-btn
          :disabled="captainsError"
          color="#59A95D"
          class="white--text"
          @click.prevent="captainHandler"
        >
          Select Captains
          <v-icon right dark> fas fa-paper-plane </v-icon>
        </v-btn>
      </div>
    </form>
    <!---------------- CAPTAIN SELECTION END -------------------------------------->

    <!-- <div v-if="!isThisLoggedTeam && !isAdminLogged" class="please-login">
      <img src="@/assets/images/user-page/sad-face.png" alt />
      <h2>You should be the coach of {{ owner }} <br />to view this panel!</h2>
    </div> -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
const Timer = () => import("./Timer.vue");
// const Timer = () => import("./Timer");
// import deadline from "../../utils/deadlineHelper";
// import { mapActions } from "vuex";
// import { DATA_URL } from "../../common";
// import isItFirstHalfSeason from "../../utils/isItFirstHalfSeason";
export default {
  name: "MatchPrep",
  components: { Timer },
  props: {
    isThisLoggedTeam: {
      type: Boolean,
      required: true,
    },
    roundPlayersArray: {
      type: Array,
      required: true,
    },
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
      nextRound: {
        cpt: "",
        viceCpt: "",
        superCpt: false,
      },
      cptError: false,
      validation: {
        required: (v) => !!v || "Required",
        areCaptainsTheSame: () => {
          return (
            !this.captainsError ||
            "Captain and Vice Captains cannot be the same!"
          );
        },
      },
    };
  },
  computed: {
    ...mapGetters("rounds", ["getRound"]),
    teamDropdownData() {
      return this.roundPlayersArray.map(
        ({ position, player: { name, id } }) => {
          return {
            text: `${this.prettyPosition(position)}: ${name}`,
            value: id,
          };
        }
      );
    },
    captainsError() {
      const isNothingChosen =
        this.nextRound.cpt.length === 0 && this.nextRound.viceCpt.length === 0;
      const areCaptainsSame = this.nextRound.viceCpt === this.nextRound.cpt;

      return areCaptainsSame && !isNothingChosen;
    },
    // userRoundStats() {
    //   if (this.user && this.currentRound) {
    //     let result = this.user.rounds[`r${this.currentRound}`].nextRndInfo;
    //     if (!result.team) {
    //       result.team = this.user.rounds[`r${this.currentRound}`].team;
    //     }
    //     return result;
    //   } else {
    //     return undefined;
    //   }
    // },
    isSuperCptAvailable() {
      return true;
    },
  },
  methods: {
    // ...mapActions(["fetchUsers"]),
    // addSuperCpt() {
    //   return (this.superCpt = !this.superCpt);
    // },
    mergeCaptains(_old, _new) {
      let result = {};
      Object.keys(_old).forEach((atttr) => {
        if (_new[atttr]) {
          result[atttr] = _new[atttr];
        } else {
          result[atttr] = _old[atttr];
        }
        result["superCpt"] = _new["superCpt"];
      });
      return result;
    },
    prettyPosition(value) {
      return value.length === 2
        ? value.toUpperCase()
        : value.substring(0, 2).toUpperCase();
    },
    captainHandler() {
      const merged = this.mergeCaptains(this.userRoundStats, this.nextRound);
      // console.log(merged);
      this.updateSuperCptArray(this.user, this.currentRound);
      if (merged.cpt !== merged.viceCpt) {
        return this.$vs.dialog({
          color: "success",
          title: "Confirm Captains",
          text: this.showSuccessMsg(merged),
          accept: () => this.fetchCaptains(merged),
        });
      } else {
        return this.$vs.dialog({
          color: "danger",
          title: "Please change Captain and ViceCaptain!",
          text: "Captain and Vice Captain cannot be the same player!",
        });
      }
    },
    // showSuccessMsg({ cpt, viceCpt, superCpt }) {
    //   return `Are you sure you want to update next round team:
    //          Captain: ${cpt ? this.players[cpt].name : "not selected"},
    //          Vice Captain: ${
    //            viceCpt ? this.players[viceCpt].name : "not selected"
    //          },
    //          Super Captain: ${superCpt ? "activated:" : "not activated"}?`;
    // },
    // updateSuperCptArray(user, round) {
    //   const arrayNumber = isItFirstHalfSeason(round) ? 1 : 2;
    //   let superCptArr = user.superCpt;
    //   superCptArr[arrayNumber] = this.nextRound.superCpt;
    //   const payload = {
    //     superCpt: superCptArr,
    //   };
    //   return fetch(`${DATA_URL}users/${user.uid}/.json`, {
    //     method: "PATCH",
    //     mode: "cors",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(payload),
    //   })
    //     .then((response) => response.json())
    //     .then(async () => {
    //       console.log("Success:");
    //     })
    //     .catch((error) => {
    //       console.error("Error:", error);
    //       this.error = true;
    //       this.errorMsg = error;
    //     });
    // },
    // fetchCaptains(payload) {
    //   const { uid } = this.user;
    //   const round = this.currentRound;
    //   if (payload.superCpt) {
    //     this.updateSuperCptArray(this.user, round);
    //   }
    //   return fetch(
    //     `${DATA_URL}users/${uid}/rounds/r${round}/nextRndInfo.json`,
    //     {
    //       method: "PATCH",
    //       mode: "cors",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify(payload),
    //     }
    //   )
    //     .then((response) => response.json())
    //     .then(async () => {
    //       console.log("Success:");
    //       this.$vs.loading();
    //       await this.fetchUsers();
    //       this.$vs.loading.close();
    //     })
    //     .catch((error) => {
    //       console.error("Error:", error);
    //       this.error = true;
    //       this.errorMsg = error;
    //     });
    // },
  },
  watch: {
    // "nextRound.cpt": function (nv) {
    //   if (nv === this.nextRound.viceCpt) {
    //     this.cptError = true;
    //   }
    // },
    // "nextRound.viceCpt": function (nv) {
    //   if (nv === this.nextRound.cpt) {
    //     this.cptError = true;
    //   }
    // },
  },
  async created() {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../../common/breakpoints.scss";
/********************************************************
***************   MATCH PREPARATION   ******************/
// .con-vs-alert-primary {
//   width: 98%;
//   margin: 10px;
//   background-color: #e5000059;
//   color: white;
//   .con-vs-alert-primary .con-x {
//     background-color: #3b454b;
//     color: #fff;
//   }
// }
.preparation {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin: 20px 0 0 0;
  .please-login {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    h2 {
      width: 100%;
      font-size: 1.4rem;
      border-top: 1px solid #3c474d;
      padding: 20px;
      text-align: center;
    }
    img {
      width: 30%;
      margin: 0 0 20px 0;
    }
  }
}
.prep-header {
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #3c474d;
  color: #f1f0f1;
  font-size: 1.125rem;
}
.deadline {
  width: 100%;
  height: 35px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #9fa5a9;
  color: #3c474d;
  font-weight: bold;
  font-size: 1.125rem;
}
.countdown-cont {
  width: 100%;
  height: 65px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #8a4e50;
  color: #3c474d;
  font-size: 1.25rem;
  padding: 0px 0px 0 20px;
  position: relative;
  img {
    width: 45px;
  }
  span {
    color: #d3d3d3;
    width: 350px;
  }
}
.captain-selected {
  margin: 2px 0;
  width: 100%;
  background-color: #184d18;
  color: lightgrey;
  h2 {
    // margin: 20px 10px;
    padding: 10px 0 10px 0;
    text-align: center;
    font-size: 1.1rem;
    line-height: normal;
    &:first-child {
      background-color: #3d7f33;
    }
    &:nth-child(2) {
      border-bottom: 2px solid #3d7f33;
    }
    &:nth-child(3) {
      border-bottom: 2px solid #3d7f33;
    }
  }
}
/*******************************************
************   FORM   *********************/
.captain-select {
  width: 100%;
  // height: 90px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  background-color: #d3d3d3;
  padding: 10px 20px 0 66px;
  margin: 0 0 0 0;
  position: relative;
  @media #{$mobile} {
    padding: 10px 20px 0 60px;
  }
  .form-up {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    .select {
      width: 100%;
      display: flex;
      flex-direction: column;
      font-size: 0.8rem;
      text-transform: uppercase;
      margin: 20px 0 0 0;
      select {
        padding: 5px;
        border-radius: 5px;
        font-size: 1rem;
        option {
          padding: 2px;
        }
      }
    }
    img {
      position: absolute;
      left: 10px;
      width: 36px;
    }
    .cpt-field {
      margin: 10px 0 0 0;
    }
  }
  .form-down {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 20px 0 20px 0;
    width: 100%;
    input {
      margin: 0 5px 0 0;
    }
  }
}
// .captain-select > div {
//   width: 100%;
//   height: 50%;
//   display: flex;
//   flex-direction: row;
//   // justify-content: flex-start;
//   align-items: center;
// }
// .captain-select > div:first-child {
//   margin: 16px 0 0 0;
// }
// .captain-select img {
//   position: absolute;
//   left: 10px;
//   width: 36px;
// }
// .captain-select select {
//   width: 100%;
//   height: 30px;
//   background-color: #c6c6c6;
//   font-size: 0.9rem;
//   text-transform: uppercase;
//   padding: 5px 0 5px 5px;
//   border: none;
// }
// input.check {
//   transform: scale(1.5);
// }
// .captain-select label {
//   font-size: 0.875rem;
//   margin: 0 0 0 5px;
// }
// .user-email {
//   width: 100%;
//   height: 50%;
//   display: flex;
//   flex-direction: row;
//   justify-content: flex-start;
//   align-items: center;
//   padding: 0 0 0 66px;
// }
// .user-email input {
//   margin: 15px 0 20px 0;
//   width: 90%;
//   height: 30px;
//   color: #3c474d;
//   background-color: #c6c6c6;
//   border: none;
//   font-size: 1rem;
//   line-height: 24px;
//   padding: 0 0 0 10px;
// }
// .row2 {
//   width: 100%;
//   margin: 2px 0 0 0;
//   background-color: #d3d3d3;
//   position: relative;
// }
// .transfers {
//   width: 100%;
//   display: flex;
//   flex-direction: column;
//   justify-content: flex-start;
//   padding: 16px 0 0 66px;
//   background-color: #d3d3d3;
// }
// .transfers span {
//   color: #3c474d;
//   font-size: 1rem;
// }
// .transfers textarea {
//   width: 90%;
//   height: 30px;
//   color: #3c474d;
//   background-color: #c6c6c6;
//   border: none;
//   font-size: 0.85rem;
//   line-height: 24px;
//   padding: 0 0 0 10px;
//   resize: none;
//   font-weight: bold;
//   margin: 5px 0;
// }
// .textarea-div1 textarea {
//   border-bottom: 2px solid #5b745b;
//   /* margin:15px 0 0 0; */
// }
// .textarea-div2 textarea {
//   border-bottom: 2px solid #8a4e50;
// }
// .textarea-div1 {
//   width: 100%;
//   position: relative;
//   margin: 20px 0 20px 0;
// }
// .textarea-div2 {
//   width: 100%;
//   position: relative;
//   margin: 20px 0 20px 0;
// }
// .textarea-div1::before {
//   position: absolute;
//   content: "";
//   left: -12%;
//   top: 13px;
//   width: 40px;
//   height: 17px;
//   border-bottom: 15px solid #5b745b;
//   border-top: 0px solid transparent;
//   border-left: 20px solid transparent;
//   border-right: 20px solid transparent;
// }
// .textarea-div2::before {
//   position: absolute;
//   content: "";
//   left: -12%;
//   top: 13px;
//   width: 40px;
//   height: 17px;
//   border-top: 15px solid #8e5e60;
//   border-bottom: 0px solid transparent;
//   border-left: 20px solid transparent;
//   border-right: 20px solid transparent;
// }
// .row3 {
//   width: 100%;
//   height: 65px;
//   margin: 2px 0 0 0;
//   background-color: #d3d3d3;
// }
// .row3 > div {
//   display: flex;
//   flex-direction: row;
//   justify-content: space-between;
//   align-items: center;
//   width: 91%;
//   height: 65px;
//   padding: 0 0 0 66px;
//   font-size: 0.75rem;
//   background-color: #d3d3d3;
//   color: #3c474d;
// }
// .row3 input {
//   transform: scale(1.5);
// }
// .row3 label {
//   font-size: 0.875rem;
//   margin: 0 0 0 5px;
// }
// .row3 > div > div {
//   display: flex;
//   flex-direction: row;
//   justify-content: flex-start;
//   align-items: center;
//   font-size: 0.875rem;
// }
// .row3 button {
//   -webkit-border-radius: 0;
//   -moz-border-radius: 0;
//   border-radius: 0px;
//   color: #d3d3d3;
//   background: #3c474d;
//   padding: 0px 0 0 10px;
//   border: none;
//   text-decoration: none;
//   font-size: 1rem;
//   width: 120px;
//   height: 35px;
//   line-height: 35px;
//   transition: all 0.3s;
//   -moz-box-shadow: inset 0px 0px 0px 0px #3c474d;
//   -webkit-box-shadow: inset 0px 0px 0px 0px #3c474d;
//   box-shadow: inset 0px 0px 0px 0px #3c474d;
//   display: flex;
//   flex-direction: row;
//   justify-content: space-between;
//   align-items: center;
// }
// .row3 button:hover {
//   -moz-box-shadow: inset 0px -2px 0px 0px #3c474d;
//   -webkit-box-shadow: inset 0px -2px 0px 0px #3c474d;
//   box-shadow: inset 0px -2px 0px 0px #3c474d;
//   background-color: #c6c6c6;
//   color: #3c474d;
//   cursor: pointer;
// }
// .row3 button div {
//   height: 35px;
//   width: 35%;
//   background-color: #4d5a61;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
// }
// .row3 button img {
//   height: 22px;
// }
// .row3 button:hover > div {
//   -moz-box-shadow: inset 0px -2px 0px 0px #3c474d;
//   -webkit-box-shadow: inset 0px -2px 0px 0px #3c474d;
//   box-shadow: inset 0px -2px 0px 0px #3c474d;
//   background-color: #9fa5a9;
//   color: #3c474d;
// }
// .please-login {
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   padding: 20px;
//   h2 {
//     width: 100%;
//     font-size: 1.4rem;
//     border-top: 1px solid #3c474d;
//     padding: 20px;
//     text-align: center;
//   }
//   img {
//     width: 30%;
//     margin: 0 0 20px 0;
//   }
// }
// .form-down {
//   justify-content: space-between;
//   margin: 20px 0 0 0;
//   .button {
//     padding: 10px 20px;
//     background-color: #3c474d;
//     color: lightgrey;
//     font-size: 1rem;
//     font-family: "Montserrat", sans-serif;
//     text-transform: uppercase;
//     border: none;
//     border-radius: 7px;
//     transition: all 0.3s;
//     &:hover {
//       background-color: #b8b8b8;
//       color: #3c474d;
//       cursor: pointer;
//       font-weight: bold;
//       box-shadow: 3px 3px 10px -5px rgba(0, 0, 0, 0.43);
//     }
//   }
// }
</style>
