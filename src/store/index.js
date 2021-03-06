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
    "width": 0,
    "breakpoints": [
      { "name": "desktop", "value": 768 },
      { "name": "mobile", "value": 0 }
    ],
    "breakpoint": "desktop"
  },
  mutations: {
    setWidth: (state, payload) => {
      state.width = payload;
      state.breakpoint = state.breakpoints.find(b => payload >= b.value).name
    },
  },
  actions: {

  }
})
