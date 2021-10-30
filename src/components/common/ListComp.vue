<template>
  <div>
    <h1 class="ml-10" v-if="!passedItems">LOADING...</h1>
    <v-list class="list-container" v-if="passedItems">
      <div class="item-wrapper" :class="itemProps.itemType">
        <template v-for="(item, index) in passedItems">
          <v-list-item :key="index" ripple>
            <v-card
              @click="focusItem(index)"
              class="item-container grey lighten-1 black--text"
              :class="itemProps.itemType"
              elevation="6"
            >
              <v-row align="center" class="pl-2">
                <div v-if="itemProps.itemType == 'league'" class="icon-slot">
                  <v-avatar size="50" tile
                    ><img
                      :src="
                        require(`../../assets/images/user-transfers/leagues/${item.slug}.png`) ||
                        ''
                      "
                  /></v-avatar>
                </div>
                <v-list-item-content class="item-content">
                  <v-row
                    :no-gutters="true"
                    align="center"
                    justify="space-between"
                  >
                    <h1 class="text-h6" v-if="itemProps.itemType == 'player'">
                      {{ item.position }}
                    </h1>
                    <h1 :class="textSize">
                      {{ item.name }}
                    </h1>
                  </v-row>
                </v-list-item-content>
                <!-- <v-list-item-action>
              <slot name="itemActions"></slot>
            </v-list-item-action> -->
              </v-row>
            </v-card>
          </v-list-item>
        </template>
      </div>
    </v-list>
  </div>
</template>

<script>
export default {
  data() {
    return {
      image: "",
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
    imgSource(slug) {
      return `../../assets/images/user-transfers/leagues/${slug}.png`;
    },
  },
  computed: {
    textSize() {
      return this.itemProps.itemType == "player" ? "text-h6" : "text-h4";
    },
  },
};
</script>

<style lang="scss" scoped>
.list-container {
  background: none !important;
  margin: 1rem 2rem;
}
.item-container {
  width: 100%;
  margin: 10px;
  padding: 10px;
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
</style>
