<template>
  <v-dialog v-model="show" @click:outside="close" max-width="500px">
    <v-card>
      <div class="modal-container">
        <div>
          <ModalHeader> {{ label }} </ModalHeader>
          <ModalBody>
            <v-form v-model="isFormValid">
              <v-text-field
                v-model="round.name"
                label="Name"
                :rules="roundNameRules"
                hide-details="auto"
              ></v-text-field>
              <v-select
                v-model="roundSeason"
                :rules="requiredFieldRules"
                :items="seasons"
                item-text="name"
                item-value="id"
                label="Season"
              ></v-select>
              <v-row justify="space-between" class="round-dates">
                <v-menu
                  v-model="fromDateMenu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="round.from_date"
                      :rules="requiredFieldRules"
                      label="From Date:"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      class="shrink"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="round.from_date"
                    @input="fromDateMenu = false"
                  ></v-date-picker>
                </v-menu>
                <v-menu
                  v-model="toDateMenu"
                  :disabled="!round.from_date"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="round.to_date"
                      :disabled="!round.from_date"
                      :rules="requiredFieldRules"
                      label="To Date:"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      class="shrink"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="round.to_date"
                    :allowed-dates="allowedDates"
                    @input="toDateMenu = false"
                  ></v-date-picker>
                </v-menu>
              </v-row>
              <v-checkbox
                v-model="round.head_to_head"
                label="Head to Head"
              ></v-checkbox>
            </v-form>
          </ModalBody>
          <ModalFooter>
            <v-row justify="center">
              <v-btn
                :disabled="!isFormValid"
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
import ModalHeader from "./ModalElements/ModalHeader.vue";
import ModalFooter from "./ModalElements/ModalFooter.vue";
import ModalBody from "./ModalElements/ModalBody.vue";
import { Round } from "../../../common/entitiesClasses";
import { DateTime } from "luxon";

export default {
  components: { ModalHeader, ModalBody, ModalFooter },
  data: () => ({
    isFormValid: true,
    round: {},
    fromDateMenu: false,
    toDateMenu: false,
    roundNameRules: [
      (value) => !!value || "Required.",
      (value) => (value || "").length <= 20 || "Max 20 characters",
    ],
    requiredFieldRules: [(value) => !!value || "Required."],
  }),
  props: {
    value: Boolean,
    passedRound: Object,
    seasons: Array,
  },
  methods: {
    allowedDates(date) {
      return (
        DateTime.fromISO(date)
          .diff(DateTime.fromISO(this.round.from_date), "days")
          .toObject().days > 4
      );
    },
    close() {
      this.round = new Round(this.passedRound);
      this.$emit("close-modal");
    },
    // TO DO: Form validation!!!!
    handleSave() {
      this.round.head_to_head = this.round.head_to_head ? true : null;
      if (this.label == "EDIT ROUND") {
        this.$emit("edit-round", this.round);
      } else {
        this.$emit("create-round", this.round);
      }
      this.close();
    },
  },
  computed: {
    show: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
    label() {
      return this.round.id ? "EDIT ROUND" : "CREATE ROUND";
    },
    roundSeason: {
      get() {
        return this.seasons.find(({ id }) => id == this.round.season_id);
      },
      set(value) {
        this.round.season_id = value;
      },
    },
  },
  watch: {
    passedRound: {
      deep: true,
      handler: function () {
        this.round = new Round(this.passedRound);
      },
    },
  },
  created() {
    this.round = new Round(this.passedRound);
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
