import Router from 'vue-router'
import SubRouter from './subRouter'

const pageAppBar = () =>
  import ('@/pages/appBar.vue')

const mainRouter = new Router({
  mode: 'history',
  routes: [{
    path: '/',
    name: 'index page',
    component: pageAppBar,
    meta: {
      title: '企业排版表'
    },
    children: SubRouter
  }]
})

mainRouter.beforeEach((to, from, next) => {
  console.log(to)

  if (window.Store.getters.needLogin && to.path !== '/userAuth') {
    next('/userAuth');
  }
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

mainRouter.afterEach(transition => {})

export default mainRouter
