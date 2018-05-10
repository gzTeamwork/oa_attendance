import Router from 'vue-router'
import SubRouter from './subRouter'
import ServerApi from '@/libs/serverApi.js'
import WeixinApi from '@/libs/weixinApi.js'
const pageAppBar = () =>
  import ('@/pages/appBar.vue')

const mainRouter = new Router({
  mode: 'history',
  routes: [{
    path: '/',
    name: 'index page',
    component: pageAppBar,
    meta: {
      title: '移动办公增强'
    },
    children: SubRouter
  }]
})

mainRouter.beforeEach((to, from, next) => {
  // console.log(to)

  //  用户未进行登录,则跳转到授权页面
  if (to.path === '/userAuth') {
    let state = to.query.state || null
    let code = to.query.code || null

    // console.log(state, code)
    if (state === 'wxwork_login' && code !== null) {
      console.log('检测到有code和state,进入用户授权过程')
      window.Nprogress.start()
      ServerApi.getUserInfoByCode(code)
      setTimeout(function () {
        next('/userRest')
      }, 2000)
    } else {
      next()
    }
  } else {
    let userInfo = window.Store.getters.getUserInfo || null
    console.log('获取用户缓存为' + userInfo)

    if (userInfo == null) {
      next('/userAuth')
    } else {
      if (to.meta.title) {
        document.title = to.meta.title || '盈富永泰集团'
      }
      next()
    }
  }
})

mainRouter.afterEach(transition => {
  window.Nprogress.done()
})

export default mainRouter
