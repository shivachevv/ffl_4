<template>
  <div>
    <div class="logo" v-for="team in leagueSelected" :key="team.email">
      <router-link :to="team.teamName">
        <img :src="require(`@/assets/images/team-logos/${team.teamLogo}.png`)" alt="Team logo" />
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Half",
  props: {
    leagueSelected: {
      type: Array,
      required: true
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>