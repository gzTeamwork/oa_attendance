// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";

// 引入 muse-ui
import MuseUI from "muse-ui";
import "muse-ui/dist/muse-ui.css";
import "muse-ui/dist/theme-carbon.css";
import "../static/iconfont/material-icons.css";
Vue.use(MuseUI);

// 引入日历插件
import "vue-event-calendar/dist/style.css";
import vueEventCalendar from "vue-event-calendar";
Vue.use(vueEventCalendar, {
  locale: "zh",
  color: "#007acc"
});

import App from "./App";
import router from "./router";

// //  引入mint-ui
// import Mint from "mint-ui";
// import "mint-ui/lib/style.css";
// Vue.use(Mint);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});

//  引入其他库
import "@/libs/dateTimeStamp.js";
