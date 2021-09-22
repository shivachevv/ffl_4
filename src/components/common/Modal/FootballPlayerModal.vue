<template>
  <v-dialog v-model="show" @click:outside="close" max-width="500px">
    <v-card>
      <div class="modal-container">
        <div>
          <ModalHeader>
            {{ label }}
          </ModalHeader>
          <ModalBody>
            <v-text-field
              v-model="footballPlayer.name"
              label="Name"
              hide-details="auto"
            ></v-text-field>
            <v-select
              v-model="playerLeague"
              :items="getLeagues"
              item-text="name"
              item-value="id"
              label="Leagues"
            ></v-select>
            <v-select
              v-model="footballPlayer.club"
              :items="leagueClubs"
              label="Club"
            ></v-select>
          </ModalBody>
          <ModalFooter>
            <v-row justify="center">
              <v-btn
                large
                class="round-modal-button"
                color="accent"
                @click.stop="handleSave()"
                >SAVE</v-btn
              >
              <v-btn
                large
                class="round-modal-button"
                color="secondary"
                @click.stop="close()"
                >CLOSE</v-btn
              >
            </v-row>
          </ModalFooter>
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import ModalHeader from "./ModalHeader.vue";
import ModalFooter from "./ModalFooter.vue";
import ModalBody from "./ModalBody.vue";
import { FootballPlayer } from "../../../common/entitiesClasses";
import { mapGetters } from "vuex";

export default {
  components: { ModalHeader, ModalBody, ModalFooter },
  data: () => ({
    footballPlayer: {},
  }),
  props: {
    value: Boolean,
    passedPlayer: Object,
  },
  methods: {
    close() {
      this.footballPlayer = new FootballPlayer(this.passedPlayer);
      this.$emit("close-modal");
    },
    // TO DO: Form validation!!!!
    handleSave() {
      if (this.label == "EDIT PLAYER") {
        this.$emit("edit-player", this.footballPlayer);
      } else {
        this.$emit("create-player", this.footballPlayer);
      }
      this.close();
    },
  },
  computed: {
    ...mapGetters(["getLeagues", "getClubsByLeague"]),
    leagueClubs() {
      return this.footballPlayer.football_league_id
        ? Object.keys(
            this.getClubsByLeague(this.footballPlayer.football_league_id)
          )
        : [];
    },
    show: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
    label() {
      return this.footballPlayer.id ? "EDIT PLAYER" : "CREATE PLAYER";
    },
    playerLeague: {
      get() {
        return this.getLeagues.find(
          ({ id }) => id == this.footballPlayer.football_league_id
        );
      },
      set(value) {
        this.footballPlayer.football_league_id = value;
      },
    },
  },
  watch: {
    passedPlayer: {
      deep: true,
      handler: function () {
        this.footballPlayer = new FootballPlayer(this.passedPlayer);
      },
    },
  },
  created() {
    this.footballPlayer = new FootballPlayer(this.passedPlayer);
  },
};
</script>
<style scoped>
.modal-container {
  padding: 4rem 3rem;
}
.round-dates {
  margin: -12px 0px;
}
.round-modal-button {
  margin: 0.5rem 2rem;
}
</style>
