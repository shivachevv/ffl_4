<template>
  <div>
    <h1>Page Not Found!</h1>
    <img src="https://cdn4.iconfinder.com/data/icons/faces-10/96/sadness-512.png" alt />
  </div>
</template>

<script>
export default {
  name: "NotFound",
  props: {},
  data() {
    return {};
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
div {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  h1 {
    font-size: 2rem;
  }
  img {
    width: 300px;
  }
}
</style>