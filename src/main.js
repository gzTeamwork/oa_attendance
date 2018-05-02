// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
//  引入vuex
import 'es6-promise'

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

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
window.$nprogress = NProgress

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
import VueRouter from 'vue-router';
Vue.use(VueRouter)
import App from './App'
import Router from './router'
import vueStore from './store'
Vue.config.productionTip = false

window.EventBus = new Vue()

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: Router,
  store: vueStore,
  components: {
    App
  },
  template: '<App/>'
})

//  引入其他库
import '@/libs/dateTimeStamp.js'
import 'animate.css'
