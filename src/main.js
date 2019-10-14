import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";
import "@/assets/main.css";

import "@babel/polyfill";
import "mutationobserver-shim";
import "./plugins/bootstrap-vue";

import axios from "axios";
import VueAxios from "vue-axios";
import ApiService from "./auth";

const API_ENDPOINT = "https://conduit.productionready.io/api";

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
Vue.axios.defaults.baseURL = API_ENDPOINT;
ApiService.createHeader();
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
