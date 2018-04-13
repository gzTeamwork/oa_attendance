<template>
  <div id="dailyMeal">
    <h2>是日报餐</h2>
    <h4>{{today}}</h4>
    <muse-toast :msg="toast.msg"></muse-toast>
    <div v-if="needLogin"
         style="height: 640px;display: flex;justify-content: center;align-items: center">
      <mu-flexbox orient="vertical"
                  justify="center"
                  align="center">
        <mu-flexbox-item>
          <p style="text-align:center">当前用户未授权登录</p>
          <p style="text-align:center">请点击下方按钮开始授权</p>
        </mu-flexbox-item>
        <mu-raised-button label="用户登录"
                          @click="handleUserAuth">
        </mu-raised-button>
      </mu-flexbox>
    </div>
    <div v-if="!needLogin">
        <mu-switch label="吃饭" class="demo-switch" /><br/>
    </div>
  </div>
</template>
<script>
import museToast from "@/components/museToast.vue";
import EventBus from "@/libs/eventBus.js";
import defaultAvatar from "@/assets/avatar.png";
export default {
  name: "dailyMeal",
  data() {
    return {
      today: new Date().Format("yyyy年MM月dd日"),
      needLogin: false,
      defaultAvatar: defaultAvatar,
      toast: { msg: null }
    };
  },
  components: {
    "muse-toast": museToast
  },
  created: function() {},
  methods: {
    //  获取用户信息
    handleUserAuth: function() {
      //  跳转授权
      let vm = this;
      vm.$weixinApi.getUserAuth();
    }
  }
};
</script>
<style>

</style>
