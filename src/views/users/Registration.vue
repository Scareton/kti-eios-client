<template>
  <div class="page-center">
    <v-card>
      <v-card-title>Регистрация</v-card-title>
      <v-divider />

      <div class="pa-4">
        <v-form v-model="valid">
          <v-row>
            <v-col>
              <v-text-field v-model="formdata.name" :rules="nameRules" label="Имя" required></v-text-field>
            </v-col>
            <v-col>
              <v-text-field v-model="formdata.surname" :rules="surnameRules" label="Фамилия" required></v-text-field>
            </v-col>
            <v-col>
              <v-text-field v-model="formdata.patronymic" :rules="emailRules" label="Отчество (Если есть)" required></v-text-field>
            </v-col>
          </v-row>
          <v-text-field v-model="formdata.email" label="Email" required></v-text-field>
          <v-text-field v-model="formdata.password" :rules="passwordRules" label="Придумайте пароль" required :type="show ? 'text':'password'" @click:append="show = !show" :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"></v-text-field>
          <v-text-field v-model="formdata.password_check" :rules="passwordCheckRules" label="Повторите пароль" required :type="show ? 'text':'password'" @click:append="show = !show" :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"></v-text-field>
        </v-form>
      </div>

      <v-divider />
      <v-card-actions>
        <div style="flex:1;">
          <v-btn text to="/login">
            <span>Есть аккаунт?</span>
            <div class="primary--text ml-2">Войти</div>
          </v-btn>
        </div>
        <v-btn text color="primary" @click="() => ({})">Зарегистрироваться</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    show: false,
    formdata: {
      name: "",
      surname: "",
      patronymic: "",
      email: "",
      password: "",
      password_check: ""
    },
    nameRules: [v => !!v || "Имя обязательно"],
    surnameRules: [v => !!v || "Фамилия обязательна"],
    emailRules: [
      v => !!v || "E-mail обязателен",
      v => /.+@.+\..+/.test(v) || "E-mail должен быть правильного формата"
    ],
    passwordRules: [
      v => !!v || "Пароль обязателен",
      v => (v && v.length >= 6) || 'Пароль должен быть не меньше 6 символов',
    ],
  }),
  computed: {
    passwordCheckRules() {
      return [
        v => v === this.formdata.password || 'Пароли должны совпадать'
      ]
    }
  }
};
</script>