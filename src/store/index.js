import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
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
      }
    },
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
