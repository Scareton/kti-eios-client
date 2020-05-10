<template>
  <div v-if="!section.blocked && Object.keys(section.content).length > 0">
    <course-section-contents-item
      v-for="item in section.content"
      :key="item._id"
      :content="item"
      @clicked="openContent"
    />

    <v-dialog v-model="contentDialog" hide-overlay fullscreen tile>
      <v-card v-if="activeContent" tile>
        <v-toolbar dark color="primary" flat>
          <v-toolbar-title>{{section.name}} - {{activeContent.name}}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="contentDialog = false">Сохранить</v-btn>
          </v-toolbar-items>
          <v-btn icon dark @click="contentDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <div class="pa-4">{{activeContent.description}}</div>
      </v-card>
    </v-dialog>
  </div>
  <div v-else class="red--text text--darken-4">
    Данный раздел закрыт
  </div>
</template>

<script>
import CourseService from "../../services/CourseService";
export default {
  components: {
    CourseSectionContentsItem: () => import("./CourseSectionContentsItem")
  },
  props: {
    section: {
      type: Object,
      default: null
    }
  },
  data: () => ({
    activeContent: null,
    contentDialog: false
  }),
  methods: {
    /** Открыть вложение */
    openContent(content) {
      this.activeContent = content;
      this.contentDialog = true;
      CourseService.changeCourseContentUserStatus(content, 1)
        .then(response => {
          if (response.data) this.$emit("courseUpdated", response.data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style>
</style>