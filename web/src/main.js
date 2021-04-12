import Vue from "@components/element/element";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import 'element-ui/lib/theme-chalk/index.css';
import Core from '@common/core'

Vue.config.productionTip = false;

Vue.use(Core);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
