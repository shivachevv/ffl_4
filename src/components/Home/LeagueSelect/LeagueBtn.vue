<template>
  <div
    class="sha"
    :class="{
      home_choose_lg_container: used === 'home',
      transfers_choose_lg_container: used === 'transfers'
    }"
    @click="selectLeagueHandler(id)"
  >
    <img
      :src="require(`@/assets/images/home/${logo}.png`)"
      :alt="`${title} logo`"
    />
    <p class="up">{{ title }}</p>
  </div>
</template>

<script>
export default {
  name: "LeagueBtn",
  props: {
    title: {
      type: String,
      required: true
    },
    logo: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    },
    used: {
      type: String,
      required: true
    }
  },
  methods: {
    selectLeagueHandler(x) {
      return this.$emit("selectedLeague", x);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../../../common/breakpoints.scss";

$dark-grey: #1b2e32;
$light-grey: #d3d3d3;
$dark-red: #9d5659;

.home_choose_lg_container {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-top: 20px;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    transform: scale(1.02);
  }

  @media #{$mobile} {
    width: 45%;
    justify-content: space-around;
    margin-top: 10px;
  }

  img {
    width: 30%;
    margin: 10px;

    @media #{$mobile} {
      width: 20%;
      margin: 5px 0px;
    }
  }
  p {
    font-size: 1rem;
    margin: 0 20px 0 0;
    padding: 5px;
    border-top: 2px solid $dark-grey;
    border-bottom: 2px solid $dark-grey;
    width: 70%;
    text-align: center;
    text-decoration: none;
    color: $dark-grey;
    transition: all 0.2s;

    @media #{$mobile} {
      width: 70%;
      margin: 0px;
    }

    &:hover {
      padding: 10px;
    }
  }
}
.transfers_choose_lg_container {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin: 20px 5px 0 5px;
  cursor: pointer;
  transition: all 0.3s;
  padding: 5px;
  @media #{$mobile} {
    width: 45%;
    justify-content: space-around;
    margin-top: 10px;
    flex-direction: row;
  }

  &:hover {
    transform: scale(1.02);
  }

  img {
    width: 30%;
    margin: 10px;
    @media #{$mobile} {
      width: 20%;
      margin: 5px 0px;
    }
  }
  p {
    font-size: 1rem;
    margin: 0 0 5px 0;
    padding: 5px;
    border-top: 2px solid #1b2e32;
    border-bottom: 2px solid #1b2e32;
    width: 90%;
    text-align: center;
    text-decoration: none;
    color: #1b2e32;
    transition: all 0.2s;
    @media #{$mobile} {
      width: 70%;
      margin: 0px;
    }

    &:hover {
      padding: 10px;
    }
  }
}
.lgActive {
  background-color: $dark-red;
  p {
    border-top: 2px solid $light-grey;
    border-bottom: 2px solid $light-grey;
    color: $light-grey;
    padding: 10px;
  }
}
</style>