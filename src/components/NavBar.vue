<template>
  <div class="mt-16">
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
      <span class="hidden-md-and-up">
        <v-app-bar-nav-icon @click="sidebar = !sidebar"></v-app-bar-nav-icon>
      </span>
      <v-toolbar-title class="mt-2">
        <router-link to="/">
          <img src="logo.png" />
        </router-link>
      </v-toolbar-title>
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
      appTitle: "Awesome App",
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

<style lang="scss" scoped></style>
