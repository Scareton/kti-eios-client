<template>
  <div class="mt-4" v-if="Object.keys(course.sections).length > 0">
    <v-stepper
      v-model="stepper"
      vertical
      non-linear
      class="elevation-0"
      style="border: thin solid rgba(0, 0, 0, 0.12);"
    >
      <template v-for="(section, i) in course.sections">
        <v-stepper-step
          :key="`step_${i}`"
          :complete="getStepComplete(section)"
          :step="i + 1"
          editable
        >
          {{section.name}}
          <small>{{section.description}}</small>
        </v-stepper-step>
        <v-stepper-content :key="`content_${i}`" :step="i + 1">
          <course-section-contents
            :course="course"
            :section="section"
            @courseUpdated="courseUpdated"
          />
        </v-stepper-content>
      </template>
    </v-stepper>
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
    CourseSectionContents: () =>
      import("../../components/courses/CourseSectionContents")
  },
  data: () => ({
    stepper: 1
  }),
  methods: {
    getStepComplete(section) {
      if (this.$store.state.user.data.role !== 1) {
        return false;
      } else {
        if (section.students[0] && section.students[0].s === 6) return true;
        else return false;
      }
    },
    courseUpdated(course) {
      this.$store.commit("courses/update", { payload: course, app: this });
    }
  },
  watch: {
    course: {
      handler(course) {
        if (this.$store.state.user.data.role === 1) {
          course.sections
            .filter(section => !section.blocked)
            .forEach(section => {
              let sectionStudent = section.students[0];
              if (sectionStudent === undefined || sectionStudent.s !== 6) {
                let res = section.content.map(item => {
                  if (item.students[0] !== undefined) {
                    if (
                      item.students[0].s ===
                      this.dictionary.courseContentTypeReqStatus(item.type)
                    )
                      return true;
                    else return false;
                  } else return false;
                });
                
                if (res.indexOf(false) === -1) {
                  CourseService.updateCourseSectionUserStatus(section._id)
                    .then(response => {
                      if (response.data) this.courseUpdated(response.data);
                    })
                    .catch(err => {
                      console.log(err);
                    });
                }
              }
            });
        }
      },
      immediate: true
    }
  }
};
</script>

<style>
.v-stepper__step--complete .v-stepper__step__step {
  background-color: #388e3c !important;
}
</style>