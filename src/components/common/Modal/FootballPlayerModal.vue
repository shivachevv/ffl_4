<template>
  <v-dialog v-model="show" @click:outside="close" max-width="700px">
    <v-card>
      <div class="modal-container">
        <div>
          <ModalHeader>
            {{ label }}
          </ModalHeader>
          <ModalBody>
            <v-form v-model="isFormValid">
              <v-text-field
                v-model="footballPlayer.name"
                label="Name"
                :rules="playerNameRules"
              ></v-text-field>
              <v-select
                v-model="playerLeague"
                :rules="requiredFieldRules"
                :items="getLeagues"
                item-text="name"
                item-value="id"
                label="League"
              ></v-select>
              <v-select
                v-model="footballPlayer.club"
                :disabled="!leagueClubs.length"
                :rules="requiredFieldRules"
                :items="leagueClubs"
                label="Club"
                v-if="!isNewClub"
              >
                <template v-slot:append-outer>
                  <v-btn small @click="isNewClub = true" color="accent"
                    >New Club</v-btn
                  >
                </template>
              </v-select>
              <v-text-field
                v-if="isNewClub"
                v-model="footballPlayer.club"
                label="New Club"
                :rules="requiredFieldRules"
              >
                <template v-slot:append-outer>
                  <v-btn small @click="isNewClub = false" color="accent"
                    >Old Club</v-btn
                  >
                </template></v-text-field
              >
              <v-select
                v-model="footballPlayer.position"
                :rules="requiredFieldRules"
                :items="getPositions"
                label="Position"
              ></v-select>
              <v-text-field
                v-model="footballPlayer.shirt"
                :rules="requiredFieldRules"
                label="Shirt-slug"
              ></v-text-field>
              <v-text-field
                v-model="footballPlayer.whoscored_id"
                :rules="requiredFieldRules"
                label='"WhoScored" ID'
              ></v-text-field>
            </v-form>
          </ModalBody>
          <ModalFooter>
            <v-row justify="center" class="mt-5">
              <v-btn
                :disabled="!isFormValid"
                large
                min-width="136"
                class="player-modal-button white--text"
                color="accent"
                @click.stop="handleSave()"
                >SAVE</v-btn
              >
              <v-btn
                v-if="footballPlayer.id"
                large
                min-width="136"
                class="player-modal-button white--text"
                color="red darken-1"
                @click.stop="handleDelete()"
                >DELETE</v-btn
              >
              <v-btn
                v-if="footballPlayer.id"
                large
                min-width="136"
                class="player-modal-button white--text"
                color="lime darken-1"
                @click.stop="handelEditPoints()"
                >EDIT POINTS</v-btn
              >
              <v-btn
                large
                min-width="136"
                class="player-modal-button white--text"
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
import ModalHeader from "./ModalElements/ModalHeader.vue";
import ModalFooter from "./ModalElements/ModalFooter.vue";
import ModalBody from "./ModalElements/ModalBody.vue";
import { FootballPlayer } from "../../../common/entitiesClasses";
import { mapGetters } from "vuex";

export default {
  components: { ModalHeader, ModalBody, ModalFooter },
  data: () => ({
    footballPlayer: {},
    isFormValid: false,
    playerNameRules: [
      (value) => !!value || "Required.",
      (value) => (value || "").length <= 30 || "Max 30 characters",
    ],
    requiredFieldRules: [(value) => !!value || "Required."],
    isNewClub: false,
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
    handleDelete() {
      this.$emit("delete-player", this.footballPlayer);
      this.close();
    },
    handelEditPoints() {
      this.$emit("edit-points");
      this.close();
    },
  },
  computed: {
    ...mapGetters(["getLeagues", "getClubsByLeague", "getPositions"]),
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
    playerLeague: {
      handler: function () {
        this.footballPlayer.football_league_id &&
          !this.leagueClubs.length &&
          this.$store.dispatch(
            "fetchPlayersByLeague",
            this.footballPlayer.football_league_id
          );
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
.player-modal-button {
  margin: 0.5rem 0.5rem;
}
</style>
