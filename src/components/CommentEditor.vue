<template>
  <form @submit.prevent="addComment">
    <div class="container card comment-form">
      <div class="card-block">
        <textarea v-model="comment" class="form-control" placeholder="Any Comment" rows="3"></textarea>
      </div>
      <div class="card-footer">
        <span>{{user.username}}</span>
        <button class="btn btn-sm btn-primary">Add Comment</button>
      </div>
    </div>
  </form>
</template>
<script>
import { ADD_COMMENT } from "../store/action.type";
export default {
  props: {
    slug: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      comment: ""
    };
  },
  methods: {
    addComment() {
      const { slug, comment } = this;
      this.$store.dispatch(ADD_COMMENT, {
        slug,
        comment
      });
      this.comment = "";
    }
  },
  computed: {
    user() {
      return this.$store.state.user;
    }
  }
};
</script>