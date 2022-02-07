<template>
  <div>
    <v-card
      @mouseover="hover = true"
      @mouseleave="hover = false"
      :class="{ 'card-active': hover }"
      color="green"
      class="text-center teammate"
      max-width="100%"
      :elevation="hover ? 5 : 0"
      rounded="lg"
      @click.prevent="clickHandler"
    >
      <span class="position up">{{ position | prettyPosition }}</span>
      <span v-if="isCap && !isTripple && !isVCap" class="captain">C</span>
      <span v-if="!isCap && !isTripple && isVCap" class="captain">VC</span>
      <span v-if="(isCap || isVCap) && isTripple" class="captain">SC</span>
      <div text-align="center" class="text-center player-shirt">
        <img
          src="@/assets/images/user-page/10.png"
          alt="player-shirt"
          width="30%"
          class="mt-2"
        />
      </div>

      <v-divider></v-divider>

      <v-card-title class="player-name"> {{ player.name }} </v-card-title>

      <v-card-subtitle class="player-points" v-if="!isAdditional">
        {{ calculatedPlayerPts }} pts</v-card-subtitle
      >
    </v-card>
  </div>
</template>

<script>
export default {
  name: "Teammate",
  props: {
    // tmpRndShow: {
    //   type: Number,
    //   required: true,
    // },
    player: {
      type: Object,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    isTripple: {
      type: Boolean,
      required: false,
    },
    isCap: {
      type: Boolean,
      required: false,
    },
    isVCap: {
      type: Boolean,
      required: false,
    },
    isVCActive: {
      type: Boolean,
      required: false,
    },
    isAdditional: {
      type: Boolean,
      required: false,
    },
  },
  data() {
    return {
      hover: false,
    };
  },
  computed: {
    cap() {
      return (
        !this.isAdditional && this.isCap && !this.isTripple && !this.isVCap
      );
    },
    vCap() {
      return (
        !this.isAdditional && !this.isCap && !this.isTripple && this.isVCap
      );
    },
    superCap() {
      return (
        !this.isAdditional && (this.isCap || this.isVCap) && this.isTripple
      );
    },
    calculatedPlayerPts() {
      if (this.player.pointsround) {
        return this.player?.pointsround[0]?.roundPts || 0;
      }
      if (this.player.player_points) {
        return this.player?.player_points[0]?.round_pts || 0;
      }
      return 0;
    },
  },
  methods: {
    clickHandler() {
      this.$emit("player-action", this.player);
    },
  },
  filters: {
    prettyPosition(value) {
      return value.length === 2 ? value : value.substring(0, 2);
    },
  },
  watch: {},
  created() {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "@/common/breakpoints.scss";

::v-deep .v-card__title {
  line-height: normal;
}

.teammate {
  position: relative;
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
</style>
