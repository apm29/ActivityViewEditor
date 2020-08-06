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
  }
];

const router = new VueRouter({
  routes
});

export default router;
