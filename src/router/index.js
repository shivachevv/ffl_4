import Vue from "vue";
import VueRouter from "vue-router";
const AdminPanel = () => import("../views/AdminPanel");
const TeamDetails = () => import("../views/TeamDetails");
const TransfersCenter = () => import("../views/TransfersCenter");
const AllTransfers = () => import("../views/AllTransfers");
import store from "@/store";

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
    path: "/team-details/:userId",
    component: TeamDetails,
    props: true,
    name: "UserPage",
    beforeEnter(to, from, next) {
      document.title = "My Team";
      next();
    },
  },
  {
    path: "/transfers-center",
    component: TransfersCenter,
    props: true,
    name: "TransfersCenter",
    beforeEnter(to, from, next) {
      document.title = "Transfers Center";
      next();
    },
  },
  {
    path: "/all-transfers",
    component: AllTransfers,
    props: true,
    name: "AllTransfers",
    beforeEnter(to, from, next) {
      document.title = "All Transfers";
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