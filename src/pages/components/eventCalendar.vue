<template>
  <div id='vueEventsCalendar'>
    <mu-appbar>
      <div slot="default">排班日历表
      </div>
      <mu-icon-button icon="today" slot="left" @click="handleGoToday"></mu-icon-button>
      <mu-icon-button icon="refresh" slot="right" @click="handleRefresh"></mu-icon-button>
    </mu-appbar>
    <vue-event-calendar :events="calenderEvents" @day-changed="handleDayChanged" @month-changed="handleMonthChanged" :style='{"margin-bottom":"0"}'>
      <template slot-scope="props">
        <transition-group enter-active-class="animated fadeIn" style="display:block">
          <div v-for="(events,index) in props.showEvents" :key="'event'+index">
            <!-- 休假人员 -->
            <div v-if="events.onRest" class="event-item" gutter>
              <mu-chip>
                <mu-avatar color="red100" backgroundColor="red300" :size="32">{{events.onRest.length||0}}</mu-avatar>人休息
                <!-- 休假 共{{events.onRest.length||0}}人 -->
              </mu-chip>
              <mu-row>
              <mu-col width="100" table="100" desktop="100"></mu-col>
              <mu-col width="50"  table="50" desktop="50" v-for="(event , index) in events.onRest" :key="'rest'+index">
                <mu-list-item :describeText="'休假'" :title="event.username" @click="handleEventClick(event)">
                  <mu-icon color="pink500" slot="right" value="alarm_off" />
                </mu-list-item>
              </mu-col>
              </mu-row>
            </div>
            <!-- 上班人员 -->
            <div v-if="events.onDuty" class="event-item" gutter>
              <mu-chip>
                 <mu-avatar color="green100" backgroundColor="green400" :size="32">{{Object.getOwnPropertyNames(events.onDuty).length||0}}</mu-avatar>人上班
                <!-- 上班 共{{Object.getOwnPropertyNames(events.onDuty).length||0}}人 -->
              </mu-chip>
              <mu-row>
              <mu-col width="50"  table="50" desktop="50" v-for="(event , index) in events.onDuty" :key="'duty'+index">
                <mu-list-item :title="event.name" :describeText="'上班'" @click="handleEventClick(event)">
                  <mu-icon color="lightGreen500" slot="right" value="alarm_on" />
                </mu-list-item>
              </mu-col>
              </mu-row>
            </div>
          </div>
        </transition-group>
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
  color: "#474a4f"
});

let dateToday = new Date();
let today = dateToday.Format("yyyy/M/d");
let todayDate = dateToday.Format("yyyy/MM/dd hh:mm:ss");

export default {
  name: "vueEventsCalendar",
  data() {
    return {
      templateMode: true,
      calenderEvents: [],
      appToken: null,
      msg: null
    };
  },
  beforeCreate: function() {
    let vm = this;
    //  问服务器获取当月休假
    vm.$serverApi.getCurMonthEvents(today);
  },
  mounted: function() {
    let vm = this;
    setTimeout(() => {
      vm.handleGoToday();
    }, 1000);
  },
  watch: {
    msg: function(v, ov) {
      this.$store.commit("changeLog", v);
    },
    handlerMonthEvents: function(v) {
      console.log("监听到当前月份排班数据变化");
      this.calenderEvents = v;
    }
  },
  computed: {
    handlerMonthEvents() {
      return this.$store.getters.getMonthEvents;
    }
  },
  methods: {
    //  日期切换事件
    handleDayChanged: function(dateEvent) {
      console.log("排班日历日期切换时间,日期切换到" + dateEvent.date);
      this.msg = "当前选择日期为" + dateEvent.date;
    },
    //  月份切换事件
    handleMonthChanged: function(dateEvent) {
      console.log("排班日期月份切换,月份切换到" + dateEvent);
      let year = dateEvent.substring(0, 4);
      let month = dateEvent.substring(5, 7);
      let curMonthDate = year + "-" + month + "-01";
      // console.log(curMonthDate);
      this.$serverApi.getCurMonthEvents(curMonthDate);
      this.msg = "当前选择月份切换到" + dateEvent;
    },
    handleEventClick: function(event) {
      //  员工点击事件,后续开发使用
    },
    handleGoToday: function(event) {
      //  排班日历跳转到今天
      console.log("排班日期切换到今天,当前日期为" + today);
      this.$EventCalendar.toDate(today);
      this.msg = "当前选择日期切换到今天";
    },
    handleGoOneDay: function(date) {
      //  排班日历跳转到某天
      console.log("排班日期切换到" + date);
      this.$EventCalendar.toDate(date);
      this.msg = "当前选择日期为" + date;
    },
    handleRefresh: function(event) {
      //  刷新排班日历表数据
      let vm = this;
      vm.$serverApi.getCurMonthEvents(today);
      setTimeout(function() {
        this.handleGoToday();
      }, 1000);
      let dateNow = new Date();
      vm.msg = "数据更新于" + dateNow.Format("yyyy-M-d h:m:s");
    }
  }
};
</script>

<style>
.item .is-event,
.is-today {
  border-radius: 2px !important;
}

.small-list {
  padding: 0.5em;
}
.events-wrapper {
  border-radius: 0 !important;
}
@media screen and (max-width: 769px) {
  .events-wrapper {
    position: static !important;
  }
}
</style>
