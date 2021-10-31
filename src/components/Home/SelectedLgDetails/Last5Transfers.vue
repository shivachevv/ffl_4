<template>
  <div class="league-last5 sha hover">
    <div class="last5-heading up">
      <div>
        <img
          :src="require(`@/assets/images/home/last5.png`)"
          alt="last5-logo`"
        />
      </div>
      <h2>Last 5 transfers</h2>
    </div>
    <div class="transfers-container" v-if="last5TransfersReady">
      <div class="transfer" v-for="(tr, i) in last5TransfersReady" :key="i">
        <p class="up arr">{{ users[tr.team].userTeam }}</p>
        <router-link
          :to="`/team-details/${users[tr.team].userLogo}`"
          class="transfer-details"
        >
          <span class="tr-round up">R{{ tr.round }}</span>
          <span class="tr-in">
            {{ players[tr.transferIn].name }}
            <br />
            <span>{{ players[tr.transferIn].club }}</span>
          </span>
          <span class="tr-pos up">{{ tr.position }}</span>
          <span class="tr-out">
            {{ players[tr.transferOut].name }}
            <br />
            <span>{{ players[tr.transferOut].club }}</span>
          </span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Last5Transfers',
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
    }
  },
  data () {
    return {}
  },
  methods: {
    ...mapActions(['fetchTransfers'])
  },
  computed: {
    ...mapGetters(['transfers']),
    last5TransfersReady () {
      if (!this.transfers) {
        return ''
      }
      const destructured = [...Object.values(this.transfers)]
        .map(x => {
          const obj = Object.values(x)
          return [...Object.values(obj)]
        })
        .flat()
        .map(x => {
          return [...Object.values(x)]
        })
        .flat()
        .filter(x => {
          if (this.selectedLeagueObj.teams.includes(x.team)) {
            return x
          }
        })
        .filter(x => {
          if (x.status !== 'cancelled' && x.status !== 'pending') {
            return x
          }
        })
        .sort((a, b) => {
          return new Date(b.timeMade) - new Date(a.timeMade)
        })
        .sort((a, b) => {
          return b.round - a.round
        })
        .filter((x, i) => {
          if (i <= 4) {
            return x
          }
        })

      return destructured
    }
  },
  created () {
    this.fetchTransfers()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
/********** LAST 5 TRANSFERS **********/
.league-last5 {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: #4e585e;
  margin: 20px 0 0 0;
  position: relative;
  transition: all 0.3s;
  &:hover {
    transform: scale(1.02);
  }
}
.last5-heading {
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
    width: 85%;
    margin: 15px 0 10px 0;
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
.transfers-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: #9fa5a9;
  p {
    width: 100%;
    color: #311617;
    font-size: 0.875rem;
    font-weight: bold;
    text-align: center;
    margin: 20px 0 0 0;
    position: relative;
  }
  > .transfer {
    > .arr {
      &::after {
        position: absolute;
        content: '';
        left: 20px;
        bottom: 0;
        width: 40px;
        height: 17px;
        border-bottom: 15px solid #5b745b;
        border-top: 0px solid transparent;
        border-left: 20px solid transparent;
        border-right: 20px solid transparent;
      }
      &::before {
        position: absolute;
        content: '';
        right: 20px;
        bottom: 0;
        width: 40px;
        height: 17px;
        border-top: 15px solid #8e5e60;
        border-bottom: 0px solid transparent;
        border-left: 20px solid transparent;
        border-right: 20px solid transparent;
      }
    }
  }
}
.transfer {
  width: 100%;
}
.transfer-details {
  width: 100%;
  height: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: relative;
  color: #ffffff;
  background-color: #9d5659;
  border-top: 1px solid #533536;
  border-bottom: 1px solid #533536;
  font-size: 0.75rem;
  margin: 5px 0 0 0;
  &:hover {
    background-color: darken($color: #9d5659, $amount: 5);
    cursor: pointer;
    .tr-round {
      padding: 0 0 0 10px;
    }
    .tr-pos {
      padding: 0 10px;
    }
    .tr-in {
      right: 58%;
    }
    .tr-out {
      left: 58%;
    }
  }
}
.tr-round {
  position: absolute;
  top: 0px;
  left: 0px;
  background-color: #633d3e;
  height: 38px;
  text-align: center;
  line-height: 38px;
  padding: 0 0 0 5px;
  transition: all 0.3s;
  &::before {
    content: '';
    position: absolute;
    right: -34px;
    top: -1px;
    width: 20px;
    height: 38px;
    border-bottom: 20px solid transparent;
    border-top: 20px solid transparent;
    border-left: 14px solid #633d3e;
    border-right: 20px solid transparent;
  }
}
.tr-in {
  text-align: right;
  position: absolute;
  right: 56%;
  top: 7px;
  transition: all 0.3s;
  span {
    font-size: 0.6875rem;
  }
}
.tr-out {
  text-align: left;
  position: absolute;
  left: 56%;
  top: 7px;
  transition: all 0.3s;
  span {
    font-size: 0.6875rem;
  }
}
.tr-pos {
  height: 100%;
  background-color: #633d3e;
  text-align: center;
  line-height: 38px;
  padding: 0 7px;
  margin: 0 10px;
  transition: all 0.3s;
}
</style>
