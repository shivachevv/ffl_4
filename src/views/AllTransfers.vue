<template>
  <div class="main-transfers-container">
    <!---------------- FILTERS SECTION -------------------------------------->
    <section class="filters">
      <div class="header up">
        <h2 class="up">Select a league</h2>
      </div>

      <div class="filter-by-league sha">
        <v-autocomplete
          class="user-league-select mt-2"
          :items="userLeagues"
          attach=".user-league-select"
          chips
          item-text="name"
          filled
          return-object
          solo
          dense
          v-model="filters.userLeague"
        ></v-autocomplete>
      </div>
      <ByPosition :positions.sync="filters.positions" />
      <ByRound :rounds="rounds" :selectedRounds.sync="filters.rounds" />
      <ByTeam :users="users" :selectedTeams.sync="filters.teams" />
      <ByStatus :selectedStatuses.sync="filters.statuses" />

      <div class="reset-filters">
        <v-btn
          color="error darken-4"
          class="white--text reset-filters"
          @click.prevent="clearFiltersHandler"
        >
          Clear filters
          <v-icon right dark> fas fa-times </v-icon>
        </v-btn>
      </div>
    </section>

    <!---------------- TRANSFERS -------------------------------------->
    <section class="league-transfers">
      <div class="header up">
        <h2>League {{ filters.userLeague.name }}</h2>
      </div>

      <div class="transfers-container">
        <div
          class="transfer-round sha"
          v-for="(roundTransfers, roundNumber) in sortedRounds"
          :key="roundNumber"
        >
          <div class="round-header">Round {{ roundNumber }}</div>

          <div class="round-container">
            <div class="transfers-header">
              <h3 class="header-pos up">Pos</h3>
              <h3 class="header-pos up">Status</h3>
              <h3 class="header-team up">Team</h3>
              <h3 class="header-in up">In</h3>
              <h3 class="header-in-club up">Club In</h3>
              <h3 class="header-out up">Out</h3>
              <h3 class="header-out-club up">Club Out</h3>
            </div>
            <div
              class="trans-row"
              v-for="transfer in roundTransfers"
              :key="transfer.id"
            >
              <span class="position">{{
                transfer.position | prettyPosition
              }}</span>
              <span title="Confirmed" class="status">
                <v-icon
                  v-if="transfer.status === 'approved'"
                  small
                  color="green darken-2"
                  >fas fa-check</v-icon
                >
                <v-icon
                  v-if="transfer.status === 'declined'"
                  small
                  color="red darken-2"
                  >fas fa-times</v-icon
                >
                <v-icon
                  v-if="transfer.status === 'pending'"
                  small
                  color="blue darken-2"
                  >fas fa-clock</v-icon
                >
              </span>

              <span class="team">{{ transfer.user.user_team }}</span>
              <span class="player-in">{{ transfer.to_player.name }}</span>
              <div class="player-in-club">
                <v-tooltip top v-if="transfer.to_player">
                  <template v-slot:activator="{ on, attrs }">
                    <img
                      v-bind="attrs"
                      v-on="on"
                      :src="teamImagePath(transfer.to_player)"
                      alt="club"
                    />
                  </template>
                  <span>{{ transfer.to_player.club }}</span>
                </v-tooltip>
              </div>
              <span class="player-out">{{ transfer.from_player.name }}</span>
              <div class="player-out-club">
                <v-tooltip top v-if="transfer.from_player">
                  <template v-slot:activator="{ on, attrs }">
                    <img
                      v-bind="attrs"
                      v-on="on"
                      :src="teamImagePath(transfer.from_player)"
                      alt="club"
                    />
                  </template>
                  <span>{{ transfer.from_player.club }}</span>
                </v-tooltip>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
const ByPosition = () =>
  import("../components/AllTransfers/Filters/ByPosition.vue");
const ByRound = () => import("../components/AllTransfers/Filters/ByRound");
const ByTeam = () => import("../components/AllTransfers/Filters/ByTeam");
const ByStatus = () => import("../components/AllTransfers/Filters/ByStatus");

