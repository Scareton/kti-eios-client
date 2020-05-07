<template>
  <v-chip class="mr-2" color="primary" :href="file.link" target="_blank">
    <v-icon left>{{dictionary.file_icon(file.type)}}</v-icon>{{file.name}}
  </v-chip>
</template>

<script>
export default {
  props: {
    file: {
      type: Object,
      default: null
    }
  }
};
</script>