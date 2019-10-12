<template>
  <div class="article-data" v-if="article">
    <a href>
      <img :src="article.author.image">
    </a>
    <div class="info">
      <a href class="author">{{article.author.username}}</a>
      <span class="date">{{article.createdAt}}</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    article: {
      type: Object,
      required: true
    }
  }
};
</script>

