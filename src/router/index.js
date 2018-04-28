import Vue from 'vue'
import Router from 'vue-router'
import SubRouter from './subRouter'

const pageIndex = () =>
  import ('@/pages/index.vue')
const pageAppBar = () =>
  import ('@/pages/appBar.vue')

Vue.use(Router)

export default new Router({
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
