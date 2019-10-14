<template>
  <nav>
    <ul class="pagination" v-if="pages > 1">
      <li
        v-for="page in pages"
        :key="page"
        class="page-item"
        :class="isActive(page) && 'active'"
        @click.prevent="changePage(page)"
      >
        <a class="page-link" href>{{page}}</a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  model: {
    prop: "value",
    event: "change"
  },
  props: {
    pages: {
      type: Number
    },
    value: {
      type: Number
    }
  },
  methods: {
    changePage(page) {
      this.$emit("change", page - 1);
    },
    isActive(page) {
      if (page === this.value + 1) return true;
      return false;
    }
  }
};
</script>
