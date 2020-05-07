const state = {
  display: false,
  message: "",
  status: ""
}
const mutations = {
  success: (state, payload) => {
    state.message = payload;
    state.color = "green darken-3";
    state.textColor = "white--text";
    state.display = true;
  },
  error: (state, payload) => {
    state.message = payload;
    state.color = "red darken-4";
    state.textColor = "white--text";
    state.display = true;
  },
  close: (state) => {
    // Закрыть сообщение
    state.message = "";
    state.color = "";
    state.textColor = "";
    state.display = false;
  }
}

export default {
  namespaced: true,
  state,
  mutations
}