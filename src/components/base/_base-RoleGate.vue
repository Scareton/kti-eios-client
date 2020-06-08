<template>
  <!-- Вывод содержимого компонента только если роль пользователя совпадает с запрошенной -->
  <div v-if="user.data.role === _role">
    <slot />
  </div>
</template>

<script>
export default {
  name: "RoleGate",
  props: {
    role: {}
  },
  computed: {
    _role() {
      return Number(this.role);
    },
    user() {
      return this.$store.state.user;
    }
  }
};
</script>