<template>
  <div id='vueEventsCalendar'>
    <vue-event-calendar :events="calenderEvents" @day-changed="handleDayChanged" @month-changed="handleMonthChanged" :style='{"margin-bottom":"2em"}'>
      <template slot-scope="props">
        <div v-for="(event, index) in props.showEvents" class="event-item" :key="index">
          <!-- 这里拿到的是传入的单个event所有数据 -->
          <mu-switch label="显示模式" v-model="templateMode" />
          <div v-if="templateMode">
            <mu-row gutter>
              <mu-col width="100">
                <mu-icon color="pink500" slot="left" value="alarm_off" /> 休假 共{{event.onRest.length}}人
              </mu-col>
              <mu-col v-for="(ruser , rindex) in event.onRest" :key="index+'2onRest'+rindex" width="50" tablet="50" desktop="50">
                <mu-list-item describeText="休假" :title="ruser">
                  <mu-icon color="pink500" slot="right" value="alarm_off" />
                </mu-list-item>
              </mu-col>
            </mu-row>
            <mu-row gutter>
                <mu-col width="100">
                    <mu-icon color="lightGreen500" slot="left" value="alarm_off" /> 正常上班 共{{event.onDuty.length}}人
                  </mu-col>
              <mu-col v-for="(duser , dindex) in event.onDuty" :key="index+'2onDuty'+dindex" width="50" tablet="50" desktop="50">
                <mu-list-item describeText="正常上班" :title="duser">
                  <mu-icon color="lightGreen500" slot="right" value="alarm_on" />
                </mu-list-item>
              </mu-col>
            </mu-row>
          </div>

          <div v-if="!templateMode">
            <mu-flexbox justify="flex-start" align="flex-start" :gutter="0">
              <mu-flexbox-item class="flex-demo">
                <p>共{{event.onDuty.length}}人</p>

                <mu-list>
                  <mu-list-item v-for="(duser , dindex) in event.onDuty" :key="index+'onDuty'+dindex" describeText="正常上班" :title="duser">
                    <mu-icon color="lightGreen500" slot="right" value="alarm_on" />
                  </mu-list-item>
                </mu-list>
              </mu-flexbox-item>
              <mu-flexbox-item class="flex-demo">
                <mu-list>
                  <mu-list-item v-for="(ruser , rindex) in event.onRest" :key="index+'onDuty'+rindex" describeText="休假" :title="ruser">
                    <mu-icon color="pink500" slot="right" value="alarm_off" />
                  </mu-list-item>
                </mu-list>
              </mu-flexbox-item>
            </mu-flexbox>
          </div>
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
        templateMode: true,
        restEvents: null,
        calenderEvents: null,
        restEvents: null,
        appToken: null
      };
    },
    beforeCreate: function () {
      let vm = this;

      //  问服务器获取当月休假
      vm.$serverApi.getRestEventsByMonth(dateCalendar.today);

      //  
    },
    created: function () {
      let vm = this;
      //  准备当月正常事件
      dateCalendar.init();
      vm.calenderEvents = dateCalendar.events;

      EventBus.$on("curUserRestDay", function (restDays) {
        console.log("捕捉到当前用户休息日数据");
        vm.restEvents = restDays;
        restDays.map(function (re) {
          // console.log(re);
          vm.calenderEvents.map(function (ce) {
            let cet = new Date(ce.date).Format("yyyy-MM-dd");
            // console.log(cet);
            if (cet == re.date) {
              //  记录相同则设置相应用户状态

              //  1.onDuty列表剔除对应用户

              let existDutyIndex = ce.onDuty.indexOf(re.userid);

              existDutyIndex < 0 || ce.onDuty.splice(existDutyIndex, 1);
              //  2.onRest列表插入对应用户
              let existIndex = ce.onRest.indexOf(re.userid);
              existIndex == -1 ?
                ce.onRest.push(re.userid) :
                (ce.onRest[existIndex] = re.userid);
              // console.log(re);
            }
          });
        });
      });

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
      getToday: function () {
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
