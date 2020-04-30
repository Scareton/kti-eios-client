import api from "./api";

export default {
  loginWithUsernameAndPassword(username, password) {
    return api().post('/users/login', { username, password })
  }
};
