import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/Login'
import Home from '../views/Home'
import Welcome from '../views/Welcome'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/404',
      name: 'NotFount',
      component: () => import('../views/404')
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      redirect: '/noticeList',
      children: [
        {
          path: '/noticeList',
          name: 'NoticeList',
          component: () => import('../views/NoticeList')
        },
        {
          path: '/welcome',
          name: 'Welcome',
          component: Welcome
        },
        {
          path: '/customerList',
          name: 'CustomerList',
          component: () => import("../views/CustomerList")
        },
        {
          path: '/projectList',
          name: 'ProjectList',
          component: () => import("../views/ProjectList")
        }
      ]
    }
  ]
})


router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  //获取token
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) {
    next('/login')
  } else {
    next()
  }
})

export default router
