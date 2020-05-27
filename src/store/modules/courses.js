import CourseService from "../../services/CourseService";

// Сгруппировать курсы в виде дерева
let groupBy = (data, groups) => {
  return data.reduce(function (rv, x) {
    let link = "/courses?";
    let linkpath = {};
    groups
      .reduce(function (level, key) {
        var el;

        level.some(function (r) {
          if (r && r._id === x[key]._id) {
            el = r;
            return true;
          }
        });

        if (!el) {
          link += `${x[key].type}=${x[key].alias}&`
          linkpath[x[key].type] = x[key].alias;
          el = {
            _id: x[key]._id,
            name: x[key].name,
            type: x[key].type,
            alias: x[key].alias,
            link: link.slice(0, -1),
            linkpath: linkpath,
            children: []
          };
          level.push(el);
        }
        return el.children;
      }, rv)
      .push({ _id: x._id, name: x.name, type: x.type, link: `/courses/${x._id}` });
    return rv;
  }, []);
}

const state = {
  list: [],
  dialogContentDisplay: false,
  dialogContentPath: null,
  navigation: {
    open: []
  },

  // В groups.items хранятся все возможные названия и значения параметров
  // Заполняется автоматически при запросе курсов с базы данных. Имеет значения только
  // Для реально существующих и полученных курсов. Пустых директорий нет.
  groups: [
    { alias: "level", name: "Уровень образования", items: {} },
    { alias: "discipline", name: "Предмет", items: {} }
  ]
}

const getters = {
  /**
   * Получить сгруппированный массив курсов для их древовидного отображения.
   * Если в запросе геттера не указаны группы - они берутся из state.groups
   */
  groupBy: state => groups => {
    if (!groups) groups = state.groups.map(item => item.alias);
    if (state.list) return groupBy(state.list, groups);
  },
  /**
   * Получить один курс по заданному id
   */
  getById: state => id => {
    return state.list.find(item => item._id == id);
  },
  /**
   * Отфильтровать курсы по запросу. Используется для отображения директории курсов
   * По ссылкам вида /courses?level="spo"&discipline="math"
   */
  filterByQuery: state => query => {
    let filtered = state.list.slice();
    for (let node in query) {
      filtered = filtered.filter(item => item[node].alias === query[node])
    }
    return filtered;
  }
}

const mutations = {
  set: (state, payload) => {
    state.list = payload;
  },
  update: (state, { payload, app }) => {
    let index = state.list.findIndex(item => item._id === payload._id);
    app.$set(state.list, index, payload)
  },
  updateDialogContent: (state, payload) => {
    state.dialogContentDisplay = payload;
  },
  updateDialogContentPath: (state, payload) => {
    state.dialogContentPath = payload;
    state.dialogContentDisplay = true;
  },
  /**
   * Изменить список открытых директорий в навигации. 
   * Используется компонентом courseTree.vue
   */
  listOpened: (state, payload) => {
    state.navigation.open = payload;
  }
}

const actions = {
  get: ({ commit }) => {
    return new Promise((resolve, reject) => {
      CourseService.getCourses().then(response => {
        if (response.data) {
          response.data;

          // Заполним перевод параметров на русский в объекте state.groups.items
          response.data.forEach(item => {
            state.groups.forEach(group => {
              // Заполнение массива возможный значений данными из курсов.
              group.items[item[group.alias].alias] = item[group.alias].name
            });
          });
          commit("set", response.data)
          resolve()
        }
        else reject()
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