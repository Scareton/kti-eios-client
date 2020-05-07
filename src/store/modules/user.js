import UserService from "../../services/UserService"

const state = {
  status: "unregistered",
  data: {},
  system: {
    logoutCheckState: false,
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
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}