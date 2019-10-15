<template>
  <div class="article-data" v-if="article">
    <span>
      <img :src="article.author.image" />
    </span>
    <div class="info">
      <span class="author">{{article.author.username}}</span>
      <span
        class="date"
      >{{" "+ new Date(article.createdAt).toLocaleDateString()+" "}}{{new Date(article.createdAt).toLocaleTimeString()}}</span>
    </div>
    <template v-if="!isAuthor">
      <button
        @click="follow()"
        v-if="!isArticleUser.user.following"
        class="btn btn-sm btn-outline-secondary"
      >Follow {{article.author.username}}</button>
      <button
        v-else-if="isArticleUser.user.following"
        @click="unfollow()"
        class="btn btn-sm btn-outline-secondary"
      >UnFollow {{article.author.username}}</button>
    </template>
    <template v-else>
      <span>
        <router-link
          :to="{name: 'Editor', params: {slug: article.slug}}"
          class="btn btn-sm btn-outline-secondary"
          style="margin-right: 10px"
        >Edit Article</router-link>
        <button @click="deleteArticle" class="btn btn-outline-danger btn-sm">Delete Article</button>
      </span>
    </template>
  </div>
</template>
<script>
import {
  GET_ARTICLE_USER_PROFILE,
  FOLLOW_USER,
  UNFOLLOW_USER,
  DELETE_ARTICLE
} from "../store/action.type";

export default {
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  computed: {
    isAuthor() {
      if (!this.$store.state.isLogin) {
        return null;
      }
      return this.$store.state.user.username === this.article.author.username;
    },
    isArticleUser() {
      return this.$store.state.articleUser;
    }
  },
  mounted() {
    this.$store.dispatch(
      GET_ARTICLE_USER_PROFILE,
      this.article.author.username
    );
  },
  methods: {
    deleteArticle() {
      this.$store.dispatch(DELETE_ARTICLE, this.article.slug).then(() => {
        this.$router.push({ name: "Home" });
      });
    },
    follow() {
      if (!this.$store.state.isLogin) {
        this.$router.push({
          name: "SignIn"
        });
      } else {
        this.$store.dispatch(FOLLOW_USER, this.article.author.username);
      }
    },
    unfollow() {
      this.$store.dispatch(UNFOLLOW_USER, this.article.author.username);
    }
  }
};
</script>

