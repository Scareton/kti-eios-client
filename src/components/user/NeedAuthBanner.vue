<template>
  <div class="mb-4" v-if="user.status === 'unregistered' && loginBanner && $route.path !== '/login' && $route.path !== '/registration'">
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
  </div>
</template>

<script>
export default {
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