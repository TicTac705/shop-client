import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginPage from "@/components/login/login-page.vue";
import CatalogComponent from "@/components/catalog/catalog.component.vue";
import BasketComponent from "@/components/basket/basket.component.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/auth",
    name: "login",
    component: LoginPage,
  },
  {
    path: "/",
    name: "catalogDef",
    component: HomeView,
  },
  {
    path: "/catalog",
    name: "catalog",
    component: CatalogComponent,
  },
  {
    path: "/basket",
    name: "basket",
    component: BasketComponent,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
