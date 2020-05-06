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
    component: () => import('../views/courses/Courses.vue'),
    meta: {
      title: "Курсы - ЭИОС КТИ"
    },
    children: [
      {
        path: "/courses/:course",
        name: "CoursePage",
        component: () => import('../views/courses/CoursePage.vue'),
        children: [
          {
            path: "/courses/:course/:content",
            name: "CourseContentPage",
            component: () => import("../views/courses/CourseContentPage.vue")
          }
        ]
      }
    ]
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
  {
    path: '/login',
    name: "Login",
    component: () => import("../views/users/Login.vue"),
    meta: {
      title: "Авторизация в системе ЭИОС КТИ",
      onlyNonregistered: true,
    }
  },
  {
    path: '/registration',
    name: "Registration",
    component: () => import("../views/users/Registration.vue"),
    meta: {
      title: "Регистрация в системе ЭИОС КТИ",
      onlyNonregistered: true,
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
  let loginStatus = store.state.user.status;

  // Если страница только для незарегистрированных
  if (to.meta.onlyNonregistered && loginStatus === 'logged') {
    // Переход на главную
    next("/")
  }

  // Если страница защищена
  if (to.meta.loginRequired) {
    // И пользователь авторизован - пропускаем
    if (loginStatus === 'logged') next()
    // И пользователь не авторизован - переход к авторизации
    else next("/login")
  }
  // Если страница не защищена
  else {
    next()
  }
})

export default router
