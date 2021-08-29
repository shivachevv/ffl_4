<template>
  <div class="navbar mt-16">
    <v-navigation-drawer v-model="sidebar" app bottom>
      <v-list>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          :to="item.path"
        >
          <v-list-item-content>{{ item.title }}</v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar height="85px" color="#b3b3b3">
      <v-toolbar-title class="mt-2">
        <router-link to="/">
          <img class="navbar-logo" src="logo.png" />
        </router-link>
      </v-toolbar-title>
      <span class="navbar-title">Fantasy Football Legends</span>
      <span class="navbar-hamburger hidden-md-and-up">
        <v-app-bar-nav-icon @click="sidebar = !sidebar"></v-app-bar-nav-icon>
      </span>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn
          text
          color="#ffffff"
          v-for="(item, index) in items"
          :key="index"
          :to="item.path"
        >
          {{ item.title }}
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sidebar: false,
      items: [
        { title: "HOME", path: "/" },
        { title: "TRANSFERS", path: "/transfers" },
        { title: "CUP", path: "/cup" },
        { title: "H2H", path: "/h2h" },
        { title: "RULES & PRIZES", path: "/rules_prizes" },
        { title: "ADMIN", path: "/admin" },
        { title: "LOGIN", path: "/login" },
        { title: "DONATE", path: "/donate" },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.navbar-title {
  display: none;
}
@media only screen and (max-width: 960px) {
  .navbar {
    position: fixed;
    z-index: 100;
    bottom: 0;
    width: 100%;
  }
  .navbar-logo {
    height: 85px;
    float: left;
    margin: 0 0 8px 5px;
  }
  ::v-deep .v-toolbar__content {
    padding: 0;
    width: 100%;
    justify-content: flex-end !important;
    float: right !important;
  }
  .navbar-hamburger {
    order: 4;
  }
  .navbar-title {
    display: inline-block;
    font-size: 20px;
    margin-left: 15px;
    font-weight: bold;
  }
}
@media only screen and (max-width: 400px) {
  .navbar-title {
    display: inline-block;
    font-size: 16px;
    margin-left: 15px;
    font-weight: bold;
  }
}
</style>
