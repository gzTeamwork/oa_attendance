<template>
  <div id='vueEventsCalendar'>
    <vue-event-calendar :events="calenderEvents"
                        @day-changed="handleDayChanged"
                        @month-changed="handleMonthChanged"
                        :style='{"margin-bottom":"0"}'>
      <template slot-scope="props">
        <transition-group enter-active-class="animated fadeIn">
          <div v-for="(events,index) in props.showEvents"
               :key="'event'+index">
            <mu-row v-if="events.onRest"
                    class="event-item"
                    gutter>
              <mu-col width="100">休假</mu-col>
              <mu-col width="50"
                      v-for="(event , index) in events.onRest"
                      :key="'rest'+index">
                <mu-list-item :describeText="'休假'"
                              :title="event.username"
                              @click="handleEventClick(event)">
                  <mu-icon color="pink500"
                           slot="right"
                           value="alarm_off" />
                </mu-list-item>
              </mu-col>
            </mu-row>
            <mu-row v-if="events.onDuty"
                    class="event-item"
                    gutter>
              <mu-col width="100">上班</mu-col>
              <mu-col width="50"
                      v-for="(event , index) in events.onDuty"
                      :key="'duty'+index">
                <mu-list-item :title="event.name"
                              :describeText="'上班'"
                              @click="handleEventClick(event)">
                  <mu-icon color="lightGreen500"
                           slot="right"
                           value="alarm_on" />
                </mu-list-item>
              </mu-col>
            </mu-row>
          </div>
        </transition-group>
      </template>
    </vue-event-calendar>
  </div>
</template>

<script>
// 引入日历插件
import Vue from "vue";
import EventBus from "@/libs/eventBus.js";
import "vue-event-calendar/dist/style.css";
import vueEventCalendar from "vue-event-calendar";
Vue.use(vueEventCalendar, {
  locale: "zh",
  // color: "#7e57c2",
  color: "#404347"
});

// import dateCalendar from "@/libs/dateCalendar.js";

let dateToday = new Date();
let today = dateToday.Format("yyyy/M/d");

export default {
  name: "vueEventsCalendar",
  data() {
    return {
      templateMode: true,
      calenderEvents: [],
      appToken: null
    };
  },
  beforeCreate: function() {
    let vm = this;

    //  问服务器获取当月休假
    // vm.$serverApi.getRestEventsByMonth(today);
    vm.$serverApi.getCurMonthEvents(today);

    //  问服务器获取排班人员数据
    // vm.$serverApi.getAllUser();

    //
  },
  created: function() {
    let vm = this;
    //  定位今天

    // // 接收当月休息数据
    // EventBus.$on("curMonthRests", function(restDays) {
    //   console.log("捕捉到当月休假时间");
    //   vm.restEvents = restDays;
    //   let events = [];
    //   restDays.map(function(re) {
    //     events.push({
    //       date: new Date(re.date).Format("yyyy/MM/dd"),
    //       title: "休假",
    //       name: re.username
    //     });
    //   });
    //   vm.calenderEvents = events;
    // });

    //  接收当月排班数据
    EventBus.$on("curMonthEvents", events => {
      console.log("接收当月排班数据");
      events.map((e, i) => {
        events[i].date = new Date(e.date).Format("yyyy/MM/dd");
        events[i].title = "日历事件";
      });
      vm.calenderEvents = events;
    });
  },
  mounted: function() {
    let vm = this;
    setTimeout(() => {
      vm.$EventCalendar.toDate(today);
    }, 1000);
  },
  methods: {
    //  日期切换事件
    handleDayChanged: dateEvent => {
      console.log(dateEvent);
    },
    //  月份切换事件
    handleMonthChanged: dateEvent => {
      console.log(dateEvent);
      return false
    },
    handleEventClick: function(event) {
      // this.$EventCalendar.toDate(event.date);
      // this.handleDayChanged(event.date);
    }
  }
};
</script>

<style>
.item .is-event,.is-today {
  border-radius: 2px !important;
}

.small-list {
  padding: 0.5em;
}

</style>
