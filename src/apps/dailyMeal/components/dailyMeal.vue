<template>
  <div id="dailyMeal">
    <mu-dialog :open="totals.show" @close="handleTotalClose" title="报餐汇总" scrollable>
      <mu-list>
        <mu-list-item :title="item.name" v-for="(item,index) in totals.items" :key="index">
          <mu-avatar :src="item.avatar" slot="leftAvatar"></mu-avatar>
          <mu-icon slot="right" value="eat" />
        </mu-list-item>
      </mu-list>
      <div slot="actions">
        {{totals.date}}共有{{totals.items.length}}人吃饭
        <mu-flat-button primary label="关闭" @click="handleTotalClose" slot="actions" />
      </div>
    </mu-dialog>
    <!-- 主页面内容 -->
    <com-page-head title="报餐" icon="local_dining"></com-page-head>
    <mu-flexbox>

      <mu-flexbox-item class="dateBtn today" align="center" justify="center">
        <!-- 今天报餐统计 -->
        <div @click="handleOpenTodayTotal">
          <div class="title">今日</div>
          <div class="summary">Today</div>
          <div class="title">{{today.items.length||0}}人</div>
          <div class="summary">(点击查看)</div>
          <div class="summary">{{today.date}}</div>
        </div>
      </mu-flexbox-item>

      <mu-flexbox-item class="dateBtn tomorrow" align="center" justify="center">
        <!-- 明天报餐统计 -->
        <div @click="handleOpenTomorrowTotal">
          <div class="title">明天</div>
          <div class="summary">Tomorrow</div>
          <div class="title">{{tomorrow.items.length||0}}人</div>
          <div class="summary">(点击查看)</div>

          <div class="summary">{{tomorrow.date}}</div>
        </div>
      </mu-flexbox-item>
    </mu-flexbox>
    <mu-list title="每日报餐" id="dailyMealList">
      <mu-sub-header>未来7天报餐</mu-sub-header>
      <mu-paper style="margin:.5em" v-for="(item,index) in weekEvents" :key="index" v-if="(item.day != 0 && item.day != 6)" :class="item.isCheck?'mealCheck':''">
        <mu-list-item>
          <div slot="title">
            <mu-chip backgroundColor="blue300" color="white">
              周{{weekDay[item.day]}}
            </mu-chip>
            <mu-chip>
              {{ new Date(item.date).Format("yyyy年MM月dd日")}}
              <!-- - {{weekDay[item.day]}} -->
            </mu-chip>
            <mu-badge content="今天" v-if="item.date == today.date" secondary slot="after" />
          </div>
          <div slot="right" style="padding-top:4em">
            <mu-float-button slot="right" :icon="item.isCheck?'check':'add'" :backgroundColor="item.isCheck?'green300':'brown100'" mini class="demo-float-button" @click="handleCheck(index)" />
            <div style="text-align:center;font-size:13px">{{item.isCheck?'已':'未'}}报餐</div>
          </div>
          <mu-flexbox justify="space-between" align="center" style="padding-top:0.6em;text-align:center">
            <mu-flexbox-item v-for="(food,foodIndex) in item.menu" :key="foodIndex">
              <img :width="48" :src="mealImgs[foodIndex]" alt="" />
              <div>{{food}}</div>
            </mu-flexbox-item>
          </mu-flexbox>
        </mu-list-item>
      </mu-paper>
      <mu-paper v-else style="margin:.5em" :key="index">
        <mu-list-item>
          <div slot="title">
            <mu-chip backgroundColor="red300" color="white">
              周{{weekDay[item.day]}}
            </mu-chip>
            <mu-chip>
              {{ new Date(item.date).Format("yyyy年MM月dd日")}}
              <!-- - {{weekDay[item.day]}} -->
            </mu-chip>
            <mu-badge content="今天" v-if="item.date == today.date" secondary slot="after" /> 无法报餐
          </div>
        </mu-list-item>
      </mu-paper>
    </mu-list>
  </div>
</template>
<script>
import soupPng from "./../assets/soup.png";
import meatPng from "./../assets/meat.png";
import vegetablePng from "./../assets/vegetable.png";

import defaultAvatar from "@/assets/avatar.png";

import mealApi from "./../components/api.js";
const comPageHead = () => import("@/apps/public/pageHead.vue");

const TODAY_DATE = new Date();
const TOMORROW_DATE = new Date(new Date().setDate(TODAY_DATE.getDate() + 1));

