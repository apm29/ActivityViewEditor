import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component:  ()=>import("@/views/design")
  },
  {
    path: "/form",
    name: "Form",
    component: () => import("@/views/design")
  },
  {
    path: "/preview",
    name: "Preview",
    component: () => import("@/views/preview")
  },
  {
    path: "/design",
    name: "Design",
    component: () => import("@/views/design")
  }
];

const router = new VueRouter({
  routes
});

export default router;
