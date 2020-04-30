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
      <v-card-actions>
        <div style="flex:1;">
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
  methods: {
    login() {
      UserService.loginWithUsernameAndPassword(this.formdata.username, this.formdata.password)
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