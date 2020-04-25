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
            <v-list-item-title>Александр Воронков</v-list-item-title>
            <v-list-item-subtitle>Студент 4-го курса</v-list-item-subtitle>
            <v-list-item-subtitle>Информационные системы (по отраслям)</v-list-item-subtitle>
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
      </v-list>

      <!-- base links (profile etc.) -->
      <v-divider class="my-4" />
      <v-list dense nav class="py-0">
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
        url: "/cources",
        icon: "mdi-book-open-page-variant"
      }
    ]
  })
};
</script>
