<template>
  <div>
    <template v-if="!articles.isLoaded">
      <div class="article-preview">Loading...</div>
    </template>
    <template v-else-if="articles.data && articles.data.length">
      <article-preview
        v-for="(article, index) in articles.data"
        :key="article.slug + index"
        :article="article"
      ></article-preview>
    </template>
    <template v-else>
      <div class="article-preview">No articles are here... yet.</div>
    </template>
  </div>
</template>
<script>
import ArticleCard from "../components/ArticleCard.vue";
import { GET_USER_FEED } from "../store/action.type";
export default {
  components: {
    ArticleCard
  },
  created() {
    this.$store.dispatch(GET_USER_FEED);
  },
  computed: {
    articles() {
      return this.$store.state.userArticles;
    }
  }
};
</script>