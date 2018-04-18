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
      }
    },
    methods: {
      //  获取用户信息
      handleUserAuth: function () {
        //  跳转授权
        let vm = this;
        vm.$weixinApi.getUserAuth();
      }
    },
    created: function () {

    },
  }

</script>
<style></style>
