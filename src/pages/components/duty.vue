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
      <mu-list>
        <mu-list-item v-for="item in restDay" :key="item" :title="' 第 '+item+'天 '">
          <mu-date-picker hintText="选择排休日期" :firstDayOfWeek="0" :minDate="minDate" :maxDate="maxDate" helpText="" :shouldDisableDate="getDisableDate"
          />
        </mu-list-item>
      </mu-list>
      <mu-card-actions>
        <mu-flat-button label="确认排班" primary />
      </mu-card-actions>
    </mu-card>
  </div>
</template>

<script>
  import defaultAvatar from "@/assets/avatar.png";
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
      }
    },
    created() {
      let vm = this;
      vm.today = this.getToday();
      let date = new Date();
      vm.minDate = date.Format("yyyy-MM-dd");

      //    下个月1号
      date.setDate(-1);
      date.setMonth(date.getMonth() + 1);
      vm.maxDate = new Date(date).Format("yyyy-MM-dd");

    },
    methods: {
      getToday: function () {
        return vueDate.getFullYear() + '- ' + (vueDate.getMonth() + 1) + '- ' + vueDate.getDate();
      },
      handleDatePoper: function (e) {
        let vm = this;
        vm.showDatePicker = true;
      },
      getDisableDate: function (date) {
        //    获取无法被选定的排休日期
        return date.getDay() === 1 || date.getDay() === 6 || date.getDay() === 0
      }
    }
  }

</script>

<style scoped>
  .demo-float-button {
    margin: 0 1em;
  }

</style>
