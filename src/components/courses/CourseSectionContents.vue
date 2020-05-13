<template>
  <div v-if="!section.blocked && Object.keys(section.content).length > 0">
    <course-section-contents-item
      v-for="item in section.content"
      :key="item._id"
      :course="course"
      :section="section"
      :content="item"
      @clicked="openContent"
    />
  </div>
  <div v-else class="red--text text--darken-4">Данный раздел закрыт</div>
</template>

<script>
import CourseService from "../../services/CourseService";
export default {
  components: {
    CourseSectionContentsItem: () => import("./CourseSectionContentsItem")
  },
  props: {
    course: {
      type: Object
    },
    section: {
      type: Object
    }
  },
  methods: {
    /** Открыть вложение */
    openContent(content) {
      CourseService.changeCourseContentUserStatus(content, 1)
        .then(response => {
          if (response.data) {
            this.$store.commit("courses/update", {
              payload: response.data,
              app: this
            });
          }
          
          this.$store.commit("courses/updateDialogContentPath", {
            course: this.course._id,
            section: this.section._id,
            content: content._id
          });
        })
        .catch(err => {
          console.log(err);
          this.$store.commit("courses/updateDialogContentPath", {
            course: this.course._id,
            section: this.section._id,
            content: content._id
          });
        });
    }
  }
};
</script>

<style>
.contentContainer {
  max-width: 70%;
  margin-right: auto;
  margin-left: auto;
}
</style>