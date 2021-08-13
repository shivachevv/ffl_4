<template>
  <div>
    <div>
      <v-toolbar class="mt-15" color="grey" height="83">
        <img src="logo.png" />
        <template>
          <v-tabs color="white" centered>
            <v-tabs-slider color="white"></v-tabs-slider>
            <v-tab v-for="(item, index) in items" :key="index">
              {{ item.title }}
            </v-tab>
          </v-tabs>
        </template>
      </v-toolbar>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
