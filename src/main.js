import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import store from './store'

Vue.config.productionTip = false;

const dictionary = {
  user_role: (id) => {
    let roles = {
      0: "Не определена",
      1: "Студент",
      2: "Преподаватель",
    }
    return roles[id];
  },
  file_icon: (type) => {
    let icons = {
      "file": "mdi-file",
      "pdf": "mdi-file-pdf"
    }
    return icons[type] || icons.file;
  },
  datetime_local: (date) => {
    return date.toLocaleDateString("Ru-ru", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  },
  userCourseContentStatus: (value) => {
    let statuses = {
      0: "Не установлен",
      1: "Просмотрено",
      2: "Начато",
      3: "Завершено"
    }
    return statuses[value];
  },
  install: function (Vue) {
    Object.defineProperty(Vue.prototype, 'dictionary', {
      get() { return dictionary }
    })
  }
}
Vue.use(dictionary)

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
