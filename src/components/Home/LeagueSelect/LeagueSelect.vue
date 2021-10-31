<template>
  <section class="choose-league">
    <div class="up sha choose-league-title">
      <h2>Choose your league</h2>
    </div>

    <LeagueBtn
      used="home"
      v-for="(l, i) in leagues"
      :key="i"
      :title="l.name"
      :id="l.id"
      :logo="selectedLeague === l.id ? l.logoActive : l.logoBig"
      @selectedLeague="selectedLeagueHandler($event)"
      :class="{ lgActive: selectedLeague === l.id }"
    ></LeagueBtn>
  </section>
</template>

<script>
// import LeagueBtn from "./LeagueBtn";
const LeagueBtn = () => import("./LeagueBtn");


export default {
  name: "LeagueSelect",
  components: {
    LeagueBtn
  },
  props: {
    leagues: {
      type: Array,
      required: true,
    },
    selectedLeague: {
      type: String
    }
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    selectedLeagueHandler(x) {
      return this.$emit("selectedLeague", x);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../../../common/breakpoints.scss";

.choose-league {
  width: 20%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  transition: all 0.3s;

  @media #{$mobile} {
    width: 100%;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-evenly;
  }

  .choose-league-title {
    width: 100%;
    height: 50px;
    background-color: #3b464d;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    position: relative;
    @media #{$mobile} {
      height: 30px;
    }

    h2 {
      font-size: 1rem;
      color: #e5e3e4;
      text-align: center;

      @media #{$mobile} {
        text-transform: uppercase;
      }
    }
  }
}
</style>