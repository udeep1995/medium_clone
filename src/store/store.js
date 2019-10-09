import Vue from "vue";
import Vuex from "vuex";
import ApiService from "../auth/index";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogin: false,
    user: null
  },
  mutations: {
    doLogout(state, payload) {
      state.isLogin = false;
      state.user = null;
    }
  },
  actions: {
    registerAccount({ commit }, payload) {
      console.log(payload);
      return new Promise((resolve, reject) => {
        ApiService.post("/users", payload)
          .then(resp => {
            console.log(resp);
            resolve();
          })
          .catch(err => {
            console.error(err);
            reject(err);
          });
      });
    }
  }
});
