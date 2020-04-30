<template>
  <v-card outlined class="mb-4">
    <article>
      <v-card-title class="pb-0">
        <h1>{{page.title}}</h1>
      </v-card-title>
      <v-card-text>
        <div class="pb-3">
          <time>{{dictionary.datetime_local(page.publishedBy)}}</time>
        </div>
        <div v-html="page.content" />
        <div class="mt-4">
          <file-link v-for="file in page.attachments" :key="file.link" :file="file" />
        </div>
      </v-card-text>
    </article>
  </v-card>
</template>

<script>
export default {
  components: {
    FileLink: () => import("../files/FileLink")
  },
  props: {
    page: {
      type: Object,
      default: null
    }
  }
};
</script>