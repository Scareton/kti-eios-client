<template>
  <div v-if="course && section">
    <v-btn depressed color="deep-orange darken-3" dark @click="createContent" :ref="`btn_${section._id}`">Добавить вложение</v-btn>

    <base-fullscreen-dialog :display.sync="dialog" title="Создать вложение" color="deep-orange darken-3">
      <v-form>
        <!-- Основная информация: Название, Тип, Описание -->
        <v-card outlined class="mb-4">
          <v-toolbar flat dense dark color="primary">
            <v-toolbar-title class="subtitle-2">Основная информация</v-toolbar-title>
          </v-toolbar>
          <div class="px-4">
            <!-- Название и тип -->
            <v-row>
              <v-col>
                <v-text-field label="Название вложения"></v-text-field>
              </v-col>
              <v-col>
                <v-select :items="contentTypes" label="Тип вложения"></v-select>
              </v-col>
            </v-row>
            <!-- Описание -->
            <v-row>
              <v-col>
                <v-textarea outlined label="Описание вложения" counter="200" hint="Постарайтесь кратко и информативно описать это вложение"></v-textarea>
              </v-col>
            </v-row>
          </div>
        </v-card>

        <!-- Настройки -->
        <v-card outlined class="mb-4">
          <v-toolbar flat dense dark color="primary">
            <v-toolbar-title class="subtitle-2">Настройки</v-toolbar-title>
          </v-toolbar>
          <div class="pa-4">
            <v-card outlined class="pa-4 mb-2">
              <div class="subtitle-2">Настройки доступа:</div>
              <v-row>
                <v-col>
                  <v-select :items="siblings" v-model="content.req.target" label="Вложение доступно..."></v-select>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <base-tooltip text="Доступность данного вложения для студентов после того, как оно будет опубликовано">
                    <v-switch v-model="content.visibility" hide-details class="ma-2" label="Видимость вложения"></v-switch>
                  </base-tooltip>
                </v-col>
              </v-row>
            </v-card>
            <v-card outlined class="pa-4">
              <div class="subtitle-2">Типы файлов, доступные для отправки:</div>
              <div style="display:flex;">
                <div class="mr-4" v-for="(item, index) in fileTypes" :key="index">
                  <v-checkbox hide-details v-model="item.value" :label="item.text"></v-checkbox>
                </div>
              </div>
            </v-card>
          </div>
        </v-card>

        <!-- Подробная информация: Содержание -->
        <v-card outlined class="mb-4">
          <v-toolbar flat dense dark color="primary">
            <v-toolbar-title class="subtitle-2">Содержание</v-toolbar-title>
          </v-toolbar>
          <v-textarea hide-details label="Будет заменено на WYSIWYG-редактор" style="text-indent: 16px;"></v-textarea>
        </v-card>
      </v-form>

      <v-card outlined style="display:flex; justify-content: flex-end;" class="mb-6 pa-4">
        <v-btn depressed dark color="deep-orange darken-3">Подтвердить создание вложения</v-btn>
      </v-card>
    </base-fullscreen-dialog>
  </div>
  <div v-else>Создание вложения: произошла ошибка. Курс или секция указаны неверно</div>
</template>

<script>
export default {
  props: {
    course: {
      default: null
    },
    section: {
      default: null
    }
  },
  data: () => ({
    dialog: false,
    content: {
      visibility: true,
      taskDT: ".docx, .doc, .txt",
      req: {
        target: null
      }
    },
    contentTypes: [1, 2],
    fileTypes: [
      {
        text: "Документы Microsoft Word",
        type: [".docx", ".doc"],
        value: true
      },
      {
        text: "Презентации Microsoft PowerPoint",
        type: [".pptx", ".ppt"],
        value: false
      },
      {
        text: "Архивы",
        type: [".rar", ".zip", "7z"],
        value: false
      }
    ]
  }),
  computed: {
    siblings() {
      let sib = [{ text: "Сразу", value: null }];
      sib = sib.concat(
        this.section.content.map(c => {
          return { text: `После завершения «${c.name}»`, value: c._id };
        })
      );
      return sib;
    }
  },
  methods: {
    createContent() {
      this.dialog = true;
    }
  },
  created() {
    this.$nextTick(function() {
      if (this.$refs.btn_5eb46b3a8b75ba0992994b99) {
        console.log(this.course._id);
        this.createContent();
      }
    });
  }
};
</script>