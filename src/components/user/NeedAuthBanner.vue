<template>
  <div class="mb-4">
    <v-banner two-line>
      <v-avatar slot="icon" color="primary" size="40">
        <v-icon icon="mdi-lock" color="white">mdi-lock</v-icon>
      </v-avatar>
      <span>Просмотр курсов недоступен без авторизации.</span>
      <template v-slot:actions>
        <v-btn text color="primary" to="/login">Авторизоваться</v-btn>
        <v-btn text color="primary" to="/registration">Зарегистрироваться</v-btn>
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