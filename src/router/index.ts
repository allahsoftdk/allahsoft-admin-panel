import { createRouter, createWebHistory } from "vue-router";
import indexComp from "../components/indexComp.vue";
import loginComp from "../components/loginComp.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: indexComp,
    },
    {
      path: "/login",
      name: "login",
      component: loginComp,
    }
  ],
});

export default router;
