<template>
  <v-app>
    <v-main>
      <v-row :no-gutters="true">
        <v-col>
          <NavBar />
        </v-col>
      </v-row>
      <div id="app">
        <button @click.prevent="logIn">Log In</button>
        <Header />
        <Logos />
        <transition name="slide-left" mode="out-in">
          <router-view />
        </transition>
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
