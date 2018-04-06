/*
 * @Author: Zicokuo 
 * @Date: 2018-04-06 10:51:22 
 * @Last Modified by: Zicokuo
 * @Last Modified time: 2018-04-06 13:06:40
 */
<template>
  <div id='pageDuty'>
    <br>
    <muse-toast :msg="toast.msg"></muse-toast>
    <!-- 日期弹框 -->
    <mu-avatar slot="left"
               :src="defaultAvatar"
               :size="96" />
    <mu-card-title title="企业微信昵称"
                   subTitle="NickName"></mu-card-title>
    <mu-raised-button label="获取用户信息"
                      @click="handleGetUserInfo"></mu-raised-button>
    <mu-card-text>
      <mu-badge content="网络部"
                slot="after" />
      <mu-badge content="PHP网络工程师"
                slot="after" />
    </mu-card-text>
    <mu-card>
      <mu-card-title :title="'本月排休 '+restDay+' 天 '"
                     subTitle="Rest Days" />
      <div v-for="item in restDay"
           :key="item">
        <div>第{{item}}天</div>
        <mu-date-picker hintText="选择排休日期"
                        :firstDayOfWeek="0"
                        :minDate="minDate"
                        :maxDate="maxDate"
                        :shouldDisableDate="getDisableDate"
                        @change="datePickerChange($event,item)"
                        :value="workerRestDays[item-1].date" />
      </div>
      <mu-card-actions>
        <mu-raised-button label="确认排班"
                          secondary />
      </mu-card-actions>
    </mu-card>
  </div>
</template>

<script>
import museToast from "@/components/museToast.vue";
import eventBus from "@/libs/eventBus.js";
import defaultAvatar from "@/assets/avatar.png";
import serverApi from "@/libs/serverApi.js";
import weixinApi from "@/libs/weixinApi.js";
const vueDate = new Date();

export default {
  name: "pageDuty",
  data() {
    return {
      defaultAvatar: defaultAvatar,
      restDay: 2,
      showDatePicker: false,
      minDate: 0,
      maxDate: 31,
      today: null,
      appToken: null,
      workerRestDays: [{ date: null }, { date: null }],
      toast: { show: false, message: "", msg: "" }
    };
  },
  components: {
    "muse-toast": museToast
  },
  created() {
    let vm = this;

    eventBus.$on("appToken", function(data) {
      vm.appToken = data;
      //  获取员工已提交的排休日期记录
      vm.$http
        .get(serverApi.serverUrl + "api/get_restByWorker", {
          params: {
            appToken: vm.appToken,
            workerId: 123
          }
        })
        .then(function(response) {
          console.log(response);
          if (response.status === 200) {
            vm.workerRestDays = response.data;
          }
        });
    });

    let date = new Date();
    vm.today = date.Format("yyyy/MM/dd");
    vm.minDate = date.Format("yyyy-MM-dd");

    //    上个月1号
    date.setDate(-1);
    date.setMonth(date.getMonth() + 1);
    vm.maxDate = new Date(date).Format("yyyy-MM-dd");

    vm.$watch(
      function() {
        return this.workerRestDays[0].date;
      },
      function(v, ov) {
        console.log(ov);
        console.log(v);
      }
    );

    //  链接企业微信
    let token = weixinApi.getAccessToken(
      weixinApi.configs.corpId,
      weixinApi.configs.corpSecret
    );
    console.log(token);
  },
  beforeMount: function() {
    let vm = this;
  },

  methods: {
    getToday: function() {
      let vueDate = new Date();
      return (
        vueDate.getFullYear() +
        "/" +
        (vueDate.getMonth() + 1) +
        "/" +
        vueDate.getDate()
      );
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
    datePickerChange: function(date, item) {
      let vm = this;
      let dateDate = new Date(date);
      vm.workerRestDays[item - 1].date = date;
      vm.toast.msg = "选择日期" + item + "为" + date;
    },
    //  获取用户信息
    handleGetUserInfo: function() {
      let userInfo = weixinApi.getUserAuth(weixinApi.corpId, "");
      console.log(userInfo);
    }
  }
};
</script>

<style scoped>
.demo-float-button {
  margin: 0 1em;
}
.mu-text-field-input {
  text-align: center;
}
</style>
