<template>
  <div>
    <div class="title">{{item.name}}</div>
    <div>{{item.content}}</div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: null
    }
  },
  methods: {
    markContentAsFinished() {
      this.$emit("markContentAsFinished", this.item);
    }
  }
};
</script>