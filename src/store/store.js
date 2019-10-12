import Vue from "vue";
import Vuex from "vuex";
import ApiService from "../auth/index";
import {
  SET_USER,
  SET_ARTICLES,
  RESET_ARTICLES,
  DO_LOGOUT,
  RESET_USER,
  ARTICLE_LOADING,
  ARTICLE_LOADED
} from "./mutation.type";
import {
  GET_ARTICLES,
  REGISTER_ACCOUNT,
  SIGN_IN,
  SIGN_OUT,
  GET_ARTICLE
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
    },
    article: {
      isLoaded: false,
      data: {
        author: {},
        body: "",
        createdAt: "",
        description: "",
        favorited: false,
        favoritesCount: 0,
        slug: "",
        tagList: [],
        title: "",
        updatedAt: ""
      }
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
    },
    [ARTICLE_LOADING](state) {
      state.article.isLoaded = false;
      state.article.data = null;
    },
    [ARTICLE_LOADED](state, payload) {
      state.article.isLoaded = true;
      state.article.data = payload;
    }
  },
  actions: {
    [GET_ARTICLE]({ commit }, payload) {
      commit(ARTICLE_LOADING);
      return ApiService.get(`articles/${payload}`).then(({ data }) => {
        commit(ARTICLE_LOADED, data.article);
      });
    },
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
          `/articles?limit=${payload.limit}&offset=${payload.pageOffset}`
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
