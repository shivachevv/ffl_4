<template>
  <div class="main-container">
    <div class="team-round-change">
      <div class="buttons-cont">
        <v-btn
          :disabled="isShowingFirstRnd"
          color="#3c474d"
          class="ma-2 white--text"
          @click.prevent="previousRound()"
        >
          <v-icon small left color="white">fas fa-arrow-left</v-icon>
          Previous
        </v-btn>

        <span class="round up" v-if="selectedRound"
          >Round {{ selectedRound }}</span
        >
        <v-btn
          :disabled="isShowingLastRnd"
          color="#3c474d"
          class="ma-2 white--text"
          @click.prevent="nextRound()"
        >
          Next
          <v-icon small right color="white">fas fa-arrow-right</v-icon>
        </v-btn>
      </div>
    </div>
    <div class="pitch">
      <Teammate
        v-for="[position, player] in bestTeamReady"
        :class="position"
        :key="player.id"
        :player="player"
        :position="position"
      ></Teammate>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
// const BestTeamPlayer = () => import("./BestTeamPlayer");
const Teammate = () => import("../../TeamDetails/Teammate.vue");

export default {
  name: "BestTeam",
  components: {
    // BestTeamPlayer,
    Teammate,
  },
  props: {
    currentRound: {
      type: Object,
      default: () => {},
      required: true,
    },
  },
  data() {
    return {
      selectedRound: 0,
    };
  },
  computed: {
    ...mapState("footballPlayers", ["footballPlayers"]),

    currentRoundNumber() {
      return +this.currentRound?.name || 1;
    },
    isMobile() {
      const screen = window.innerWidth;
      return screen < 501;
    },
    isShowingLastRnd() {
      return Number(this.selectedRound) === this.currentRound;
    },
    isShowingFirstRnd() {
      return Number(this.selectedRound) === 1;
    },
    bestTeamReady() {
      const playersByPosition = (this.footballPlayers || []).reduce(
        (acc, player) => {
          if (!acc[player.position]) {
            acc[player.position] = [];
          }
          acc[player.position].push(player);
          return acc;
        },
        {}
      );
      const result = Object.entries(playersByPosition).map(
        ([position, players]) => {
          const sorted = players
            .filter((player) => player.pointsround)
            .sort((a, b) => {
              return (
                +b.pointsround[0]?.round_pts - +a.pointsround[0]?.round_pts
              );
            });
          return [position, sorted[0]];
        }
      );

      return result;
    },
  },
  methods: {
    ...mapActions("footballPlayers", ["fetchAllPlayers"]),

    previousRound() {
      if (this.selectedRound > 1) this.selectedRound--;
    },
    nextRound() {
      if (this.selectedRound < this.currentRound) this.selectedRound++;
    },
  },
  async created() {
    this.selectedRound = this.currentRoundNumber;
    await this.fetchAllPlayers({
      queryParams: {
        round_id: 7,
      },
    });
  },
};
</script>

<style lang="scss" scoped>
@import "../../../common/breakpoints.scss";

.main-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pitch {
  overflow: hidden;
  border-radius: 10px;
  width: 780px;
  height: 800px;
  background-image: url("../../../assets/images/user-page/pitch1.png");
  background-repeat: "no-repeat";
  // width: 100%;
  // background-image: url(/img/pitch1.99a888dc.png);
  background-size: cover;
  // background-repeat: no-repeat;
  background-position: center center;
  margin: 20px 0 20px 0;
  padding: 10px 0 20px 0;
  display: grid;
  align-items: center;
  justify-items: center;
  grid-column-gap: 10px;
  grid-row-gap: 10px;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(4, 1fr);
  position: relative;
  background-color: #93ab90;
}

.GK {
  grid-row: 4 / span 1;
  grid-column: 2 / span 1;
  width: 60%;
  @media #{$mobile} {
    // grid-column: 4 / span 2;
  }
}
.DL {
  grid-row: 3 / span 1;
  grid-column: 1 / span 1;
  width: 60%;
  @media #{$mobile} {
    // grid-column: 4 / span 2;
  }
}
.DC {
  grid-row: 3 / span 1;
  grid-column: 2 / span 1;
  width: 60%;
  @media #{$mobile} {
    // grid-column: 4 / span 2;
  }
}
.DR {
  grid-row: 3 / span 1;
  grid-column: 3 / span 1;
  width: 60%;
  @media #{$mobile} {
    // grid-column: 4 / span 2;
  }
}
.ML {
  grid-row: 2 / span 1;
  grid-column: 1 / span 1;
  width: 60%;
  @media #{$mobile} {
    // grid-column: 4 / span 2;
  }
}
.MC {
  grid-row: 2 / span 1;
  grid-column: 2 / span 1;
  width: 60%;
  @media #{$mobile} {
    // grid-column: 4 / span 2;
  }
}
.MR {
  grid-row: 2 / span 1;
  grid-column: 3 / span 1;
  width: 60%;
  @media #{$mobile} {
    // grid-column: 4 / span 2;
  }
}
.ST {
  grid-row: 1 / span 1;
  grid-column: 2 / span 1;
  width: 60%;
  @media #{$mobile} {
    // grid-column: 4 / span 2;
  }
}

.buttons-cont {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

// .slider-container {
//   width: 100%;
//   background-color: #5c745c;
//   border-radius: 10px;
//   margin: 20px 0 0 0;
//   @media #{$mobile} {
//     margin: 10px 0 0 0;
//   }
//   //   overflow: hidden;

//   h2 {
//     padding: 15px 0 15px 0;
//     font-size: 1.2rem;
//     width: 100%;
//     text-align: center;
//     color: white;
//     font-weight: bold;
//     background-color: rgb(15 53 16);
//     border-top-left-radius: 10px;
//     border-top-right-radius: 10px;

//     @media #{$mobile} {
//       padding: 10px 0 10px 0;
//     }
//   }

//   .VueCarousel {
//     width: 100%;
//     border-radius: 10px;

//     .VueCarousel-navigation {
//       button {
//         padding: 8px 16px !important;
//         font-size: 1.3rem !important;
//         background-color: #4e585e4d !important;
//         transition: all 0.2s !important;
//         border-radius: 50px;
//         margin: 0 -10px !important;
//         &:hover {
//           background-color: darken(#4e585e4d, 20) !important;
//         }
//       }

//       @media #{$mobile} {
//         display: none;
//       }
//     }
//     .VueCarousel-pagination {
//       .VueCarousel-dot-container {
//         margin: 0px !important;
//       }
//      }
//    }
// }
</style>
