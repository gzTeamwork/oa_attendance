<template>
  <div id='vueEventsCalendar'>
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
  </div>
</template>

<script>
  export default {
    name: 'vueEventsCalendar'

  }

</script>

<style scoped>


</style>
