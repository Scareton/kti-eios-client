<template>
  <div class="mt-4" v-if="Object.keys(course.sections).length > 0">
    <!-- <div class="headline mb-2">Секции:</div> -->

    <!-- Перебрать секции курса -->
    <v-card class="pa-4 mb-2" outlined v-for="item in course.sections" :key="item._id">
      <div class="title">{{item.name}}</div>

      <!-- Вложения секции -->
      <course-section-contents :section="item" />
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    course: {
      type: Object,
      default: null
    }
  },
  components: {
    CourseSectionContents: () =>
      import("../../components/courses/CourseSectionContents")
  }
};
</script>