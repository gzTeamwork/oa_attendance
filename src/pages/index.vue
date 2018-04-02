<template>
  <div id='index'>
    <mu-avatar slot="left" :src="defaultAvatar" :size="96" />
    <div>企业微信昵称</div>
    <mu-badge content="网络部" slot="after" />
    <mu-badge content="PHP网络工程师" slot="after" />
    </mu-flexbox>
    <vue-event-calendar :events="calenderEvents" @day-changed="handleDayChanged" @month-changed="handleMonthChanged" :style='{"margin-bottom":"2em"}'>
      <template slot-scope="props">
        <div v-for="(event, index) in props.showEvents" class="event-item">
          <!-- 这里拿到的是传入的单个event所有数据 -->
          <div v-for="(user , oindex) in event.onduty">
            {{user}}
          </div>
        </div>
      </template>
    </vue-event-calendar>
    <circle-menu type="middle" :number='4' animate="animated jello" mask='white' circle>
      <button type="button" slot="item_btn"></button>
      <a slot="item_1" class="fa fa-twitter fa-lg"></a>
      <a slot="item_2" class="fa fa-weixin fa-lg"></a>
      <a slot="item_3" class="fa fa-weibo fa-lg"></a>
      <a slot="item_4" class="fa fa-github fa-lg"></a>
    </circle-menu>
    <mu-paper>
      <mu-bottom-nav :value="bottomNav" @change="handleChange">
        <mu-bottom-nav-item value="recents" title="Recents" icon="restore" />
        <mu-bottom-nav-item value="favorites" title="Favorites" icon="favorite" />
        <mu-bottom-nav-item value="nearby" title="Nearby" icon="location_on" />
      </mu-bottom-nav>
    </mu-paper>
  </div>
</template>

<script>
  import defaultAvatar from "@/assets/avatar.png";
  //  引入圆形菜单
  import CircleMenu from 'vue-circle-menu'
  export default {
    name: 'index',
    data() {
      return {
        calenderEvents: calenderEvents,
        defaultAvatar: defaultAvatar,
      }
    },
    components: {
      CircleMenu
    },
    mounted() {
      // 今天
      let vueDate = new Date();
      let today = vueDate.getFullYear() + '/' + (vueDate.getMonth() + 1) + '/' + vueDate.getDate();
      console.log(today)
      this.$EventCalendar.toDate(today);
    },
    methods: {
      //  日期切换事件
      handleDayChanged: (dateEvent) => {
        console.log(dateEvent);
      },
      //  月份切换事件
      handleMonthChanged: (dateEvent) => {
        console.log(dateEvent)
      }
    }
  }

  const calenderEvents = [{
    date: '2018/04/02',
    title: '排班',
    onduty: ['郭梓豪', '钟春苑', '杨柳']
  }, {
    date: '2018/04/06',
    title: 'this is a title'
  }]

</script>

<style scoped>


</style>
