<template>
  <div class="filter-by-status sha">
    <h3 class="filter-title up">Status Filter</h3>
    <v-select
      class="mt-2 select"
      :items="statuses"
      label="Select Team"
      multiple
      filled
      solo
      dense
      full-width
      item-text="text"
      item-value="value"
      @change="filterSelectHandler"
      v-model="innerSelectedStatuses"
    ></v-select>
  </div>
</template>

<script>
// import "material-icons/iconfont/material-icons.css";

export default {
  name: "ByStatus",
  components: {},
  props: {
    selectedStatuses: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      innerSelectedStatuses: [],
      statuses: [
        {
          text: "Pending",
          value: "pending",
        },
        {
          text: "Approved",
          value: "approved",
        },
        {
          text: "Declined",
          value: "declined",
        },
      ],
    };
  },
  computed: {},
  methods: {
    filterSelectHandler() {
      this.$emit("update:selectedStatuses", this.innerSelectedStatuses);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../../../common/breakpoints.scss";

.filter-by-status {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: #d3d3d3;

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

  .select {
    width: 100%;
  }
}
</style>
