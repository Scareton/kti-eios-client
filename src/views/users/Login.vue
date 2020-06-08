<template>
  <div class="page-center">
    <v-card>
      <v-card-title>Авторизация</v-card-title>
      <v-divider />

      <div class="pa-4">
        <v-form v-model="valid">
          <v-text-field placeholder="Имя пользователя" v-model="formdata.username"></v-text-field>
          <v-text-field v-model="formdata.password" label="Пароль" required :type="show ? 'text':'password'" @click:append="show = !show" :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"></v-text-field>
        </v-form>
      </div>

      <v-divider />
      <v-card-actions class="login">
        <div style="flex:1;" class="registration-byte">
          <v-btn text to="/registration">
            <span>Нет аккаунта?</span>
            <div class="primary--text ml-2">Зарегистрироваться</div>
          </v-btn>
        </div>
        <v-btn text color="primary" @click="login">Войти</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import UserService from "../../services/UserService";
export default {
  data: () => ({
    valid: true,
    formdata: {
      username: "",
      password: ""
    },
    show: false
  }),
  computed: {
    breakpoint() {
      return this.$store.state.breakpoint;
    }
  },
  methods: {
    login() {
      UserService.loginWithUsernameAndPassword(
        this.formdata.username,
        this.formdata.password
      )
        .then(response => {
          this.$store.commit("user/login", response.data);
          this.$router.push("/");
          this.$store.commit("snackbar/success", "Авторизация прошла успешно");
        })
        .catch(err => {
          this.$store.commit("snackbar/error", err);
        });
    }
  }
};
</script>

<style>
@media (max-width: 767px) {
  .v-card__actions.login .registration-byte {
    /* border-top: 1px solid rgba(0, 0, 0, 0.12); */
    order: 2;
    margin-top:12px;
  }
  .v-card__actions.login .registration-byte .v-btn__content {
    display: flex;
    flex-direction: column;
    font-size:13px;
    line-height: 1.5;
  }
  .v-card__actions.login .registration-byte .v-btn__content span {
    font-size: 12px;
  }
}
</style>