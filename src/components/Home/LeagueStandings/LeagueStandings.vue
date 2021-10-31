<template>
  <section class="standings-container" id="card" v-if="standings">
    <div class="st-header-container">
      <p class="standings-header up">
        Standings
        <span>{{ selectedLeagueObj.name }}</span>
      </p>
    </div>
    <table class="standings-table front">
      <thead class="up">
        <tr>
          <th class="table-num">#</th>
          <th class="up table-name">Team</th>
          <th class="up table-total">
            Total points
          </th>
          <th class="up table-rnd">
            Round
            <br />Points
          </th>
          <th class="up table-move">
            Up
            <br />down
          </th>
        </tr>
      </thead>
      <tbody>
        <router-link
          :to="`team-details/${users[t[0]].userLogo}`"
          tag="tr"
          :class="{ first: i === 0, secthi: i === 1 || i === 2, grey: i > 2 }"
          v-for="(t, i) in sortedStandings"
          :key="t[0]"
        >
          <td class="table-num">{{ i + 1 }}</td>
          <td class="up table-name">
            <img
              :src="
                require(`@/assets/images/team-logos/${
                  users[t[0]].userLogo
                }.webp`)
              "
              :alt="`${users[t[0]].userTeam} logo`"
            />
            {{ users[t[0]].userTeam }}
            <span>{{ users[t[0]].name }}</span>
          </td>
          <td class="up table-total">{{ t[1].total }}</td>
          <td class="up table-rnd">{{ t[1].thisRndTotal }}</td>
          <td class="up table-move">
            <MovementArrow :movement="t[1].movement" />
          </td>
        </router-link>
      </tbody>
    </table>
  </section>
</template>

<script>
const MovementArrow = () => import("./MovementArrow");

export default {
  name: "LeagueStandings",
  components:{
    MovementArrow
  },
  data() {
    return {};
  },
  props: {
    selectedLeagueObj: {
      type: Object,
      required: true
    },
    users: {
      type: Object,
      required: true
    },
    standings: {
      type: Object,
      required: true
    },
    currentRound: {
      type: Number,
      required: true
    }
  },
  computed: {
    sortedStandings() {
      return Object.entries(
        this.standings[this.selectedLeagueObj.id]
      ).sort((a, b) => {
        return b[1].total - a[1].total;
      });
      // return Object.entries(
      //   this.standings[`r${this.currentRound}`][this.selectedLeagueObj.id]
      // ).sort((a, b) => {
      //   return b[1].total - a[1].total;
      // });
    }
  },
  methods: {
    // ...mapActions(['fetchCurrentRound']),
    movement(v) {
      if (v < 0) {
        return `d${v * -1}`;
      } else if (v > 0) {
        return `u${v}`;
      } else {
        return "no";
      }
    }
  },
  watch: {},
  async created() {
    // await this.fetchCurrentRound()
  },
  filters: {
    // routeFilter: function(v) {
    //   return v
    //     .toLowerCase()
    //     .split(" ")
    //     .join("-");
    // }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../../../common/breakpoints.scss";

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
/****************** STANDINGS ****************/

/************** TABLE *************************/
.standings-container {
  width: 40%;
  margin: 0 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  position: relative;

  @media #{$mobile} {
    width: 100%;
    margin: 10px 0 0 0;
  }
}
.st-header-container {
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #3b464d;
  color: #e1dfe0;
  position: relative;
  margin: 0px 0 -10px 0;
}
.standings-header {
  font-size: 1.375rem;
  span {
    color: #cc3b34;
  }
}
.standings-table {
  width: 100%;
  text-align: center;
  border-collapse: separate;
  border-spacing: 0 10px;
  transition: all 0.3s;
  th {
    background-color: #838a8e;
    color: #232f37;
    font-size: 1rem;
    border-bottom: 4px solid #4e585e;
    padding: 5px;
    vertical-align: middle;
  }
  tbody {
    tr {
      cursor: pointer;
      color: #232f37;
      font-size: 0.875rem;
      transition: all 0.2s;
      -webkit-box-shadow: 5px 0px 14px -4px rgba(0, 0, 0, 0.43);
      -moz-box-shadow: 5px 0px 14px -4px rgba(0, 0, 0, 0.43);
      box-shadow: 5px 0px 14px -4px rgba(0, 0, 0, 0.43);
      &:hover {
        transform: scale(1.02);
      }
      td {
        vertical-align: middle;
        padding: 10px 10px;
        @media #{$mobile} {
          padding: 0px;
        }
        span {
          display: block;
          font-size: 0.8rem;
          text-transform: capitalize;
          margin: 2px 0 0 0;
        }
      }
    }
  }
}
.first {
  &:hover {
    background-color: #87a487;
    z-index: 999;
  }
  background-color: #6c966c7a;
  border: 2px solid #6c966c7a;
}
.grey {
  &:hover {
    background-color: #c6c6c6;
    z-index: 999;
  }
  background-color: #d3d3d3;
}
.secthi {
  &:hover {
    background-color: #6c966c7a;
    z-index: 999;
  }
  background-color: #a6c3a67a;
}
.table-name {
  text-align: left;
  position: relative;
  padding: 10px 10px 10px 40px !important;
width: 60%;
  a {
    color: #232f37;
  }
  img {
    width: 30px;
    position: absolute;
    top: 0 !important;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto 0;
  }
}
.table-total {
  text-align: center;
}
</style>