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
      <span class="header"> Additional tournaments squad choice! </span>
      <div class="additional-tournaments__buttons">
        <v-badge
          color="error"
          icon="fas fa-exclamation"
          overlap
          left
          content=""
          v-if="!!nextCupRoundId"
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
          v-if="!!nextH2hRoundId"
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
      <span class="header">Next Round Captains:</span>
      <span>Captain: Del Piero</span>
      <span>Vice Captain: Del Piero</span>
      <span>Super Captain: Not Active</span>
    </div>
    <!---------------- CAPTAIN SELECTION -------------------------------------->
    <v-form v-model="valid" class="captain-select" v-if="isThisLoggedTeam">
      <v-alert
        dense
        outlined
        type="error"
        v-if="sameCaptainsError"
        transition="scale-transition"
      >
        The captain and the vice captain should not be the same player!
      </v-alert>
      <v-select
        :label="`Choose your ${nextRound.superCpt ? 'SUPER' : ''} Captain!`"
        class="captain-select__cpt mt-4"
        attach=".captain-select__cpt"
        v-model="nextRound.cpt"
        :items="teamDropdownData"
        chips
        dense
        :menu-props="{ bottom: true, offsetY: true }"
        :rules="[validation.required]"
      >
      </v-select>

      <v-select
        label="Choose your Vice Captain!"
        class="captain-select__vice-cpt mt-4"
        attach=".captain-select__vice-cpt"
        v-model="nextRound.viceCpt"
        :items="teamDropdownData"
        chips
        dense
        :menu-props="{ bottom: true, offsetY: true }"
        :rules="[validation.required]"
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
          :disabled="sameCaptainsError || !valid"
          color="#59A95D"
          class="white--text"
          @click.prevent="captainHandler"
        >
          Confirm
          <v-icon right dark> fas fa-paper-plane </v-icon>
        </v-btn>
      </div>
    </v-form>
    <!---------------- CAPTAIN SELECTION END -------------------------------------->
    <div class="transfers-info">
      <span class="header">Next round transfers</span>
      <div class="transfers-info__details">
        <span class="transfers-info__transfer-count"
          >Transfers left: {{ transfersMade - 2 }}</span
        >
        <router-link :to="`/transfers/${user.id}`" tag="button">
          <v-btn
            large
            :disabled="transfersMade === 3"
            color="#59A95D"
            class="white--text"
          >
            Transfers<br />center
          </v-btn>
        </router-link>
      </div>
    </div>
    <div v-if="!isThisLoggedTeam" class="please-login">
      <img src="@/assets/images/user-page/sad-face.png" alt />
      <h2>You should be the coach to view this panel!</h2>
    </div>
    <SquadChoiceModal
      @close-modal="toggleAdditionalTournamentsPopup(false)"
      :currentRound="currentRound"
      :squad="nextRoundUserTeam"
      :isCup="additionalTournamentsType === 'cup'"
      :isH2h="additionalTournamentsType === 'h2h'"
      :isModalOpen="additionalTournamentsPopup"
      :nextH2hRoundId="nextH2hRoundId"
      :nextCupRoundId="nextCupRoundId"
    ></SquadChoiceModal>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
const Timer = () => import("./Timer.vue");
const SquadChoiceModal = () =>
  import("../common/Modal/SquadChoiceModal/SquadChoiceModal.vue");
import { squadPayload } from "../../common/entitiesClasses";
// import { mapActions } from "vuex";
export default {
  name: "MatchPrep",
  components: { Timer, SquadChoiceModal },
  props: {
    isThisLoggedTeam: {
      type: Boolean,
      required: true,
    },
    nextRoundUserTeam: {
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
    nextH2hRoundId: {
      type: Number,
    },
    nextCupRoundId: {
      type: Number,
    },
    transfersMade: {
      type: Number,
    },
  },
  data() {
    return {
      valid: false,
      nextRound: {
        cpt: "",
        viceCpt: "",
        superCpt: false,
      },
      cptError: false,
      validation: {
        required: (v) => !!v || "Required",
      },
      additionalTournamentsPopup: false,
      additionalTournamentsType: "",
    };
  },
  computed: {
    ...mapGetters("rounds", ["getRound"]),
    teamDropdownData() {
      return this.nextRoundUserTeam.map(
        ({ position, player: { name, whoscored_id } }) => {
          return {
            text: `${this.prettyPosition(position)}: ${name}`,
            value: whoscored_id,
          };
        }
      );
    },
    sameCaptainsError() {
      return (
        this.nextRound.viceCpt === this.nextRound.cpt &&
        (!!this.nextRound.viceCpt || !!this.nextRound.cpt)
      );
    },
    isSuperCptAvailable() {
      return true;
    },
  },
  methods: {
    ...mapActions("userPlayers", ["createNextRoundPlayers", "setSuperCpt"]),
    prettyPosition(value) {
      return value.length === 2
        ? value.toUpperCase()
        : value.substring(0, 2).toUpperCase();
    },
    async captainHandler() {
      const teamPlayers = this.nextRoundUserTeam.reduce(
        (acc, { player: { whoscored_id }, position }) => {
          acc[position] = whoscored_id;
          return acc;
        },
        {}
      );
      const newSquadPayload = new squadPayload({
        league_id: this.user?.league_id,
        round_id: +this.currentRound + 1,
        cpt: this.nextRound.cpt,
        vice_cpt: this.nextRound.viceCpt,
        ...teamPlayers,
      });
      const result = await this.createNextRoundPlayers(newSquadPayload);
      if (this.nextRound.superCpt) {
        await this.setSuperCpt({ round_id: +this.currentRound + 1 });
      }
      console.log(newSquadPayload, result);
      return;
    },
    toggleAdditionalTournamentsPopup(state, type) {
      this.additionalTournamentsPopup = state;
      this.additionalTournamentsType = type;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../../common/breakpoints.scss";
/********************************************************
***************   MATCH PREPARATION   ******************/

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
  span {
    background-color: #184d18;
    color: white;
    width: 100%;
    display: block;
    padding: 10px 0 10px 0;
    text-align: center;
    line-height: normal;
    border-bottom: 2px solid #3d7f33;
  }
}
.header {
  width: 100% !important;
  display: inline-block !important;
  background-color: #3d7f33 !important;
  text-align: center !important;
  color: white !important;
  padding: 10px 0 !important;
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
    margin: 10px 0 10px 0;
    width: 100%;
    input {
      margin: 0 5px 0 0;
    }
  }
}

.transfers-info {
  margin: 2px 0 0 0;
  width: 100%;
  background-color: lightgrey;

  .transfers-info__details {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 10px;

    .transfers-info__transfer-count {
      font-size: 1rem;
    }
  }
}

// ::v-deep .v-btn--active {
//   background-color: #184d18 !important;
//   span {
//     color: #d3d3d3;
//   }
//   i {
//     margin: 0 0 5px 0;
//   }
// }
</style>
