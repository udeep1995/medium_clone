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
      <hr>
    </div>
  </div>
</template>
<script>
import { GET_ARTICLE } from "../store/action.type.js";
import ArticleInfo from "../components/ArticleInfo";
export default {
  components: {
    ArticleInfo
  },
  props: ["slug"],
  mounted() {
    this.$store.dispatch(GET_ARTICLE, this.slug);
  },
  computed: {
    article() {
      return this.$store.state.article;
    }
  }
};
</script>
