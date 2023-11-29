import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import PizzaHome from "../views/PizzaHome.vue";
import PizzaDetails from "../components/PizzaDetails.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: PizzaHome,
  },
  {
    path: "/pizza/:id",
    name: "PizzaDetails",
    component: PizzaDetails,
  },
  // {
  //   path: "/about",
  //   name: "about",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  // },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
