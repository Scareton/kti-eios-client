import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "../store/index"

Vue.use(VueRouter)

const routes = [
  // {

  // },
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta: {
      title: "Главная - ЭИОС КТИ"
    }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue'),
    meta: {
      title: "О нас - ЭИОС КТИ"
    }
  },
  {
    path: '/news',
    name: 'News',
    component: () => import('../views/News.vue'),
    meta: {
      title: "Новости - ЭИОС КТИ"
    }
  },
  {
    path: '/courses',
    name: 'Courses',
    component: () => import('../views/Courses.vue'),
    meta: {
      title: "Курсы - ЭИОС КТИ"
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/users/Profile.vue'),
    meta: {
      title: "Личный кабинет - ЭИОС КТИ",
      loginRequired: true,
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  // Изменение заголовка
  if (to.meta.title) {
    document.title = to.meta.title
  } else {
    document.title = "ЭИОС КТИ"
  }

  // Проверка на регистрацию
  if (to.meta.loginRequired) {
    if (store.state.user.status === 'logged') next()
    else next("/login")
  } else {
    next()
  }
})

export default router
