// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

/** ** 主要引入 ** **/
import Vue from 'vue'
import VueRouter from 'vue-router'
import 'es6-promise'
import appConfig from '@/configs/app.Config.js'
//  引入全局样式
import '@/assets/scss/app.scss'
//  引入助手函数
import Helper from '@/libs/helper.js'
// 引入 muse-ui
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import 'muse-ui/dist/theme-carbon.css'
import '../static/iconfont/material-icons.css'

/** ** 插件引入 ** **/
//  引入jQuery
import JQuery from 'jquery'
//  引入Nprogress进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
//  引入cookies
import VueCookie from 'vue-cookies'
//  引入axios
import vueAxios from 'axios'
//  引入服务器类
import serverApi from '@/libs/serverApi.js'
//  引入微信接口类
import weixinApi from '@/libs/weixinApi.js'
//  引入事件promise
import vueMethodsPromise from 'vue-methods-promise'
//  引入app配置文件
// import wxworkSDk from '@/extra/wxworkSDK/jweixin-1.2.0.js'
import App from './App'
import Router from './router'
import vueStore from './store'

//  引入其他库
import '@/libs/dateTimeStamp.js'
import 'animate.css'
window.Wx = require('@/extra/wxworkSDK/jweixin-1.2.0.js')

//  挂载全局插件到window
//  即将废弃辅助程序写入vue中
window.Helper = Helper
window.Nprogress = NProgress
window.EventBus = new Vue()
window.Store = vueStore
window.Cookies = VueCookie
window.Jquery = JQuery
// window.WxworkSDK = wxworkSDk
//  挂载到Vue中
Vue.use(MuseUI)
Vue.use(VueCookie)
Vue.use(VueRouter)
Vue.prototype.$helper = Helper
Vue.prototype.$http = vueAxios
Vue.prototype.$serverApi = serverApi
Vue.prototype.$weixinApi = weixinApi
Vue.prototype.$appConfig = appConfig
Vue.config.productionTip = false

//  vue方法promise化
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
