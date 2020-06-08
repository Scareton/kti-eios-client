<template>
  <div class="pa-4" v-if="group.members">
    <v-data-table v-model="selected" :headers="headers" :items="items" item-key="_id">
      <template v-slot:item.surname="{ item }">{{item.surname}} {{item.name}} {{item.patronymic}}</template>
      <template v-slot:item.contentData.s="{ item }">
        <template v-if="item.contentData.s !== undefined">
          <v-select v-model="item.contentData.s" :items="dictionary.getAllUserCourseContentStatuses()" @change="statusChanged($event, item)" />
        </template>
        <template v-else>Не установлен</template>
      </template>

      <!--  -->
      <template v-slot:item.contentData.a.s="{ item }">
        <template v-if="item.contentData.a && item.contentData.a.s">
          <v-text-field v-model="item.contentData.a.s" type="number" max="100" :min="item.contentData.s === 5 ? '61' : '0'" />
        </template>
      </template>

      <!-- Действия -->
      <template v-slot:item.contentData.a.p="{ item }">
        <template v-if="item.contentData.a">
          <v-chip :href="`/api${item.contentData.a.p}`" target="_blank" color="primary">Открыть файл</v-chip>
        </template>
        <v-chip @click="saveChanges(item)" color="primary" class="ml-1" :disabled="!checkChanges(item)">Сохранить</v-chip>
      </template>
    </v-data-table>

    <!-- Диалог сохранения -->
    <v-dialog v-model="saveDialog" width="unset">
      <v-card>
        <v-card-title>Сохранить изменения?</v-card-title>
        <v-divider />
        <div class="pa-4">
          <template v-if="saveStudent">
            <div class="caption grey--text">Студент:</div>
            <div>{{saveStudent.name}} {{saveStudent.surname}} {{saveStudent.patronymic}}</div>
            <div class="caption mt-4 grey--text">Изменения:</div>
            <div v-html="saveData"></div>
          </template>
        </div>
        <v-divider />
        <v-card-actions>
          <v-btn text @click="saveDialog = false; saveStudent = null;">Отмена</v-btn>
          <v-btn text @click="saveRestore(saveStudent)">Вернуть значения</v-btn>
          <v-btn text color="primary" @click="saveUpdate(saveStudent)">Сохранить</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import CourseService from "../../../services/CourseService";
export default {
  props: {
    content: {
      type: Object
    },
    group: {
      type: Object
    }
  },
  data: () => ({
    selected: [],
    saveDialog: false,
    saveStudent: null,
    saveData: ""
  }),
  computed: {
    headers() {
      // let file = null;
      // if (this.)
      return [
        {
          text: "ФИО",
          align: "start",
          sortable: true,
          value: "surname"
        },
        { text: "Статус", value: "contentData.s", width: 235 },
        { text: "Оценка", value: "contentData.a.s" },
        { text: "", value: "contentData.a.p", sortable: false, align: "right" }
      ];
    },
    items() {
      let students = this.group.members;
      students.forEach((student, i) => {
        let contentStudent = this.content.students.find(
          s => s._id === student._id
        );

        this.$set(
          this.group.members[i],
          "contentData",
          JSON.parse(JSON.stringify(contentStudent))
        );
        this.$set(
          this.group.members[i],
          "contentDataBase",
          JSON.parse(JSON.stringify(contentStudent))
        );
      });
      return students;
    }
  },
  methods: {
    statusChanged(status, student) {
      if (status === 5 && student.contentData.a.s < 61) {
        student.contentData.a.s = 61;
      } else {
        student.contentData.a.s = null;
      }
    },
    checkChanges(student) {
      let localStatus = student.contentData.s;
      let BaseStatus = student.contentDataBase.s;
      let localRate = null;
      let BaseRate = null;
      if (student.contentData.a) {
        localRate = Number(student.contentData.a.s);
        BaseRate = Number(student.contentDataBase.a.s);
      }

      if (localStatus === BaseStatus && localRate === BaseRate) return false;
      return true;
    },
    saveRestore(student) {
      this.$set(
        student,
        "contentData",
        JSON.parse(JSON.stringify(student.contentDataBase))
      );
      this.saveDialog = false;
    },
    saveChanges(student) {
      this.saveStudent = student;
      this.saveData = "";
      if (student.contentData.s !== student.contentDataBase.s) {
        this.saveData += `<div><b>Статус</b> изменён с <b>"${this.dictionary.userCourseContentStatus(
          student.contentDataBase.s
        )}"</b> на <b>"${this.dictionary.userCourseContentStatus(
          student.contentData.s
        )}"</b> </div>`;
        if (student.contentData.s < 5) {
          student.contentData.a.s = null;
          this.saveData += `<div><b>Оценка</b> изменена с <b>${student.contentDataBase.a.s}</b> на <b>Не установлена</b></div>`;
        }
      }
      if (
        student.contentData.a.s !== student.contentDataBase.a.s &&
        student.contentData.a.s !== null
      ) {
        this.saveData += `<div><b>Оценка</b> изменена с <b>${student.contentDataBase.a.s}</b> на <b>${student.contentData.a.s}</b></div>`;
      }

      this.saveDialog = true;
    },
    saveUpdate(student) {
      CourseService.changeCourseContentUserStatus(
        this.content,
        student.contentData.s,
        student._id,
        student.contentData.a.s
      )
        .then(response => {
          this.$store.commit("courses/update", {
            payload: response.data,
            app: this
          });
          this.saveDialog = false;
          this.saveRestore(student);
          // this.$store.commit("snackbar/success", "Успешно сохранено")
        })
        .catch(err => {
          this.$store.commit("snackbar/error", err);
        });
    },
    getContentStudent(student) {
      return this.content.students.find(s => s._id === student._id);
    },
    getMembers() {
      this.$store.dispatch("groups/getMembers", {
        groupId: this.group._id,
        app: this
      });
    }
  },
  created() {
    this.getMembers();
  }
};
</script>