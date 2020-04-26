<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" :mini-variant="drawerMiniVariant" :expand-on-hover="drawerExpandOnHover" app>
      <!-- Links -->
      <v-list dense nav class="py-0">
        <v-list-item two-line :class="drawerMiniVariant && 'px-0'">
          <v-list-item-avatar>
            <img src="https://randomuser.me/api/portraits/men/81.jpg" />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{user.data.name}}&nbsp;{{user.data.surname}}</v-list-item-title>
            <template v-if="user.data.role === 1">
              <v-list-item-subtitle>{{dictionary.user_role(user.data.role)}} {{user.data.student.year}}-го курса</v-list-item-subtitle>
              <v-list-item-subtitle>{{user.data.student.specialty.name}}</v-list-item-subtitle>
            </template>
          </v-list-item-content>
        </v-list-item>

        <v-divider class="mb-4" />

        <v-list-item v-for="link in links" :key="link.title" :to="link.url" link>
          <v-list-item-icon>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ link.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <!-- Base links (like /profile) -->
        <v-divider class="my-4" />
        <!-- if user -->
        <v-list-item link to="/profile">
          <v-list-item-icon>
            <v-icon>mdi-account</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Личный кабинет</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <!-- exit -->
        <v-list-item link to="/logout">
          <v-list-item-icon>
            <v-icon>mdi-logout-variant</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Выход</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- <v-app-bar app color="primary" dark>
      <app-header />

      <v-spacer />

      <v-btn href="/#" text>
        <span class="mr-2">Личный кабинет</span>
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </v-app-bar>-->

    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",
  components: {
    // AppHeader: () => import("./components/main/AppHeader")
  },

  data: () => ({
    drawer: true,
    drawerMiniVariant: true,
    drawerExpandOnHover: true,

    // navigation
    links: [
      {
        title: "Главная",
        url: "/",
        icon: "mdi-home"
      },
      {
        title: "Новости",
        url: "/news",
        icon: "mdi-newspaper-variant"
      },
      {
        title: "Курсы",
        url: "/courses",
        icon: "mdi-book-open-page-variant"
      }
    ]
  }),
  computed: {
    user() {
      return this.$store.state.user;
    }
  }
};
</script>

<style>
.col.page-navigation {
  flex: 0 1 400px;
}
.col.page-content {
  flex: 1;
}
.col.page-info {
  flex: 0 1 300px;
}
.page-content .list-flex .v-list-item > div:first-child {
  flex: 0 1 150px;
}
.page-content .list-flex .v-list-item > div:not(:first-child) {
  flex: 1;
}
</style>
