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
      <course-sections :course="course" />
    </div>

    <course-section-active-content-dialog />
  </div>
</template>

<script>
import CourseService from "../../services/CourseService";
export default {
  components: {
    CourseSections: () => import("../../components/courses/CourseSections"),
    CourseSectionActiveContentDialog: () =>
      import("../../components/courses/CourseSectionActiveContentDialog")
  },
  computed: {
    course: {
      get() {
        return this.$store.state.courses.loadedList[this.$route.params.course];
      },
      set(value) {
        this.$store.commit("courses/update", { payload: value, app: this });
      }
    }
  },
  methods: {
    getCourse() {
      CourseService.getCourse(this.$route.params.course)
        .then(response => {
          this.$store.commit("courses/update", {
            payload: response.data,
            app: this
          });
        })
        .catch(err => {
          this.$store.commit("snackbar/error", err);
        });
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