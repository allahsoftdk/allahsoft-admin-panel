import { createRouter, createWebHistory } from "vue-router";
import indexComp from "../components/indexComp.vue";
import loginComp from "../components/loginComp.vue";
import userActivityComp from "../components/userActivityComp.vue";
import { axiosInstance } from "../../utils/axiosInstance"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "index",
      component: indexComp,
      props: true,
    },
    {
      path: "/login",
      name: "login",
      component: loginComp,
      props: true,
    },
    {
      path: "/activities/:id",
      name: "activities",
      component: userActivityComp,
      props: true,
    }
  ],
});

router.beforeEach(async (to, from, next) => {
  console.log(to);
  if (to.name !== "login") {
    try {
      const { data } = await axiosInstance.post("api/auth/restricted", {
        withCredentials: true,
      })
      if (data) {
        next();
      } else {
        next({ name: "login" });
      }
    } catch (error) {
      console.log(error)
      next({ name: "login" });
    }
  } else {
    next();
  }
});

export default router;