import Vue from 'vue'
import Vuex from 'vuex'

import snackbar from "./modules/snackbar";
import user from "./modules/user"
import courses from "./modules/courses"

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    snackbar,
    user,
    courses
  },
  state: {

  },
  mutations: {

  },
  actions: {

  }
})
