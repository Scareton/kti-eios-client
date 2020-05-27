import Vue from 'vue'
import Vuex from 'vuex'

import snackbar from "./modules/snackbar";
import user from "./modules/user"
import courses from "./modules/courses"
import groups from "./modules/groups"

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    snackbar,
    user,
    courses,
    groups
  },
  state: {

  },
  mutations: {

  },
  actions: {

  }
})
