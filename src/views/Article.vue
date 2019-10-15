<template>
  <div class="article-page">
    <div class="banner">
      <div class="container" v-if="!article.isLoaded">Is loading...</div>
      <div v-else class="container">
        <h1>{{article.data.title}}</h1>
        <ArticleInfo :article="article.data"></ArticleInfo>
      </div>
    </div>
    <div class="container page">
      <div class="row article-content">
        <div v-if="article.isLoaded" class="col-md-12">{{article.data.body}}</div>
        <div v-else>Is loading...</div>
      </div>
      <hr />
    </div>
    <template v-if="isLogin && articleSlug">
      <CommentEditor :slug="article.data.slug" :author="article.data.author"></CommentEditor>
    </template>
    <template v-if="articleSlug && allComments">
      <CommentList :comments="allComments" :slug="article.data.slug"></CommentList>
    </template>
  </div>
</template>
<script>
import { GET_ARTICLE, GET_COMMENTS } from "../store/action.type.js";
import ArticleInfo from "../components/ArticleInfo";
import CommentEditor from "../components/CommentEditor";
import CommentList from "../components/CommentList";
export default {
  components: {
    ArticleInfo,
    CommentEditor,
    CommentList
  },
  props: ["slug"],
  mounted() {
    this.$store.dispatch(GET_ARTICLE, this.slug);
    this.$store.dispatch(GET_COMMENTS, { slug: this.slug });
  },
  computed: {
    article() {
      return this.$store.state.article;
    },
    isLogin() {
      return this.$store.state.isLogin;
    },
    articleSlug() {
      if (this.article && this.article.data)
        return this.$store.state.article.data.slug;
      return null;
    },
    allComments() {
      return this.$store.state.comments;
    }
  }
};
</script>
