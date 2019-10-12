import Vue from "vue";
import Vuex from "vuex";
import ApiService from "../auth/index";
import {
  SET_USER,
  SET_ARTICLES,
  RESET_ARTICLES,
  DO_LOGOUT,
  RESET_USER
} from "./mutation.type";
import {
  GET_ARTICLES,
  REGISTER_ACCOUNT,
  SIGN_IN,
  SIGN_OUT
} from "./action.type";
import { clearToken, saveToken } from "../auth/storage";
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
    [DO_LOGOUT](state, payload) {
      state.isLogin = false;
      state.user = payload.user;
    },
    [SET_USER](state, payload) {
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
    },
    [RESET_USER](state, payload) {
      state.isLogin = false;
      state.user = payload.user;
    }
  },
  actions: {
    [REGISTER_ACCOUNT]({ commit }, payload) {
      return new Promise((resolve, reject) => {
        ApiService.post("/users", payload)
          .then(resp => {
            commit(SET_USER, resp.data.user);
            saveToken(resp.data.user.token);
            ApiService.createHeader();
            resolve(resp);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    [SIGN_IN]({ commit }, payload) {
      return new Promise((resolve, reject) => {
        ApiService.post("/users/login", payload)
          .then(resp => {
            commit(SET_USER, resp.data.user);
            saveToken(resp.data.user.token);
            ApiService.createHeader();
            resolve(resp);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    [SIGN_OUT]({ commit }) {
      clearToken();
      ApiService.clearHeader();
      commit(RESET_USER, { user: null });
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
