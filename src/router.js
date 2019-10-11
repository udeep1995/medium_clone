import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

import GlobalArticles from "./views/GlobalArticles.vue";
Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      component: Home,
      children: [{ path: "/", component: GlobalArticles, name: "Home" }]
    },
    {
      path: "/signup",
      name: "register",
      component: () => import("./views/Register.vue")
    },
    {
      path: "/signin",
      name: "signin",
      component: () => import("./views/SignIn.vue")
    },
    {
      path: "/articles/:slug",
      name: "Article",
      component: () => import("./views/Article.vue"),
      props: true
    }
  ]
});

// {
//   path: '/about',
//   name: 'about',
//   // route level code-splitting
//   // this generates a separate chunk (about.[hash].js) for this route
//   // which is lazy-loaded when the route is visited.
//   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
// }
