<template>
  <div
    class="player-container"
    v-if="player"
    @click.prevent="playerPopupHandler(player)"
  >
    <h3 class="pos">{{ player.position }}</h3>
    <img
      :src="`https://ff-legends.com/team-kits/${player.shirt}.png?version=1`"
      alt="Player"
    />
    <h3 class="name">
      {{ player.name }}<br />
      {{ player.points[`r${currentRound - 1}`].roundPts }} pts
    </h3>
    <h3 class="team" v-for="(team, i) in player.userTeams" :key="i">
      {{ team }}
    </h3>
  </div>
</template>
<script>
export default {
  name: "BestTeamPlayer",

  components: {},
  props: {
    player: {
      type: Object,
      required: true
    },
    currentRound: {
      type: Number,
      required: true
    }
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    playerPopupHandler(p) {
      return this.$parent.$parent.$parent.$emit("playerPopupHandler", p);
    }
  }
};
</script>

<style scoped lang="scss">
@import "../../../common/breakpoints.scss";

.player-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  transition: all 0.3s;
  padding: 10px 0 20px 0;
  @media #{$mobile} {
    height: auto;
    margin: 0 1px;
  }

  &:hover {
    background-color: rgba(15, 53, 16, 0.5);
    cursor: pointer;

    img {
      transform: scale(1.1);
    }
  }

  .pos {
    width: 80%;
    border-bottom: 2px solid #79c486;
    color: white;
    font-size: 1.1rem;
    margin: 10px 0 10px 0;
    padding: 0 40px 10px;
    text-align: center;

    @media #{$mobile} {
      margin: 5px 0 5px 0;
      padding: 0 40px 5px;
    }
  }

  .team {
    color: white;
    font-size: 1.1rem;
    margin: 10px 0 10px 0;
    text-align: center;
    height: 1rem;

    @media #{$mobile} {
      font-size: 1rem;
      margin: 5px 0 5px 0;
    }
  }

  .name {
    width: 80%;
    color: white;
    font-size: 1.1rem;
    margin: 10px 0 10px 0;
    text-align: center;
    border-bottom: 2px solid #79c486;
    padding: 0 0 10px 0;
    line-height: 1.6rem;
    @media #{$mobile} {
      font-size: 1rem;
      margin: 5px 0 5px 0;
    }
  }

  img {
    width: 25%;
    transition: all 0.2s;

    @media #{$mobile} {
      width: 50%;
    }
  }
}
</style>