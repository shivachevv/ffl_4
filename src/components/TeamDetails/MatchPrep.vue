<template>
  <div class="preparation elevation-8">
    <h2 class="prep-header up">Next round preparation</h2>
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
    <div class="additional-tournaments">
      <span class="additional-tournaments__header">
        Additional tournaments squad choice!
      </span>
      <div class="additional-tournaments__buttons">
        <v-badge
          color="error"
          icon="fas fa-exclamation"
          overlap
          left
          content=""
        >
          <v-btn
            color="#59A95D"
            class="white--text"
            @click.prevent="toggleAdditionalTournamentsPopup(true, 'cup')"
          >
            Cup Squad
            <v-icon right dark> fas fa-trophy </v-icon>
          </v-btn>
        </v-badge>
        <v-badge
          color="error"
          icon="fas fa-exclamation"
          overlap
          left
          content="Choose"
        >
          <v-btn
            color="#59A95D"
            class="white--text"
            @click.prevent="toggleAdditionalTournamentsPopup(true, 'h2h')"
          >
            H2H Squad
            <v-icon right dark> far fa-futbol </v-icon>
          </v-btn>
        </v-badge>
      </div>
    </div>
    <div class="captain-selected" v-if="isThisLoggedTeam">
      <span>Next Round Captains:</span>
      <span>Captain: Del Piero</span>
      <span>Vice Captain: Del Piero</span>
      <span>Super Captain: Not Active</span>
    </div>
    <!---------------- CAPTAIN SELECTION -------------------------------------->
    <form class="captain-select" v-if="isThisLoggedTeam">
      <v-select
        :label="`Choose your ${nextRound.superCpt ? 'SUPER' : ''} Captain!`"
        class="captain-select__cpt"
        attach=".captain-select__cpt"
        v-model="nextRound.cpt"
        :items="teamDropdownData"
        chips
        :menu-props="{ bottom: true, offsetY: true }"
        :rules="[validation.areCaptainsTheSame]"
      >
      </v-select>

      <v-select
        label="Choose your Vice Captain!"
        class="captain-select__vice-cpt"
        attach=".captain-select__vice-cpt"
        v-model="nextRound.viceCpt"
        :items="teamDropdownData"
        chips
        :menu-props="{ bottom: true, offsetY: true }"
        :rules="[validation.areCaptainsTheSame]"
        ref="viceCaptainSelect"
      >
      </v-select>
      <div class="captain-select__bottom">
        <div v-if="isSuperCptAvailable">
          <v-checkbox
            v-model="nextRound.superCpt"
            label="SUPER CAPTAIN"
          ></v-checkbox>
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

    <div v-if="!isThisLoggedTeam" class="please-login">
      <img src="@/assets/images/user-page/sad-face.png" alt />
      <h2>You should be the coach to view this panel!</h2>
    </div>
    <SquadChoiceModal
      :model="additionalTournamentsPopup"
      @close-modal="toggleAdditionalTournamentsPopup(false)"
      :squad="roundPlayersArray"
      :isCup="additionalTournamentsType === 'cup'"
      :isH2h="additionalTournamentsType === 'h2h'"
    ></SquadChoiceModal>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
const Timer = () => import("./Timer.vue");
const SquadChoiceModal = () => import("../common/Modal/SquadChoiceModal/SquadChoiceModal.vue");
// import { mapActions } from "vuex";
export default {
  name: "MatchPrep",
  components: { Timer, SquadChoiceModal },
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
      // value: null,
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
      additionalTournamentsPopup: false,
      additionalTournamentsType: "",
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
    cupSquadHandler(event) {
      console.log(event);
    },
    h2hSquadHandler(event) {
      console.log(event);
    },
    toggleAdditionalTournamentsPopup(state, type) {
      this.additionalTournamentsPopup = state;
      this.additionalTournamentsType = type;
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
  margin: 5px 0 0 0;
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
.additional-tournaments {
  width: 100%;
  margin: 2px 0 0 0;
  background-color: #184d18;

  .additional-tournaments__header {
    width: 100%;
    display: inline-block;
    background-color: #3d7f33;
    text-align: center;
    color: white;
    padding: 10px 0;
  }
  .additional-tournaments__buttons {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding: 15px 5px;
  }
}
.captain-selected {
  margin: 2px 0;
  width: 100%;
  background-color: #184d18;
  color: white;
  span {
    width: 100%;
    display: block;
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  background-color: #d3d3d3;
  padding: 10px;
  margin: 0 0 0 0;
  position: relative;
  @media #{$mobile} {
    padding: 10px 20px 0 60px;
  }
  .captain-select__cpt,
  .captain-select__vice-cpt {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
  }
  .captain-select__bottom {
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

::v-deep .v-btn--active {
  background-color: #184d18 !important;
  span {
    color: #d3d3d3;
  }
  i {
    margin: 0 0 5px 0;
  }
}
</style>