export default {
  name: "Transfers",
  components: {
    ByPosition,
    ByRound,
    ByTeam,
    ByStatus,
  },
  props: {},
  data() {
    return {
      filters: {
        userLeague: {},
        positions: [],
        rounds: [],
        teams: [],
        statuses: [],
      },
      clearFilters: false,
    };
  },
  computed: {
    ...mapState("user", ["loggedUser"]),
    ...mapState("transfers", ["transfers"]),
    ...mapState("userLeagues", ["userLeagues"]),
    sortedRounds() {
      const filteredTransfers = this.applyFilters(this.transfers);
      return filteredTransfers.reduce((acc, transfer) => {
        if (!acc[transfer.round_id]) {
          acc[transfer.round_id] = [];
        }
        acc[transfer.round_id].push(transfer);
        return acc;
      }, {});
    },
    rounds() {
      return [
        ...new Set(
          (this.transfers || [])
            .map(({ round_id }) => round_id)
            .sort((a, b) => +a > +b)
        ),
      ];
    },
    users() {
      return (this.userLeagues || []).reduce((acc, league) => {
        const users = league.users.map((user) => ({
          ...user,
          group: league.name,
        }));
        const groupHeader = {
          header: league.name,
        };
        acc = [...acc, groupHeader, ...users];
        return acc;
      }, []);
    },
  },
  methods: {
    ...mapActions("user", ["fetchLoggedUser"]),
    ...mapActions("transfers", ["fetchTransfers"]),
    ...mapActions("userLeagues", ["fetchUserLeagues"]),
    getLoggedUserLeague() {
      return this.userLeagues.find(
        (league) => +league?.id === +this.loggedUser?.league_id
      );
    },
    applyFilters(transfers) {
      return (transfers || [])
        .filter(
          (transfer) =>
            +transfer?.user?.league_id === +this.filters?.userLeague?.id
        )
        .filter((transfer) => {
          if (!this.filters.positions.length) {
            return true;
          }
          return !!this.filters.positions.find((position) =>
            transfer.position.toLowerCase().includes(position.toLowerCase())
          );
        })
        .filter((transfer) => {
          if (!this.filters.rounds.length) {
            return true;
          }
          return !!this.filters.rounds.find(
            (round) => +round === +transfer.round_id
          );
        })
        .filter((transfer) => {
          if (!this.filters.teams.length) {
            return true;
          }
          return !!this.filters.teams.find(
            (teamId) => +teamId === +transfer.user_id
          );
        })
        .filter((transfer) => {
          if (!this.filters.statuses.length) {
            return true;
          }
          return !!this.filters.statuses.find(
            (status) => status === transfer.status
          );
        });
    },
    teamImagePath(player) {
      return player.league
        ? `https://ff-legends.com/team-logos/${player.league
            .toLowerCase()
            .split(" ")
            .join("-")}/${player.club.toLowerCase().split(" ").join("-")}.png`
        : "";
    },
    clearFiltersHandler() {
      this.filters = {
        ...this.filters,
        positions: [],
        rounds: [],
        statuses: [],
        teams: [],
      };
    },
  },
  async created() {
    await this.fetchLoggedUser();
    await this.fetchTransfers();
    await this.fetchUserLeagues();
    this.filters.userLeague = this.getLoggedUserLeague();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../common/breakpoints.scss";

.vs-collapse {
  width: 100%;
  &.vs-collapse-item--header {
    background-color: #a3a3a3 !important;
    box-shadow: 5px 5px 21px -5px rgba(0, 0, 0, 0.43) !important;
  }
  @media #{$mobile} {
    padding: 0px;
  }
}

header {
  background-color: #a3a3a3 !important;
  box-shadow: 5px 5px 21px -5px rgba(0, 0, 0, 0.43) !important;
}

.main-transfers-container {
  width: 90%;
  background: none;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  @media #{$mobile} {
    width: 98%;
    flex-direction: column;
  }
}

/******************** FILTERS SECTION **********************/

.filters {
  width: 21%;
  padding: 20px 0 0 0;
  @media #{$mobile} {
    width: 100%;
    flex-direction: column;
  }
}

.filter-by-league {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: #d3d3d3;

  .user-league-select {
    width: 100%;
  }
}

.header {
  // margin: 20px 0 0 0;
  width: 100%;
  height: 40px;
  background-color: #3b464d;
  color: #d3d3d3;
  border-bottom: 4px solid #893e40;
}

.header h2 {
  text-align: center;
  width: 100%;
  height: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
}

.filter-header {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}

.filter-header img {
  width: 24px;
  margin: 10px;
}

.filter-header h3 {
  height: 24px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  border-bottom: 1px solid #893e40;
  margin: 0 3% 0 0;
  font-size: 0.875rem;
}

select::-ms-expand {
  display: none;
  /* remove default arrow in IE 10 and 11 */
}

/* target Internet Explorer 9 to undo the custom arrow */
@media screen and (min-width: 0\0) {
  select {
    background: none\9;
    padding: 5px\9;
  }
}

