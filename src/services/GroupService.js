import api from "./api";

export default {
  getStudentGroup() {
    return api().get(`/groups`)
  },
  getGroupMembers(groupId) {
    return api().get(`/groups/${groupId}/members`)
  },
  getGroups(groupsId) {
    return api().get(`/groups${groupsId}`)
  },
};
