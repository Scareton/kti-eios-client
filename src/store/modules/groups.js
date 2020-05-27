import GroupService from "../../services/GroupService";

const state = {
  group: null,
  groups: []
}

const mutations = {
  set: (state, payload) => {
    state.group = payload;
  },
  setGroups: (state, payload) => {
    state.groups = payload;
  },
  setGroupMembers: (state, { groupId, members, app }) => {
    let index = state.groups.findIndex(g => g._id === groupId)
    app.$set(state.groups[index], "members", members)
  }
}

const actions = {
  get: ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      let user = rootState.user.data;

      if (user.role === 1) {
        GroupService.getStudentGroup().then(response => {
          commit("set", response.data[0])
          resolve()
        }).catch(err => {
          reject(err)
        })
      }

      else if (user.role === 2) {
        // Получить список id групп для запроса
        let groupsId = "?id=";
        groupsId += rootState.courses.list.reduce((array, course) => {
          return array.concat(course.groups)
        }, []).join("&id=")

        // Запрос к базе
        GroupService.getGroups(groupsId).then(response => {
          commit("setGroups", response.data)
          resolve()
        }).catch(err => {
          reject(err)
        })
      } else reject("Неожиданная роль")
    })
  },
  /**
   * Получить информацию о студентах академической группы
   * @param {Boolean} update Если false, запрос не будет отправлен, когда пользователи уже получены
   */
  getMembers: ({ commit }, { groupId, app, update }) => {
    return new Promise((resolve, reject) => {
      let group = state.groups.find(g => g._id === groupId)
      if (!update && group !== undefined && group.members && group.members[0]) {
        resolve("Данные пользователей уже получены")
      } else {
        GroupService.getGroupMembers(groupId).then(response => {
          commit("setGroupMembers", { groupId, members: response.data, app })
        }).catch(err => {
          console.log(err)
          reject(err)
        })
      }
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}