import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import dictionary from './plugins/dictionary'
import router from './router'
import store from './store'

Vue.config.productionTip = false;
Vue.use(dictionary)


let initialize = function () {
  new Vue({
    vuetify,
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
}

// Проверить, авторизован ли пользователь
import UserService from "./services/UserService";
if (document.cookie) {
  UserService.refreshSession().then(response => {
    store.commit("user/login", response.data);
    initialize();
  }).catch(() => {
    initialize();
  })
} else {
  initialize();
}