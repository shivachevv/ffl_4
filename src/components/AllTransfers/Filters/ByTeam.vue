<template>
  <div class="filter-by-team sha">
    <h3 class="filter-title up">User Teams filter</h3>
    <v-select
      class="mt-2 select"
      :items="users"
      label="Select Team"
      multiple
      filled
      solo
      dense
      item-text="user_team"
      item-value="id"
      @change="filterSelectHandler"
      v-model="innerSelectedTeams"
    ></v-select>
  </div>
</template>

<script>
export default {
  name: "ByTeam",
  components: {},
  props: {
    users: {
      type: Array,
      required: true,
    },
    selectedTeams: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      innerSelectedTeams: [],
    };
  },
  methods: {
    filterSelectHandler() {
      this.$emit("update:selectedTeams", this.innerSelectedTeams);
    },
  },
  watch: {
    selectedTeams(newValue) {
      this.innerSelectedTeams = newValue;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../../../common/breakpoints.scss";

.filter-by-team {
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

  .by-team-select {
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
