import routes from "./routes";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  // 判断页面是否允许匿名访问
  const isAllow = to.meta.allowAnonymous || false;
  if (isAllow) {
    // 允许匿名访问
    next();
  } else {
    // 不允许匿名访问的页面 需要登录后才能访问
    next();
  }
});

export default router;
