import api from "./api";
import store from "../store/index"

export default {
  getCourses() {
    return api().get('/courses')
  },
  getCourse(id) {
    return api().get(`/courses/get/${id}`)
  },
  markCourseContentFinished(contentId) {
    return api().post(`/contents/${contentId}/finish`)
  },
  changeCourseContentUserStatus(content, status) {
    return new Promise((resolve, reject) => {
      // Получить текущего пользователя
      let user = store.state.user.data;
      // Если пользователь - студент
      if (user.role === 1) {
        // Найти текущего пользователя во вложении
        let contentUser = content.students.find(item => item._id === user._id);

        // Если пользователь во вложении не найден - выполнить запрос
        if (contentUser === undefined) {
          resolve(api().post(`/courses/contents/${content._id}/status`, { status: status }))
        }

        // Если пользователь во вложении имеет более высокий статус - отклонить запрос
        else if (contentUser.s > status) reject("У пользователя уже установлен более высокий статус");

        // В ином случае - выполнить запрос
        else reject("Отказ запроса");
      } else reject("Для преподавателей не учитывается состояние вложения");
    })
  }
};
