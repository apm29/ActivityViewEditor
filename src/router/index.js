import Vue from "vue";
import VueRouter from "vue-router";
import Editor from "../components/Editor.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Editor
  },
  {
    path: "/form",
    name: "Form",
    component: () => import("@/components/FormDesigner")
  }
];

const router = new VueRouter({
  routes
});

export default router;
