<template>
  <v-navigation-drawer v-model="drawer" :mini-variant="drawerMiniVariant" :expand-on-hover="drawerExpandOnHover" app mobile-break-point="767">
    <!-- Links -->
    <v-list dense nav class="py-0" style="flex:1;">
      <v-list-item two-line :class="drawerMiniVariant && 'px-0 mb-0'">
        <v-list-item-avatar>
          <template v-if="user.status === 'logged' && user.data.image">
            <img :src="user.data.image" />
          </template>
          <template v-else>
            <v-icon>mdi-account</v-icon>
          </template>
        </v-list-item-avatar>

        <v-list-item-content>
          <!-- if user logged -->
          <template v-if="user.status === 'logged'">
            <v-list-item-title>{{user.data.name}}&nbsp;{{user.data.surname}}</v-list-item-title>
            <template v-if="user.data.role === 1">
              <v-list-item-subtitle>{{dictionary.user_role(user.data.role)}} {{user.data.student.group.name}} - {{user.data.student.year}} курс</v-list-item-subtitle>
              <v-list-item-subtitle>{{user.data.student.specialty.name}}</v-list-item-subtitle>
            </template>
            <template v-if="user.data.role === 2">
              <v-list-item-subtitle>{{dictionary.user_role(user.data.role)}}</v-list-item-subtitle>
            </template>
          </template>
          <!-- if non-user state -->
          <template v-else>
            <v-list-item-title>Вход не выполнен</v-list-item-title>
          </template>
        </v-list-item-content>
      </v-list-item>

      <v-divider class="mb-4" />

      <v-list-item v-for="link in links" :key="link.title" :to="link.url" link>
        <v-list-item-icon>
          <v-icon>{{ link.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ link.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <!-- Base links (like /profile) -->
      <v-divider class="my-4" />

      <template v-if="user.status === 'logged'">
        <!-- Если пользователь авторизован-->
        <v-list-item link to="/profile">
          <v-list-item-icon>
            <v-icon>mdi-account</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Личный кабинет</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <!-- Выход -->
        <v-list-item @click="$store.commit('user/logoutCheckState', true)">
          <v-list-item-icon>
            <v-icon>mdi-logout-variant</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Выход</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>

      <!-- Если пользователь незарегистрирован -->
      <template v-else>
        <!-- Вход -->
        <v-list-item link to="/login">
          <v-list-item-icon>
            <v-icon>mdi-login-variant</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Войти</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <!-- Регистрация -->
        <v-list-item link to="/registration">
          <v-list-item-icon>
            <v-icon>mdi-account-plus</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Зарегистрироваться</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>

    <v-spacer />

    <v-list dense nav class="py-0">
      <v-list-item :class="drawerMiniVariant && 'px-0'">
        <v-list-item-avatar>
          <img src="/images/logo_dark.png" />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-subtitle>ЭИОС КТИ (Филиал ВолгГТУ)</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <!-- Диалоги -->
    <!-- Подтвердить выход -->
    <v-dialog v-model="logoutCheckState" width="unset">
      <v-card>
        <v-card-title>Вы действительно хотите выйти?</v-card-title>
        <v-divider />
        <v-card-actions>
          <v-btn text color="primary" @click="$store.dispatch('user/logout')">Выход</v-btn>
          <v-btn text @click="$store.commit('user/logoutCheckState', false)">Отмена</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-navigation-drawer>
</template>

<script>
export default {
  data: () => ({
    drawerMiniVariant: true,
    drawerExpandOnHover: true,
    width: 0,
    drawer: false,

    // navigation
    links: [
      {
        title: "Главная",
        url: "/",
        icon: "mdi-home"
      },
      {
        title: "Новости",
        url: "/news",
        icon: "mdi-newspaper-variant"
      },
      {
        title: "Курсы",
        url: "/courses",
        icon: "mdi-book-open-page-variant"
      }
    ]
  }),
  computed: {
    user() {
      return this.$store.state.user;
    },
    logoutCheckState: {
      get() {
        return this.$store.state.user.system.logoutCheckState;
      },
      set() {
        // this.$store.commit("user_system_logoutCheckState", false);
      }
    },
    breakpoint() {
      return this.$store.getters.breakpoint;
    }
  },
  methods: {
    updateWidth() {
      this.$store.commit("setWidth", window.innerWidth);
      this.width = window.innerWidth;
    }
  },
  mounted() {
    this.updateWidth();
  },
  created() {
    window.addEventListener("resize", this.updateWidth);
  },
  watch: {
    breakpoint: {
      handler(value) {
        console.log(value);
        if (value === "desktop") {
          this.drawer = true;
          this.drawerMiniVariant = true;
        } else {
          console.log("123");
          this.drawer = false;
          this.drawerMiniVariant = false;
          this.drawerExpandOnHover = false;
        }
      },
      immediate: true,
    }
  }
};
</script>

<style>
.v-navigation-drawer__content {
  display: flex;
  flex-direction: column;
}
</style>