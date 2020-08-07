import Vue from "vue";
import VueRouter from "vue-router";
import Editor from "../components/flow/ActivityEditor.vue";

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
    component: () => import("@/components/form/XFormDesigner")
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
