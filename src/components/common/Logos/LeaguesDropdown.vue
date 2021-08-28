<template>
  <div class="logo-separator up">
    <a a href @click.prevent="toggleDropdown">{{ leagues[selected].name }}</a>
    <svg viewBox="0 0 1030 638" width="10">
      <path
        d="M1017 68L541 626q-11 12-26 12t-26-12L13 68Q-3 49 6 24.5T39 0h952q24 0 33 24.5t-7 43.5z"
        fill="#794446"
      />
    </svg>
    <transition name="slide" appear>
      <div class="sub-menu" v-if="dropdownToggle">
        <div
          class="menu-item"
          v-for="league in Object.keys(leagues)"
          :key="league"
        >
          <a href @click.prevent="selectedLeagueHandler(league)">{{
            leagues[league].name
          }}</a>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
// import { mapGetters } from "vuex";

export default {
  name: "LeaguesDropdown",
  props: {
    leagues: Object,
    selected: String
  },
  data() {
    return {
      selectedLeague: this.selected,
      dropdownToggle: false
    };
  },
  computed: {},
  methods: {
    selectedLeagueHandler(l) {
      this.selectedLeague = l;
      this.dropdownToggle = false;
      return this.$emit("selectedLeague", l);
    },
    toggleDropdown() {
      return (this.dropdownToggle = !this.dropdownToggle);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../../../common/breakpoints.scss";

/****************TEAM LOGOS*****************/

.logo-separator {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100px;
  height: 100%;
  background-color: #828a8d;
  cursor: pointer;

  @media #{$mobile} {
    width: 100%;
    height: auto;
  }

  a {
    text-decoration: none;
    font-weight: bold;
    color: white;

    @media #{$mobile} {
      width: 100%;
      text-align: center;
      padding: 10px 0 15px 0;
    }
  }
  svg {
    position: absolute;
    top: calc(72%);
    right: calc(50% - 7px);

    @media #{$mobile} {
      top: calc(73%);
    }
  }
  .sub-menu {
    position: absolute;
    background-color: #4e585e;
    top: calc(100%);
    left: 50%;
    transform: translateX(-50%);
    width: max-content;
    border-radius: 0px 0px 10px 10px;
    overflow: hidden;
    a {
      color: white;
      padding: 15px 15px 15px 15px;
      display: block;
      text-align: center;
      transition: all 0.3s;
      &:hover {
        background-color: #794446;
      }
    }
  }
}
.slide-enter-active {
  -moz-transition-duration: 0.3s;
  -webkit-transition-duration: 0.3s;
  -o-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -moz-transition-timing-function: ease-in;
  -webkit-transition-timing-function: ease-in;
  -o-transition-timing-function: ease-in;
  transition-timing-function: ease-in;
}

.slide-leave-active {
  -moz-transition-duration: 0.3s;
  -webkit-transition-duration: 0.3s;
  -o-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -moz-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
  -webkit-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
  -o-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
  transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
}

.slide-enter-to,
.slide-leave {
  max-height: 100px;
  overflow: hidden;
}

.slide-enter,
.slide-leave-to {
  overflow: hidden;
  max-height: 0;
}

/**************** TEAM LOGOS END *****************/
</style>