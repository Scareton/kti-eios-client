import api from "./api";

export default {
  getCourses() {
    return api().get('/courses')
  },
  getCategories() {
    return api().get('/courses/categories')
  }
};
