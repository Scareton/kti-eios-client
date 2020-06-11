<template>
  <base-fullscreen-dialog :display.sync="display" v-if="path" :title="`${course.name} - ${section.name} - ${content.name}`" color="primary">
    <v-card outlined>
      <div class="pa-4" v-html="content.content"></div>
    </v-card>
    <!-- Форма отправки задания -->
    <v-card outlined class="pa-4 mt-1" v-if="content.type === 2 && $store.state.user.data.role === 1">
      <template v-if="!content.students[0] || ((!content.students[0].a || !content.students[0].a.p) || content.students[0].s === 4)">
        <p class="red--text text--darken-4 font-weight-bold" v-if="content.students[0].s === 4">Ответ не принят</p>
        <v-file-input v-model="loadedFile" :accept="getContentTaskDT()" label="Загрузка файла" />
        <div v-if="loadedFile">
          <v-btn outlined color="primary" @click="sendFile">Отправить файл "{{loadedFile.name}}" на проверку</v-btn>
        </div>
       
      </template>
      <template v-else>
        <v-banner two-line class="answer-banner">
          <v-avatar slot="icon" color="primary" size="40">
            <v-icon icon="mdi-lock" color="white">
              <template v-if="content.students[0].s === 3">mdi-lock</template>
              <template v-else-if="content.students[0].s === 5">mdi-check</template>
            </v-icon>
          </v-avatar>

          <template v-if="content.students[0].s === 3">Ответ отправлен</template>
          <template v-else-if="content.students[0].s === 5">Ответ зачтён. Оценка: {{content.students[0].a.s}}</template>

          <template v-slot:actions>
            <v-btn text color="primary" @click="display = false">Закрыть вложение</v-btn>
          </template>
        </v-banner>
      </template>
    </v-card>
    <div class="mt-2" v-else-if="content.type === 2 && $store.state.user.data.role !== 1">
      <course-section-content-students :course="course" :section="section" :content="content" />
    </div>
  </base-fullscreen-dialog>
</template>

<script>
import CourseService from "../../services/CourseService";
export default {
  components: {
    CourseSectionContentStudents: () =>
      import("./students/CourseSectionContentStudents")
  },
  data: () => ({
    loadedFile: null
  }),
  computed: {
    path() {
      console.log(this.$store.state.courses.dialogContentPath)
      return this.$store.state.courses.dialogContentPath;
    },
    course() {
      return this.$store.state.courses.list.find(
        c => c._id === this.path.course
      );
    },
    section() {
      return this.course.sections.find(s => s._id === this.path.section);
    },
    content() {
      let content = this.section.content.find(c => c._id === this.path.content);
      return content;
    },
    display: {
      get() {
        return this.$store.state.courses.dialogContentDisplay;
      },
      set(value) {
        this.$store.commit("courses/updateDialogContent", value);
      }
    }
  },
  methods: {
    getContentTaskDT() {
      if (this.content.taskDT[0]) {
        return this.content.taskDT.join(",");
      } else {
        return ".doc,.docx";
      }
    },
    sendFile() {
      let formdata = new FormData();
      formdata.append("answer", this.loadedFile);
      CourseService.sendCourseSectionContentUserAnswer(
        this.content._id,
        formdata
      )
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
  }
};
</script>

<style>
.theme--light.answer-banner .v-banner__wrapper {
  border: unset;
}
</style>