import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/home.vue";
import Page1 from "../pages/page1.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/page1", component: Page1 },
];

const router = createRouter({
  routes, // `routes: routes` 的缩写
  history: createWebHistory(),
});

export default router;
