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
  logout: (state) => {
    state.status = 'unregistered'
    state.data = {};
    state.system.logoutCheckState = false;
    location.reload()
  }
}

const actions = {
  logout: ({ commit }) => {
    commit("user_logout");
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}