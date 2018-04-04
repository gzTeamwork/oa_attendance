<template>
  <div id='index'>

    <mu-tabs :value="activeTab" @change="handleTabChange">
      <mu-tab value="tabEventCalendar" title="排版" />
      <!-- <mu-tab value="tabFullCalendar" title="排版" /> -->
      <mu-tab value="tabOnDuty" title="考勤" />
    </mu-tabs>
    <transition-group name="tabs" enter-active-class="animated bounceInDown" leave-active-class="animated bounceOut">
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
      }
    },
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

</script>

<style scoped>


</style>
