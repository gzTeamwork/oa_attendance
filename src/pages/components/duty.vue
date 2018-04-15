/* * @Author: Zicokuo * @Date: 2018-04-06 10:51:22 * @Last Modified by: Zicokuo * @Last Modified time: 2018-04-07 22:25:43
*/
<template>
  <div id='pageDuty'>
    <br>
    <muse-toast :msg="toast.msg"></muse-toast>
    <div v-if="needLogin"
         style="height: 640px;display: flex;justify-content: center;align-items: center">
      <mu-flexbox orient="vertical"
                  justify="center"
                  align="center">
        <mu-flexbox-item>
          <p style="text-align:center">当前用户未授权登录</p>
          <p style="text-align:center">请点击下方按钮开始授权</p>
        </mu-flexbox-item>
        <mu-raised-button label="用户登录"
                          @click="handleUserAuth"></mu-raised-button>
      </mu-flexbox>
    </div>
    <div v-if="!needLogin">
      <!-- 日期弹框 -->
      <mu-avatar slot="left"
                 :src="userInfo.avatar || defaultAvatar"
                 :size="96" />
      <mu-card-title :title="userInfo.name || '企业微信昵称'"
                     :subTitle="userInfo.english_name ||''">
      </mu-card-title>
      <mu-badge :content="userInfo.position||'员工'"
                primary
                slot="after" />
      <mu-card-title :title="'本月排休 '+ workerRestDays.length +' 天 '"
                     subTitle="Rest Days" />
      <mu-paper v-for="(item,index) in workerRestDays"
                :key="index"
                style="margin-top:0.5em">

        <div>第{{index+1}}天
          <p v-if="isabledDay(item.date)">
          此休息日已经过期,无法修改
        </p>
        </div>
        <mu-date-picker hintText="选择排休日期"
                        :firstDayOfWeek="0"
                        :minDate="minDate"
                        :maxDate="maxDate"
                        :disabled="isabledDay(item.date)"
                        :shouldDisableDate="getDisableDate"
                        @change="datePickerChange($event,index)"
                        :value="item.date" />
        
      </mu-paper>
    </div>
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
      needLogin: true,
      userInfo: null,
      defaultAvatar: defaultAvatar,
      restDay: 2,
      showDatePicker: false,
      minDate: 0,
      maxDate: 31,
      today: null,
      appToken: null,
      workerRestDays: [
        {
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
  beforeCreate: function() {
    let vm = this;
  },
  created: function() {
    let vm = this;

    EventBus.$on("needAuth", data => {
      console.log("捕捉到needAuth" + data);
      vm.needLogin = data;
    });

    //  接收UserInfo
    EventBus.$on("userInfo", user => {
      console.log("捕捉用户信息成功");
      //  缓存userInfo
      vm.$cookies.set("userInfo", user, "1d");
      //  拿到用户信息之后，缓存用户信息

      vm.userInfo = user;
      vm.needLogin = false;
      // 有了userid,就获取对应的休假日
      vm.$serverApi.getRestDayByUser(user.userid);
    });

    //  接收当前用户休假日
    EventBus.$on("curUserRestDay", days => {
      console.log("捕捉当前用户休假日数据");
      // vm.workerRestDays = vm.$helper.getO2A(days);
      if (days.length < 2) {
        for (let i = days.length; i < 2; i++) {
          days.push({
            date: null
          });
        }
      }
      vm.workerRestDays = days;
    });

    // //  接收AppToken
    // EventBus.$on("appToken", token => {
    //   console.log("捕捉appToken" + token);
    //   vm.appToken = token;
    // });

    let date = new Date();
    vm.today = date.Format("yyyy/MM/dd");
    vm.minDate = date.Format("yyyy-MM-dd");

    //    上个月1号
    date.setDate(-1);
    date.setMonth(date.getMonth() + 1);
    vm.maxDate = new Date(date).Format("yyyy-MM-dd");
  },
  methods: {
    getToday: function() {
      let vueDate = new Date();
      return vueDate.Format("yyyy-MM-dd");
    },
    handleDatePoper: function(e) {
      let vm = this;
      vm.showDatePicker = true;
    },
    //  转换日期格式
    handleDatePickerValue: function(date) {
      let dateDate = new Date(date);
      return dateDate.Format("yyyy-MM-dd");
    },
    //  返回不可选日期
    getDisableDate: function(date) {
      let vm = this;
      let dateDate = new Date(date);
      //    获取无法被选定的排休日期
      let dateDay = dateDate.getDay();
      let dateLocalDate = dateDate.toLocaleDateString();
      if (dateDay === 0) {
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
    //  可选日期
    isabledDay: function(date) {
      let vm = this;
      if (date == null) {
        return false;
      }
      let dateDate = new Date(date);
      let todayDate = new Date();
      console.log(dateDate.getDate() - todayDate.getDate());
      return dateDate - todayDate < 0;
    },
    //  日期选择
    datePickerChange: function(date, item) {
      let vm = this;

      let dateDate = new Date(date);
      let validDay = vm.getDisableDate(date);
      if (validDay) {
        vm.toast.msg = date + "此日期为不可选";
        return false;
      }
      let odate = vm.workerRestDays[item].date;
      vm.workerRestDays[item].date = date;
      vm.toast.msg = "选择日期" + item + "为" + date;
      //  提交当前日期
      let res = vm.$serverApi.attendSubmit(
        odate,
        date,
        vm.userInfo.userid,
        vm.userInfo.name
      );
      console.log(res);
    },
    //  获取用户信息
    handleUserAuth: function() {
      //  跳转授权
      let vm = this;
      vm.$weixinApi.getUserAuth();
    },
    //  用户提交排班信息
    handleSubmit: function() {
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

<style>
.demo-float-button {
  margin: 0 1em;
}

.mu-text-field-input {
  text-align: center !important;
}

input.mu-text-field-input:disabled::after {
  content: "此休息日已经过期,无法修改";
}
</style>