.by-pos-select {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  /* Permalink - use to edit and share this gradient: https://colorzilla.com/gradient-editor/#c9c9c9+0,9fa6ad+50,c9c9c9+100 */
  background: rgb(201, 201, 201);
  /* Old browsers */
  background: -moz-linear-gradient(
    top,
    rgba(201, 201, 201, 1) 0%,
    rgb(172, 177, 181) 50%,
    rgba(201, 201, 201, 1) 100%
  );
  /* FF3.6-15 */
  background: -webkit-linear-gradient(
    top,
    rgba(201, 201, 201, 1) 0%,
    rgb(172, 177, 181) 50%,
    rgba(201, 201, 201, 1) 100%
  );
  /* Chrome10-25,Safari5.1-6 */
  background: linear-gradient(
    to bottom,
    rgba(201, 201, 201, 1) 0%,
    rgb(172, 177, 181) 50%,
    rgba(201, 201, 201, 1) 100%
  );
  /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#c9c9c9', endColorstr='#c9c9c9', GradientType=0);
  /* IE6-9 */
  font-size: 0.75rem;
  margin: 10px 0 0 0;
}

.row-1,
.row-2,
.row-3,
.row-4 {
  width: 90%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  /* margin: 10px; */
  padding: 10px;
  z-index: 1;
}

.row-1 {
  border-bottom: 1px solid #3b464d;
}

.row-3 {
  border-top: 1px solid #3b464d;
  border-bottom: 1px solid #3b464d;
}

.pos-check {
  display: none;
}

.pos-check-label {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  background-color: #3b464d;
  color: lightgrey;
  /* padding: 12px 10px; */
  border-radius: 100%;
  text-align: center;
  position: relative;
}

.pos-check-label::after {
  position: absolute;
  top: auto;
  left: auto;
  content: "";
  width: 140%;
  height: 140%;
  max-width: 0%;
  max-height: 0%;
  background-color: #3b464d4f;
  z-index: -1;
  border-radius: 50%;
  transition: all 0.2s;
}

.pos-check-label:hover::after {
  max-width: 140%;
  max-height: 140%;
}

.filter-by-name {
  margin: 20px 0 0 0;
  padding: 0 10px 10px 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: #d3d3d3;
}

.filter-by-name input {
  padding: 0 0 0 10px;
  width: 94%;
  margin: 10px;
  background-color: #c6c6c6;
  height: 30px;
  color: #3b464d;
  padding: 0 0 0 10px;
  width: 94%;
  margin: 10px;
  background-color: #c6c6c6;
  height: 30px;
  color: #3b464d;
  border-bottom: 2px solid #893e40;
  border-top: none;
  border-left: none;
  border-right: none;
  font-size: 0.875rem;
}

.reset-filters {
  text-align: right;

  .reset-filters-button {
    width: 50%;
    padding: 10px 5px;
    background-color: #893e40;
    color: lightgrey;
    border: none;
    font-size: 0.875rem;
    position: relative;
    transition: all 0.3s;

    &:hover {
      background-color: #aa5a5d;
      color: lightgrey;
      padding: 10px 0 10px 30px;
      cursor: pointer;
    }
    &::before {
      content: "";
      position: absolute;
      top: 8px;
      left: 20px;
      width: 2px;
      height: 20px;
      background-color: lightgrey;
      display: none;
    }
    &::after {
      content: "";
      position: absolute;
      top: 17px;
      left: 11px;
      width: 20px;
      height: 2px;
      background-color: lightgrey;
      display: none;
    }
    &:hover::before {
      display: inline-block;
      transform: rotate(-45deg);
    }

    &:hover::after {
      display: inline-block;
      transform: rotate(-45deg);
    }
  }
}

/***********************************************************
  ******************* TRANSFERS PELE SECTION ***************/

.league-transfers {
  margin: 20px 0 0 0;
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-content: center;

  @media #{$mobile} {
    width: 100%;
    margin: 20px 0 0 0;
  }

  .header {
    position: relative;
    @media #{$mobile} {
      width: 100%;
      margin: 0px;
    }

    img {
      position: absolute;
      top: 2px;
      left: 5px;
      width: 28px;
    }
  }
}

