<template>
  <v-app>
    <navigation-drawer />

    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",
  components: {
    NavigationDrawer: () => import("./components/main/NavigationDrawer")
  },

  data: () => ({

  }),
  
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
