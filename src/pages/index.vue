/* * @Author: Zicokuo * @Date: 2018-04-06 10:51:38 * @Last Modified by: Zicokuo * @Last Modified time: 2018-04-07 22:34:21
*/
<template>
  <div id='index'>
    <muse-toast :msg="toast.msg"></muse-toast>
    <mu-tabs :value="activeTab" @change="handleTabChange">
      <mu-tab value="tabEventCalendar" title="排班" />
      <!-- <mu-tab value="tabFullCalendar" title="排版" /> -->
      <mu-tab value="tabOnDuty" title="排休" />
    </mu-tabs>
    <transition-group name="flip" enter-active-class="animated fadeInDown">
      <div v-show="activeTab === 'tabEventCalendar'" :key="1">
        <keep-alive>
          <comEventCalendar></comEventCalendar>
        </keep-alive>
      </div>
      <!-- <div v-if="activeTab === 'tabFullCalendar'">
        <comFullCalendar></comFullCalendar>
      </div> -->
      <div v-show="activeTab === 'tabOnDuty'" :key="2">
        <keep-alive>
          <comDuty></comDuty>
        </keep-alive>
      </div>
    </transition-group>
  </div>
</template>

<script>
  import museToast from "@/components/museToast.vue";
  import EventBus from "@/libs/eventBus.js";

  //  加载事件日历
  let comEventCalendar = () =>
    import ("./components/eventCalendar.vue");
  //  加载日历组件
  let comFullCalendar = () =>
    import ("./components/fullCalendar.vue");
  //  加载duty组建
  let comDuty = () =>
    import ("./components/duty.vue");
  export default {
    name: "index",
    data() {
      return {
        activeTab: "tabEventCalendar",
        toast: {
          msg: ""
        }
      };
    },
    components: {
      comDuty,
      comFullCalendar,
      comEventCalendar,
      "muse-toast": museToast
    },
    beforeCreate: function () {
      //  应用初始化
      let vm = this
      //  1.用户缓存和捕捉code参数
      let params = vm.$helper.getUrlJson(window.location.href);
      let userCode = params.code || null
      let userState = params.state || null
      let userTicket = vm.$cookies.get("userTicket");

      //  开发专用 - 模拟授权登陆
      let userId = params.user_id || null;
      if (userId !== null) {
        vm.$serverApi.getUserInfoById(userId);
        return;
      }

      //  2.用户验证状态码
      if (userTicket == null) {
        if (userCode == null) {
          // 没票,也没有code,跳转授权
          // vm.$weixinApi.getUserAuth();
          EventBus.$emit("needAuth", true)
        } else {
          // 有code,则丢给服务器更新用户信息
          vm.$serverApi.getUserInfo(userCode);
        }
      } else {
        //  有票,丢服务器拿用户信息
        vm.$serverApi.getUserInfoByTicket(userTicket);
      }
    },
    methods: {
      //  tab页切换时间
      handleTabChange: function (val) {
        let vm = this;
        console.log(val);
        vm.activeTab = val;
      },
      //  tab页点击事件
      handleActive: e => {}
    }
  };

</script>

<style scoped>


</style>
