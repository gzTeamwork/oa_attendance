<template>
  <div id="dailyMeal">
    <com-museToast :msg="toast.msg"></com-museToast>
    <mu-appbar title="是日报餐">
      <mu-icon-button icon="date_range" slot="left" @click="handleOpenTomorrow"></mu-icon-button>
      <mu-icon-button icon="menu" slot="right"></mu-icon-button>
    </mu-appbar>
    <mu-dialog :open="tomorrow.show" @close="handleCloseTomorrow" title="明日报餐汇总" scrollable>

      <mu-list>
        <mu-list-item :title="item.name" v-for="(item,index) in tomorrowEvents.onDuty" :key="index">
          <mu-avatar :src="item.avatar" slot="leftAvatar"></mu-avatar>
          <mu-icon slot="right" value="eat" />
        </mu-list-item>
      </mu-list>

      <div slot="actions">
        {{tomorrowEvents.date}}共有{{tomorrowMeals}}人吃饭
        <mu-flat-button primary label="关闭" @click="handleCloseTomorrow" slot="actions" />
      </div>
    </mu-dialog>
    <h4>{{today}}</h4>
    <com-userAuth v-if="needLogin"></com-userAuth>
    <div v-if="!needLogin">
      <mu-list title="是日报餐" id="dailyMealList">
        <mu-paper>
          <mu-list-item v-for="(item,index) in weekEvents" :key="index">
            <div slot="title">
              {{item.date}} - {{item.day==0?"周日":"周"+item.day}}
            </div>
            <mu-avatar slot="leftAvatar" :src="dishes1" />
            <div slot="describe">
              {{item.menu}}
            </div>
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
  import dishes1 from "@/assets/menu/Dishes-1.jpg";
  import dishes2 from "@/assets/menu/Dishes-2.jpg";
  import dishes3 from "@/assets/menu/Dishes-3.jpg";
  import defaultAvatar from "@/assets/avatar.png";

  let comUserAuth = () =>
    import ("./userAuth.vue");
  let comMuseToast = () =>
    import ("@/components/museToast.vue");
  export default {
    name: "dailyMeal",
    data() {
      return {
        today: new Date().Format("yyyy年MM月dd日"),
        needLogin: false,
        defaultAvatar: defaultAvatar,
        toast: {
          msg: null
        },
        weekEvents: [],
        dishes1: dishes1,
        tomorrow: {
          show: false,
        },
        tomorrowEvents: {},
        tomorrowMeals: 0
      };
    },
    components: {
      "com-userAuth": comUserAuth,
      "com-museToast": comMuseToast,
    },
    created: function () {
      let vm = this;
      vm.weekEvents = vm.$serverApi.getUserWeekMeal("guozihao");
      EventBus.$on('attendUserMealsRes', data => {
        vm.toast.msg = data
      })
    },
    mounted: function () {

      let vm = this;
      vm.needLogin = false;

      //  接收用户最近报餐数据
      EventBus.$on("getUserWeekMeal", datas => {
        vm.weekEvents = datas;
      })

      //  接收用户明天报餐数据
      EventBus.$on("curMonthEvents", datas => {
        let tomorrow = new Date();

        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow = tomorrow.Format("yyyy/M/d");
        // console.log(tomorrow);

        datas.map((o, i) => {
          console.log(o.date, tomorrow);
          if (o.date == tomorrow) {
            // console.log(o);
            vm.tomorrowEvents = o;
          }
        })
      })

    },
    methods: {
      //  获取用户信息
      handleUserAuth: function () {

        //  跳转授权
        let vm = this;
        vm.$weixinApi.getUserAuth();
      },

      //  点餐按钮事件
      handleCheck: function (index) {
        this.weekEvents[index].isCheck = !this.weekEvents[index].isCheck;
        this.toast.msg = this.weekEvents[index].date + (this.weekEvents[index].isCheck ? "我要吃饭" : "我还是不吃了");
      },

      //  提交报餐
      handleUserMealSubmit: function () {
        let vm = this;
        vm.$serverApi.attendUserMeal();
      },

      //  打开明日列表
      handleOpenTomorrow: function () {
        this.tomorrow.show = true;
      },

      //  关闭明日列表
      handleCloseTomorrow: function () {
        this.tomorrow.show = false;
      }
    },
    watch: {
      "tomorrowEvents": function (v, ov) {
        console.log(v);
        let duty
        let n = 0;
        for (o in v.onDuty) {
          if (typeof o == "object") {
            n++
          }
        };
        // let counter = this.$helper.getObjLen(duty);
        // console.log("共有" + counter + "个人报餐");
        this.tomorrowMeals = n;
      }
    }

  };

</script>
<style>
  #dailyMealList {
    text-align: left;
  }

</style>
