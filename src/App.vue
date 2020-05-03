<template>
  <v-app>
    <navigation-drawer />

    <v-content>
      <v-container>
        <need-auth-banner />
        <router-view />
      </v-container>
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
import UserService from "./services/UserService";
export default {
  name: "App",
  components: {
    NavigationDrawer: () => import("./components/main/NavigationDrawer"),
    NeedAuthBanner: () => import("./components/user/NeedAuthBanner")
  },

  data: () => ({}),
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
      if (document.cookie) {
        UserService.refreshSession().then(response => {
          this.$store.commit("user/login", response.data);
        });
      }
    }
  },
  created() {
    this.checkIsUserLogged();
  }
};
</script>

<style>
.container {
  max-width: 100% !important;
  height: 100%;
}
.col.page-navigation {
  flex: 0 1 400px;
  overflow: hidden;
}
.col.page-content {
  flex: 1;
  overflow: hidden;
}
.col.page-info {
  flex: 0 1 300px;
  overflow: hidden;
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
