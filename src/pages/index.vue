/*
 * @Author: Zicokuo 
 * @Date: 2018-04-06 10:51:38 
 * @Last Modified by: Zicokuo
 * @Last Modified time: 2018-04-07 22:34:21
 */
<template>
  <div id='index'>
    <mu-tabs :value="activeTab"
             @change="handleTabChange">
      <mu-tab value="tabEventCalendar"
              title="排版" />
      <!-- <mu-tab value="tabFullCalendar" title="排版" /> -->
      <mu-tab value="tabOnDuty"
              title="考勤" />
    </mu-tabs>
    <transition-group name="flip"
                      enter-active-class="animated fadeInDown">
      <div v-show="activeTab === 'tabEventCalendar'"
           :key="1">
        <keep-alive>
          <comEventCalendar></comEventCalendar>
        </keep-alive>
      </div>
      <!-- <div v-if="activeTab === 'tabFullCalendar'">
        <comFullCalendar></comFullCalendar>
      </div> -->
      <div v-show="activeTab === 'tabOnDuty'"
           :key="2">
        <keep-alive>
          <comDuty></comDuty>
        </keep-alive>
      </div>
    </transition-group>
    <muse-toast :msg="toast.msg"></muse-toast>
  </div>
</template>

<script>
import museToast from "@/components/museToast.vue";
import eventBus from "@/libs/eventBus.js";
import serverApi from "@/libs/serverApi.js";
import weixinApi from "@/libs/weixinApi.js";

//  加载事件日历
let comEventCalendar = () => import("./components/eventCalendar.vue");
//  加载日历组件
let comFullCalendar = () => import("./components/fullCalendar.vue");
//  加载duty组建
let comDuty = () => import("./components/duty.vue");
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
  beforeCreate() {
    let vm = this;
    //  测试连接后台
    let accessToken = serverApi.getToken();

    let redirect_uri = "http://wxoa.emking.cn";
    let userCode = weixinApi.getUserAuth(
      weixinApi.configs.corpId,
      redirect_uri
    );

    let userInfo = weixinApi.getUserInfo(userCode, accessToken);
    console.log(userInfo);
  },

  methods: {
    //  tab页切换时间
    handleTabChange: function(val) {
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
