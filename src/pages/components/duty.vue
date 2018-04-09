/* * @Author: Zicokuo * @Date: 2018-04-06 10:51:22 * @Last Modified by: Zicokuo * @Last Modified time: 2018-04-07 22:25:43
*/
<template>
  <div id='pageDuty'>
    <br>
    <muse-toast :msg="toast.msg"></muse-toast>

    <div v-if="needLogin" style="height: 640px;display: flex;justify-content: center;align-items: center">
      <mu-flexbox orient="vertical" justify="center" align="center">
        <mu-flexbox-item>
          <p style="text-align:center">当前用户未授权登录</p>
          <p style="text-align:center">请点击下方按钮开始授权</p>
        </mu-flexbox-item>
        <mu-raised-button label="用户登录" @click="handleUserAuth"></mu-raised-button>
      </mu-flexbox>
    </div>
    <div v-if="needLogin == false">
      <!-- 日期弹框 -->
      <mu-avatar slot="left" :src="userInfo.avatar || defaultAvatar" :size="96" />
      <mu-card-title :title="userInfo.name || '企业微信昵称'" :subTitle="userInfo.english_name ||''">
      </mu-card-title>
      <mu-badge :content="userInfo.position||'员工'" primary slot="after" />
      <mu-card>
        <mu-card-title :title="'本月排休 '+restDay+' 天 '" subTitle="Rest Days" />
        <div v-for="item in restDay" :key="item">
          <div>第{{item}}天</div>
          <mu-date-picker hintText="选择排休日期" :firstDayOfWeek="0" :minDate="minDate" :maxDate="maxDate" :shouldDisableDate="getDisableDate"
            @change="datePickerChange($event,item)" :value="workerRestDays[item-1].date" />
        </div>
      </mu-card>
    </div>

  </div>
</template>

<script>
  import museToast from "@/components/museToast.vue";
  import EventBus from "@/libs/eventBus.js";
  import defaultAvatar from "@/assets/avatar.png";
  const vueDate = new Date();

  export default {
    name: "pageDuty",
    data() {
      return {
        needLogin: false,
        userInfo: null,
        defaultAvatar: defaultAvatar,
        restDay: 2,
        showDatePicker: false,
        minDate: 0,
        maxDate: 31,
        today: null,
        appToken: null,
        workerRestDays: [{
            date: null
          },
          {
            date: null
          }
        ],
        toast: {
          show: false,
          message: "",
          msg: ""
        },
        valids: false
      };
    },
    components: {
      "muse-toast": museToast
    },
    beforeCreate: function () {
      let vm = this;
      //  用户信息初始化

      //  1.用户缓存和捕捉code参数
      let params = vm.$helper.getUrlJson(window.location.href);
      let userCode = params.code || '6axFFF7_Gz4kSMFrv-UAjJru0ygCeDbk9KFNve6BK3I'

      if (userCode == null) {
        //  没有用户缓存,也没有返回用户code,跳转申请
        vm.needLogin = true;
      } else {
        //  有user_code返回码,则丢给服务器更新用户信息
        let userInfo = vm.$serverApi.getUserInfo(userCode);


      }
    },
    created: function () {
      let vm = this;

      //  接收UserInfo
      EventBus.$on("userInfo", user => {
        console.log("捕捉用户信息成功")
        //  缓存userInfo
        vm.$cookies.set("userInfo", user, "1d");
        vm.userInfo = user;
        // 有了userid,就获取对应的休假日
        vm.$serverApi.getRestDayByUser(user.userid);
      });

      //  接收当前用户休假日
      EventBus.$on("curUserRestDay", days => {
        console.log("捕捉当前用户休假日数据");
        vm.workerRestDays = days;
      })

      //  接收AppToken
      EventBus.$on("appToken", token => {
        console.log("捕捉appToken" + token);
        vm.appToken = token;
      });

      if (vm.needLogin === false) {
        let date = new Date();
        vm.today = date.Format("yyyy/MM/dd");
        vm.minDate = date.Format("yyyy-MM-dd");

        //    上个月1号
        date.setDate(-1);
        date.setMonth(date.getMonth() + 1);
        vm.maxDate = new Date(date).Format("yyyy-MM-dd");

        /**  服务器数据准备阶段  **/

        //  1.获取用户对应当月排休日期数
        // let restDays = vm.$serverApi.getRestDayByUser(
        //   vm.appToken,
        //   vm.userInfo.userid || null
        // );

        // vm.restDay = restDays.length || 2;
      }
    },
    methods: {
      getToday: function () {
        let vueDate = new Date();
        return (
          vueDate.getFullYear() +
          "/" +
          (vueDate.getMonth() + 1) +
          "/" +
          vueDate.getDate()
        );
      },
      handleDatePoper: function (e) {
        let vm = this;
        vm.showDatePicker = true;
      },
      //  转换日期格式
      handleDatePickerValue: function (date) {
        let dateDate = new Date(date);
        return dateDate.Format("yyyy-MM-dd");
      },
      //  返回不可选日期
      getDisableDate: function (date) {
        let vm = this;
        //    获取无法被选定的排休日期
        let dateDay = date.getDay();
        let dateLocalDate = date.toLocaleDateString();
        if (dateDay === 6 || dateDay === 0) {
          return true;
        } else if (
          vm.workerRestDays[0] !== undefined &&
          dateLocalDate === vm.workerRestDays[0].date
        ) {
          return true;
        } else if (
          vm.workerRestDays[1] !== undefined &&
          dateLocalDate === vm.workerRestDays[1].date
        ) {
          return true;
        } else {
          return false;
        }
      },
      //  日期选择
      datePickerChange: function (date, item) {
        let vm = this;
        let dateDate = new Date(date);
        let odate = vm.workerRestDays[item - 1].date;
        vm.workerRestDays[item - 1].date = date;
        vm.toast.msg = "选择日期" + item + "为" + date;
        //  提交当前日期
        let res = vm.$serverApi.attendSubmit(odate, date, vm.userInfo.userid);
        vm.toast.msg = res ? '提交休假成功' : '提交休假失败!!'
      },
      //  获取用户信息
      handleUserAuth: function () {
        //  跳转授权
        let vm = this;
        vm.$weixinApi.getUserAuth();
      },
      //  用户提交排班信息
      handleSubmit: function () {
        // @destroyed 已弃用
        let vm = this;
        let dateData = vm.workerRestDays;
        let restDays = [];
        let valid = true;
        //  验证输入项
        dateData.map(e => {
          // console.log(e);
          valid = valid && e.date !== null;
          restDays.push(e.date);
        });
        vm.valids = valid;

        if (valid) {
          console.log("排休日期验证通过..");
          vm.$serverApi.attendSubmit(restDays, vm.userInfo.userid);
        } else {
          vm.toast.msg = "请选择您宝贵的排休日期";
        }
      }
    }
  };

</script>

<style scoped>
  .demo-float-button {
    margin: 0 1em;
  }

  .mu-text-field-input {
    text-align: center !important;
  }

</style>
