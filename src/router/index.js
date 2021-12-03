import Vue from "vue";
import VueRouter from "vue-router";
const AdminPanel = () => import("../views/AdminPanel");
const TeamDetails = () => import("../views/TeamDetails");
const TransfersCenter = () => import("../views/TransfersCenter");
const AllTransfers = () => import("../views/AllTransfers");
const Login = () => import("../views/Login");
import store from "@/store";

Vue.use(VueRouter);

const setPageTitle = (to, from, next) => {
  document.title = to.meta.title || "Fantasy Football Legends";
  return next();
};

const clearNotifications = (to, from, next) => {
  if (store.getters["notifications/notifications"]?.length) {
    store.dispatch("notifications/clearNotifications");
  }
  return next();
};

const isAuthenticated = async (to, from, next) => {
  await store.dispatch("user/fetchLoggedUser");
  const loggedUser = store.getters["user/getLoggerUser"];
  if (!to.meta.requiresAuth) {
    return to.name === "Login" ? (loggedUser ? next("/") : next()) : next();
  }
  if (!loggedUser) {
    return next({
      path: "/login",
    });
  }
  return next();
};

const routes = [
  {
    path: "/",
    name: "Home",
    meta: { requiresAuth: false, title: "FFL Home" },
  },
  {
    path: "/admin",
    name: "AdminPanel",
    component: AdminPanel,
    meta: { requiresAuth: true, title: "Admin Panel" },
  },
  {
    path: "/team-details/:userId",
    component: TeamDetails,
    props: true,
    name: "UserPage",
    meta: { requiresAuth: true, title: "My Team" },
  },
  {
    path: "/transfers-center",
    component: TransfersCenter,
    props: true,
    name: "TransfersCenter",
    meta: { requiresAuth: false, title: "Transfers Center" },
  },
  {
    path: "/login",
    component: Login,
    props: true,
    name: "Login",
    meta: { requiresAuth: false, title: "Login" },
  },
  {
    path: "/all-transfers",
    component: AllTransfers,
    props: true,
    name: "AllTransfers",
    meta: { requiresAuth: true, title: "All Transfers" },
  },
  {
    path: "/transfers-center/:userId",
    component: TransfersCenter,
    props: true,
    name: "TransfersCenter",
    beforeEnter(to, from, next) {
      document.title = "Transfers Center";
      next();
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(clearNotifications);

router.beforeEach(isAuthenticated);

router.beforeEach(setPageTitle);

export default router;
