<template>
  <div id='index'>

    <mu-tabs :value="activeTab" @change="handleTabChange">
      <mu-tab value="tab1" title="排版" />
      <mu-tab value="tab2" title="考勤" />
    </mu-tabs>
    <transition name="fade" mode="">
      <div v-if="activeTab === 'tab1'">
        <comFullCalendar></comFullCalendar>
      </div>
      <div v-if="activeTab === 'tab2'">
        <comDuty></comDuty>
      </div>
    </transition>
  </div>
</template>

<script>
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
        calenderEvents: calenderEvents,
        activeTab: "tab1"
      }
    },
    components: {
      comDuty,
      comFullCalendar
    },
    mounted() {
      // 今天
      let vueDate = new Date();
      let today = vueDate.getFullYear() + '/' + (vueDate.getMonth() + 1) + '/' + vueDate.getDate();
      console.log(today)
      this.$EventCalendar.toDate(today);
      vueDate.setDate(0);
      let toMouth = vueDate.getDate();
      for (let i = 1; i < toMouth; i++) {
        vueDate.setDate(i)
        let eventArray = {
          date: vueDate.getFullYear() + '/' + (vueDate.getMonth() + 2) + '/' + vueDate.getDate(),
          title: "排班",
        }
        calenderEvents.push(eventArray);
      }
    },
    methods: {
      //  日期切换事件
      handleDayChanged: (dateEvent) => {
        console.log(dateEvent);
      },
      //  月份切换事件
      handleMonthChanged: (dateEvent) => {
        console.log(dateEvent)
      },
      //  tab页切换时间
      handleTabChange: function (val) {
        let vm = this;
        console.log(val)
        vm.activeTab = val;
      },
      //  tab页点击事件
      handleActive: (e) => {

      },
      getToday: function () {
        let vueDate = new Date();
        return vueDate.getFullYear() + '/' + (vueDate.getMonth() + 1) + '/' + vueDate.getDate();
      },
    }
  }

  let calenderEvents = [{
    date: '2018/4/2',
    title: '排班',
    onduty: ['郭梓豪', '钟春苑', '杨柳']
  }]

</script>

<style scoped>


</style>
