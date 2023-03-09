import Home from "@/pages/Home.vue";
import HomeView from "../views/HomeView.vue";

export default [
  {
    path: "/home",
    name: "home",
    meta: {
      auth: true,
    },
    component: Home,
  },
  {
    path: "/",
    name: "dashboard",
    meta: {
      auth: true,
    },
    component: () => import("../pages/Dashboard.vue"),
  },
  {
    path: "/inventory/balance",
    name: "balance",
    component: () => import("../pages/inventory/balance.vue"),
  },
  {
    path: "/sale/salereport",
    name: "salereport",
    component: () => import("../pages/sale/salereport.vue"),
  },
  {
    path: "/login",
    name: "login",
    meta: {
      forwordauth: true,
      guest: true,
    },
    component: () => import("../pages/Login.vue"),
  },
  {
    path: "/me",
    name: "profile",
    meta: {
      auth: true,
    },
    component: () => import("../pages/Profile.vue"),
  },
  {
    path: "/logout",
    name: "logout",
    component: () => import("../pages/Logout.vue"),
  },
  {
    path: "/health-check",
    name: "health-check",
    component: () => import("../pages/HealthCheck.vue"),
  },
];
