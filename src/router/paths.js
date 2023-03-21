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
  //Report Start
  {
    path: "/report/balance",
    name: "balance",
    component: () => import("../pages/report/balance.vue"),
  },
  {
    path: "/report/salereport",
    name: "salereport",
    component: () => import("../pages/report/salereport.vue"),
  },
  {
    path: "/report/product",
    name: "product",
    component: () => import("../pages/report/product.vue"),
  },
  {
    path: "/report/productdetailreport",
    name: "productdetailreport",
    component: () => import("../pages/report/productdetailreport.vue"),
  },
  {
    path: "/report/productdetailgroupreport",
    name: "productdetailgroupreport",
    component: () => import("../pages/report/productdetailgroupreport.vue"),
  },
  {
    path: "/report/productdetailCatrgoryReport",
    name: "productdetailCatrgoryReport",
    component: () => import("../pages/report/productdetailcatrgoryreport.vue"),
  },

  {
    path: "/report/productbarcodereport",
    name: "productbarcodereport",
    component: () => import("../pages/report/productbarcodereport.vue"),
  },
  {
    path: "/report/productsalebarcodereport",
    name: "productsalebarcodereport",
    component: () => import("../pages/report/productsalebarcodereport.vue"),
  },
  {
    path: "/report/productsalepricereport",
    name: "productsalepricereport",
    component: () => import("../pages/report/productsalepricereport.vue"),
  },
  //Report end
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
