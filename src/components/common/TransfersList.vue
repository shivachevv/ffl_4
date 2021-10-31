<template>
  <div>
    <v-select
      class="round-selector"
      v-if="shownRound"
      v-model="shownRoundHandle"
      :items="transfersByRounds.rounds"
      item-text="name"
      item-value="id"
      label="Round"
    ></v-select>
    <v-list class="list-container">
      <div class="item-wrapper">
        <template
          v-for="(item, index) in transfersByRounds.transfers[shownRound.name]"
        >
          <!-- <v-list-item :key="index" ripple :disabled="item.status != 'pending'"> -->
          <v-list-item :key="index" ripple>
            <v-card
              @click="focusItem(item)"
              :class="{ focused: item == focusedItem }"
              class="item-container grey lighten-1 white--text"
              elevation="6"
            >
              <v-row>
                <v-list-item-content>
                  <v-row
                    :no-gutters="true"
                    align="center"
                    justify="space-between"
                  >
                    <h1 class="text-h4">
                      {{ item.user.user_team }} ({{ item.user.first_name }}
                      {{ item.user.last_name }})
                    </h1>
                    <h1>{{ item.position }}</h1>
                    <v-icon large color="red darken-1"
                      >fas fa-arrow-down</v-icon
                    >
                    <h1>{{ item.from_player.name }}</h1>
                    <v-icon large color="green darken-1"
                      >fas fa-arrow-up</v-icon
                    >
                    <h1>{{ item.to_player.name }}</h1>
                    <v-icon
                      v-if="item.status == 'approved'"
                      large
                      color="green darken-1"
                      >fas fa-check-square</v-icon
                    >
                    <v-icon
                      v-if="item.status == 'declined'"
                      large
                      color="red darken-1"
                      >fas fa-times-circle</v-icon
                    >
                    <v-icon
                      v-if="item.status == 'pending'"
                      large
                      color="yellow darken-1"
                      >fas fa-question-circle</v-icon
                    >
                  </v-row>
                  <v-btn
                    v-if="item == focusedItem"
                    large
                    min-width="136"
                    class="transfer-button"
                    color="green darken-1"
                    @click.stop="handleApprove()"
                    >APPROVE</v-btn
                  >
                  <v-btn
                    v-if="item == focusedItem"
                    large
                    min-width="136"
                    class="transfer-button"
                    color="red darken-1"
                    @click.stop="handleDecline()"
                    >DECLINE</v-btn
                  >
                </v-list-item-content>
              </v-row>
            </v-card>
          </v-list-item>
        </template>
      </div>
    </v-list>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      listId: 0,
      shownRound: { id: "", name: "" },
      focusedItem: null,
    };
  },
  props: {
    passedItems: [Array, Object],
    itemProps: Object,
  },
  methods: {
    ...mapActions("transfers", {
      updateTransferAction: "updateTransfer",
    }),
    focusItem(item) {
      this.focusedItem = item;
    },
    focusRound(index) {
      this.userPickedRoundId = Object.keys(this.transfersByRounds)[index];
    },
    async handleApprove() {
      console.log("APPROVE");
      await this.updateTransferAction({
        id: this.focusedItem.id,
        status: { status: "approved" },
      });
      this.focusedItem = null;
      this.$emit("update-transfers");
    },
    async handleDecline() {
      console.log("DECLINE");
      await this.updateTransferAction({
        id: this.focusedItem.id,
        status: { status: "declined" },
      });
      this.focusedItem = null;
      this.$emit("update-transfers");
      this.listId++;
    },
  },
  computed: {
    ...mapGetters("rounds", ["getAllRounds"]),

    shownRoundHandle: {
      get() {
        return this.shownRound;
      },
      set(value) {
        this.shownRound = this.getAllRounds.find(({ id }) => id == value);
      },
    },

    transfersByRounds() {
      const transfersByRounds = {
        transfers: {},
        rounds: [],
      };
      this.passedItems.forEach((transfer) => {
        if (!transfersByRounds.transfers[transfer.round.name]) {
          transfersByRounds.transfers[transfer.round.name] = [];
          transfersByRounds.rounds.push(transfer.round);
        }
        transfersByRounds.transfers[transfer.round.name].push(transfer);
      });
      transfersByRounds.rounds.forEach((round) => {
        transfersByRounds.transfers[round.name].sort((firstEl, secondEl) => {
          if (Number(firstEl.user_id) < Number(secondEl.user_id)) {
            return -1;
          }
          if (Number(firstEl.user_id) > Number(secondEl.user_id)) {
            return 1;
          }
          return 0;
        });
      });
      return transfersByRounds;
    },
  },
  async created() {
    await this.$store.dispatch("rounds/fetchRounds");
    const currentRoundIndex =
      this.$store.getters["rounds/getCurrentRoundIndex"];
    this.shownRound =
      this.$store.getters["rounds/getAllRounds"][currentRoundIndex + 1];
  },
};
</script>

<style lang="scss" scoped>
.list-container {
  margin: 1rem 2rem;
}
.item-container {
  width: 100%;
  margin: 1rem 2rem;
  padding: 2rem;
}
.icon-slot {
  margin-right: 2rem;
}
.item-container {
  margin: 0.2rem 0rem;
  padding: 0.5rem 1.5rem;
  min-width: 13rem;
}
.focused {
  min-height: 7rem;
}
.item-wrapper {
  max-height: 1000px;
  max-width: 100%;
  display: flex;
  flex-flow: column wrap;
}
.round-selector {
  margin: 0.2rem 2rem;
}
.transfer-button {
  margin: 0.3rem 0rem;
}
</style>
