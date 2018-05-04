<template>
  <div id="appBar">
     <router-view></router-view>
      <mu-bottom-nav :value="curAppBar" @change="handleChange">
      <mu-bottom-nav-item v-for="item in appBars" :key="item.path" :value="item.path" 
      :title="item.title" :icon="item.icon" :to="item.path"/>
    </mu-bottom-nav>    
  </div>
</template>

<script>
let appBars = [
  { title: "排班", path: "schedule", icon: "today" },
  { title: "排休", path: "userRest", icon: "face" },
  { title: "报餐", path: "dailyMeal", icon: "local_dining" }
];
export default {
  name: "appBar",
  data() {
    return {
      appBars: appBars,
      curAppBar: appBars[0].path
    };
  },
  methods: {
    handleChange: function(val) {
      this.curAppBar = val;
    }
  },
  created: function() {
    //  应用初始化
    let vm = this;
    //  用户缓存和捕捉code参数
    let params = vm.$helper.getUrlJson(window.location.href);
    let userCode = params.code || null;
    let userState = params.state || null;
    let userTicket = vm.$cookies.get("userTicket");

    //  开发专用 - 模拟授权登陆
    let userId = params.user_id || null;
    let devMode = process.env.NODE_ENV === "development";
    if (userId !== null && devMode) {
      vm.$serverApi.getUserInfoById(userId);
    } else {
      //  2.用户验证状态码
      if (userTicket == null) {
        if (userCode == null) {
          // 没票,也没有code,跳转授权
          // vm.$weixinApi.getUserAuth();
          window.Store.commit("changeNeedAuth", true);
          // EventBus.$emit("needAuth", true);
        } else {
          // 有code,则丢给服务器更新用户信息
          vm.$serverApi.getUserInfo(userCode);
        }
      } else {
        //  有票,丢服务器拿用户信息
        vm.$serverApi.getUserInfoByTicket(userTicket);
      }
    }
  }
};
</script>

<style>
#appBar {
  height: 100%;
  padding-bottom: 6em;
}
#appBar .mu-bottom-nav {
  position: fixed;
  bottom: 0;
}
</style>
