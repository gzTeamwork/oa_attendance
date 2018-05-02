<template>
  <div id="app">
    <!-- 全面采用路由模式加载页面 -->
      <div>{{test}}</div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      test: null
    };
  },
  beforeCreate: function() {
    let vm = this;
    //  向服务器连接拿appToken
    // let appToken = vm.$serverApi.getAppToken();
    // EventBus.$emit("appToken", appToken);
  },
  created: function() {
    //  创建则需要授权
    this.test = this.$store.state;
    let vm = this;
    vm.$serverApi.getUserInfo("guozihao");
  },
  mounted: function() {
    let vm = this;
    window.EventBus.$on("userInfo", data => {
      vm.$store.commit("changeUserInfo", data);
    });
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
