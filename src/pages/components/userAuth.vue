<template>
  <div id="userAuth">
    <div v-if="needLogin" style="height: 640px;display: flex;justify-content: center;align-items: center">
      <mu-flexbox orient="vertical" justify="center" align="center">
        <mu-flexbox-item>
          <p style="text-align:center">当前用户未授权登录</p>
          <p style="text-align:center">请点击下方按钮开始授权</p>
        </mu-flexbox-item>
        <mu-raised-button label="用户登录" @click="handleUserAuth">
        </mu-raised-button>
        <br/>
        <mu-raised-button v-if="isDev" label="本地调试" @click="handleUserAuthLocal"></mu-raised-button>
      </mu-flexbox>
    </div>
  </div>
</template>
<script>
export default {
  name: "userAuth",
  data() {
    return {
      needLogin: true,
      isDev: process.env.NODE_ENV === "development"
    };
  },
  methods: {
    //  获取用户信息
    handleUserAuth: function() {
      //  跳转授权
      let vm = this;
      vm.$weixinApi.getUserAuth();
    },
    handleUserAuthLocal: function() {
      //  本地开发授权测试
      let vm = this;
      vm.$serverApi.getUserInfoById("GuoZiHao");
      setTimeout(function() {
        window.location.href = window.location.origin + "/userRest";
      }, 2000);
    }
  },
  created: function() {}
};
</script>
<style></style>
