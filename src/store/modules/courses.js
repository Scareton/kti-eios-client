import CourseService from "../../services/CourseService";

const state = {
  list: []
}
const mutations = {
  success: (state, payload) => {
    state.message = payload;
    state.color = "green darken-3";
    state.textColor = "white--text";
    state.display = true;
  },
  get: (state, payload) => {
    state.list = payload;
  }
}
const actions = {
  get: ({ commit }) => {
    CourseService.getCourses()
      .then(response => {
        commit("get", response.data)
      })
      .catch(err => {
        commit("snackbar/error", err, { root: true })
      })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}