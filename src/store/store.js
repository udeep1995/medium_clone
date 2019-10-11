import Vue from "vue";
import Vuex from "vuex";
import ApiService from "../auth/index";
import { SET_USER, SET_ARTICLES, RESET_ARTICLES } from "./mutation.type";
import { GET_ARTICLES } from "./action.type";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogin: false,
    user: null,
    articles: {
      isLoaded: false,
      data: null
    }
  },
  mutations: {
    doLogout(state, payload) {
      state.isLogin = false;
      state.user = payload.user;
    },
    setUser(state, payload) {
      state.user = payload;
      state.isLogin = true;
    },
    [SET_ARTICLES](state, payload) {
      state.articles.isLoaded = true;
      state.articles.data = payload;
    },
    [RESET_ARTICLES](state, payload) {
      state.articles.isLoaded = false;
      state.articles.data = payload.data;
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
    },
    [GET_ARTICLES]({ commit }, payload) {
      return new Promise((resolve, reject) => {
        ApiService.get(
          `/articles?limit=${payload.limit}&offset=${payload.offset}`
        )
          .then(resp => {
            commit(SET_ARTICLES, resp.data);
            resolve(resp.data);
          })
          .catch(err => {
            commit(RESET_ARTICLES, { data: null });
            reject(err);
          });
      });
    }
  }
});
