<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <form>
            <fieldset>
              <fieldset class="form-group">
                <input v-model="title" type="text" class="form-control" placeholder="Article Title" />
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="description"
                  type="text"
                  class="form-control"
                  placeholder="What's this article about?"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  v-model="body"
                  class="form-control"
                  rows="8"
                  placeholder="Write your article (in markdown)"
                ></textarea>
              </fieldset>

              <button
                @click="submitArticle"
                class="btn pull-xs-right btn-primary"
                type="button"
              >Submit Article</button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  CREATE_ARTICLE,
  UPDATE_ARTICLE,
  GET_ARTICLE
} from "../store/action.type";
export default {
  props: {
    slug: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      title: "",
      description: "",
      body: ""
    };
  },
  beforeCreate() {
    if (!this.$store.state.isLogin) {
      this.$router.push({
        name: "SignIn"
      });
    }
  },
  mounted() {
    const { slug } = this.$route.params;
    if (slug) {
      this.$store
        .dispatch(GET_ARTICLE, slug)
        .then(resp => {
          this.title = resp.article.title;
          this.description = resp.article.description;
          this.body = resp.article.body;
        })
        .catch(err => {
          console.error(err);
        });
    }
  },
  methods: {
    async submitArticle() {
      const { title, description, body } = this;
      let { slug } = this.$route.params;
      if (slug) {
        const updatedArticle = {
          slug: this.$route.params.slug,
          article: { title, description, body }
        };
        this.$store.dispatch(UPDATE_ARTICLE, updatedArticle).then(article => {
          this.$router.push({
            name: "Article",
            params: { slug: article.data.article.slug }
          });
        });
      } else {
        const newArticle = {
          title: this.title,
          description: this.description,
          body: this.body
        };
        this.$store
          .dispatch(CREATE_ARTICLE, newArticle)
          .then(article => {
            this.$router.push({
              name: "Article",
              params: { slug: article.data.article.slug }
            });
          })
          .catch(err => {
            console.error(err);
          });
      }
    }
  }
};
</script>