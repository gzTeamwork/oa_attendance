<template>
  <div id='vueEventsCalendar'>
    <vue-event-calendar :events="calenderEvents"
                        @day-changed="handleDayChanged"
                        @month-changed="handleMonthChanged"
                        :style='{"margin-bottom":"2em"}'>
      <template slot-scope="props">
        <div v-for="(event, index) in props.showEvents"
             class="event-item"
             :key="index">
          <!-- 这里拿到的是传入的单个event所有数据 -->
          <mu-flexbox justify="flex-start"
                      align="flex-start"
                      :gutter="0">
            <mu-flexbox-item class="flex-demo">
              <mu-list>
                <mu-list-item v-for="(duser , dindex) in event.onDuty"
                              :key="index+'onDuty'+dindex"
                              describeText="正常上班"
                              :title="duser">
                  <mu-icon color="lightGreen500"
                           slot="right"
                           value="alarm_on" />
                </mu-list-item>
              </mu-list>
            </mu-flexbox-item>
            <mu-flexbox-item class="flex-demo">
              <mu-list>
                <mu-list-item v-for="(ruser , rindex) in event.onRest"
                              :key="index+'onDuty'+rindex"
                              describeText = "休假"
                              :title="ruser">
                  <mu-icon color="pink500"
                           slot="right"
                           value="alarm_off" />
                </mu-list-item>
              </mu-list>
            </mu-flexbox-item>
          </mu-flexbox>
        </div>
      </template>
    </vue-event-calendar>
  </div>
</template>

<script>
// 引入日历插件
import Vue from "vue";
import "vue-event-calendar/dist/style.css";
import vueEventCalendar from "vue-event-calendar";
Vue.use(vueEventCalendar, {
  locale: "zh",
  color: "#7e57c2"
});

import EventBus from "@/libs/eventBus.js";
import dateCalendar from "@/libs/dateCalendar.js";

export default {
  name: "vueEventsCalendar",
  data() {
    return {
      calenderEvents: null,
      appToken: null
    };
  },
  beforeCreate: function() {
    let vm = this;
  },
  created: function() {
    let vm = this;
    //  准备当月正常事件
    dateCalendar.init();
    vm.calenderEvents = dateCalendar.events;
    //  定位今天
    let today = dateCalendar.today;
    vm.$EventCalendar.toDate(today);
    EventBus.$on("appToken", token => {
      vm.appToken = token;
    });
  },
  methods: {
    //  日期切换事件
    handleDayChanged: dateEvent => {
      console.log(dateEvent);
    },
    //  月份切换事件
    handleMonthChanged: dateEvent => {
      console.log(dateEvent);
    },
    getToday: function() {
      let vueDate = new Date();
      return (
        vueDate.getFullYear() +
        "/" +
        (vueDate.getMonth() + 1) +
        "/" +
        vueDate.getDate() -
        1
      );
    }
  }
};
</script>

<style scoped>
.item .is-event {
  border-radius: 0 !important;
}
.small-list {
  padding: 0.5em;
}
</style>
