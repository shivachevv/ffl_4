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
    >
      <span class="position up">{{ position | prettyPosition }}</span>
      <span v-if="isCap && !isTripple && !isVCap" class="captain">C</span>
      <span v-if="!isCap && !isTripple && isVCap" class="captain">VC</span>
      <span v-if="(isCap || isVCap) && isTripple" class="captain">SC</span>
      <div text-align="center" class="text-center player-shirt">
        <img
          :src="`https://ff-legends.com/team-kits/10.png?version=1`"
          alt="player-shirt"
          width="30%"
          class="mt-2"
        />
      </div>

      <v-divider></v-divider>

      <v-card-title class="player-name"> {{ player.name }} </v-card-title>

      <v-card-subtitle class="player-points">
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
    },
    isCap: {
      type: Boolean,
    },
    isVCap: {
      type: Boolean,
    },
    isVCActive: {
      type: Boolean,
    },
  },
  data() {
    return {
      hover: false,
    };
  },
  computed: {
    calculatedPlayerPts() {
      return this.player?.player_points[0]?.round_pts || 0;
      // const { isTripple, isCap, isVCap, isVCActive, player, tmpRndShow } = this;
      // const pts = Number(player.points[`r${tmpRndShow}`].roundPts);
      // const multiplier = isTripple ? 3 : 2;
      // // console.log(isVCActive);
      // if (isCap && !isVCap && !isTripple && !isVCActive) {
      //   // console.log(1);
      //   return pts * multiplier;
      // } else if (isCap && !isVCap && isTripple && !isVCActive) {
      //   // console.log(2);
      //   return pts * multiplier;
      // } else if (!isCap && isVCap && !isTripple && isVCActive) {
      //   // console.log(3);
      //   return pts * multiplier;
      // } else if (!isCap && isVCap && isTripple && isVCActive) {
      //   // console.log(4);
      //   return pts * multiplier;
      // } else {
      //   return pts;
      // }
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
  width: 70%;
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
