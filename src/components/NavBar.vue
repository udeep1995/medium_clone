<template>
  <nav class="navbar navbar-light">
    <div class="container">
      <router-link to="/" class="navbar-brand">Medium Clone</router-link>
      <ul class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <router-link to="/" class="nav-link active">Home</router-link>
        </li>
        <template v-if="isLogin">
          <li class="nav-item">
            <router-link class="nav-link" to="/editor" active-class="active">
              <i class="ion-compose"></i>&nbsp; New Article
            </router-link>
          </li>
          <li class="nav-item">
            <a href="#" @click="doLogout" class="nav-link">Logout</a>
          </li>
        </template>
        <template v-else>
          <li class="nav-item">
            <router-link to="/signup" class="nav-link signup" active-class="active">Sign up</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/signin" class="nav-link signin" active-class="active">Sign in</router-link>
          </li>
        </template>
      </ul>
    </div>
  </nav>
</template>
<script>
import store from "../store/store.js";
import { SIGN_OUT } from "../store/action.type.js";
export default {
  computed: {
    isLogin: () => store.state.isLogin,
    user: () => store.state.user
  },

  methods: {
    doLogout() {
      this.$store.dispatch(SIGN_OUT);
      store.commit("doLogout", { user: null });
      if (this.$route.path !== "/") this.$router.push({ name: "Home" });
    }
  }
};
</script>
<style lang="css" scoped>
.navbar-nav {
  flex-direction: unset;
}
</style>