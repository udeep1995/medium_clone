<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">Medium Clone</h1>
        <p>A Place to share knowledge</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <div class="col-md-12">
          <div class="feed-toggle">
            <ArticleFeed></ArticleFeed>
          </div>
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ArticleFeed from "../components/ArticleFeed";
export default {
  name: "home",
  components: {
    ArticleFeed
  }
};
</script>
<style scoped>
.home-page .banner {
  background: #5cb85c;
  box-shadow: inset 0 8px 8px -8px rgba(0, 0, 0, 0.3),
    inset 0 -8px 8px -8px rgba(0, 0, 0, 0.3);
}
.banner {
  color: #fff;
  background: #333;
  padding: 2rem;
  margin-bottom: 2rem;
}
</style>
