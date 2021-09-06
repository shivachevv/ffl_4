<template>
  <div
    v-if="showRoundData"
    class="rounds-container"
    @keyup.left="previewsCard"
    @keyup.right="nextCard"
  >
    <v-card
      elevation="10"
      max-width="500"
      align="center"
      class="showed-card"
      :style="roundLabel.isColored ? 'border: 3px solid red;' : ''"
    >
      <v-card-title>
        <v-row justify="center" class="text-h4">
          Season {{ showRoundData.season_name }}
        </v-row>
      </v-card-title>
      <v-card-title>
        <v-row
          justify="center"
          class="text-h4"
          :class="{ 'red--text': roundLabel.isColored }"
        >
          Round {{ roundLabel.text }}
        </v-row>
      </v-card-title>
      <div class="dates">
        <v-card-subtitle>
          <v-row justify="center" class="text-h5">
            From date: {{ showRoundData.from_date }}
          </v-row></v-card-subtitle
        >
        <v-card-subtitle>
          <v-row justify="center" class="text-h5">
            To date: {{ showRoundData.to_date }}
          </v-row></v-card-subtitle
        >
        <v-card-subtitle>
          <v-row justify="center" class="text-h5">
            Head 2 Head:
            <v-icon
              v-if="showRoundData.head_to_head"
              large
              color="green darken-2"
              class="h2h-icon"
              >fas fa-check</v-icon
            >
            <v-icon v-else large color="red darken-2" class="h2h-icon"
              >fas fa-times</v-icon
            >
          </v-row></v-card-subtitle
        >
      </div>
    </v-card>
    <div class="text-center rounds-pagination">
      <v-pagination
        v-model="showRound"
        :length="rounds.length"
        :total-visible="5"
      ></v-pagination>
    </div>
    <v-row class="buttons">
      <v-btn elevation="2" outlined x-large class="green" min-width="150"
        >CREATE</v-btn
      >
      <v-btn elevation="2" outlined x-large class="yellow" min-width="150"
        >EDIT</v-btn
      >
      <v-btn elevation="2" outlined x-large class="red" min-width="150"
        >DELETE</v-btn
      >
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Rounds",
  components: {},
  data() {
    return {
      labelColor: "red--text",
      showRound: undefined,
      players: undefined,
      users: undefined,
      h2hrounds: undefined,
      success: false,
      error: false,
      errorMsg: "",
    };
  },
  methods: {
    nextCard() {
      this.showRound++;
    },
    previewsCard() {
      this.showRound--;
    },
  },
  computed: {
    ...mapGetters(["getAllRounds", "getCurrentRoundIndex"]),
    rounds() {
      return this.getAllRounds;
    },
    currentRound() {
      const currentRoundIndex = this.getCurrentRoundIndex;
      const currentRound = this.rounds[currentRoundIndex];
      return { index: currentRoundIndex, data: currentRound };
    },
    roundLabel() {
      const roundLabelText =
        this.showRoundData == this.currentRound.data
          ? `${this.showRoundData.name} - Current Round`
          : this.showRoundData.name;
      const isColored = this.showRoundData == this.currentRound.data;
      return { text: roundLabelText, isColored };
    },
    showRoundData() {
      return this.rounds
        ? this.rounds[this.showRound - 1]
          ? this.rounds[this.showRound - 1]
          : this.rounds[0]
        : undefined;
    },
  },
  watch: {
    currentRound() {
      this.showRound = this.currentRound.index + 1;
    },
  },
  async created() {
    await this.$store.dispatch("fetchRounds");
    this.showRound = this.currentRound.index + 1;
  },
};
</script>

<style lang="scss">
$btn-color: #5ac683;

.row.dates {
  margin-top: 2rem;
}

.h2h-icon {
  margin: -0.3rem 0 0 0.5rem;
}

.rounds-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .showed-card {
    margin-top: 20px;
    padding: 2rem;
  }

  .row.buttons,
  .rounds-pagination {
    margin-top: 1rem;

    .v-btn {
      margin: 0 0.5rem;
    }
  }
}
</style>
