// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

//  引入助手函数
import helper from '@/libs/helper.js'
Vue.prototype.$helper = helper

// 引入 muse-ui
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import 'muse-ui/dist/theme-carbon.css'
import '../static/iconfont/material-icons.css'
Vue.use(MuseUI)

//  引入jQuery
import jQuery from 'jquery'

//  引入cookies
import VueCookie from 'vue-cookies'
Vue.use(VueCookie)

//  引入axios
import vueAxios from 'axios'
Vue.prototype.$http = vueAxios

//  引入服务器类
import serverApi from '@/libs/serverApi.js'
Vue.prototype.$serverApi = serverApi
//  引入微信接口类
import weixinApi from '@/libs/weixinApi.js'
Vue.prototype.$weixinApi = weixinApi

//  引入事件promise
import vueMethodsPromise from 'vue-methods-promise'

Vue.use(vueMethodsPromise, {
  hookName: '$promise', // Component default hook name
  promise: mp => {
    // Promise callback
    mp.then(
      function (res) {
        console.log(res)
      }.catch(function (err) {
        console.log(err.msg) // Test error
      })
    )
  }
})

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
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})
router.afterEach(transition => {
  NProgress.done()
})

//  引入其他库
import '@/libs/dateTimeStamp.js'
import 'animate.css'
