<template>
  <section class="user-team sha">
    <!-- <transition-group name="fadeDown" mode="out-in" class="transition-msg">
      <div key="transfers-msg" class="error-msg" v-if="maxTransfersOutReached">
        <h1>
          You have a maximum of {{ transfersAvail }}
          {{ transfersAvail === 1 ? "transfer" : "transfers" }} this week!
        </h1>
      </div>
      <div key="wildcard-msg" class="wildcard-msg" v-if="wildcard">
        <h1>
          Wildcard activated! Please make ALL 3 TRANSFERS TOGETHER!<br />
          Уайлдкард е активиран! НАПРАВЕТЕ ВСИЧКИТЕ 3 ТРАНСФЕРА НАВЕДНЪЖ!
        </h1>
      </div>
    </transition-group> -->

    <!------------------ USER TEAM  ----------------->
    <div class="team" v-if="roundPlayersArray">
      <!------------------ TEAMMATE  ----------------->
      <TransfersTeammate
        v-for="player in roundPlayersArray"
        :class="player.position"
        :position="player.position"
        :player="player.player"
        :isPending="player.isPending"
        :isSelected="player.isSelected"
        :isAllowed="player.isAllowed"
        :maxTransfersOutReached="maxTransfersOutReached"
        @makeTransferOut="makeTransferOut"
        @max="max($event)"
        :key="player.position"
      ></TransfersTeammate>

      <!-- WILDCARD AND TRANSFERS AVAILABLE -->
      <div class="addition transfers-avail">
        <h3 class="up">Transfers</h3>
        <span
          :class="{ smallerspan: transfersAvail === 2 || transfersAvail === 3 }"
          >{{ transfersAvail }}</span
        >
      </div>
      <div class="addition wildcard" v-if="!makeSwitchUnavail && hasWildcard">
        <h3 class="up">Wildcard</h3>
        <vs-switch class="switch" color="success" v-model="wildcard" />
      </div>
      <div class="addition wildcard" v-else>
        <h3 class="up">Wildcard<br />taken</h3>
        <!-- <vs-switch class="switch-inactive" disabled="true" color="success" /> -->
      </div>
    </div>
  </section>
</template>

<script>
const TransfersTeammate = () => import("./TransfersTeammate");

export default {
  name: "UserTransfersTeam",
  components: {
    TransfersTeammate,
  },
  props: {
    user: {
      type: Object,
      required: true,
    },
    roundPlayersArray: {
      type: Array,
      required: true,
    },
    currentRound: {
      type: Number,
      required: true,
    },
    transfersAvail: {
      type: Number,
      required: true,
    },
    transferredOut: {
      type: Array,
      required: true,
    },
    transferredIn: {
      type: Array,
      required: true,
    },
    maxTransfersOutReached: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      wildcard: "",
      reset: false,
    };
  },
  computed: {
    makeSwitchUnavail() {
      return false;
    },
    hasWildcard() {
      return false;
    },
  },
  methods: {
    makeTransferOut(player) {
      return this.$emit("makeTransferOut", player);
    },
    max(x) {
      return this.$emit("max", x);
    },
  },
  watch: {
    wildcard(nv) {
      if (!nv) {
        this.$emit("makeTransferOut", "empty");
      }
      this.reset = !nv;
      return this.$emit("wcHandler", nv);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../../common/breakpoints.scss";

/********************  USER TEAM **********************/
.user-team {
  // height: 900px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-color: #d3d3d3;
  overflow: hidden;
  @media #{$mobile} {
    width: 100%;
  }
}

/******************************************************************
  ******************      FIELD WITH PLAYERS *************************/

.team {
  width: 100%;
  height: 700px;
  background-image: url("../../assets/images/user-page/pitch1.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  margin: 20px 0 0 0;
  padding: 0 0 20px 0;
  display: grid;
  grid-column-gap: 30px;
  grid-row-gap: 10px;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(10, 1fr);
  position: relative;

  @media #{$mobile} {
    grid-column-gap: 5px;
    grid-row-gap: 5px;
    grid-template-columns: repeat(8, 1fr);
    margin: 36px 0 0 0;
  }
}

.gk,
.dl1,
.dl2,
.dc1,
.dc2,
.dr1,
.dr2,
.ml1,
.ml2,
.mc1,
.mc2,
.mr1,
.mr2,
.st1,
.st2,
.st3 {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

/************SQUAD POSITIONING ****************
*******************************************/

.gk {
  grid-row: 11 / span 2;
  grid-column: 5 / span 2;
  @media #{$mobile} {
    grid-column: 4 / span 2;
  }
}

.dl1 {
  grid-row: 7 / span 2;
  grid-column: 2 / span 2;
  @media #{$mobile} {
    grid-column: 1 / span 2;
  }
}

.dl2 {
  grid-row: 9 / span 2;
  grid-column: 2 / span 2;
  @media #{$mobile} {
    grid-column: 1 / span 2;
  }
}

