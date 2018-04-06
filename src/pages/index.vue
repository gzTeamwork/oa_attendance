/*
 * @Author: Zicokuo 
 * @Date: 2018-04-06 10:51:38 
 * @Last Modified by: Zicokuo
 * @Last Modified time: 2018-04-06 10:54:12
 */
<template>
  <div id='index'>
<<<<<<< HEAD
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
=======

    <mu-tabs :value="activeTab" @change="handleTabChange">
      <mu-tab value="tabEventCalendar" title="排版" />
      <!-- <mu-tab value="tabFullCalendar" title="排版" /> -->
      <mu-tab value="tabOnDuty" title="考勤" />
    </mu-tabs>
    <transition-group name="tabs" enter-active-class="animated bounceInDown" leave-active-class="animated bounceOut">
      <div v-show="activeTab === 'tabEventCalendar'" :key="1">
>>>>>>> d47e512243f68c3f25188df21dcee9bbe1127d97
        <keep-alive>
          <comEventCalendar></comEventCalendar>
        </keep-alive>
      </div>
      <!-- <div v-if="activeTab === 'tabFullCalendar'">
        <comFullCalendar></comFullCalendar>
      </div> -->
<<<<<<< HEAD
      <div v-show="activeTab === 'tabOnDuty'"
           :key="2">
=======
      <div v-show="activeTab === 'tabOnDuty'" :key="2">
>>>>>>> d47e512243f68c3f25188df21dcee9bbe1127d97
        <keep-alive>
          <comDuty></comDuty>
        </keep-alive>
      </div>
    </transition-group>
<<<<<<< HEAD
    <muse-toast :msg="toast.msg"></muse-toast>
=======
>>>>>>> d47e512243f68c3f25188df21dcee9bbe1127d97
  </div>
</template>

<script>
<<<<<<< HEAD
import museToast from "@/components/museToast.vue";
import eventBus from "@/libs/eventBus.js";
import serverApi from "@/libs/serverApi.js";
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
=======
  import eventBus from '@/libs/eventBus.js';
  import serverApi from '@/libs/serverApi.js';
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
    name: 'index',
    data() {
      return {
        activeTab: "tabEventCalendar"
>>>>>>> d47e512243f68c3f25188df21dcee9bbe1127d97
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
    vm.$http
      .get(serverApi.serverUrl + "api/get_token", {
        params: {
          appToken: "oa_attendance"
        }
      })
      .then(function(response) {
        console.log(response);
        if (response.status === 200) {
          vm.toast.msg = "已连接..";
          let resData = response.data;
          vm.appToken = resData;
          eventBus.$emit("appToken", resData);
        } else {
          vm.toast.msg = "无法连接";
        }
      })
      .catch(function(error) {
        vm.toast.msg = "无法连接";
      });
  },

  methods: {
    //  tab页切换时间
    handleTabChange: function(val) {
      let vm = this;
      console.log(val);
      vm.activeTab = val;
    },
<<<<<<< HEAD
    //  tab页点击事件
    handleActive: e => {}
  }
};
=======
    components: {
      comDuty,
      comFullCalendar,
      comEventCalendar,
    },
    beforeCreate(){
      let vm = this;
      //  测试连接后台
      vm.$http.get(serverApi.serverUrl + "api/get_token", {
        params: {
          appToken: "oa_attendance"
        }
      }).then(function (response) {
        console.log(response);
        if (response.status === 200) {
          let resData = response.data;
          vm.appToken = resData
          eventBus.$emit('appToken', resData);
        }
      })
    },
    mounted() {
      
    },
    methods: {
      //  tab页切换时间
      handleTabChange: function (val) {
        let vm = this;
        console.log(val)
        vm.activeTab = val;
      },
      //  tab页点击事件
      handleActive: (e) => {

      },
    }
  }

>>>>>>> d47e512243f68c3f25188df21dcee9bbe1127d97
</script>

<style scoped>

</style>
