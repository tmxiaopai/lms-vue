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
      redirect: '/welcome',
      children: [
        {
          path: '/welcome',
          name: 'Welcome',
          component: Welcome
        },
        {
          path: '/1',
          name: 'ProjectList',
          component: () => import("../views/ProjectList")
        },
        {
          path: '/2',
          name: 'UserList',
          component: () => import("../views/UserList")
        },
        {
          path: '/3',
          name: 'NoticeList',
          component: () => import('../views/NoticeList')
        },
        {
          path: '/4',
          name: 'FaultList',
          component: () => import('../views/FaultList')
        },
        {
          path: '/5',
          name: 'VisitPlan',
          component: () => import('../views/VisitPlan')
        },
        {
          path: '/6',
          name: 'StockList',
          component: ()=>import('../views/StockList')
        },
        {
          path: '/7',
          name: 'DetailLift',
          component: ()=>import('../views/DetailLift')
        },
        {
          path: '/8',
          name: 'InstallHT',
          component: () => import('../views/InstallHT')
        },
        {
          path: '/9',
          name: 'MaHT',
          component: () => import('../views/MaHT')
        },
        {
          path: '/10',
          name: 'CreateProject',
          component: () => import('../views/CreateProject')
        },
        {
          path: '/11',
          name: 'SaleHt',
          component: () => import('../views/SaleHT')
        },
        {
          path: '/12',
          name: 'StockInOut',
          component: ()=>import('../views/StockInOut')
        },
        {
          path: '/13',
          name: 'InstallList',
          component: ()=>import('../views/InstallList')
        },
        {
          path: '/14',
          name: 'CreateReceiveMoney',
          component: ()=>import('../views/CreateReceiveMoney')
        },
        {
          path: '/15',
          name: 'OkMoney',
          component: ()=>import('../views/OkMoney')
        },
        {
          path: '/16',
          name: 'CreateLift',
          component: ()=>import('../views/CreateLift')
        },
        {
          path: '/17',
          name: 'DetailSaleOfProject',
          component: ()=>import('../views/DetailSaleOfProject')
        },
        {
          path: '/18',
          name: 'RecordMa',
          component: ()=>import('../views/RecordMa')
        },
        {
          path: '/19',
          name: 'QuotationList',
          component: ()=>import('../views/QuotationList')
        },
        {
          path: '/createQuo',
          name: 'CreateQuo',
          component: ()=>import('../views/CreateQuo')
        },
        {
          path: '/createSaleHT',
          name: 'CreateSaleHT',
          component: () => import('../views/CreateSaleHT')
        },
        {
          path: '/createInstallHT',
          name: 'CreateInstallHT',
          component: () => import('../views/CreateInstallHT')
        },
        {
          path: '/createMaHT',
          name: 'CreateMaHT',
          component: () => import('../views/CreateMaHT')
        },
        {
          path: '/userInfo',
          name: 'UserInfo',
          component: ()=>import('../views/UserInfo')
        },
        {
          path: '/changePassword',
          name: 'ChangePassword',
          component: ()=>import('../views/ChangePassword')
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
