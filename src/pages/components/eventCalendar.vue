<template>
  <div id='vueEventsCalendar'>
    <vue-event-calendar :events="calenderEvents" @day-changed="handleDayChanged" @month-changed="handleMonthChanged" :style='{"margin-bottom":"2em"}'>
      <template slot-scope="props">
        <div v-for="(event, index) in props.showEvents" class="event-item">
          <!-- 这里拿到的是传入的单个event所有数据 -->
          <div v-for="(user , oindex) in event.onduty">
            {{user}}
          </div>
        </div>
      </template>
    </vue-event-calendar>
  </div>
</template>

<script>
  import eventBus from "@/libs/eventBus.js";
  import dateCalendar from "@/libs/dateCalendar.js";
  dateCalendar.init();

  export default {
    name: 'vueEventsCalendar',
    data() {
      return {
        calenderEvents: dateCalendar.events,
        appToken: null
      }
    },
    created() {
      let vm = this;
      let today = dateCalendar.today;
      vm.$EventCalendar.toDate(today);
      eventBus.$on('appToken', function (data) {
        vm.appToken = data;
      });
    },
    beforeMount() {},
    methods: {
      //  日期切换事件
      handleDayChanged: (dateEvent) => {
        console.log(dateEvent);
      },
      //  月份切换事件
      handleMonthChanged: (dateEvent) => {
        console.log(dateEvent)
      },
      getToday: function () {
        let vueDate = new Date();
        return vueDate.getFullYear() + '/' + (vueDate.getMonth() + 1) + '/' + vueDate.getDate();
      },
    }
  }

</script>

<style scoped>
  .item .is-event {
    border-radius: 0 !important;
  }

</style>
