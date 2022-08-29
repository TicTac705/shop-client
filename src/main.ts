import { createApp } from "vue";
import App from "./App.vue";
import Notifications from "@kyvg/vue3-notification";
import router from "./router";
import { BootstrapVue } from "bootstrap-vue";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

createApp(App).use(router).use(Notifications).mount("#app");