let today = window.Helper.timer().clone();
let tomorrow = window.Helper.timer()
  .clone()
  .add(1, "day");

export default {
  name: "dailyMeal",
  data() {
    return {
      userInfo: null,
      today: { show: false, date: null, items: [] },
      tomorrow: { show: false, date: null, items: [] },
      totals: {
        show: false,
        date: null,
        items: []
      },
      weekEvents: [],
      mealImgs: {
        soup: soupPng,
        meat: meatPng,
        vegetable: vegetablePng
      },
      tomorrowDailyMeals: {},
      weekDay: ["日", "一", "二", "三", "四", "五", "六"],
      latelyMealsTotal: []
    };
  },
  created: function() {
    let vm = this;

    vm.today.date = today.format("YYYY年MM月DD日");
    vm.tomorrow.date = tomorrow.format("YYYY年MM月DD日");

    //  获取用户信息
    vm.userInfo = vm.$store.getters.getUserInfo;
    //  获取用户报餐事件
    // vm.weekEvents = vm.$serverApi.getUserWeekMeal(vm.userInfo.userid);
    mealApi.getUserSevenDayMeals(vm.userInfo.userid);
    //  获取明天报餐汇总数据
    mealApi.getLateMealsTotal();
  },
  components: {
    "com-page-head": comPageHead
  },
  methods: {
    //  点餐按钮事件
    handleCheck: function(index) {
      console.log("点击报餐按钮,进行报餐");
      console.log(this.weekEvents[index]);

      let vm = this;

      vm.weekEvents[index].isCheck = !vm.weekEvents[index].isCheck;

      //  提交用户报餐
      vm.$serverApi.attendUserDailyMeal(
        vm.userInfo.userid,
        vm.weekEvents[index]
      );

      vm.$store.commit(
        "changeLog",
        vm.weekEvents[index].date +
          (vm.weekEvents[index].isCheck ? "我要吃饭" : "我还是不吃了")
      );
    },

    //  提交报餐
    handleUserMealSubmit: function() {
      console.log("当前用户提交批量报餐");

      let vm = this;
      vm.$serverApi.setUserWeekMeals(vm.weekEvents, vm.userInfo.userid);
    },

    //  打开报餐统计
    handleTotalOpen: function() {
      this.totals.show = true;
    },

    //  关闭报餐统计
    handleTotalClose: function() {
      this.totals.show = false;
    },

    //  打开明日统计
    handleOpenTomorrowTotal: function() {
      this.totals.date = window.Helper.timer()
        .clone()
        .add(1, "day")
        .format("YYYY-MM-DD");

      let items = this.$store.getters.getTomorrowMeals;
      this.totals.items = items;
      this.totals.show = true;
    },

    //  打开今日统计
    handleOpenTodayTotal: function() {
      this.totals.date = window.Helper.timer()
        .clone()
        .format("YYYY-MM-DD");
      let items = this.$store.getters.getTodayMeals;
      this.totals.items = items;
      this.totals.show = true;
    }
  },
  watch: {
    handlerTomorrowDailyMeal: function(v, ov) {
      console.log("监听明日报餐统计事件");
      v.map(function(e, i) {
        if (e.need_meal == 0) {
          v.splice(i, 1);
        }
      });
      this.tomorrowDailyMeals = v;
    },
    handleLateMeals: function(v) {
      this.today.items = this.$store.getters.getTodayMeals;
      this.tomorrow.items = this.$store.getters.getTomorrowMeals;
    }
  },
  computed: {
    //  监听明日报餐
    handlerTomorrowDailyMeal: function() {
      return this.$store.getters.getTomorrowDailyMeals;
    },

    //  监听最近2日报餐统计
    handleLateMeals: function() {
      return this.$store.state.dailyMeals.lateDailyMeals;
    }
  }
};
</script>
<style lang="scss" scoped>
#dailyMeal {
  padding-top: 4em;
  text-align: left;
  & .mealCheck {
  }
  & .dateBtn {
    &.today {
      color: #333;
    }
    &.tomorrow {
      color: #999;
    }
    .title {
      font-size: 24px;
      font-weight: 900;
    }
    .summary {
    }
  }
  @keyframes reversal3d {
    0% {
      transform: rotateY(0);
    }
    100% {
      transform: rotateY(180);
    }
  }
}
</style>
