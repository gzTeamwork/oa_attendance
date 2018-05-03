<template>
  <div id="app">
    <!-- 全面采用路由模式加载页面 -->
    <router-view></router-view>
  </div>
</template>

<script>
import { getUserAuth } from "@/libs/weixinApi.js";
export default {
  name: "App",
  data() {
    return {
      test: null,
      userInfo: null
    };
  },
  created: function() {
    let vm = this; 
    //  访问则需要登录
    let userInfo = vm.$store.getters.getUserInfo;

    this.userInfo = userInfo;

    if (userInfo || userInfo === null) {
      //  没有用户信息,则跳转授权
      // vm.$serverApi.getUserInfoById("guozihao");
    } else {
      vm.$store.commit("changeUserInfo", userInfo);
    }
  },
  mounted: function() {
    let vm = this;
  }
};
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
