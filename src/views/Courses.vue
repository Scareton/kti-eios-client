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
          <v-skeleton-loader type="list-item-three-line"  v-if="coursesWaitFlag" />
          <div v-else class="pa-4">
            <div v-for="course in courses" :key="course._id">
              {{course.name}}
            </div>
          </div>
        </v-card>
      </div>
      <div class="col page-content">
        <div class="row mt-n3 courses-items">
          <div class="col" v-for="n in 13" :key="n">
            <v-card outlined>
              <v-skeleton-loader type="article"></v-skeleton-loader>
            </v-card>
          </div>
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
import CourseService from "../services/CourseService"
export default {
  data: () => ({
    courses: [],
    coursesWaitFlag: true,
  }),
  methods: {
    getCourses() {
      CourseService.getCourses().then(response => {
        this.courses = response.data;
        this.coursesWaitFlag = false;
      })
    }
  },
  created() {
    this.getCourses();
  }
};
</script>

<style scoped>
.courses-items > .col {
  flex: 1 1 33.3333333333%;
  max-width: 50%;
}
</style>