import api from "./api";

export default {
  getCourses() {
    return api().get('/courses')
  },
  getCourse(id) {
    return api().get(`/courses/${id}`)
  },
  getCoursesTest() {
    return api().get('/coursestest')
  },
  markCourseContentFinished(courseId, contentId) {
    return api().post(`/courses/${courseId}/${contentId}/finish`)
  }
};
