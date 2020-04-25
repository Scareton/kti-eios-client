<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" :mini-variant="drawerMiniVariant" :expand-on-hover="drawerExpandOnHover" app>
      <v-list dense nav class="pa-0">
        <v-list-item two-line :class="miniVariant && 'px-0'">
          <v-list-item-avatar>
            <img src="https://randomuser.me/api/portraits/men/81.jpg" />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Application</v-list-item-title>
            <v-list-item-subtitle>Subtext</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item v-for="item in items" :key="item.title" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
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
    </v-app-bar> -->

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
    drawerExpandOnHover: true
  })
};
</script>
