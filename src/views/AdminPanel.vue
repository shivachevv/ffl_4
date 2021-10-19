<template>
  <div class="admin-container">
    <div class="admin-menu">
      <h1 class="admin-menu-header">ADMIN MENU</h1>
      <div class="admin-menu-items">
        <a
          href
          class="menu-item-section"
          @click.prevent="showSectionHandler('rounds')"
          >Rounds</a
        >
        <div v-if="showRounds" class="admin-menu-item">
          <button
            class="menu-item-link"
            :class="{ selected: chosenComponent === 'Rounds' }"
            @click.prevent="switchComponent"
          >
            Rounds
          </button>
        </div>

        <a
          href
          class="menu-item-section"
          @click.prevent="showSectionHandler('players')"
          >Players</a
        >
        <div v-if="showPlayers" class="admin-menu-item">
          <button
            class="menu-item-link"
            :class="{ selected: chosenComponent === 'PlayersEdit' }"
            @click.prevent="switchComponent"
          >
            PlayersEdit
          </button>
          <button
            class="menu-item-link"
            :class="{ selected: chosenComponent === 'PlayersPoints' }"
            @click.prevent="switchComponent"
          >
            PlayersPoints
          </button>
          <button
            class="menu-item-link"
            :class="{ selected: chosenComponent === 'SyncPoints' }"
            @click.prevent="switchComponent"
          >
            SyncPoints
          </button>
        </div>

        <a
          href
          class="menu-item-section"
          @click.prevent="showSectionHandler('users')"
          >Users</a
        >
        <div v-if="showUsers" class="admin-menu-item">
          <button
            class="menu-item-link"
            :class="{ selected: chosenComponent === 'UsersPersonal' }"
            @click.prevent="switchComponent"
          >
            UsersPersonal
          </button>
          <button
            class="menu-item-link"
            :class="{ selected: chosenComponent === 'UsersTeams' }"
            @click.prevent="switchComponent"
          >
            UsersTeams
          </button>
        </div>

        <a
          href
          class="menu-item-section"
          @click.prevent="showSectionHandler('transfers')"
          >Transfers</a
        >
        <div v-if="showTransfers" class="admin-menu-item">
          <button
            class="menu-item-link"
            :class="{ selected: chosenComponent === 'Transfers' }"
            @click.prevent="switchComponent"
          >
            Transfers
          </button>
        </div>

        <a
          href
          class="menu-item-section"
          @click.prevent="showSectionHandler('leagues')"
          >Leagues</a
        >
        <div v-if="showLeagues" class="admin-menu-item">
          <button
            class="menu-item-link"
            :class="{ selected: chosenComponent === 'Leagues' }"
            @click.prevent="switchComponent"
          >
            Leagues
          </button>
        </div>
        <a
          href
          class="menu-item-section"
          @click.prevent="showSectionHandler('h2h')"
          >H2HLeague</a
        >
        <div v-if="showH2H" class="admin-menu-item">
          <button
            class="menu-item-link"
            :class="{ selected: chosenComponent === 'H2HLeague' }"
            @click.prevent="switchComponent"
          >
            H2HLeague
          </button>
        </div>
        <a
          href
          class="menu-item-section"
          @click.prevent="showSectionHandler('cup')"
          >Cup</a
        >
        <div v-if="showCup" class="admin-menu-item">
          <button
            class="menu-item-link"
            :class="{ selected: chosenComponent === 'CupGroupsAndRounds' }"
            @click.prevent="switchComponent"
          >
            CupGroupsAndRounds
          </button>
          <button
            class="menu-item-link"
            :class="{ selected: chosenComponent === 'CupSquadSelect' }"
            @click.prevent="switchComponent"
          >
            CupSquadSelect
          </button>
          <button
            class="menu-item-link"
            :class="{ selected: chosenComponent === 'CupMatchPoints' }"
            @click.prevent="switchComponent"
          >
            CupMatchPoints
          </button>
        </div>
        <a
          href
          class="menu-item-section"
          @click.prevent="showSectionHandler('matching')"
          >Matching</a
        >
        <div v-if="showMatching" class="admin-menu-item">
          <button
            class="menu-item-link"
            :class="{ selected: chosenComponent === 'Matching' }"
            @click.prevent="switchComponent"
          >
            Matching
          </button>
        </div>
      </div>
    </div>
    <div class="admin-details">
      <!-- <keep-alive> -->
      <component :is="chosenComponent" />
      <!-- </keep-alive> -->
    </div>
  </div>
