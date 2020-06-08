<template>
  <div>
    <need-auth-banner v-if="user.status === 'unregistered'"/>
    <template v-else>
      <v-card outlined>
        <v-card-text>
          <h2 class="primary--text">Курсы</h2>
        </v-card-text>
      </v-card>
      <div class="row flex-nowrap">
        <div class="col page-navigation">
          <course-calendar />
          <v-card outlined class="mt-4">
            <course-tree @changedSelectedItem="changedSelectedItem" />
          </v-card>
        </div>
        <div class="col page-content">
          <v-card outlined v-if="$route.path === '/courses'">
            <div class="ma-5">
              <div class="headline font-weight-bold">Просмотр курсов</div>
              <div v-html="buildFilterList($route.query)"></div>
            </div>
            <v-divider />
            <!-- <v-row class="ma-2">
              <v-col v-for="item in filterByQuery" :key="item._id" cols="12">
                <course-preview :item="item" />
              </v-col>
            </v-row>-->
            <v-list>
              <v-list-item v-for="item in filterByQuery" :key="item._id" two-line :to="`/courses/${item._id}`">
                <course-preview :item="item" />
              </v-list-item>
            </v-list>
          </v-card>
          <keep-alive v-else>
            <router-view :key="$route.fullPath" />
          </keep-alive>
        </div>
        <!-- <div class="col page-info">
          <v-card outlined class="mb-4">
            <v-skeleton-loader type="card-avatar"></v-skeleton-loader>
          </v-card>
          <v-card outlined class="mb-4">
            <v-skeleton-loader type="card"></v-skeleton-loader>
          </v-card>
          <v-card outlined class="mb-4">
            <v-skeleton-loader type="card-heading"></v-skeleton-loader>
          </v-card>
        </div>-->
      </div>
    </template>
  </div>
</template>

<script>
export default {
  components: {
    CourseTree: () => import("../../components/courses/CourseTree"),
    CoursePreview: () => import("../../components/courses/CoursePreview"),
    CourseCalendar: () => import("../../components/courses/CourseCalendar"),
    NeedAuthBanner: () => import("../../components/user/NeedAuthBanner")
  },
  data: () => ({}),
  computed: {
    filterByQuery() {
      return this.$store.getters["courses/filterByQuery"](this.$route.query);
    },
    user() {
      return this.$store.state.user;
    }
  },
  methods: {
    changedSelectedItem(item) {
      item = item[0];
      this.$router.push(item.link);
    },
    buildFilterList(value) {
      // Получить человекопонятное описание фильтров для курсов
      // Если фильтры в url не указаны - выводим надпись "Показаны все курсы"
      if (Object.keys(value).length == 0) return "Показаны все курсы";
      else {
        // Если фильтры в url указаны
        let query = "";

        // Перебираем фильтры
        for (let node in value) {
          // Создаём строку вида "Ключ: значение" и заключаем её в элемент div
          // Данные берутся из $store.state.courses.groups, которая заполняется
          // автоматически при запросе курсов из базы. Там хранятся все возможные
          // названия параметров и их перевод на русский
          let item = this.$store.state.courses.groups.find(
            el => el.alias === node
          );
          query += `<div>${item.name}: ${item.items[value[node]]}</div>`;
        }
        return query;
      }
    }
  }
};
</script>

<style scoped>
.courses-items > .col {
  flex: 1 1 33.3333333333%;
  max-width: 50%;
}
</style>