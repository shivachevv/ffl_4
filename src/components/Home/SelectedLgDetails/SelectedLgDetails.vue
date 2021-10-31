<template>
  <section class="maradona-container">
    <div class="league-title up sha">
      <h2>
        League
        <br />
        {{selectedLeagueObj.name}}
      </h2>
      <img
        :src="require(`@/assets/images/home/${selectedLeagueObj.logoSmall}.png`)"
        :alt="`${selectedLeagueObj.name} logo`"
      />
    </div>

    <Tow :standings="standings" :selectedLeagueObj="selectedLeagueObj" :currentRound="currentRound" :users="users"></Tow>

    <Last5Transfers :selectedLeagueObj="selectedLeagueObj" :users="users" :players="players"></Last5Transfers>

  </section>
</template>

<script>
// import Tow from "./Tow";
// import Last5Transfers from "./Last5Transfers";
const Tow = () => import("./Tow");
const Last5Transfers = () => import("./Last5Transfers");

export default {
  name: "SelectedLgDetails",
  components: {
    Tow,
    Last5Transfers
  },
  props: {
    selectedLeagueObj: {
      type: Object,
      required: true
    },
    users: {
      type: Object,
      required: true
    },
    players: {
      type: Object,
      required: true
    },
    currentRound: {
      type: Number,
      required: true
    },
    standings: {
      type: Object,
      required: true
    }
  },
  methods:{
  },
  filters: {
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '../../../common/breakpoints.scss';

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