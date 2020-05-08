import api from "./api";

export default {
  getCourses() {
    return api().get('/courses')
  },
  getCourse(id) {
    return api().get(`/courses/get/${id}`)
  },
  markCourseContentFinished(contentId) {
    return api().post(`/contents/${contentId}/finish`)
  }
};
