import api from "./api";

export default {
  CreatUser(formdata) {
    return api().post('/db/users', formdata)
  }
};
