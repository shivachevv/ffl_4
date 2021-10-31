<template>
  <div>
    <div class="cols-wrapper">
      <v-col cols="4">
        <v-list class="list-container">
          <div class="item-wrapper">
            <template v-for="(item, index) in Object.keys(transfersByRounds)">
              <v-list-item :key="index" ripple>
                <v-card
                  @click="focusRound(index)"
                  class="item-container grey lighten-1 white--text"
                  elevation="6"
                >
                  <v-row>
                    <v-list-item-content class="item-content">
                      <v-row
                        :no-gutters="true"
                        align="center"
                        justify="space-between"
                      >
                        <h1 class="text-h4">{{ item }}</h1>
                      </v-row>
                    </v-list-item-content>
                  </v-row>
                </v-card>
              </v-list-item>
            </template>
          </div>
        </v-list>
      </v-col>
      <v-col cols="8">
        <v-list class="list-container">
          <div class="item-wrapper">
            <template
              v-for="(item, index) in transfersByRounds[selectedRoundId]"
            >
              <v-list-item :key="index" ripple>
                <v-card
                  @click="focusItem(index)"
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
                        <h1 class="text-h4">{{ item }}</h1>
                      </v-row>
                    </v-list-item-content>
                  </v-row>
                </v-card>
              </v-list-item>
            </template>
          </div>
        </v-list>
      </v-col>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      image: "",
      userPickedRoundId: null,
    };
  },
  props: {
    passedItems: [Array, Object],
    itemProps: Object,
  },
  methods: {
    focusItem(itemIndex) {
      this.$emit(`focus-${this.itemProps.itemType}`, itemIndex);
    },
    focusRound(index) {
      this.userPickedRoundId = Object.keys(this.transfersByRounds)[index];
    },
  },
  computed: {
    ...mapGetters("rounds", ["getCurrentRound"]),

    selectedRoundId() {
      return this.userPickedRoundId
        ? this.userPickedRoundId
        : this.getCurrentRound?.id;
    },

    transfersByRounds() {
      const transfersByRounds = {};
      this.passedItems.forEach((transfer) => {
        if (!transfersByRounds[transfer.round_id]) {
          transfersByRounds[transfer.round_id] = [];
        }
        transfersByRounds[transfer.round_id].push(transfer);
      });
      return transfersByRounds;
    },
  },
  async created() {
    await this.$store.dispatch("rounds/fetchRounds");
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
.item-container.player {
  margin: 0.2rem 0rem;
  padding: 0.5rem 1.5rem;
  min-width: 13rem;
}
.item-wrapper.player {
  max-height: 1000px;
  max-width: 100%;
  display: flex;
  flex-flow: column wrap;
}
.cols-wrapper {
  display: flex;
}
</style>