.dc1 {
  grid-row: 8 / span 2;
  grid-column: 4 / span 2;
  @media #{$mobile} {
    grid-column: 3 / span 2;
  }
}

.dc2 {
  grid-row: 8 / span 2;
  grid-column: 6 / span 2;
  @media #{$mobile} {
    grid-column: 5 / span 2;
  }
}

.dr1 {
  grid-row: 7 / span 2;
  grid-column: 8 / span 2;
  @media #{$mobile} {
    grid-column: 7 / span 2;
  }
}

.dr2 {
  grid-row: 9 / span 2;
  grid-column: 8 / span 2;
  @media #{$mobile} {
    grid-column: 7 / span 2;
  }
}

.ml1 {
  grid-row: 3 / span 2;
  grid-column: 2 / span 2;
  @media #{$mobile} {
    grid-column: 1 / span 2;
  }
}

.ml2 {
  grid-row: 5 / span 2;
  grid-column: 2 / span 2;
  @media #{$mobile} {
    grid-column: 1 / span 2;
  }
}

.mc1 {
  grid-row: 4 / span 2;
  grid-column: 4 / span 2;
  @media #{$mobile} {
    grid-column: 3 / span 2;
  }
}

.mc2 {
  grid-row: 4 / span 2;
  grid-column: 6 / span 2;
  @media #{$mobile} {
    grid-column: 5 / span 2;
  }
}

.mr1 {
  grid-row: 3 / span 2;
  grid-column: 8 / span 2;
  @media #{$mobile} {
    grid-column: 7 / span 2;
  }
}

.mr2 {
  grid-row: 5 / span 2;
  grid-column: 8 / span 2;
  @media #{$mobile} {
    grid-column: 7 / span 2;
  }
}

.st1 {
  grid-row: 1 / span 2;
  grid-column: 3 / span 2;
  @media #{$mobile} {
    grid-column: 2 / span 2;
  }
}

.st2 {
  grid-row: 1 / span 2;
  grid-column: 5 / span 2;
  @media #{$mobile} {
    grid-column: 4 / span 2;
  }
}

.st3 {
  grid-row: 1 / span 2;
  grid-column: 7 / span 2;
  @media #{$mobile} {
    grid-column: 6 / span 2;
  }
}

.teammate {
  position: relative;
  cursor: pointer;
}

/************** TRANSFERS COUNT AND WILDCARD *******************/

.inactiveBtn {
  opacity: 0;
}
.transition-msg {
  width: 100%;
  .error-msg {
    width: 100%;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #793638;
    h1 {
      color: lightgrey;
      font-size: 1.2rem;
    }
  }
  .wildcard-msg {
    width: 100%;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #2e762e;
    h1 {
      color: lightgrey;
      font-size: 1.2rem;
      font-weight: bold;
      line-height: 1.5rem;
    }
  }
}
.addition {
  position: absolute;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media #{$mobile} {
    flex-direction: row;
  }

  &.transfers-avail {
    top: 0px;
    left: 10px;
    @media #{$mobile} {
      top: -31px;
    }
  }
  &.wildcard {
    top: 0px;
    right: 10px;
    @media #{$mobile} {
      top: -29px;
    }

    .switch {
      margin: 0 0 0 10px;
      &.vs-switch-success {
        background: #793638;
      }
      &.vs-switch-active {
        background: rgb(70, 201, 58);
      }
    }
    .switch-inactive {
      margin: 10px;
      &.vs-switch-success {
        background: #2e7125;
      }
    }
  }
  span {
    margin: 10px;
    padding: 5px 12px;
    border: 2px solid #184d18;
    border-radius: 50px;
    font-weight: bold;

    @media #{$mobile} {
      margin: 0 0 0 10px;
    }
  }
  span.smallerspan {
    padding: 5px 10px;
  }
  h3 {
    font-size: 1rem;
    font-weight: bold;
    color: #3c474d;
    text-align: center;
  }
}
/************  TRANSITION   *******************/

.fadeUp-enter {
  opacity: 0;
}
.fadeUp-enter-active {
  animation: slide-in 0.3s ease-in-out forwards;
  transition: opacity 0.3s;
}

.fadeUp-leave-active {
  animation: slide-out 0.3s ease-in-out forwards;
  transition: opacity 0.3s;
  opacity: 0;
}

.fadeDown-enter {
  opacity: 0;
}
.fadeDown-enter-active {
  animation: slide-in-down 0.3s ease-in-out forwards;
  transition: opacity 0.3s;
}

.fadeDown-leave-active {
  animation: slide-out-down 0.3s ease-in-out forwards;
  transition: opacity 0.3s;
  opacity: 0;
}

@keyframes slide-in {
  from {
    transform: translateY(2rem);
  }
  to {
    transform: translateY(0);
  }
}

@keyframes slide-out {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-2rem);
  }
}

@keyframes slide-in-down {
  from {
    transform: translateY(-2rem);
  }
  to {
    transform: translateY(0);
  }
}

@keyframes slide-out-down {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(2rem);
  }
}
</style>
