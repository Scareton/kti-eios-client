import Vue from 'vue'
import Vuex from 'vuex'
// import router from "../router/index"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      status: "logged",
      data: {
        name: "Александр",
        surname: "Воронков",
        email: "voron4288@gmail.com",
        image: "https://randomuser.me/api/portraits/men/81.jpg",
        role: 1,
        student: {
          year: 4,
          specialty: {
            name: "Информационные системы (По отраслям)",
            url: "/#",
          }
        }
      },
      system: {
        logoutCheckState: false,
      }
    },
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
  },
  modules: {
  }
})
