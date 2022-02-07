<template>
  <section class="maradona-container">
    <div class="league-title up sha">
      <h2>
        League
        <br />
        {{ selectedLeague.name }}
      </h2>
      <img
        :src="getPictureByName(selectedLeague.name, '-big.png')"
        :alt="`${selectedLeague.name} logo`"
      />
    </div>

    <Tow
      :selectedLeague="selectedLeague"
      :currentRound="currentRound"
      :users="users"
    ></Tow>

    <Last5Transfers :selectedLeague="selectedLeague"></Last5Transfers>
  </section>
</template>

<script>
const Tow = () => import("./Tow");
const Last5Transfers = () => import("./Last5Transfers");
import { getPictureByName } from "../../../utils/getPictureByName";

export default {
  name: "SelectedLgDetails",
  components: {
    Tow,
    Last5Transfers,
  },
  props: {
    selectedLeague: {
      type: Object,
      default: () => {},
    },
    users: {
      type: Array,
      default: () => [],
    },
    currentRound: {
      type: Object,
      default: () => {},
    },
    // standings: {
    //   type: Object,
    //   required: true
    // }
  },
  methods: {},
  filters: {},
  data() {
    return { getPictureByName };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../../../common/breakpoints.scss";

.pele-container,
.maradona-container {
  width: 30%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  transition: all 0.3s;
  /*overflow:hidden;*/
  @media #{$mobile} {
    width: 95%;
  }
}

.pele-container {
  z-index: 900;
}

.maradona-container {
  z-index: 800;
}

/*************** TITLE ************/

.league-title {
  width: 100%;
  background-color: #3b464d;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: relative;
  /*overflow: hidden;*/
}

.league-title::after {
  content: "";
  position: absolute;
  left: 0px;
  width: 100%;
  height: 0%;
  border-bottom: 1px solid #cc3b34;
}

.league-title img {
  height: 49px;
  position: absolute;
  background-color: #3b464d;
  top: 0px;
  z-index: 900;
  transition: all 0.1s;
}

.pele-container > .league-title img {
  padding: 5px 5px 5px 0px;
  right: 0px;
}

.maradona-container > .league-title img {
  padding: 5px 0px 5px 5px;
  left: 0px;
}

.league-title h2 {
  font-size: 1.125rem;
  color: #e5e3e4;
  /* margin: 6px 0; */
  line-height: 25px;
  text-align: center;

  @media #{$mobile} {
    text-transform: uppercase;
  }
}
</style>
