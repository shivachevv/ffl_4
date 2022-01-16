<template>
  <section class="standings-container" id="card" v-if="standings">
    <div class="st-header-container">
      <p class="standings-header up">
        Standings
        <span>{{ selectedLeague.name }}</span>
      </p>
    </div>
    <table class="standings-table front">
      <thead class="up">
        <tr>
          <th class="table-num"></th>
          <th>Team</th>
          <th class="up table-total">Total points</th>
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
          :to="`team-details`"
          tag="tr"
          :class="{ first: i === 0, secthi: i === 1 || i === 2, grey: i > 2 }"
          v-for="(row, i) in sortedStandings"
          :key="row.id"
        >
          <td class="table-num">{{ i + 1 }}</td>
          <td class="table-name">
            <img
              :src="
                require(`@/assets/images/team-logos/arbitragers.webp`)
              "
              :alt="`${row.teamName} just logo`"
            />
            {{ row.teamName }}
            <span>{{ `${row.firstName} ${row.lastName}` }}</span>
          </td>
          <td class="up table-total">{{ row.total }}</td>
          <td class="up table-rnd">{{ row.lastRound }}</td>
          <td class="up table-move">
            <MovementArrow :movement="row.movement" />
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
  components: {
    MovementArrow,
  },
  data() {
    return {};
  },
  props: {
    selectedLeague: {
      type: Object,
      default: () => {},
    },
    users: {
      type: Array,
      default: () => [],
    },
    standings: {
      type: Array,
      default: () => [],
    },
    currentRound: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    sortedStandings() {
      const result = [...this.standings].sort((a, b) => {
          return b.total - a.total;
      });
      return result;
    },
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
    },
  },
  watch: {},

  filters: {
    // routeFilter: function(v) {
    //   return v
    //     .toLowerCase()
    //     .split(" ")
    //     .join("-");
    // }
  },
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
  width: 60%;
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
  thead {
    tr {
      :last-child {
        padding-right: 20px !important;
      }
    }
  }
  th {
    background-color: #838a8e;
    color: #232f37;
    font-size: 1rem;
    border-bottom: 4px solid #4e585e;
    vertical-align: middle;
    text-align: start;
    padding: 2px 15px 2px 20px;
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