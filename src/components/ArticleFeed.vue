<template>
  <ul class="nav nav-pills outline-active">
    <li class="nav-item">
      <router-link :to="{path: '/'}" class="nav-link" exact-active-class="active">Global Feed</router-link>
    </li>
    <li class="nav-item" v-if="isLogin">
      <router-link :to="{path: '/feed'}" class="nav-link" active-class="active">My Feed</router-link>
    </li>
  </ul>
</template>
<script>
export default {
  computed: {
    isLogin() {
      return this.$store.state.isLogin;
    }
  }
};
</script>