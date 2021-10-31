<template>
  <img
    :src="
      require(`@/assets/images/home/team-mov/${makeMovePath(movement)}.png`)
    "
    :alt="`${movement} logo`"
  />
</template>

<script>
export default {
  name: "MovementArrow",
  data() {
    return {};
  },
  props: {
    movement: {
      type: [String, Number],
      required: true,
    },
  },
  computed: {},
  methods: {
    makeMovePath(v) {
      if (v < 0) {
        return `d${v * -1}`;
      } else if (v > 0) {
        return `u${v}`;
      } else {
        return "no";
      }
    },
  },
  watch: {},
  async created() {},
  filters: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../../../common/breakpoints.scss";
img {
  // width: 100%;
}
</style>