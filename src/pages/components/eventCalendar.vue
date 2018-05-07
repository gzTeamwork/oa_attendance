<template>
  <div id='vueEventsCalendar'>
  <muse-popupMsg :msg="msg"></muse-popupMsg>
    <mu-appbar>
      <div slot="default">排班日历表
      </div>
      <mu-icon-button icon="today" slot="left" @click="handleGoToday"></mu-icon-button>
      <mu-icon-button icon="refresh" slot="right" @click="handleRefresh"></mu-icon-button>
    </mu-appbar>
    <vue-event-calendar :events="calenderEvents" @day-changed="handleDayChanged" @month-changed="handleMonthChanged" :style='{"margin-bottom":"0"}'>
      <template slot-scope="props">
        <transition-group enter-active-class="animated fadeIn">
          <div v-for="(events,index) in props.showEvents" :key="'event'+index">
            <mu-row v-if="events.onRest" class="event-item" gutter>
              <mu-col width="100">休假</mu-col>
              <mu-col width="50" v-for="(event , index) in events.onRest" :key="'rest'+index">
                <mu-list-item :describeText="'休假'" :title="event.username" @click="handleEventClick(event)">
                  <mu-icon color="pink500" slot="right" value="alarm_off" />
                </mu-list-item>
              </mu-col>
            </mu-row>
            <mu-row v-if="events.onDuty" class="event-item" gutter>
              <mu-col width="100">上班</mu-col>
              <mu-col width="50" v-for="(event , index) in events.onDuty" :key="'duty'+index">
                <mu-list-item :title="event.name" :describeText="'上班'" @click="handleEventClick(event)">
                  <mu-icon color="lightGreen500" slot="right" value="alarm_on" />
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
import "vue-event-calendar/dist/style.css";
import vueEventCalendar from "vue-event-calendar";
Vue.use(vueEventCalendar, {
  locale: "zh",
  // color: "#7e57c2",
  color: "#404347"
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
  components: {
    "muse-popupMsg": () => import("@/components/musePopupMsg.vue")
  },
  beforeCreate: function() {
    let vm = this;

    //  问服务器获取当月休假
    // vm.$serverApi.getRestEventsByMonth(today);
    vm.$serverApi.getCurMonthEvents(today);

    //  问服务器获取排班人员数据
    // vm.$serverApi.getAllUser();
  },
  created: function() {
    let vm = this;
  },
  mounted: function() {
    let vm = this;
    setTimeout(() => {
      vm.$EventCalendar.toDate(today);
    }, 1000);
  },
  watch: {
    handlerMonthEvents: function(v) {
      let vm = this;
      console.log(v);
      vm.calenderEvents = v;
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
      console.log("排班日历日期切换");
      let vm = this;
      vm.msg = "当前选择日期为" + dateEvent.date;
    },
    //  月份切换事件
    handleMonthChanged: function(dateEvent) {
      console.log("排班日期月份切换");
      let year = dateEvent.substring(0, 4);
      let month = dateEvent.substring(5, 7);
      let curMonthDate = year + "-" + month + "-01";
      // console.log(curMonthDate);

      this.$serverApi.getCurMonthEvents(curMonthDate);
      return false;
    },
    handleEventClick: function(event) {
      // this.$EventCalendar.toDate(event.date);
      // this.handleDayChanged(event.date);
    },
    handleGoToday: function(event) {
      //  日历跳转到今天
      let vm = this;
      vm.$EventCalendar.toDate(today);
      vm.msg = "日历日期回到今天";
    },
    handleRefresh: function(event) {
      let vm = this;
      vm.$serverApi.getCurMonthEvents(today);
      setTimeout(function() {
        vm.$EventCalendar.toDate(today);
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
</style>
