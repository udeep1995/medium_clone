<template>
  <div class="cards" v-if="comments.data.comments && comments.data.comments.length">
    <Comment
      v-for="comment in comments.data.comments"
      :key="comment.id"
      :slug="slug"
      class="card"
      :comment="comment"
    ></Comment>
  </div>
</template>
<script>
import Comment from "./Comment";
export default {
  components: {
    Comment
  },
  props: {
    comments: {
      type: Object,
      default: function() {
        return {};
      }
    },
    slug: {
      type: String,
      default: ""
    }
  }
};
</script>