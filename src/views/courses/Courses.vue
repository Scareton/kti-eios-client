<template>
  <div>
    <v-card outlined>
      <v-card-text>
        <h2 class="primary--text">Курсы</h2>
      </v-card-text>
    </v-card>
    <div class="row flex-nowrap">
      <div class="col page-navigation">
        <v-card outlined class="mb-4">
          <courses-tree />
        </v-card>
      </div>
      <div class="col page-content">
        <div class="row mt-n3 courses-items">
          <router-view />
        </div>
      </div>
      <div class="col page-info">
        <v-card outlined class="mb-4">
          <v-skeleton-loader type="card-avatar"></v-skeleton-loader>
        </v-card>
        <v-card outlined class="mb-4">
          <v-skeleton-loader type="card"></v-skeleton-loader>
        </v-card>
        <v-card outlined class="mb-4">
          <v-skeleton-loader type="card-heading"></v-skeleton-loader>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    CoursesTree: () => import("../../components/courses/coursesTree")
  }
};
</script>

<style scoped>
.courses-items > .col {
  flex: 1 1 33.3333333333%;
  max-width: 50%;
}
</style>