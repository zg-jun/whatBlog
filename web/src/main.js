import Vue from "@components/element/element";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import 'element-ui/lib/theme-chalk/index.css';
import Core from '@common/core';
import GlobalComponents from "@components"; //全局组件

Vue.config.productionTip = false;

Vue.use(Core);
Vue.use(GlobalComponents);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
