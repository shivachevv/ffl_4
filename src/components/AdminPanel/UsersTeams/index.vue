<template>
  <div v-if="!loading" class="page-container">
    <span class="heading">Select Round</span>
    <div class="d-flex flex-wrap">
      <div v-for="round in getAllRounds" :key="round.id">
        <v-btn
          :color="+selectedRound === +round.name ? 'success' : '#3c474d'"
          class="ma-2 white--text"
          @click="selectRound(round.name)"
        >
          {{ round.name }}
        </v-btn>
      </div>
    </div>
    <span class="heading">Select User</span>
    <v-select
      class="mt-4"
      :items="getAllUsers"
      label="Users"
      dense
      v-model="selectedUser"
      return-object
    >
      <template v-slot:selection="{ item }">
        <span>{{ item.first_name }} {{ item.last_name }}</span>
      </template>
      <template v-slot:item="{ item }">
        <span>{{ item.first_name }} {{ item.last_name }}</span>
      </template>
    </v-select>

    <span class="heading">Select Squad</span>
    <div class="squad-wrapper">
      <v-autocomplete
        item-text="name"
        class="player mt-2"
        :items="gk"
        label="GK"
        dense
        v-model="payload.gk"
        return-object
      >
        <template v-slot:selection="{ item }">
          <span>{{ item.name }} - {{ item.position }}</span>
        </template>
        <template v-slot:item="{ item }">
          <span>{{ item.name }} - {{ item.position }}</span>
        </template>
      </v-autocomplete>
      <v-autocomplete
        item-text="name"
        class="player mt-2"
        :items="dl"
        label="DL1"
        dense
        v-model="payload.dl1"
        return-object
      >
        <template v-slot:selection="{ item }">
          <span>{{ item.name }} - {{ item.position }}</span>
        </template>
        <template v-slot:item="{ item }">
          <span>{{ item.name }} - {{ item.position }}</span>
        </template>
      </v-autocomplete>
      <v-autocomplete
        item-text="name"
        class="player mt-2"
        :items="dl"
        label="DL2"
        dense
        v-model="payload.dl2"
        return-object
      >
        <template v-slot:selection="{ item }">
          <span>{{ item.name }} - {{ item.position }}</span>
        </template>
        <template v-slot:item="{ item }">
          <span>{{ item.name }} - {{ item.position }}</span>
        </template>
      </v-autocomplete>
      <v-autocomplete
        item-text="name"
        class="player mt-2"
        :items="dc"
        label="DC1"
        dense
        v-model="payload.dc1"
        return-object
      >
        <template v-slot:selection="{ item }">
          <span>{{ item.name }} - {{ item.position }}</span>
        </template>
        <template v-slot:item="{ item }">
          <span>{{ item.name }} - {{ item.position }}</span>
        </template>
      </v-autocomplete>
      <v-autocomplete
        item-text="name"
        class="player mt-2"
        :items="dc"
        label="DC2"
        dense
        v-model="payload.dc2"
        return-object
      >
        <template v-slot:selection="{ item }">
          <span>{{ item.name }} - {{ item.position }}</span>
        </template>
        <template v-slot:item="{ item }">
          <span>{{ item.name }} - {{ item.position }}</span>
        </template>
      </v-autocomplete>
      <v-autocomplete
        item-text="name"
        class="player mt-2"
        :items="dr"
        label="DR1"
        dense
        v-model="payload.dr1"
        return-object
      >
        <template v-slot:selection="{ item }">
          <span>{{ item.name }} - {{ item.position }}</span>
        </template>
        <template v-slot:item="{ item }">
          <span>{{ item.name }} - {{ item.position }}</span>
        </template>
      </v-autocomplete>
      <v-autocomplete
        item-text="name"
        class="player mt-2"
        :items="dr"
        label="DR2"
        dense
        v-model="payload.dr2"
        return-object
      >
        <template v-slot:selection="{ item }">
          <span>{{ item.name }} - {{ item.position }}</span>
        </template>
        <template v-slot:item="{ item }">
          <span>{{ item.name }} - {{ item.position }}</span>
        </template>
      </v-autocomplete>
      <v-autocomplete
        item-text="name"
        class="player mt-2"
        :items="ml"
        label="ML1"
        dense
        v-model="payload.ml1"
        return-object
      >
        <template v-slot:selection="{ item }">
          <span>{{ item.name }} - {{ item.position }}</span>
        </template>
        <template v-slot:item="{ item }">
          <span>{{ item.name }} - {{ item.position }}</span>
        </template>
      </v-autocomplete>
      <v-autocomplete
        item-text="name"
        class="player mt-2"
        :items="ml"
        label="ML2"
        dense
        v-model="payload.ml2"
        return-object
      >
        <template v-slot:selection="{ item }">
          <span>{{ item.name }} - {{ item.position }}</span>
        </template>
        <template v-slot:item="{ item }">
          <span>{{ item.name }} - {{ item.position }}</span>
        </template>
      </v-autocomplete>
      <v-autocomplete
        item-text="name"
        class="player mt-2"
        :items="mc"
        label="MC1"
        dense
        v-model="payload.mc1"
        return-object
      >
        <template v-slot:selection="{ item }">
          <span>{{ item.name }} - {{ item.position }}</span>
        </template>
        <template v-slot:item="{ item }">
          <span>{{ item.name }} - {{ item.position }}</span>
        </template>
      </v-autocomplete>
      <v-autocomplete
        item-text="name"
        class="player mt-2"
        :items="mc"
        label="MC2"
        dense
        v-model="payload.mc2"
        return-object
      >
        <template v-slot:selection="{ item }">
          <span>{{ item.name }} - {{ item.position }}</span>
        </template>
        <template v-slot:item="{ item }">
          <span>{{ item.name }} - {{ item.position }}</span>
        </template>
      </v-autocomplete>
      <v-autocomplete
        item-text="name"
        class="player mt-2"
        :items="mr"
        label="MR1"
        dense
        v-model="payload.mr1"
        return-object
      >
        <template v-slot:selection="{ item }">
          <span>{{ item.name }} - {{ item.position }}</span>
        </template>
        <template v-slot:item="{ item }">
          <span>{{ item.name }} - {{ item.position }}</span>
        </template>
      </v-autocomplete>

      <v-autocomplete
        item-text="name"
        class="player mt-2"
        :items="mr"
        label="MR2"
        dense
        v-model="payload.mr2"
        return-object
      >
        <template v-slot:selection="{ item }">
          <span>{{ item.name }} - {{ item.position }}</span>
        </template>
        <template v-slot:item="{ item }">
          <span>{{ item.name }} - {{ item.position }}</span>
        </template>
      </v-autocomplete>
      <v-autocomplete
        item-text="name"
        class="player mt-2"
        :items="st"
        label="ST1"
        dense
        v-model="payload.st1"
        return-object
      >
        <template v-slot:selection="{ item }">
          <span>{{ item.name }} - {{ item.position }}</span>
        </template>
        <template v-slot:item="{ item }">
          <span>{{ item.name }} - {{ item.position }}</span>
        </template>
      </v-autocomplete>
      <v-autocomplete
        item-text="name"
        class="player mt-2"
        :items="st"
        label="ST2"
        dense
        v-model="payload.st2"
        return-object
      >
        <template v-slot:selection="{ item }">
          <span>{{ item.name }} - {{ item.position }}</span>
        </template>
        <template v-slot:item="{ item }">
          <span>{{ item.name }} - {{ item.position }}</span>
        </template>
      </v-autocomplete>

      <v-autocomplete
        item-text="name"
        class="player mt-2"
        :items="st"
        label="ST3"
        dense
        v-model="payload.st3"
        return-object
      >
        <template v-slot:selection="{ item }">
          <span>{{ item.name }} - {{ item.position }}</span>
        </template>
        <template v-slot:item="{ item }">
          <span>{{ item.name }} - {{ item.position }}</span>
        </template>
      </v-autocomplete>
    </div>

    <div class="captains">
      <span class="heading">Select Captains</span>
      <v-autocomplete
        item-text="name"
        class="mt-2"
        :items="squad"
        label="Captain"
        dense
        v-model="payload.cpt"
        return-object
      >
        <template v-slot:selection="{ item }">
          <span>{{ item.name }} - {{ item.position }}</span>
        </template>
        <template v-slot:item="{ item }">
          <span>{{ item.name }} - {{ item.position }}</span>
        </template>
      </v-autocomplete>

      <v-autocomplete
        item-text="name"
        class="mt-2"
        :items="squad"
        label="Vice Captain"
        dense
        v-model="payload.vice_cpt"
        return-object
      >
        <template v-slot:selection="{ item }">
          <span>{{ item.name }} - {{ item.position }}</span>
        </template>
        <template v-slot:item="{ item }">
          <span>{{ item.name }} - {{ item.position }}</span>
        </template>
      </v-autocomplete>
    </div>

    <v-btn color="success" class="ma-2 white--text" @click="submit">
      SUBMIT TEAM
    </v-btn>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from "vuex";

