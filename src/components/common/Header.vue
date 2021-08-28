<template>
  <header>
    <img src="@/assets/images/home/banner_home.webp" alt="banner_home" />
    <h1 class="up h1-hidden">Fantasy Legends</h1>
  </header>
</template>

<script>
// import Navigation from "./Navigation";

export default {
  name: "Header",
  components: {},
  data() {
    return {};
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../../common/breakpoints.scss";
/*********** HEADER & NAVIGATION ***************/
header {
  width: 100%;
  margin: 0px;
  padding: 0px;
  background-size: contain;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column-reverse;

  @media #{$mobile} {
    position: inherit;
    flex-direction: column;
  }

  > img {
    width: 100%;
    @media #{$mobile} {
      display: none;
    }
  }
}
.h1-hidden {
  z-index: 999;
  background-color: transparent;
  width: 100%;
  position: absolute;
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 1.75rem;
  color: #edeaeb;
  display: none;
  @media #{$mobile} {
    position: inherit;
    display: block;
    background-color: #505559;
    color: #c6c6c6;
    box-shadow: 0px 5px 15px 1px rgb(58 58 58 / 75%);
  }
}

/***********NAVIGATION END **************/
</style>
