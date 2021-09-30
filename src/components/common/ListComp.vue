<template>
  <v-list two-line>
    <template v-for="(item, index) in passedItems">
      <v-list-item :key="index" ripple>
        <v-card
          @click="focusItem(index)"
          class="item-container grey lighten-1 white--text"
          elevation="6"
        >
          <v-row>
            <div v-if="itemProps.itemType == 'league'" class="icon-slot">
              <v-avatar size="80" tile
                ><img
                  :src="
                    require(`../../assets/images/user-transfers/leagues/${item.slug}.png`) ||
                    ''
                  "
              /></v-avatar>
            </div>
            <v-list-item-content class="item-content">
              <h1 class="text-h4">{{ item.name }}</h1>
            </v-list-item-content>
            <!-- <v-list-item-action>
              <slot name="itemActions"></slot>
            </v-list-item-action> -->
          </v-row>
        </v-card>
      </v-list-item>
    </template>
  </v-list>
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
};
</script>

<style lang="scss" scoped>
.item-container {
  width: 100%;
  margin: 1rem 2rem;
  padding: 2rem;
}
.icon-slot {
  margin-right: 2rem;
}
</style>
