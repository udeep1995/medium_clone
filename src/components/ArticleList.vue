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
    <Pagination v-model="offset" :pages="this.pages"></Pagination>
  </div>
</template>
<script>
import { GET_ARTICLES } from "../store/action.type.js";
import ArticleCard from "./ArticleCard";
import Pagination from "./Pagination";
export default {
  props: {
    limit: {
      type: Number,
      default: 17
    }
  },
  data() {
    return {
      offset: 0
    };
  },
  components: {
    ArticleCard,
    Pagination
  },
  computed: {
    articles() {
      return this.$store.state.articles;
    },
    pages() {
      if (
        this.articles &&
        this.articles.data &&
        this.articles.data.articlesCount
      ) {
        return Math.round(
          this.$store.state.articles.data.articlesCount / this.limit
        );
      }
      return 0;
    }
  },
  watch: {
    offset() {
      this.$store.dispatch(GET_ARTICLES, {
        limit: this.limit,
        pageOffset: this.offset
      });
    }
  },
  created() {
    this.$store.dispatch(GET_ARTICLES, {
      limit: this.limit,
      pageOffset: this.offset
    });
  }
};
</script>

