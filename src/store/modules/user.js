import UserService from "../../services/UserService"

const state = {
  status: "unregistered",
  data: {},
  system: {
    logoutCheckState: false,
  }
}

const getters = {
  data: state => {
    return state.data
  }
}

const mutations = {
  login: (state, payload) => {
    state.data = payload;
    state.status = "logged";
  },
  logoutCheckState: (state, payload) => {
    state.system.logoutCheckState = payload;
  },
  logout: () => {
    UserService.logout().then(() => {
      location.reload()
    })
  }
}

const actions = {
  logout: ({ commit }) => {
    commit("logout");
  },
  login: ({ commit, dispatch }) => {
    new Promise((resolve, reject) => {
      dispatch("courses/get", null, { root: true }).then(() => {
        commit("login")
        resolve();
      }).catch(err => {
        reject(err)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}