<template>
  <div id="dailyMeal">
    <mu-dialog :open="tomorrow.show" @ @close="handleTomorrowClose" title="明日报餐汇总" scrollable>
      <mu-list>
        <mu-list-item :title="item.name" v-for="(item,index) in tomorrowDailyMeals" :key="index">
          <mu-avatar :src="item.avatar" slot="leftAvatar"></mu-avatar>
          <mu-icon slot="right" value="eat" />
        </mu-list-item>
      </mu-list>
      <div slot="actions">
        {{tomorrowDailyMeals.date}}共有{{tomorrowDailyMeals.length}}人吃饭
        <mu-flat-button primary label="关闭" @click="handleTomorrowClose" slot="actions" />
      </div>
    </mu-dialog>
    <mu-appbar title="报餐">
      <mu-icon-button icon="date_range" slot="left" @click="handleOpenTomorrow"></mu-icon-button>
      <mu-icon-button icon="menu" slot="right"></mu-icon-button>
    </mu-appbar>
    
    <div v-if="!needLogin">
      <div style="padding:1em;">
        <mu-avatar slot="left" :src="userInfo.avatar || defaultAvatar" :size="96" />
        <mu-card-title :title="userInfo.name || '企业微信昵称'" :subTitle="userInfo.english_name ||''">
        </mu-card-title>
        <mu-badge :content="userInfo.position||'员工'" primary slot="after" />
      </div>
      <mu-list title="每日报餐" id="dailyMealList">
          <mu-paper style="margin:.5em" v-for="(item,index) in weekEvents" :key="index">        
          <mu-list-item >
            <div slot="title">
               <mu-chip >
              <mu-avatar color="white" backgroundColor="blue300" >{{weekDay[item.day]}}</mu-avatar>
                  {{ new Date(item.date).Format("yyyy年MM月dd日")}}
                 <!-- - {{weekDay[item.day]}} -->
               </mu-chip>
              <mu-badge content="今天" v-if="item.date == today" secondary slot="after"/>
            </div>                        
            <div slot="right" style="padding-top:4em" >
              <mu-float-button slot="right" :icon="item.isCheck?'check':'add'" :backgroundColor="item.isCheck?'green300':'brown100'" mini
                :disabled="item.day==0" class="demo-float-button" @click="handleCheck(index)" />
              <div style="text-align:center;font-size:13px">{{item.isCheck?'已':'未'}}报餐</div>
            </div>
            <mu-flexbox justify="space-between" align="center" style="padding-top:0.6em;text-align:center">
              <mu-flexbox-item v-for="(food,foodIndex) in item.menu" :key="foodIndex">
                <img  :width="48" :src="imgs[foodIndex]" alt="" />
                <div>{{food}}</div>
              </mu-flexbox-item>
            </mu-flexbox>
          </mu-list-item>          
          </mu-paper>            
      </mu-list>
      <div>        
      <!-- <mu-raised-button label="提交报餐" class="demo-raised-button" secondary @click="handleUserMealSubmit" /> -->
      </div>
    </div>
  </div>
</template>
<script>
import soupPng from "@/assets/dailyMeal/soup.png";
import meatPng from "@/assets/dailyMeal/meat.png";
import vegetablePng from "@/assets/dailyMeal/vegetable.png";
import defaultAvatar from "@/assets/avatar.png";

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
        soup: soupPng,
        meat: meatPng,
        vegetable: vegetablePng
      },
      tomorrow: {
        show: false
      },
      tomorrowDailyMeals: {},
      tomorrowMeals: 0,
      weekDay: ["日", "一", "二", "三", "四", "五", "六"]
    };
  },
  created: function() {
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
      console.log(this.weekEvents[index]);

      let vm = this;

      vm.weekEvents[index].isCheck = !vm.weekEvents[index].isCheck;
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
    //  打开明日列表
    handleOpenTomorrow: function() {
      this.tomorrow.show = true;
      this.$serverApi.getTomorrowDailyMeals();
    },
    //  关闭明日列表
    handleTomorrowClose: function() {
      this.tomorrow.show = false;
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
    }
  },
  computed: {
    handlerTomorrowDailyMeal: function() {
      return this.$store.getters.getTomorrowDailyMeals;
    }
  }
};
</script>
<style>
#dailyMealList {
  text-align: left;
}
</style>
