<template>
  <article v-if="item">
    <h1 class="title">{{item.name}}</h1>
    <div class="body-2">{{item.description}}</div>
  </article>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: null
    }
  }
};
</script>