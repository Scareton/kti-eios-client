<template>
  <div class="mt-4" v-if="Object.keys(course.sections).length > 0">
    <v-stepper v-model="stepper" vertical non-linear class="elevation-0" style="border: thin solid rgba(0, 0, 0, 0.12);">
      <!-- Перебор всех секций курса -->
      <template v-for="(section, i) in course.sections">
        <!-- Заголовок степпера -->
        <v-stepper-step :key="`step_${i}`" :complete="getStepComplete(section)" :step="i + 1" editable>
          <!-- Название секции -->
          {{section.name}}
          <!-- Под заголовком отображается описание, если оно есть -->
          <small>{{section.description}}</small>
        </v-stepper-step>

        <!-- Содержимое степпера -->
        <v-stepper-content :key="`content_${i}`" :step="i + 1">
          <!-- Компонент для вывода вложений -->
          <course-section-contents :course="course" :section="section" @courseUpdated="courseUpdated" />

          <!-- Создание нового вложения -->
          <base-role-gate role="2">
            <create-content :course="course" :section="section" />
          </base-role-gate>
        </v-stepper-content>
      </template>

      <!-- Создание новой секции -->
      <base-role-gate role="2">
        <v-btn class="ml-3 mt-2" depressed color="deep-orange darken-3" dark style="padding-left:9px;">
          <v-badge inline color="white">
            <template v-slot:badge>
              <div class="deep-orange--text text--darken-3">{{course.sections.length + 1}}</div>
            </template>
          </v-badge>Добавить секцию
        </v-btn>
      </base-role-gate>
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
      import("../../components/courses/CourseSectionContents"),
    CreateContent: () => import("./ForTeachers/CreateContent")
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