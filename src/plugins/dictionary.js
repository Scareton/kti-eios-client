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
      0: "Не начато",
      1: "Просмотрено",
      2: "Начато",
      3: "Задание отправлено",
      4: "Работа не зачтена",
      5: "Работа зачтена",
      6: "Завершено"
    }
    return statuses[value];
  },
  courseContentType: (value) => {
    let types = {
      0: "",
      1: "Информация",
      2: "Задание"
    }
    return types[value]
  },
  courseContentTypeReqStatus: (value) => {
    let types = {
      1: 1,
      2: 5,
    }
    return types[value]
  },
  courseContentStatusColor: (status) => {
    if (status === 0) return { color: "grey darken-3", dark: true };
    if (status === 1) return { color: "blue-grey darken-2", dark: true };
    if (status === 2) return { color: "light-blue darken-4", dark: true };
    if (status === 3) return { color: "primary", dark: true };
    if (status === 4) return { color: "red darken-4", dark: true };
    if (status === 5) return { color: "green darken-2", dark: true };
    if (status === 6) return { color: "blue darken-4", dark: true };
    else return { color: "primary", dark: true };
  },
  formatDate: (a) => {
    return `${a.getFullYear()}-${a.getMonth() + 1}-${a.getDate()}`
  },
  install: function (Vue) {
    Object.defineProperty(Vue.prototype, 'dictionary', {
      get() { return dictionary }
    })
  }
}
export default dictionary;
// Vue.use(dictionary)