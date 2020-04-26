<template>
  <div>
    <v-container>
      <v-card outlined>
        <v-card-text>
          <h2 class="primary--text">Курсы</h2>
        </v-card-text>
      </v-card>
      <div class="row flex-nowrap">
        <div class="col page-navigation">
          <v-card outlined class="mb-4">
            <v-skeleton-loader type="list-item-three-line"></v-skeleton-loader>
          </v-card>
          <v-card outlined class="mb-4">
            <v-skeleton-loader type="list-item-three-line"></v-skeleton-loader>
          </v-card>
          <v-card outlined class="mb-4">
            <v-skeleton-loader type="list-item-two-line"></v-skeleton-loader>
          </v-card>
        </div>
        <div class="col page-content">
          <v-card outlined class="mb-4" v-for="n in 4" :key="n">
            <v-skeleton-loader type="article"></v-skeleton-loader>
          </v-card>
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
    </v-container>
  </div>
</template>

<script>
export default {
  components: {}
};
</script>