<template>
  <v-app>
    <v-main>
      <v-row :no-gutters="true">
        <v-col>
          <NavBar />
        </v-col>
      </v-row>
      <div id="app">
        <Header />
        <Logos />
        <button @click.prevent="logIn">Log In</button>
        <transition name="slide-left" mode="out-in">
          <router-view />
        </transition>
        <button @click.prevent="fetch">fetch</button>
        <button @click.prevent="fetchPlayer">fetch League</button>
        <Footer />
      </div>
    </v-main>
  </v-app>
</template>

<script>
import axios from "axios";
import NavBar from "./components/NavBar.vue";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Logos from "./components/common/Logos/Logos";

export default {
  name: "App",
  components: {
    Header,
    Footer,
    Logos,
    NavBar,
  },

  data: () => ({}),
  methods: {
    async fetch() {
      await this.$store.dispatch("getClubsByLeague");
    },
    async fetchPlayer() {
      await this.$store.dispatch("fetchPlayersByLeague", 4);
    },
    logIn() {
      let data = JSON.stringify({
        email: "superadmin@info.dev",
        password: "password",
      });

      let config = {
        method: "post",
        url: "http://api.ff-legends.com/api/login",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          localStorage.setItem("Access-Token", response.data.data.accessToken);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss">
#app {
  background-color: lightgrey
}
</style>
