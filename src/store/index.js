import Vue from 'vue'
import Vuex from 'vuex'

// Модули
import snackbar from "./modules/snackbar"

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    snackbar
  },
  state: {
    user: {
      status: "unregistered",
      data: {},
      system: {
        logoutCheckState: false,
      }
    }
  },
  mutations: {
    // Действия с пользователями
    user_system_logoutCheckState: (state, payload) => {
      state.user.system.logoutCheckState = payload;
    },
    user_logout: (state) => {
      state.user.status = 'unregistered'
      state.user.data = {};
      state.user.system.logoutCheckState = false;
      location.reload()
    }
    // КОНЕЦ Действия с пользователями
  },
  actions: {
    // Действия с пользователями
    user_logout: ({ commit }) => {
      commit("user_logout");
    }
    // КОНЕЦ Действия с пользователями
  }
})