</template>

<script>
const PlayersEdit = () =>
  import("../components/AdminPanel/Players/PlayersEdit");
// const PlayersPoints = () => import("./Players/PlayersPoints");
// const SyncPoints = () => import("./Players/SyncPoints");
// const Rounds = () => import("./Rounds/Rounds");
// const UsersPersonal = () => import("./Users/UsersPersonal");
// const UsersTeams = () => import("./Users/UsersTeams");
const Transfers = () =>
  import("../components/AdminPanel/Transfers/Transfers.vue");
// const Leagues = () => import("./Leagues/Leagues");
// const H2HLeague = () => import("./H2HLeague/H2HLeague");
// const CupGroupsAndRounds = () => import("./Cup/CupGroupsAndRounds");
// const CupSquadSelect = () => import("./Cup/CupSquadSelect");
// const CupMatchPoints = () => import("./Cup/CupMatchPoints");
// const Matching = () => import("./Matching/Matching");
// const AdminHomeSection = () => import("./AdminHomeSection/AdminHomeSection");
const Rounds = () => import("../components/AdminPanel/Rounds/Rounds.vue");
const AdminHomeSection = () =>
  import("../components/AdminPanel/AdminHomeSection/AdminHomeSection.vue");

export default {
  name: "AdminPanel",
  components: {
    Rounds,
    PlayersEdit,
    // PlayersPoints,
    // SyncPoints,
    // UsersPersonal,
    // UsersTeams,
    Transfers,
    // Leagues,
    // H2HLeague,
    // CupGroupsAndRounds,
    // CupSquadSelect,
    // CupMatchPoints,
    // Matching,
    AdminHomeSection,
  },
  data() {
    return {
      chosenComponent: "AdminHomeSection",
      showRounds: false,
      showPlayers: false,
      showUsers: false,
      showTransfers: false,
      showLeagues: false,
      showH2H: false,
      showCup: false,
      showMatching: false,
    };
  },
  computed: {},
  watch: {},
  created() {},
  methods: {
    switchComponent(e) {
      return (this.chosenComponent = e.target.innerText);
    },
    showSectionHandler(s) {
      if (s === "rounds") {
        this.showRounds = !this.showRounds;
      } else if (s === "players") {
        this.showPlayers = !this.showPlayers;
      } else if (s === "users") {
        this.showUsers = !this.showUsers;
      } else if (s === "transfers") {
        this.showTransfers = !this.showTransfers;
      } else if (s === "leagues") {
        this.showLeagues = !this.showLeagues;
      } else if (s === "h2h") {
        this.showH2H = !this.showH2H;
      } else if (s === "cup") {
        this.showCup = !this.showCup;
      } else if (s === "matching") {
        this.showMatching = !this.showMatching;
      }
    },
  },
  // beforeDestroy() {
  //   console.log('destroy', this);
  // },
};
</script>

<style lang="scss">
.admin-container {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;

  .admin-menu {
    width: 15%;
    background-color: #3c474d;
    h1 {
      text-align: center;
      width: 100%;
      color: #fbffff;
      padding: 10px 0;
      border-bottom: 3px solid #893f40;
    }

    .admin-menu-items {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;

      .menu-item-section {
        padding: 10px 0;
        color: #fbffff;
        width: 100%;
        text-align: center;
        transition: all 0.3s;
        background-color: #3b454b;
        border: none;
        font-size: 1rem;
        cursor: pointer;

        &:hover {
          background-color: darkorange;
        }
      }

      .admin-menu-item {
        width: 100%;

        .selected {
          font-weight: bold;
          text-decoration: underline;
        }

        .menu-item-link {
          padding: 10px 0;
          color: #3b454b;
          width: 100%;
          text-align: center;
          transition: all 0.3s;
          background-color: #b7b7b7;
          border: none;
          font-size: 1rem;
          cursor: pointer;

          &:hover {
            background-color: darkorange;
          }
        }
      }
    }
  }

  .admin-details {
    width: 85%;

    .section-header {
      margin: 20px 0 0 0;
      font-size: 1.3rem;
      text-decoration: underline;
      width: 100%;
      text-align: center;
    }
  }
}
</style>
