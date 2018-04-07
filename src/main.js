// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

// 引入 muse-ui
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import 'muse-ui/dist/theme-carbon.css'
import '../static/iconfont/material-icons.css'
Vue.use(MuseUI)

//  引入axios
import vueAxios from 'axios'
Vue.prototype.$http = vueAxios

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import App from './App'
import router from './router'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

NProgress.start()

router.beforeEach((to, from, next) => {
  next()
})
router.afterEach(transition => {
  NProgress.done()
})

//  引入其他库
import '@/libs/dateTimeStamp.js'
import 'animate.css'
