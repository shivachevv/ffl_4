import Vue from "vue";
import VueRouter from "vue-router";
import AdminPanel from "../views/AdminPanel.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
  },
  {
    path: "/ffl-admin",
    name: "AdminPanel",
    component: AdminPanel,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
