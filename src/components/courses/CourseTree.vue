<template>
  <!-- <v-skeleton-loader type="list-item-three-line" v-if="groupedCourses[0]" /> -->
  <div class="pa-4 courses-tree">
    <v-treeview item-key="_id" :items="groupedCourses" activatable hoverable :active.sync="selected" return-object :open.sync="open" @update:active="changedSelectedItem">
      <template v-slot:label="{ item }">{{item.name}}</template>
      <template v-slot:prepend="{ item, open }">
        <v-icon v-if="item.type === 'level'">{{ open ? 'mdi-briefcase' : 'mdi-briefcase-outline' }}</v-icon>
        <v-icon v-else-if="item.type === 'discipline'">{{ open ? 'mdi-book' : 'mdi-book-outline' }}</v-icon>
        <v-icon v-else>mdi-file-outline</v-icon>
      </template>
    </v-treeview>
  </div>
</template>

<script>
export default {
  data: () => ({
    selected: []
  }),
  computed: {
    groupedCourses() {
      return this.$store.getters["courses/groupBy"]();
    },
    open: {
      get() {
        return this.$store.state.courses.navigation.open;
      },
      set(value) {
        this.$store.commit("courses/listOpened", value);
      }
    }
  },
  methods: {
    changedSelectedItem(item) {
      this.$emit("changedSelectedItem", item);
    },
    createLinkFromQuery(query) {
      let link = `/courses?`;
      for (let prop in query) {
        link += `${prop}=${query[prop]}&`;
      }
      link = link.slice(0, -1);
      return link;
    },
    openListCheck(value) {
      // Нужно отметить данный курс выбранным в навигации

      // Если это страница курса, получить его id
      if (this.$route.params.course) {
        let id = this.$route.params.course;
        let course = this.$store.getters["courses/getById"](id);
        this.selected = [course];

        let groups = this.$store.state.courses.groups.map(item => item.alias);
        let list = [];
        let i = 0;

        // Открыть все родительские директории для курса
        let buildOpenList = function(value) {
          value.forEach(cur => {
            if (cur.type === groups[i]) {
              if (cur.alias === course[groups[i]].alias) {
                list.push(cur);
                i++;
                buildOpenList(cur.children);
              }
            }
          });
        };

        buildOpenList(value);
        this.$store.commit("courses/listOpened", list);
      } else {
        // Сбросить выбранную страницу в навигации, если выбрана главная страница /courses/
        if (Object.keys(this.$route.query).length == 0) {
          this.selected = [];
        }
      }
    }
  },
  watch: {
    groupedCourses: {
      handler(value) {
        this.openListCheck(value);
      }
    },
    $route: {
      handler() {
        // Обновить навигацию, если произошёл переход в категорию или курс
        if (
          Object.keys(this.$route.query).length !== 0 ||
          this.$route.params.course
        )
          this.openListCheck(this.groupedCourses);
      }
    }
  }
};
</script>

<style>
.courses-tree .v-treeview-node__label {
  font-size: 15px;
}
.courses-tree .v-treeview-node__root {
  cursor: pointer;
}
</style>