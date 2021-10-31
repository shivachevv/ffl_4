<template>
  <div class="slider-container" v-if="bestTeamReady">
    <h2>FFL BEST TEAM FOR ROUND {{ currentRound - 1 }}</h2>
    <carousel
      :navigationEnabled="true"
      :perPage="isMobile ? 3 : 8"
      :paginationSize="10"
      :paginationPadding="10"
    >
      <slide>
        <BestTeamPlayer
          :currentRound="currentRound"
          :player="bestTeamReady.GK"
        />
      </slide>
      <slide>
        <BestTeamPlayer
          :currentRound="currentRound"
          :player="bestTeamReady.DL"
        />
      </slide>
      <slide>
        <BestTeamPlayer
          :currentRound="currentRound"
          :player="bestTeamReady.DC"
        />
      </slide>
      <slide>
        <BestTeamPlayer
          :currentRound="currentRound"
          :player="bestTeamReady.DR"
        />
      </slide>
      <slide>
        <BestTeamPlayer
          :currentRound="currentRound"
          :player="bestTeamReady.ML"
        />
      </slide>
      <slide>
        <BestTeamPlayer
          :currentRound="currentRound"
          :player="bestTeamReady.MC"
        />
      </slide>
      <slide>
        <BestTeamPlayer
          :currentRound="currentRound"
          :player="bestTeamReady.MR"
        />
      </slide>
      <slide>
        <BestTeamPlayer
          :currentRound="currentRound"
          :player="bestTeamReady.ST"
        />
      </slide>
    </carousel>
  </div>
</template>
<script>
// import slider components
import { Carousel, Slide } from "vue-carousel";
// import BestTeamPlayer from "./BestTeamPlayer";
const BestTeamPlayer = () => import("./BestTeamPlayer");

export default {
  name: "BestTeam",
  components: {
    Carousel,
    Slide,
    BestTeamPlayer
  },
  props: {
    players: {
      type: Object,
      required: true
    },
    users: {
      type: Object,
      required: true
    },
    currentRound: {
      type: Number,
      required: true
    }
  },
  data() {
    return {};
  },
  computed: {
    isMobile() {
      const screen = window.innerWidth;
      return screen < 501;
    },
    bestTeamReady() {
      const players = Object.keys(this.players)
      let result = {};
      players.forEach(id => {
        const player = this.players[id];
        const lastRnd = player.points[`r${this.currentRound - 1}`].roundPts;
        const owned = !!this.isOwned(id);
        if (owned) {
          if (result[player.position]) {
            if (
              result[player.position].points[`r${this.currentRound - 1}`]
                .roundPts < lastRnd
            ) {
              result[player.position] = player;
              result[player.position].userTeams = this.userOwnedCheck(id);
            }
          } else {
            result[player.position] = player;
            result[player.position].userTeams = this.userOwnedCheck(id);
          }
        }
      });

      return result;
    }
  },
  methods: {
    isOwned(id) {
      return Object.values(this.users).filter(x => {
        const team = Object.values(x.rounds[`r${this.currentRound - 1}`].team);
        if (team.includes(id)) {
          return x;
        }
      }).length;
    },
    userOwnedCheck(id) {
      const simplifyTeams = teams => {
        const half = teams.length / 2;
        let result = {
          one: "",
          two: ""
        };
        teams.forEach((x, i) => {
          if (x && i < half) {
            result.one = x;
          }
          if (x && i >= half) {
            result.two = x;
          }
        });
        return Object.values(result)
      };
      const userTeams = Object.values(this.users)
        .sort((a, b) => {
          if (a.league && b.league) {
            return a.league.localeCompare(b.league);
          }
        })
        // .filter(x => {
        //   const team = Object.values(
        //     x.rounds[`r${this.currentRound - 1}`].team
        //   );
        //   if (team.includes(id)) {
        //     return x;
        //   }
        // })
        .filter(x => {
          if (x.league) {
            return x;
          }
        })
        .map(x => {
          const team = Object.values(
            x.rounds[`r${this.currentRound - 1}`].team
          );
          if (team.includes(id)) {
            return x.userTeam;
          } else {
            return "";
          }
        });

      const simplifiedTeams = simplifyTeams(userTeams);

      return simplifiedTeams;
    },
    playerPopupHandler(p) {
      return this.$emit("playerPopupHandler", p);
    }
  }
};
</script>

<style lang="scss">
@import "../../../common/breakpoints.scss";

.slider-container {
  width: 100%;
  background-color: #5c745c;
  border-radius: 10px;
  margin: 20px 0 0 0;
  @media #{$mobile} {
    margin: 10px 0 0 0;
  }
  //   overflow: hidden;

  h2 {
    padding: 15px 0 15px 0;
    font-size: 1.2rem;
    width: 100%;
    text-align: center;
    color: white;
    font-weight: bold;
    background-color: rgb(15 53 16);
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;

    @media #{$mobile} {
      padding: 10px 0 10px 0;
    }
  }

  .VueCarousel {
    width: 100%;
    border-radius: 10px;

    .VueCarousel-navigation {
      button {
        padding: 8px 16px !important;
        font-size: 1.3rem !important;
        background-color: #4e585e4d !important;
        transition: all 0.2s !important;
        border-radius: 50px;
        margin: 0 -10px !important;
        &:hover {
          background-color: darken(#4e585e4d, 20) !important;
        }
      }

      @media #{$mobile} {
        display: none;
      }
    }
    .VueCarousel-pagination {
      .VueCarousel-dot-container {
        margin: 0px !important;
      }
    }
  }
}
</style>