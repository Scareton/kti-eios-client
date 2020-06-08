import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import dictionary from './plugins/dictionary'
import router from './router'
import store from './store'

// Глобальная регистрация компонентов
// Учёт префикса "_base-" в директории components/base
import './components/base/_globalComponents'

// Выключить production подсказки
Vue.config.productionTip = false;

// Подключение глобального словаря методов
Vue.use(dictionary)

// Определить функцию инициализации приложения
let initialize = function () {
  new Vue({
    vuetify,
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
}

// Сервис управления состоянием пользователя
import UserService from "./services/UserService";

import './registerServiceWorker'

// Перед инициализацией пользователя выполняется проверка авторизации
if (document.cookie) {
  // Если у клиента существует запись cookie
  // Запрашиваем обновление сессии 
  // и получение данных пользователя
  UserService.refreshSession().then(response => {
    // Обновить состояние пользователя в store 
    store.commit("user/login", response.data);
    // Инициализация приложения
    initialize();
  }).catch(() => {
    // Инициализация приложения
    initialize();
  })
} else {
  // Если запись cookie не создана, 
  // продолжаем инициализацию
  initialize();
}