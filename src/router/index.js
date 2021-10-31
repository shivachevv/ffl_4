import Vue from "vue";
import VueRouter from "vue-router";
import AdminPanel from "../views/AdminPanel.vue";
import TeamDetails from "../views/TeamDetails.vue";
import Home from "../views/Home.vue";
import store from "@/store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/admin",
    name: "AdminPanel",
    component: AdminPanel,
  },
  {
    path: "/team-details/:userId",
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

router.beforeEach((to, from, next) => {
  if (store.getters["notifications/notifications"]?.length) {
    store.dispatch("notifications/clearNotifications");
  }
  next();
});

export default router;
