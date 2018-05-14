<template>
  <div id='fullCalendar'>
    <vuefullCalendar :events="fcEvents"
                     locale="zh-cn">
    </vuefullCalendar>
  </div>
</template>

<script>
import vuefullCalendar from "vue-fullcalendar";
import EventBus from "@/libs/eventBus.js";
export default {
  name: "fullCalendar",
  data() {
    return {
      fcEvents: fcEvents
    };
  },
  beforeCreate: function() {
    let vm = this;
    let todayDate = new Date();
    //  问服务器获取当月休假
    vm.$serverApi.getRestEventsByMonth(todayDate.Format("yyyy-MM-dd"));

    //  问服务器获取排班人员数据
    vm.$serverApi.getAllUser();
  },
  created: function() {
    let vm = this;
    EventBus.$on("curMonthRests", days => {
      days.map(day => {
        vm.fcEvents.push({
          title: day.username,
          start: day.date,
          original: day,
          color: 'yellow',
        });
      });
    });
  },
  components: {
    vuefullCalendar
  }
};
const fcEvents = [

];
</script>

<style scoped>
.comp-full-calendar {
  padding: 20px 0;
}
#fullCalendar .career {
  background: brown!important;
}
</style>
