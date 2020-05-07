<template>
  <v-card outlined v-if="course">
    <v-card-title>
      <h1>{{course.name}}</h1>
    </v-card-title>
    <v-card-text>
      <div>{{course.description}}</div>
      <course-contents :course="course" @updateCourse="updateCourse" />
    </v-card-text>
  </v-card>
</template>

<script>
import CourseService from "../../services/CourseService";
export default {
  components: {
    CourseContents: () => import("../../components/courses/CourseContents")
  },
  data: () => ({
    course: null
  }),
  methods: {
    getCourse() {
      CourseService.getCourse(this.$route.params.course)
        .then(response => {
          this.course = response.data;
        })
        .catch(err => {
          this.$store.commit("snackbar/error", err);
        });
    },
    updateCourse(course) {
      this.course = course;
    }
  },
  created() {
    this.getCourse();
  }
};
</script>

<style scoped>
h1 {
  font-size: 1.5em;
}
.theme--light.v-card > .v-card__text {
  color: rgba(0, 0, 0, 0.87);
  font-size: 16px;
}
</style>