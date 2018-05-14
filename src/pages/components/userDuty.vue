<template>
  <div id='pageDuty'>
    <br>
    <div v-if="!needLogin">
      <!-- 员工信息 -->
      <div>
        <mu-avatar slot="left" :src="userInfo.avatar || defaultAvatar" :size="96" />
        <mu-card-title :title="userInfo.name || '企业微信昵称'" :subTitle="userInfo.english_name ||''">
        </mu-card-title>
        <mu-badge :content="userInfo.position||'员工'" primary slot="after" />
        <mu-card-title :title="'本月可排休 '+ workerRestDays.length +' 天 '" subTitle="Rest Days" />
      </div>
      <!-- 调休列表 -->
      <mu-list>
        <mu-list-item v-for="(item,index) in workerRestDays" :key="index">
          <mu-paper style="padding:1em;">
            <div>
               第 <mu-avatar backgroundColor="blue300" >{{index+1}}</mu-avatar> 天
            </div>
            <div>               
                <!-- 调休日期选择 -->
                日期:
                <mu-date-picker hintText="选择排休日期" :firstDayOfWeek="0" :minDate="minDate" :maxDate="maxDate" :disabled="isabledDay(item.date)"
                :shouldDisableDate="getDisableDate" @change="datePickerChange($event,index)" :value="item.dateObject" />
                
            </div>
             <mu-chip v-if="isabledDay(item.date)">
                   <mu-avatar backgroundColor="red300" >否</mu-avatar>
                  此休息日已经过期,无法修改
                </mu-chip>
                <mu-chip v-else @delete="handleCancelRes($event,index)" showDelete>
                  <mu-avatar backgroundColor="green300" >可</mu-avatar>
                  点击选择调休日期
                </mu-chip>
                  <!-- <mu-float-button icon="close" mini :disabled="isabledDay(item.date)" @click="handleCancelRes($event,index)" secondary >清除</mu-float-button> -->
               
          </mu-paper>
        </mu-list-item>
      </mu-list>
    </div>
  </div>
</template>

<script>
import defaultAvatar from "@/assets/avatar.png";
const todayDate = new Date();

export default {
  name: "pageDuty",
  data() {
    return {
      needLogin: true,
      userInfo: null,
      defaultAvatar: defaultAvatar,
      showDatePicker: false,
      minDate: 0,
      maxDate: 31,
      workerRestDays: [
        {
          date: null
        },
        {
          date: null
        }
      ]
    };
  },
  created: function() {
    let vm = this;

    //  获取用户信息
    vm.userInfo = vm.$store.getters.getUserInfo;
    //  获取登录状态
    vm.needLogin = vm.$store.getters.needLogin;
    //  获取用户调休日期
    vm.workerRestDays = vm.$store.getters.getUserRestDay;

    let date = new Date();
    vm.today = date.Format("yyyy/MM/dd");
    vm.minDate = date.Format("yyyy-MM-dd");

    //    上个月1号
    // date.setDate(-1);
    // date.setMonth(date.getMonth() + 1);
    date.setDate(+40);
    vm.maxDate = new Date(date).Format("yyyy-MM-dd");
  },
  watch: {
    userInfo: function(v, ov) {
      console.log(
        "监听到用户信息发生变化,即将根据用户信息获取用户调休日期数据..."
      );
      if (v.userid) {
        // this.userInfo = v;
        console.log("监听当前用户为" + v.username);
        this.$serverApi.getRestDayByUser(v.userid);
      } else {
        console.error("监听当前用户数据为空,取消更新值操作");
        return false;
      }
    },
    handlerUserRestDays: function(v, ov) {
      console.log("监听到当前用户调休数据变化");
      //不满可调休日数的,补满显示
      if (v.length < 2) {
        for (let i = v.length; i < 2; i++) {
          v.push({
            date: null
          });
        }
      }
      this.workerRestDays = v;
    },
    workerRestDays: {
      handler(val, oldVal) {
        console.log("监听到当前用户调休数据变化"); //但是这两个值打印出来却都是一样的
      },
      deep: true
    }
  },
  computed: {
    handlerUserRestDays() {
      return window.Store.state.userDuty.curMonthEvents;
    }
  },
  methods: {
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
      // console.log(dateDate.getDate() - todayDate.getDate());
      return dateDate - todayDate < 0;
    },
    //  日期选择 - 向服务器提交日期
    datePickerChange: function(date, item) {
      console.log("用户选择调休日期" + date);
      let vm = this;

      let dateDate = new Date(date);
      let validDay = vm.getDisableDate(date);
      if (validDay) {
        vm.$store.commit("changeLog", date + "此日期为不可选");
        return false;
      }
      let odate = vm.workerRestDays[item].dateObject;
      vm.workerRestDays[item].date = date;
      vm.$store.commit("changeLog", "选择日期" + item + "为" + date);
      //  提交当前日期
      let res = vm.$serverApi.attendSubmit(
        odate,
        date,
        vm.userInfo.userid,
        vm.userInfo.name
      );
    },
    //  用户取消日期
    handleCancelRes(event, index) {
      console.log("当前用户取消调休日期" + event);
      let vm = this;
      if (vm.workerRestDays[index].date == null) {
        window.Store.commit("changeLog", "操作错误");
        return false;
      }
      window.Store.commit(
        "changeLog",
        "清除调休日期:" + vm.workerRestDays[index].date
      );
      let workerRestDays = vm.workerRestDays;
      // console.log(workerRestDays);

      let cdate = vm.workerRestDays[index].date;
      // console.log("用户取消休假日期");

      let res = vm.$serverApi.userCancelRestDay(
        new Date(cdate).Format("yyyy-MM-dd"),
        vm.userInfo.userid
      );
      workerRestDays[index] = { date: null };
      // console.log(workerRestDays);

      window.Store.commit("changeMonthEvents", workerRestDays);
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
.mu-text-field-input:disabled {
  text-decoration: line-through;
}
</style>
