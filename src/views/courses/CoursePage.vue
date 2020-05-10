<template>
  <div v-if="course">
    <v-card outlined>
      <v-card-title>
        <h1>{{course.name}}</h1>
      </v-card-title>
      <v-card-text>
        <div>{{course.description}}</div>
      </v-card-text>
    </v-card>
    <div>
      <course-sections :course="course" @courseUpdated="updateCourse" />
    </div>
  </div>
</template>

<script>
import CourseService from "../../services/CourseService";
export default {
  components: {
    CourseSections: () => import("../../components/courses/CourseSections")
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