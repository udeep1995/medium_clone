<template>
  <div class="container card">
    <div class="card-block">
      <p class="card-text">{{comment.body}}</p>
    </div>
    <div class="card-footer">
      <span
        class="date-posted"
      >{{new Date(comment.createdAt).toLocaleDateString()+" "}}{{new Date(comment.createdAt).toLocaleTimeString()}}</span>
      <button
        v-if="commentAuthor === user"
        class="btn btn-danger mod-options"
        @click="deleteComment"
      >Delete Comment</button>
    </div>
  </div>
</template>
 <script>
import { DELETE_COMMENT } from "../store/action.type";
export default {
  props: {
    slug: {
      type: String,
      required: true
    },
    comment: {
      type: Object,
      required: true
    }
  },
  computed: {
    commentAuthor() {
      return this.comment.author.username;
    },
    user() {
      return this.$store.state.user.username;
    }
  },
  methods: {
    deleteComment() {
      const { slug, comment } = this;
      this.$store.dispatch(DELETE_COMMENT, {
        slug,
        id: comment.id
      });
    }
  }
};
</script>
