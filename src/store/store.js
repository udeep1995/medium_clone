import Vue from "vue";
import Vuex from "vuex";
import ApiService from "../auth/index";
import { SET_USER } from "./mutation.type";
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
    },
    setUser(state, payload) {
      state.user = payload;
      state.isLogin = true;
    }
  },
  actions: {
    registerAccount({ commit }, payload) {
      return new Promise((resolve, reject) => {
        ApiService.post("/users", payload)
          .then(resp => {
            commit(SET_USER, resp);
            resolve(resp);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    signIn({ commit }, payload) {
      return new Promise((resolve, reject) => {
        ApiService.post("/users/login", payload)
          .then(resp => {
            commit(SET_USER, resp);
            resolve(resp);
          })
          .catch(err => {
            reject(err);
          });
      });
    }
  }
});
