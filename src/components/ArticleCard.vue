<template>
  <div class="article-preview">
    <div class="article-data">
      <a>
        <img :src="article.author.image" />
      </a>
      <div class="info">
        {{article.author.username}}
        <span
          class="date"
        >{{new Date(article.createdAt).toLocaleDateString()+" "}}{{new Date(article.createdAt).toLocaleTimeString()}}</span>
      </div>
    </div>
    <router-link :to="{path: '/articles/'+ article.slug}" class="preview-link clearfix">
      <h3>{{article.title}}</h3>
      <p>{{article.description}}</p>
      <span>Read more...</span>
      <ul class="tag-list">
        <li
          v-for="tag in article.tagList"
          :key="tag"
          class="tag-default tag-pill tag-outline"
        >{{tag}}</li>
      </ul>
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    article: {
      type: Object,
      default: () => {}
    }
  }
};
</script>
