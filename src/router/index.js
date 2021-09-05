import Vue from "vue";
import VueRouter from "vue-router";
import AdminPanel from "../views/AdminPanel.vue";
import TeamDetails from "../views/TeamDetails.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
  },
  {
    path: "/admin",
    name: "AdminPanel",
    component: AdminPanel,
  },
  {
    path: "/team-details",
    component: TeamDetails,
    props: true,
    name: "UserPage",
    beforeEnter(to, from, next) {
      document.title = "My Team";
      next();
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
