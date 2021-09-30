<template>
  <div class="teammate" :id="`squad-teammate-${uniqueId}`">
    <v-menu
      close-on-content-click
      close-on-click
      transition="slide-y-transition"
      origin="center center"
      :attach="`#squad-teammate-${uniqueId}`"
    >
      <template v-slot:activator="{ on, attrs }">
        <!-- <v-btn dark color="primary" v-bind="attrs" v-on="on">
          Scale Transition
        </v-btn> -->

        <v-btn
          :class="[{ hidden: !isSelected }, 'close-button']"
          fab
          xSmall
          color="error elevation-10"
          @click="deselectPlayer"
        >
          <v-icon dark> fas fa-times </v-icon>
        </v-btn>
        <v-card
          @mouseover="hover = true"
          @mouseleave="hover = false"
          :class="{ 'card-active': hover }"
          color="green"
          class="text-center teammate__container"
          max-width="100%"
          :elevation="hover ? 5 : 0"
          rounded="lg"
          v-bind="attrs"
          v-on="on"
          @click.prevent="toggleDropdown(true)"
        >
          <span class="position up">{{ position }}</span>
          <div text-align="center" class="text-center player-shirt">
            <img
              :src="
                require(`@/assets/images/user-page/${
                  isSelected ? '10' : 'none'
                }.png`)
              "
              alt="player-shirt"
              class="mt-2"
            />
          </div>

          <v-divider></v-divider>

          <v-card-title class="player-name"> {{ player.name }} </v-card-title>
        </v-card>
      </template>
      <v-list v-if="isNotGK">
        <v-list-item
          v-for="{ player } in dropdownItems"
          :key="player.id"
          @click.stop="selectPlayer(player)"
        >
          <v-list-item-title v-text="player.name"></v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
export default {
  name: "SquadChoiceTeammate",
  props: {
    player: {
      type: Object,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    dropdownItems: {
      type: Array,
      required: false,
    },
    uniqueId: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      showDropdown: false,
      hover: false,
      isSelected: false,
    };
  },
  computed: {
    isNotGK() {
      return this.player?.position !== "GK";
    },
  },
  methods: {
    deselectPlayer() {
      this.toggleDropdown(false);
      this.$emit("deselect-player", this.player);
    },
    toggleDropdown(state) {
      this.showDropdown = state;
    },
    selectPlayer(player) {
      this.toggleDropdown(false);
      this.$emit("select-player", player);
    },
  },
  watch: {
    player(newPlayer) {
      this.isSelected = newPlayer?.id;
    },
  },
  created() {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "@/common/breakpoints.scss";

::v-deep .v-card__title {
  line-height: normal;
}

::v-deep .v-menu__content {
  top: 100px !important;
}

.teammate {
  position: relative;
  width: 150px;
}

.teammate__container {
  width: 100%;
  background-color: #ababab42 !important;
}

.position {
  position: absolute;
  top: 0px;
  left: 0px;
  padding: 2px 4px 2px 4px;
  font-weight: bold;
  font-size: 0.8rem;
  background-color: darkgreen;
  border-bottom-right-radius: 6px;
  color: white;
  border-top-right-radius: 0px !important;
}

.captain {
  position: absolute;
  top: 0px;
  right: 0px;
  padding: 2px 6px 2px 6px;
  font-weight: bold;
  font-size: 0.8rem;
  background-color: #8f3f41;
  border-bottom-left-radius: 6px;
  color: white;
  border-top-right-radius: 8px !important;
}

.player-name {
  font-size: 0.75rem;
  margin: 0px 0 0 0 !important;
  padding: 5px 0 5px 0 !important;
  justify-content: center;
  background-color: #154c1b;
  color: white;
}
.player-points {
  font-size: 0.75rem;
  margin: 0px 0 0 0 !important;
  padding: 0px 0 0 0 !important;
  justify-content: center;
  font-weight: bold;
  color: white !important;
  background-color: #2e6333;
}

.card-active {
  transition: box-shadow 0.2s;
  cursor: pointer;
  z-index: 10;
}

.player-shirt {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media #{$mobile} {
    width: 95%;
    align-items: center;
  }
}
.player-shirt img {
  width: 40%;
  padding: 0 0 5px 0;
  transition: all 0.3s;
  @media #{$mobile} {
    width: 65%;
  }
}

.card-active img {
  transform: scale(1.1);
}

.close-button {
  position: absolute;
  top: -15px;
  right: -15px;
  z-index: 100;
  transition: opacity 0.2s;
}
.hidden {
  opacity: 0;
}
</style>
