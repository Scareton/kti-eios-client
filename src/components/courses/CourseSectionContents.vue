<template>
  <div class="mt-4" v-if="Object.keys(section.content).length > 0">
    <div class="title">Вложения:</div>

    <!-- Перебрать вложения секции -->
    <div v-for="item in section.content" :key="item._id">
      <div class="subtitle-2">{{item.name}}</div>
      <div>{{item.description}}</div>
    </div>
  </div>
</template>

<script>
import CourseService from "../../services/CourseService";
export default {
  props: {
    section: {
      type: Object,
      default: null
    }
  },
  methods: {
    /**
     * Отметить вложение завершённым
     */
    markContentAsFinished(content) {
      CourseService.markCourseContentFinished(content._id).then(response => {
        this.$emit("updateCourse", response.data);
        this.$store.commit("snackbar/success", "Этап пройден");
      });
    }
  }
};
</script>