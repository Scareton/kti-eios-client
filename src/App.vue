<template>
  <v-app>
    <navigation-drawer />

    <v-content>
      <div class="pa-4" style="height:100%;">
        <template v-if="user.status === 'unregistered' && loginBanner && $route.path !== '/login' && $route.path !== '/registration'">
          <v-banner two-line class="mb-4">
            <v-avatar slot="icon" color="primary" size="40">
              <v-icon icon="mdi-lock" color="white">mdi-lock</v-icon>
            </v-avatar>
            <span>Некоторые курсы могут быть недоступны без авторизации.</span>
            <template v-slot:actions>
              <v-btn text color="primary" to="/login">Авторизоваться</v-btn>
              <v-btn text @click="loginBanner = false">Закрыть сообщение</v-btn>
            </template>
          </v-banner>
        </template>

        <router-view />
      </div>
    </v-content>

    <!-- Global Snackbar -->
    <v-snackbar v-model="snackbar.display" :color="snackbar.color">
      <span :class="snackbar.textColor">
        <template v-if="snackbar.message">{{snackbar.message}}</template>
        <template v-else>Неизвестная ошибка</template>
      </span>
      <v-btn text dark @click="snackbar.display = false">Закрыть</v-btn>
    </v-snackbar>
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
    },
    snackbar() {
      return this.$store.state.snackbar;
    }
  },
  methods: {
    checkIsUserLogged() {
      
    }
  },
  created() {

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
a[target="_blank"]:after {
  content: "\F03CC";
  padding-left: 2px;
  text-decoration: unset;
  display: inline-block;
  font: normal normal normal 24px/1 "Material Design Icons";
  font-size: inherit;
  text-rendering: auto;
  line-height: inherit;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
ul + p {
  margin-top: 16px;
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
