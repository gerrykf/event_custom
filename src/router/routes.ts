import type { RouteRecordRaw } from "vue-router";

declare module "vue-router" {
  interface RouteMeta {
    /** 开启路由缓存 */
    keepAlive?: boolean;
    /** 是否允许匿名访问 */
    allowAnonymous?: boolean;
    /** 是否隐藏底部 */
    hideFooter?: boolean;
  }
}
const routes: RouteRecordRaw[] = [
  {
    path: "/:pathMatch(.*)*",
    name: "Warning",
    component: () => import("@/views/components/Warning.vue"),
    meta: {
      title: "Warning",
      keepAlive: true,
      allowAnonymous: true,
      hideFooter: false,
    },
  },
  {
    path: "/event/jq/:id?",
    name: "Event",
    component: () => import("@/views/event-base/index.vue"),
    meta: {
      keepAlive: true,
      allowAnonymous: true,
      hideFooter: false,
    },
  },
];

export default routes;
