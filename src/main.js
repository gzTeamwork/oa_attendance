// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

// 引入 muse-ui
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import 'muse-ui/dist/theme-carbon.css'
import '../static/iconfont/material-icons.css'
Vue.use(MuseUI)

<<<<<<< HEAD
//  引入axios
import vueAxios from 'axios'
Vue.prototype.$http = vueAxios

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
=======
// 引入日历插件
import "vue-event-calendar/dist/style.css";
import vueEventCalendar from "vue-event-calendar";
Vue.use(vueEventCalendar, {
  locale: "zh",
  color: "#007acc"
});

//  引入axios
import vueAxios from "axios";
Vue.prototype.$http = vueAxios;

import App from "./App";
import router from "./router";
>>>>>>> d47e512243f68c3f25188df21dcee9bbe1127d97

import App from './App'
import router from './router'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
<<<<<<< HEAD
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
=======
  template: "<App/>"
});

//  引入其他库
import "@/libs/dateTimeStamp.js";
>>>>>>> d47e512243f68c3f25188df21dcee9bbe1127d97
