<template>
  <div id='pageDuty'>
    <br>
    <!-- 日期弹框 -->
    <mu-avatar slot="left" :src="defaultAvatar" :size="96" />
    <mu-card-title title="企业微信昵称" subTitle="NickName"></mu-card-title>
    <mu-card-text>
      <mu-badge content="网络部" slot="after" />
      <mu-badge content="PHP网络工程师" slot="after" />
    </mu-card-text>
    <mu-card>
      <mu-card-title :title="'本月排休 '+restDay+' 天 '" subTitle="Rest Days" />
      <div v-for="item in restDay" :key="item">
        <div>第{{item}}天</div>
        <mu-date-picker hintText="选择排休日期" :firstDayOfWeek="0" :minDate="minDate" :maxDate="maxDate" helpText="" :shouldDisableDate="getDisableDate" @change="datePickerChange"
        />
      </div>
      <mu-card-actions>
        <mu-flat-button label="确认排班" primary />
      </mu-card-actions>
    </mu-card>
  </div>
</template>

<script>
  import eventBus from '@/libs/eventBus.js';
  import defaultAvatar from "@/assets/avatar.png";
  import serverApi from "@/libs/serverApi.js";
  const vueDate = new Date();

  export default {
    name: 'pageDuty',
    data() {
      return {
        defaultAvatar: defaultAvatar,
        restDay: 2,
        showDatePicker: false,
        minDate: 0,
        maxDate: 31,
        today: null,
        appToken: null,
        workerRestDays: [],
        toast:{show:false,message:''}
      }
    },
    created: function () {
      let vm = this;

      eventBus.$on('appToken', function (data) {
        vm.appToken = data;
        //  获取员工已提交的排休日期记录
        vm.$http.get(serverApi.serverUrl + "api/get_restByWorker", {
          params: {
            appToken: vm.appToken,
            workerId: 123
          }
        }).then(function (response) {
          console.log(response);
          if (response.status === 200) {
            vm.workerRestDays = response.data;
          }
        })
      });

      vm.today = this.getToday();
      let date = new Date();
      vm.minDate = date.Format("yyyy-MM-dd");

      //    下个月1号
      date.setDate(-1);
      date.setMonth(date.getMonth() + 1);
      vm.maxDate = new Date(date).Format("yyyy-MM-dd");
    },
    beforeMount: function () {
      let vm = this;

    },
    methods: {
      getToday: function () {
        return vueDate.getFullYear() + '-' + (vueDate.getMonth() + 1) + '-' + vueDate.getDate();
      },
      handleDatePoper: function (e) {
        let vm = this;
        vm.showDatePicker = true;
      },
      //  返回不可选日期
      getDisableDate: function (date) {
        let vm = this;
        //    获取无法被选定的排休日期
        let dateDay = date.getDay();
        let dateLocalDate = date.toLocaleDateString();
        if (dateDay === 6 || dateDay === 0) {
          return true;
        } else if (vm.workerRestDays[0] !== undefined && dateLocalDate === vm.workerRestDays[0].date) {
          return true;
        } else if (vm.workerRestDays[1] !== undefined && dateLocalDate === vm.workerRestDays[1].date) {
          return true;
        } else {
          return false;
        }
      },
      //  日期选择
      datePickerChange:function(date){
        let vm = this;
        let dateDate = new Date(date);        
        if (vm.workerRestDays[0] !== undefined && dateDate.toLocaleDateString() === vm.workerRestDays[0].date){
        }else if(vm.workerRestDays[1] !== undefined && dateDate.toLocaleDateString() === vm.workerRestDays[1].date){
        }else{
          vm.workerRestDays.push({date:dateDate.toLocaleDateString()})
        }
      }
    }
  }

</script>

<style scoped>
  .demo-float-button {
    margin: 0 1em;
  }

</style>