.transfers-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  /* height: fit-content; */
  /* background-color: #a0a5a9; */
  color: #3b464d;
  font-size: 0.75rem;
  font-weight: bold;

  .transfer-round {
    width: 100%;
    margin: 15px 0 0 0;
    border-radius: 5px;
    overflow: hidden;

    &:first-child {
      margin: 0px;
      border-radius: 0px 0px 5px 5px;
    }
    .round-header {
      width: 100%;
      padding: 10px;
      background-color: #3b464d;
      color: lightgrey;
      font-weight: bold;
    }

    header {
      i {
        background-color: red !important;
      }
    }

    .round-container {
      .transfers-header {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        border-bottom: 2px solid #893e40;
        @media #{$mobile} {
          font-size: 0.8rem;
          display: none;
        }

        .header-pos {
          width: 6%;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          height: 30px;
          /* margin: 9px 0 0 0; */
          background-color: #a0a5a9;
          @media #{$mobile} {
            height: 20px;
          }
        }

        .header-team {
          width: 18%;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          height: 30px;
          /* margin: 9px 0 0 0; */
          background-color: #a0a5a9;
          border-left: 1px solid #3b464d;
          border-right: 1px solid #3b464d;
          @media #{$mobile} {
            height: 20px;
          }
        }

        .header-in {
          width: 20%;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          height: 30px;
          /* margin: 9px 0 0 0; */
          background-color: #a0a5a9;
          //   border-left: 1px solid #3b464d;
          //   border-right: 1px solid #3b464d;
          @media #{$mobile} {
            height: 20px;
          }
        }
        .header-in-club {
          width: 18%;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          height: 30px;
          /* margin: 9px 0 0 0; */
          background-color: #a0a5a9;
          border-left: 1px solid #3b464d;
          border-right: 1px solid #3b464d;
          @media #{$mobile} {
            height: 20px;
          }
        }

        .header-out {
          width: 20%;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          height: 30px;
          /* margin: 9px 0 0 0; */
          background-color: #a0a5a9;
          @media #{$mobile} {
            height: 20px;
          }
        }
        .header-out-club {
          width: 18%;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          height: 30px;
          /* margin: 9px 0 0 0; */
          background-color: #a0a5a9;
          border-left: 1px solid #3b464d;
          //   border-right: 1px solid #3b464d;
          @media #{$mobile} {
            height: 20px;
          }
        }
      }
      .trans-row {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: stretch;
        border-bottom: 1px solid #3b464d;

        &:first-child {
          border-top: 1px solid #3b464d;
        }
        &:last-child {
          border-bottom: none;
        }

        span {
          text-align: center;
          display: flex;
          justify-content: center;
          align-items: center;
          @media #{$mobile} {
            font-size: 0.65rem;
          }
        }

        .position {
          width: 6%;
          text-transform: uppercase;
        }
        .status {
          width: 6%;
          border-left: 1px solid #3b464d;
          @media #{$mobile} {
            font-size: 1.2rem;
          }
        }

        .team {
          width: 18%;
          border-left: 1px solid #3b464d;
          border-right: 1px solid #3b464d;
        }
        .player-in {
          width: 20%;
          //   border-left: 1px solid #3b464d;
          //   border-right: 1px solid #3b464d;
          background-color: #5b745b63;
        }
        .player-in-club {
          width: 18%;
          border-left: 1px solid #3b464d;
          border-right: 1px solid #3b464d;
          background-color: #5b745b63;
        }

        .player-out {
          width: 20%;
          text-align: center;
          background-color: #8a4e5080;
        }
        .player-out-club {
          width: 18%;
          text-align: center;
          background-color: #8a4e5080;
          border-left: 1px solid #3b464d;
          //   border-right: 1px solid #3b464d;
        }
      }
    }
  }
}

// .trans-pele-cont,
// .trans-maradona-cont {
//   width: 100%;
//   display: flex;
//   flex-direction: column;
//   justify-content: flex-start;
//   align-items: center;
// }

// .trans-row .trans-row .trans-rnd-cont {
//   width: 7%;
//   height: 100%;
// }

// .trans-team-cont {
//   width: 30%;
//   height: 100%;
//   border-left: 1px solid #3b464d;
//   border-right: 1px solid #3b464d;
// }

// .trans-pos-cont {
//   width: 6%;
//   height: 100%;
// }

// .trans-in-cont {
//   width: 30%;
//   height: 100%;
//   /* border: 1px solid black; */
//   border-left: 1px solid #3b464d;
//   border-right: 1px solid #3b464d;
// }

// .trans-out-cont {
//   width: 30%;
//   height: 100%;
// }

// .trans-rnd-cont,
// .trans-team-cont,
// .trans-pos-cont,
// .trans-in-cont,
// .trans-out-cont {
//   display: flex;
//   flex-direction: column;
//   justify-content: flex-start;
//   align-items: center;
// }

// .trans-rnd-cont h3,
// .trans-team-cont h3,
// .trans-pos-cont h3,
// .trans-in-cont h3,
// .trans-out-cont h3 {
//   display: flex;
//   flex-direction: row;
//   justify-content: center;
//   align-items: center;
//   width: 100%;
//   height: 30px;
//   /* margin: 9px 0 0 0; */
//   background-color: #a0a5a9;
// }

// .trans-row span {
//   display: inline-block;
//   padding: 5px 0px;
//   text-align: center;
// }

.light {
  background-color: #d3d3d3;
}

.dark {
  background-color: #c6c6c6;
}

.light-green {
  background-color: #afb6af;
}

.dark-green {
  background-color: #a6ada6;
}

.light-red {
  background-color: #bda6a7;
}

.dark-red {
  background-color: #b49d9e;
}
</style>
