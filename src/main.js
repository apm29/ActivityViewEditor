import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ViewUI from "view-design";
import "view-design/dist/styles/iview.css";
import formCreate from "@form-create/iview4";
import IntroductionText from "@/components/form/native/IntroductionText";
formCreate.component(IntroductionText.name, IntroductionText);
Vue.use(formCreate);
Vue.config.productionTip = false;
Vue.use(ViewUI);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