export default {
  name: "UsersTeams",
  components: {},
  data() {
    return {
      selectedRound: 1,
      selectedUser: null,
      selectedPlayer: null,
      payload: {
        season_id: 1,
        league_id: "",
        round_id: 1,
        cpt: "",
        vice_cpt: "",
        dc1: null,
        dc2: null,
        dl1: null,
        dl2: null,
        dr1: null,
        dr2: null,
        gk: null,
        mc1: null,
        mc2: null,
        ml1: null,
        ml2: null,
        mr1: null,
        mr2: null,
        st1: null,
        st2: null,
        st3: null,
      },
      positions: [
        "dc1",
        "dc2",
        "dl1",
        "dl2",
        "dr1",
        "dr2",
        "gk",
        "mc1",
        "mc2",
        "ml1",
        "ml2",
        "mr1",
        "mr2",
        "st1",
        "st2",
        "st3",
      ],
    };
  },
  methods: {
    ...mapActions("rounds", ["fetchRounds"]),
    ...mapActions("user", ["fetchAllUsers"]),
    ...mapActions("footballPlayers", ["fetchAllPlayers"]),
    ...mapActions("userPlayers", ["createNextRoundPlayers", "setSuperCpt"]),
    selectRound(round) {
      this.selectedRound = +round;
    },
    async submit() {
      const readyPayload = {
        season_id: 1,
        league_id: this.selectedUser?.league_id,
        round_id: this.selectedRound,
        cpt: this.payload?.cpt.whoscoredId,
        vice_cpt: this.payload?.vice_cpt.whoscoredId,
        dc1: this.payload?.dc1.whoscoredId,
        dc2: this.payload?.dc2.whoscoredId,
        dl1: this.payload?.dl1.whoscoredId,
        dl2: this.payload?.dl2.whoscoredId,
        dr1: this.payload?.dr1.whoscoredId,
        dr2: this.payload?.dr2.whoscoredId,
        gk: this.payload?.gk.whoscoredId,
        mc1: this.payload?.mc1.whoscoredId,
        mc2: this.payload?.mc2.whoscoredId,
        ml1: this.payload?.ml1.whoscoredId,
        ml2: this.payload?.ml2.whoscoredId,
        mr1: this.payload?.mr1.whoscoredId,
        mr2: this.payload?.mr2.whoscoredId,
        st1: this.payload?.st1.whoscoredId,
        st2: this.payload?.st2.whoscoredId,
        st3: this.payload?.st3.whoscoredId,
      };

      console.log(readyPayload);
      await this.createNextRoundPlayers(readyPayload);
    },
  },
  computed: {
    ...mapState("footballPlayers", ["footballPlayers"]),

    ...mapGetters("rounds", ["getAllRounds"]),
    ...mapGetters("user", ["getAllUsers"]),
    // ...mapGetters("seasons", ["getSeasons"]),
    // ...mapGetters("transfers", ["getTransfers"]),
    loading() {
      return !this.getAllRounds?.length || !this.getAllUsers?.length;
    },
    validateTeam() {
      const readyPayload = {
        ...this.payload,
        season_id: 1,
        league_id: this.selectedUser?.league_id,
      };
      return !Object.keys(readyPayload).find((key) => !readyPayload[key]);
    },
    gk() {
      return (this.footballPlayers || []).filter(
        (player) => player.position === "GK"
      );
    },
    dl() {
      return (this.footballPlayers || []).filter(
        (player) => player.position === "DL"
      );
    },
    dc() {
      return (this.footballPlayers || []).filter(
        (player) => player.position === "DC"
      );
    },
    dr() {
      return (this.footballPlayers || []).filter(
        (player) => player.position === "DR"
      );
    },
    ml() {
      return (this.footballPlayers || []).filter(
        (player) => player.position === "ML"
      );
    },
    mc() {
      return (this.footballPlayers || []).filter(
        (player) => player.position === "MC"
      );
    },
    mr() {
      return (this.footballPlayers || []).filter(
        (player) => player.position === "MR"
      );
    },
    st() {
      return (this.footballPlayers || []).filter(
        (player) => player.position === "ST"
      );
    },
    squad() {
      return Object.entries(this.payload).reduce((acc, [key, player]) => {
        if (this.positions.includes(key) && !!player) {
          acc.push(player);
        }
        return acc;
      }, []);
    },
  },
  async created() {
    if (!this.getAllRounds?.length) {
      await this.fetchRounds();
    }
    if (!this.getAllUsers?.length) {
      await this.fetchAllUsers();
    }

    if (!this.footballPlayers?.length) {
      await this.fetchAllPlayers({ priorityLeagueId: 1 });
    }
  },
};
</script>

<style lang="scss" scoped>
.page-container {
  margin: 0 30px 0 30px;
}

.heading {
  font-weight: bold;
  margin-top: 20px;
  display: inline-block;
}

.squad-wrapper {
  margin: 40px;
  display: flex;
  flex-wrap: wrap;

  .player {
    width: 40%;
    margin: 0 20px;
  }
}

.captains {
  margin: 40px;
}
</style>
