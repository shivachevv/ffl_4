<template>
  <div class="league-tow sha hover" v-if="towRdy">
    <div class="tow-heading up">
      <div>
        <img :src="require(`@/assets/images/home/tow.png`)" alt="tow-icon`" />
      </div>
      <h2>Team of the week</h2>
    </div>
    <div class="tow-points" v-for="team in towRdy" :key="team[0]">
      <router-link
        :to="`/team-details/${users[team[0]].userLogo}`"
        tag="h2"
        class="tow up"
        >{{ users[team[0]].userTeam }}</router-link
      >
      <span class="tow-points-number">{{ team[1].lastRndTotal }} pts</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Tow",
  props: {
    selectedLeagueObj: {
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
    },
    users: {
      type: Object,
      required: true
    }
  },
  data() {
    return {};
  },
  methods: {},
  computed: {
    towRdy() {
      // const tow = Object.entries(
      //   this.standings[`r${this.currentRound}`][this.selectedLeagueObj.id]
      // ).sort((a, b) => {
      //   return b[1].lastRndTotal - a[1].lastRndTotal;
      // });
      const tow = Object.entries(
        this.standings[this.selectedLeagueObj.id]
      ).sort((a, b) => {
        return b[1].lastRndTotal - a[1].lastRndTotal;
      });
      const highest = Number(tow[0][1].lastRndTotal);
      return tow.filter(x => {
        if (x[1].lastRndTotal === highest) {
          return x;
        }
      });
    }
  },
  created() {}
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