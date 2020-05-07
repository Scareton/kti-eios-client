<template>
  <div class="mt-4" v-if="Object.keys(course.content).length > 0">
    <div class="headline">Вложения:</div>
    <div v-for="item in course.content" :key="item._id">
      <course-content-item :item="item" @markContentAsFinished="markContentAsFinished" />
    </div>
  </div>
</template>

<script>
import CourseService from "../../services/CourseService";
export default {
  props: {
    course: {
      type: Object,
      default: null
    }
  },
  components: {
    CourseContentItem: () =>
      import("../../components/courses/CourseContentItem")
  },
  methods: {
    markContentAsFinished(content) {
      CourseService.markCourseContentFinished(this.course._id, content._id).then(response => {
        this.$emit("updateCourse", response.data);
        this.$store.commit("snackbar/success", "Этап пройден")
      })
    }
  }
};
</script>