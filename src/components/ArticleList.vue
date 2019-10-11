<template>
  <div>
    <template v-if="!articles.isLoaded">
      <div class="article-preview">Loading...</div>
    </template>
    <template
      v-else-if="articles.isLoaded && articles.data.articles && articles.data.articles.length>0"
    >
      <ArticleCard
        v-for="(article, index) in articles.data.articles"
        :key="article.slug + index"
        :article="article"
      ></ArticleCard>
    </template>
    <template v-else>
      <div class="article-preview">No articles are here... yet.</div>
    </template>
  </div>
</template>
<script>
import { GET_ARTICLES } from "../store/action.type.js";
import ArticleCard from "./ArticleCard";
export default {
  props: {
    limit: {
      type: Number,
      default: 10
    },
    offset: {
      type: Number,
      default: 0
    }
  },
  components: {
    ArticleCard
  },
  computed: {
    articles() {
      return this.$store.state.articles;
    }
  },
  created() {
    this.$store.dispatch(GET_ARTICLES, {
      limit: this.limit,
      offset: this.offset
    });
  }
};
</script>

