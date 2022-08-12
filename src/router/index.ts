import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import MainView from "@/views/MainView.vue";
import PageNotFoundView from "@/views/PageNotFoundView.vue";
import LoginPage from "@/components/login/login-page.vue";
import RegistrationPage from "@/components/registration/registration-page.vue";
import CatalogComponent from "@/components/catalog/catalog.component.vue";
import BasketComponent from "@/components/basket/basket.component.vue";
import OrderListComponent from "@/components/order/order-list.component.vue";

import ManagementCatalogComponent from "@/components/management/catalog/management-catalog.component.vue";

import authService from "@/services/auth.service";
import userService from "@/services/user.service";

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
    name: "main",
    component: MainView,
    meta: {
      auth: true,
    },
    children: [
      {
        path: "",
        name: "catalog",
        component: CatalogComponent,
      },
      {
        path: "page-:number/",
        name: "catalogPagination",
        component: CatalogComponent,
      },
      {
        path: "basket/",
        name: "basket",
        component: BasketComponent,
      },
      {
        path: "orders/",
        name: "orders",
        component: OrderListComponent,
      },
    ],
  },
  {
    path: "/management/",
    name: "management",
    component: MainView,
    redirect: "/management/catalog/",
    meta: {
      auth: true,
      manager: true,
    },
    children: [
      {
        path: "catalog/",
        name: "managementCatalog",
        component: ManagementCatalogComponent,
      },
      {
        path: "catalog/page-:number/",
        name: "catalogPagination",
        component: ManagementCatalogComponent,
      },
    ],
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
    next({ name: "catalog" });
  }

  if (to.matched.some((record) => record.meta.manager)) {
    if (userService.isManager()) {
      next();
      return;
    }
    next({ name: "catalog" });
  }

  next();
});

export default router;
