<template>
  <div id="dailyMeal">

    <h2>是日报餐</h2>
    <h4>{{today}}</h4>
    <div v-if="needLogin" style="height: 100%;display: flex;justify-content: center;align-items: center">
      <mu-flexbox orient="vertical" justify="center" align="center">
        <mu-flexbox-item>
          <p style="text-align:center">当前用户未授权登录</p>
          <p style="text-align:center">请点击下方按钮开始授权</p>
        </mu-flexbox-item>
        <mu-raised-button label="用户登录" @click="handleUserAuth">
        </mu-raised-button>
      </mu-flexbox>
    </div>
    <!-- <div v-if="!needLogin"> -->
    <mu-list title="是日报餐">
      <mu-paper>
        <mu-list-item v-for="(item,index) in weekEvents" :key="index">
          <p slot="title">
            {{item.date}}
          </p>
          <!-- <mu-icon slot="left" value="grade" :color="item.isToday ? 'red500':''" size="36" /> -->
          <mu-avatar slot="leftAvatar" :src="dishes1" :size="36" />
          <p slot="after">
            当日菜单,叉烧,烧鸭,青菜
          </p>
          <!-- <mu-switch labelLeft label="我要报餐" />
           -->
          <mu-float-button slot="right" icon="add" secondary mini class="demo-float-button" />
        </mu-list-item>
      </mu-paper>
    </mu-list>
    <mu-raised-button label="提交本周报餐" class="demo-raised-button" secondary/>
    <com-userAuth></com-userAuth>
    <!-- </div> -->
  </div>
</template>
<script>
  let comUserAuth = () =>
    import ("./userAuth.vue");
  import dishes1 from "@/assets/menu/Dishes-1.jpg";
  import dishes2 from "@/assets/menu/Dishes-2.jpg";
  let dishes3 = () =>
    import ("@/assets/menu/Dishes-3.jpg");
  import EventBus from "@/libs/eventBus.js";
  import defaultAvatar from "@/assets/avatar.png";
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
      };
    },
    components: {
      "com-userAuth": comUserAuth,
    },
    created() {

      let vm = this;
      vm.needLogin = false;

      //  产生数据
      let todayDate = new Date();
      console.log(todayDate.Format("yyyy-MM-dd"));

      let weekDate = new Date();
      weekDate.setDate(todayDate.getDay() - 7 + todayDate.getDate());

      for (let i = 1; i < 7 + 1; i++) {
        weekDate.setDate(weekDate.getDate() + 1)
        let event = {
          date: weekDate.Format("yyyy-MM-dd"),
          menu: 123,
          isEater: false,
          isToday: todayDate.Format("yyyy-MM-dd") == weekDate.Format("yyyy-MM-dd")
        }
        vm.weekEvents.push(event)
      }


    },
    methods: {
      //  获取用户信息
      handleUserAuth: function () {
        //  跳转授权
        let vm = this;
        vm.$weixinApi.getUserAuth();
      }
    }
  };

</script>
<style>


</style>
