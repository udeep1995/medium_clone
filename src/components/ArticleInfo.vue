<template>
  <div class="article-data" v-if="article">
    <span>
      <img :src="article.author.image" />
    </span>
    <div class="info">
      <span class="author">{{article.author.username}}</span>
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

