<template>
  <div>
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign up</h1>
          <p class="text-xs-center">
            <router-link :to="{path: '/signin'}">Have an account?</router-link>
          </p>
          <form @submit.prevent="register">
            <fieldset class="form-group">
              <input
                v-model="username"
                class="form-control form-control-lg"
                id="username"
                type="text"
                placeholder="Your Name"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                v-model="email"
                class="form-control form-control-lg"
                type="text"
                id="email"
                placeholder="Email"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                v-model="password"
                class="form-control form-control-lg"
                type="password"
                id="password"
                placeholder="Password"
              />
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">Sign up</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { REGISTER_ACCOUNT } from "../store/action.type.js";
import { DO_LOGOUT } from "../store/mutation.type.js";
import store from "../store/store.js";
export default {
  data() {
    return {
      username: "",
      email: "",
      password: ""
    };
  },
  computed: {},
  methods: {
    register() {
      const { username, email, password } = this;
      this.$store
        .dispatch(REGISTER_ACCOUNT, { user: { username, email, password } })
        .then(() => {
          this.$router.push({ name: "Home" });
        });
    },
    logout() {
      store.commit(DO_LOGOUT);
    }
  }
};
</script>