<template>
  <div id="dailyMeal">
    <com-museToast :msg="toast.msg"></com-museToast>
    <mu-appbar title="是日报餐">
      <mu-icon-button icon="date_range" slot="left" @click="handleOpenTomorrow"></mu-icon-button>
      <mu-icon-button icon="menu" slot="right"></mu-icon-button>
    </mu-appbar>
    <div>本功能还在开发当中 - zicok</div>
    <mu-dialog :open="tomorrow.show" @ @close="handleTomorrowClose" title="明日报餐汇总" scrollable>
<p>明日报餐</p>
      <mu-list>
        <mu-list-item :title="item.name" v-for="(item,index) in tomorrowEvents" :key="index">
          <mu-avatar :src="item.avatar" slot="leftAvatar"></mu-avatar>
          <mu-icon slot="right" value="eat" />
        </mu-list-item>
      </mu-list>

      <div slot="actions">
        {{tomorrowEvents.date}}共有{{tomorrowMeals}}人吃饭
        <mu-flat-button primary label="关闭" @click="handleTomorrowClose" slot="actions" />
      </div>
    </mu-dialog>
    <com-userAuth v-if="needLogin"></com-userAuth>
    <div v-if="!needLogin">
      <mu-list title="每日报餐" id="dailyMealList">
        <mu-paper>
          <mu-list-item v-for="(item,index) in weekEvents" :key="index">
            <div slot="title">
              {{item.date}} - {{item.day==0?"星期天":"星期" + weekDay[item.day]}}
               <mu-badge content="Today" v-if="item.date == today" secondary slot="after"/>
            </div>
            <mu-flexbox :gutter="8" justify="space-around" align="center">
              <mu-flexbox-item>
            <img :width="48" :src="imgs.meatPng" />
              </mu-flexbox-item>    
            <mu-flexbox-item>
              小炒肉
            </mu-flexbox-item>
              <mu-flexbox-item>
            <img :width="48" :src="imgs.soupPng" />
              </mu-flexbox-item>
              <mu-flexbox-item>
            <img :width="48" :src="imgs.vegetablePng" />
              </mu-flexbox-item>
            </mu-flexbox>
            <div slot="right">
              <mu-float-button slot="right" :icon="item.isCheck?'check':'add'" :backgroundColor="item.isCheck?'redA400':'brown100'" mini
                :disabled="item.day==0" class="demo-float-button" @click="handleCheck(index)" />
            </div>
          </mu-list-item>
        </mu-paper>
      </mu-list>
      <mu-raised-button label="提交报餐" class="demo-raised-button" secondary @click="handleUserMealSubmit" />
    </div>
  </div>
</template>
<script>
import soupPng from "@/assets/dailyMeal/soup.png";
import meatPng from "@/assets/dailyMeal/meat.png";
import vegetablePng from "@/assets/dailyMeal/vegetable.png";
import defaultAvatar from "@/assets/avatar.png";

let comUserAuth = () => import("./userAuth.vue");
let comMuseToast = () => import("@/components/museToast.vue");
export default {
  name: "dailyMeal",
  data() {
    return {
      today: new Date().Format("yyyy-MM-dd"),
      needLogin: false,
      defaultAvatar: defaultAvatar,
      toast: {
        msg: null
      },
      weekEvents: [],
      imgs: {
        soupPng: soupPng,
        meatPng: meatPng,
        vegetablePng: vegetablePng
      },
      tomorrow: {
        show: false
      },
      tomorrowEvents: {},
      tomorrowMeals: 0,
      weekDay: ["天", "一", "二", "三", "四", "五", "六"]
    };
  },
  components: {
    "com-userAuth": comUserAuth,
    "com-museToast": comMuseToast
  },
  created: function() {
    let vm = this;
    vm.weekEvents = vm.$serverApi.getUserWeekMeal("guozihao");
    vm.$serverApi.getTomorrowDailyMeals();
  },
  mounted: function() {
    let vm = this;
    vm.needLogin = false;

    //  接收用户最近报餐数据
    window.EventBus.$on("getUserWeekMeal", datas => {
      console.log("接收近期当前用户报餐数据");
      vm.weekEvents = datas;
    });

    //  接收用户明天报餐数据
    window.EventBus.$on("getTomorrowDailyMeals", datas => {
      console.log("接收明日用户报餐数据");
      vm.tomorrowEvents = datas;
    });
  },
  methods: {
    //  获取用户信息
    handleUserAuth: function() {
      //  跳转授权
      let vm = this;
      vm.$weixinApi.getUserAuth();
    },

    //  点餐按钮事件
    handleCheck: function(index) {
      this.weekEvents[index].isCheck = !this.weekEvents[index].isCheck;
      this.toast.msg =
        this.weekEvents[index].date +
        (this.weekEvents[index].isCheck ? "我要吃饭" : "我还是不吃了");
    },

    //  提交报餐
    handleUserMealSubmit: function() {
      let vm = this;
      vm.$serverApi.attendUserMeal();
    },

    //  打开明日列表
    handleOpenTomorrow: function() {
      this.tomorrow.show = true;
      this.tomorrowEvents = this.$serverApi.getTomorrowDailyMeals();
    },

    //  关闭明日列表
    handleTomorrowClose: function() {
      this.tomorrow.show = false;
    }
  },
  watch: {
    tomorrowEvents: function(v, ov) {
      // console.log(v);
      // let duty;
      // let n = 0;
      // for (o in v.onDuty) {
      //   if (typeof o == "object") {
      //     n++;
      //   }
      // }
      // // let counter = this.$helper.getObjLen(duty);
      // // console.log("共有" + counter + "个人报餐");
      // this.tomorrowMeals = n;
    }
  }
};
</script>
<style>
#dailyMealList {
  text-align: left;
}
</style>
