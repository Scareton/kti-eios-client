<template>
  <v-dialog v-if="path" v-model="display" hide-overlay fullscreen tile style="background: #fff;">
    <v-card v-if="content" tile class="customCardBackground">
      <div class="primary">
        <v-toolbar dark color="primary" flat class="contentContainer">
          <v-toolbar-title>{{course.name}} - {{section.name}} - {{content.name}}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="display = false">Сохранить</v-btn>
          </v-toolbar-items>
          <v-btn icon dark @click="display = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
      </div>
      <v-card outlined class="pa-4 mt-8 flex justify-center contentContainer" style="border-top-left-radius: 0; border-top-right-radius:0;">
        <div v-html="content.content"></div>
      </v-card>
      <!-- Форма отправки задания -->
      <v-card outlined class="pa-4 mt-1 contentContainer" v-if="content.type === 2 && $store.state.user.data.role === 1">
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
      <div class="mt-2 contentContainer" v-else-if="content.type === 2 && $store.state.user.data.role !== 1">
        <course-section-content-students :course="course" :section="section" :content="content" />
      </div>
    </v-card>
  </v-dialog>
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