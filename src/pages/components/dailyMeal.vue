<template>
  <div id="dailyMeal">
    <mu-appbar title="报餐">
      <mu-icon-button icon="date_range" slot="left" @click="handleOpenTomorrow"></mu-icon-button>
      <mu-icon-button icon="menu" slot="right"></mu-icon-button>
    </mu-appbar>
    <!-- <div>本功能还在开发当中 - zicok</div> -->
    <mu-dialog :open="tomorrow.show" @ @close="handleTomorrowClose" title="明日报餐汇总" scrollable>
      <mu-list>
        <mu-list-item :title="item.name" v-for="(item,index) in tomorrowEvents" :key="index">
          <mu-avatar :src="item.avatar" slot="leftAvatar"></mu-avatar>
          <mu-icon slot="right" value="eat" />
        </mu-list-item>
      </mu-list>
      <div slot="actions">
        {{tomorrowEvents.date}}共有{{tomorrowEvents.length}}人吃饭
        <mu-flat-button primary label="关闭" @click="handleTomorrowClose" slot="actions" />
      </div>
    </mu-dialog>
    <com-userAuth v-if="needLogin"></com-userAuth>
    <div v-if="!needLogin">
      <mu-list title="每日报餐" id="dailyMealList">
          <mu-list-item  v-for="(item,index) in weekEvents" :key="index">
            <div slot="left">
              <mu-avatar color="white" backgroundColor="blue300" >{{weekDay[item.day]}}</mu-avatar>
            </div>
            <div slot="title">
               <mu-chip >
                  {{ new Date(item.date).Format("yyyy年MM月dd日")}}
                 <!-- - {{weekDay[item.day]}} -->
               </mu-chip>
              <mu-badge content="今天" v-if="item.date == today" secondary slot="after"/>
            </div>                        
            <div slot="right">
              <mu-float-button slot="right" :icon="item.isCheck?'check':'add'" :backgroundColor="item.isCheck?'green300':'brown100'" mini
                :disabled="item.day==0" class="demo-float-button" @click="handleCheck(index)" />
            </div>
            <mu-flexbox justify="space-between" align="center" style="padding-top:0.6em;text-align:center">
              <mu-flexbox-item v-for="(food,foodIndex) in item.menu" :key="foodIndex">
                <img  :width="32" :src="imgs['fodeIndex']" alt="" />
                <div>{{food}}</div>
              </mu-flexbox-item>
            </mu-flexbox>
          </mu-list-item>          
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
      userInfo: null,
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
      weekDay: ["日", "一", "二", "三", "四", "五", "六"]
    };
  },
  components: {
    "com-userAuth": comUserAuth
  },
  created: function() {
    alert("本功能正在升级中...");
    let vm = this;
    //  获取用户信息
    vm.userInfo = vm.$store.getters.getUserInfo;
    //  获取用户报餐事件
    vm.weekEvents = vm.$serverApi.getUserWeekMeal(vm.userInfo.userid);
    //  获取明天报餐汇总数据
    vm.$serverApi.getTomorrowDailyMeals();
  },
  methods: {
    //  点餐按钮事件
    handleCheck: function(index) {
      console.log("点击报餐按钮,进行报餐");

      let vm = this;
      vm.weekEvents[index].isCheck = !vm.weekEvents[index].isCheck;
      vm.toast.msg =
        vm.weekEvents[index].date +
        (vm.weekEvents[index].isCheck ? "我要吃饭" : "我还是不吃了");
    },
    //  提交报餐
    handleUserMealSubmit: function() {
      console.log("当前用户提交批量报餐");

      let vm = this;
      vm.$serverApi.setUserWeekMeals(vm.weekEvents, vm.userInfo.userid);
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
      console.log("监听明日报餐统计事件");
    }
  }
};
</script>
<style>
#dailyMealList {
  text-align: left;
}
</style>
