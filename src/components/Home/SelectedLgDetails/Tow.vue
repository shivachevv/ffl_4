<template>
  <div class="league-tow sha hover" v-if='towReady.length'>
    <div class="tow-heading up">
      <div>
        <img :src="getPictureByName('tow.png')" alt="tow-icon`" />
      </div>
      <h2>Team of the week</h2>
    </div>
    <div class="tow-points" v-for="team in towReady" :key='team.id'>
      <router-link :to="`/team-details`" tag="h2" class="tow up">
        {{ team.teamName }}
      </router-link>
      <span class="tow-points-number">{{ team.lastRound }} pts</span>
    </div>
  </div>
</template>

<script>
import { getPictureByName } from "../../../utils/getPictureByName";
import { mapState } from "vuex";

export default {
  name: "Tow",
  props: {
    selectedLeague: {
      type: Object,
      default: () => {},
    },
    currentRound: {
      type: Object,
      default: () => {},
    },
    users: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return { getPictureByName };
  },
  methods: {},
  computed: {
    ...mapState("standings", ["standings"]),
    towReady() {
      if (!this.standings.length) {
        return [];
      }
      const tow = [...this.standings].sort((a, b) => {
        return b.lastRound - a.lastRound;
      });
      
      return tow.filter(team => team.lastRound === tow[0].lastRound);
    },
  },
  created() {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
/*************** TEAM OF THE WEEK ***********/
* {
  transition: all 0.3s;
}
.league-tow {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: #4e585e;
  margin: 20px 0 0 0;
  position: relative;
  overflow: hidden;
  transition: all 0.3s;
  &:hover {
    transform: scale(1.02);
  }
}
.tow-heading {
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  background-color: #4e585e;
  > div {
    display: inline-block;
    width: 50px;
    height: 50px;
    background-color: #838a8e;
    text-align: center;
  }
  img {
    width: 30px;
    margin: 10px 0 10px 0;
  }
  h2 {
    width: 100%;
    height: 100%;
    text-align: center;
    font-size: 1.125rem;
    color: #c6c6c6;
    line-height: 50px;
  }
}
.tow-points {
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #9fa5a9;
  cursor: pointer;
  &:hover {
    h2 {
      text-decoration: underline;
      background-color: darken($color: #9fa5a9, $amount: 5);
    }
    span {
      width: 50%;
      border-left: 10px solid #794446;
      background-color: darken($color: #633d3e, $amount: 5);
    }
  }
  img {
    width: 8%;
    margin: 10px;
  }
  h2 {
    width: 100%;
    height: 100%;
    text-align: left;
    font-size: 1.125rem;
    color: #232f37;
    line-height: 50px;
    padding: 0 0 0 15px;
    transition: all 0.3s;
  }
  a {
    text-decoration: none;
    color: #232f37;
    &:hover {
      text-decoration: underline;
      color: #232f37;
    }
  }
  span {
    display: inline-block;
    align-self: flex-end;
    height: 50px;
    width: 35%;
    background-color: #633d3e;
    border-left: 5px solid #794446;
    text-align: center;
    line-height: 50px;
    color: #e5e3e4;
  }
}
</style>