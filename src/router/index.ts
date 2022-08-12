import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginPage from "@/components/login/login-page.vue";
import CatalogComponent from "@/components/catalog/catalog.component.vue";
import BasketComponent from "@/components/basket/basket.component.vue";
import OrderListComponent from "@/components/order/order-list.component.vue";
import authService from "@/services/auth.service";
import PageNotFoundView from "@/views/PageNotFound.vue";
import RegistrationPage from "@/components/registration/registration-page.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/auth/",
    name: "login",
    component: LoginPage,
    meta: {
      guest: true,
    },
  },
  {
    path: "/sign-up/",
    name: "sign-up",
    component: RegistrationPage,
    meta: {
      guest: true,
    },
  },
  {
    path: "/",
    name: "catalogDef",
    component: HomeView,
    meta: {
      auth: true,
    },
  },
  {
    path: "/catalog/",
    name: "catalog",
    component: CatalogComponent,
    meta: {
      auth: true,
    },
  },
  {
    path: "/basket/",
    name: "basket",
    component: BasketComponent,
    meta: {
      auth: true,
    },
  },
  {
    path: "/orders/",
    name: "orders",
    component: OrderListComponent,
    meta: {
      auth: true,
    },
  },
  {
    path: "/404",
    name: "PageNotExist",
    component: PageNotFoundView,
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/404",
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.auth)) {
    if (authService.hasToken()) {
      next();
      return;
    }
    next({ name: "login" });
  }

  if (to.matched.some((record) => record.meta.guest)) {
    if (!authService.hasToken()) {
      next();
      return;
    }
    next({ name: "catalogDef" });
  }

  next();
});

export default router;
