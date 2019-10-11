<template>
  <div>
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign In</h1>
          <p class="text-xs-center">
            <router-link :to="{path: '/signup'}">Need an account?</router-link>
          </p>
          <form @submit.prevent="signin">
            <fieldset class="form-group">
              <input
                v-model="email"
                class="form-control form-control-lg"
                type="text"
                placeholder="Email"
              >
            </fieldset>
            <fieldset class="form-group">
              <input
                v-model="password"
                class="form-control form-control-lg"
                type="password"
                placeholder="Password"
              >
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">Sign In</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { SIGN_IN } from "../store/action.type.js";
import { DO_LOGOUT } from "../store/mutation.type.js";
import store from "../store/store.js";
export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  computed: {},
  methods: {
    signin() {
      const { email, password } = this;
      this.$store.dispatch(SIGN_IN, { user: { email, password } }).then(() => {
        this.$router.push({ name: "Home" });
      });
    },
    logout() {
      store.commit(DO_LOGOUT);
    }
  }
};
</script>