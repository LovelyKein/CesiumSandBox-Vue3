import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

// 定义路由
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: { path: "/case-center" },
  },
  {
    name: "case-center",
    path: "/case-center",
    component: () => import("@/views/SandBox.vue"),
    meta: {
      title: "示例中心",
      identity: "",
    },
  },
];

// 创建路由
const router = createRouter({
  history: createWebHashHistory(import.meta.env.VITE_BASE_PATH as string), // hash 路由模式
  routes,
});

export default router;
