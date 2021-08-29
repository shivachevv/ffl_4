<template>
  <v-app>
    <v-row no-gutters="true">
      <v-col>
        <NavBar />
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import NavBar from "./components/NavBar.vue";

export default {
  name: "App",

  components: {
    NavBar,
  },
};
</script>
