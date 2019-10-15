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
  ARTICLE_LOADED,
  SET_USER_ARTICLES,
  USER_ARTICLE_LOADING,
  USER_ARTICLE_LOADED,
  SET_ARTICLE_USER,
  SET_COMMENT
} from "./mutation.type";
import {
  GET_ARTICLES,
  REGISTER_ACCOUNT,
  SIGN_IN,
  SIGN_OUT,
  GET_ARTICLE,
  GET_USER_FEED,
  CREATE_ARTICLE,
  UPDATE_ARTICLE,
  DELETE_ARTICLE,
  FOLLOW_USER,
  UNFOLLOW_USER,
  GET_ARTICLE_USER_PROFILE,
  ADD_COMMENT,
  GET_COMMENTS
} from "./action.type";
import { clearToken, saveToken } from "../auth/storage";
Vue.use(Vuex);
import VuexPersistence from "vuex-persist";
const vuexLocal = new VuexPersistence({
  key: "app-state",
  storage: window.localStorage
});
export default new Vuex.Store({
  plugins: [vuexLocal.plugin],
  state: {
    isLogin: false,
    user: null,
    userArticles: {
      isLoaded: false
    },
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
    },
    articleUser: {
      isLoaded: false,
      user: {}
    },
    comments: {
      isLoaded: false,
      data: {}
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
    },

    [SET_USER_ARTICLES](state, payload) {
      const { articles, articlesCount } = payload;
      state.userArticles = {
        data: articles,
        articlesCount,
        isLoaded: true
      };
    },
    [USER_ARTICLE_LOADING](state) {
      state.userArticles.isLoaded = false;
    },
    [USER_ARTICLE_LOADED](state) {
      state.userArticles.isLoaded = true;
    },
    [SET_ARTICLE_USER](state, payload) {
      state.articleUser.isLoaded = payload.isLoaded;
      state.articleUser.user = payload.user;
    },
    [SET_COMMENT](state, payload) {
      state.comments.isLoaded = payload.isLoaded;
      state.comments.data = payload.data;
    }
  },
  actions: {
    [GET_ARTICLE]({ commit }, payload) {
      commit(ARTICLE_LOADING);
      return new Promise((resolve, reject) => {
        ApiService.get(`articles/${payload}`)
          .then(({ data }) => {
            commit(ARTICLE_LOADED, data.article);
            resolve(data);
          })
          .catch(err => {
            reject(err);
          });
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
    },
    [GET_USER_FEED]({ commit }) {
      commit(USER_ARTICLE_LOADING);
      return ApiService.get("articles/feed").then(({ data }) => {
        const { articles, articlesCount } = data;
        commit(SET_USER_ARTICLES, { articles, articlesCount });
      });
    },
    [UPDATE_ARTICLE]({ commit }, payload) {
      return ApiService.put(`articles/${payload.slug}`, {
        article: payload.article
      });
    },
    [CREATE_ARTICLE]({ commit }, payload) {
      return ApiService.post("/articles", payload);
    },
    [DELETE_ARTICLE]({ commit }, payload) {
      return ApiService.delete(`articles/${payload}`);
    },
    [GET_ARTICLE_USER_PROFILE]({ commit }, payload) {
      commit(SET_ARTICLE_USER, { isLoaded: false, user: {} });
      return ApiService.get(`profiles/${payload}`).then(({ data }) => {
        commit(SET_ARTICLE_USER, { user: data.profile, isLoaded: true });
      });
    },
    [FOLLOW_USER]({ commit }, payload) {
      ApiService.post(`profiles/${payload}/follow`, {}).then(({ data }) => {
        commit(SET_ARTICLE_USER, { user: data.profile, isLoaded: true });
      });
    },
    [UNFOLLOW_USER]({ commit }, payload) {
      ApiService.delete(`profiles/${payload}/follow`).then(({ data }) => {
        commit(SET_ARTICLE_USER, { user: data.profile, isLoaded: true });
      });
    },
    [ADD_COMMENT]({ commit }, payload) {
      const { slug, comment } = payload;
      ApiService.post(`articles/${slug}/comments`, {
        comment: { body: comment }
      })
        .then(resp => {
          commit(SET_COMMENT, { isLoaded: true, data: resp.data.comment });
        })
        .catch(err => {
          console.error(err);
        });
    },
    [GET_COMMENTS]({ commit }, payload) {
      const { slug } = payload;
      commit(SET_COMMENT, { isLoaded: false, data: {} });
      ApiService.get(`articles/${slug}/comments`)
        .then(resp => {
          commit(SET_COMMENT, {
            isLoaded: true,
            data: resp.data.comments
          });
        })
        .catch(err => {
          console.error(err);
        });
    }
  }
});
