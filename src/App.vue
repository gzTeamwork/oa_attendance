<template>
  <div id="app">
    <!-- 全面采用路由模式加载页面 -->
    <com-appTips></com-appTips>
    <router-view></router-view>
  </div>
</template>

<script>
import comAppTips from "@/pages/components/appTips.vue";

export default {
  components: {
    "com-appTips": comAppTips
  },
  name: "App",
  data() {
    return {
      test: null,
      userInfo: null
    };
  },
  created() {
    this.userInfo = this.$store.getters.getUserInfo;
  },
  watch: {
    handlerUserInfo: function(v, ov) {
      console.log("监听到用户数据发生变化");
      let pageState = this.$route.query.state || null;
      let pageUserCode = this.$route.query.code || null;

      if (pageState !== null && pageUserCode !== null && v.userid !== null) {
        this.$router.go("/userRest");
      }
    }
  },
  computed: {
    handlerUserInfo: function() {
      return this.$store.getters.getUserInfo;
    }
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
