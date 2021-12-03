<template>
  <div class="filter-by-round sha">
    <h3 class="filter-title up">Round filter</h3>
    <v-select
      class="mt-2 select"
      :items="rounds"
      label="Select Round"
      multiple
      filled
      solo
      dense
      @change="filterSelectHandler"
      v-model="innerSelectedRounds"
    ></v-select>
  </div>
</template>

<script>
export default {
  name: "ByRound",
  components: {},
  props: {
    rounds: {
      type: Array,
      required: true,
    },
    selectedRounds: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      innerSelectedRounds: [],
    };
  },
  methods: {
    filterSelectHandler() {
      this.$emit("update:selectedRounds", this.innerSelectedRounds);
    },
  },
  watch: {
    selectedRounds(newValue) {
      this.innerSelectedRounds = newValue;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../../../common/breakpoints.scss";

.filter-by-round {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: #d3d3d3;
  overflow: hidden;

  .filter-title {
    width: 100%;
    padding: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #3b464d;
    color: lightgrey;
    border-bottom: 2px solid #893e40;
    font-weight: bold;
    font-size: 1rem;
  }
  .rounds-label {
    font-weight: bold;
    margin: 5px;
  }

  .by-round-select {
    padding: 5px;
    width: 94%;
    margin: 10px;
    background-color: #c6c6c6;
    height: 30px;
    color: #3b464d;
    font-size: 1rem;
  }

  .select {
    width: 100%;
  }
}
</style>
