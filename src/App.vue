<template>
  <v-app>
    <navigation-drawer />

    <v-content>
      <v-container v-if="user.status === 'unregistered' && loginBanner && $route.path !== '/login' && $route.path !== '/registration'">
        <v-banner two-line>
          <v-avatar slot="icon" color="primary" size="40">
            <v-icon icon="mdi-lock" color="white">mdi-lock</v-icon>
          </v-avatar>
          <span>Некоторые курсы могут быть недоступны без авторизации.</span>
          <template v-slot:actions>
            <v-btn text color="primary" to="/login">Авторизоваться</v-btn>
            <v-btn text @click="loginBanner = false">Закрыть сообщение</v-btn>
          </template>
        </v-banner>
      </v-container>

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
    loginBanner: true
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
.page-center {
  height: 100%;
  width: 100%;
  padding: 24px;
  justify-content: center;
  align-items: center;
  display: flex;
}
.page-center > .v-card {
  flex: 0 1 620px;
}

/* background */
body {
  /* background-image: url("/images/pattern.png"); */
  /* background-repeat: repeat; */
  /* background-size: 100px; */
}
.theme--light.v-application {
  background: rgba(241, 241, 241, 0.97) !important;
}
</style>
