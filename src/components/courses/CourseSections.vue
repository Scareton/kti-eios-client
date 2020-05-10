<template>
  <div class="mt-4" v-if="Object.keys(course.sections).length > 0">
    <v-stepper v-model="stepper" vertical non-linear>
      <template v-for="(section, i) in course.sections">
        <v-stepper-step :key="`step_${i}`" :complete="stepper > i" :step="i + 1" editable>
          {{section.name}}
          <small>{{section.description}}</small>
        </v-stepper-step>
        <v-stepper-content :key="`content_${i}`" :step="i + 1">
          <course-section-contents :section="section" @courseUpdated="courseUpdated" />
        </v-stepper-content>
      </template>
    </v-stepper>
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
  },
  data: () => ({
    stepper: 1
  }),
  methods: {
    courseUpdated(course) {
      this.$emit("courseUpdated", course)
    }
  }
};
</script>