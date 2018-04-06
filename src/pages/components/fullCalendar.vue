<template>
  <div id='fullCalendar'>
    <vuefullCalendar :events="fcEvents" locale="en">
    </vuefullCalendar>
  </div>
</template>

<script>
<<<<<<< HEAD
import vuefullCalendar from "vue-fullcalendar";
export default {
  name: "fullCalendar",
  data() {
    return {
      fcEvents: fcEvents
    };
  },
  components: {
    vuefullCalendar
  }
};
const fcEvents = [
  {
    title: "event1",
    start: "2018-04-01",
    cssClass: "family",
    YOUR_DATA: {}
  },
  {
    title: "event2",
    start: "2018-04-12",
    end: "2018-07-03",
    cssClass: ["family", "career"],
    YOUR_DATA: {}
  }
];
=======
  import vuefullCalendar from 'vue-fullcalendar';
  export default {
    name: 'fullCalendar',
    data() {
      return {
        fcEvents: fcEvents
      }
    },
    components: {
      vuefullCalendar
    }
  }
  const fcEvents = [{
      title: 'event1',
      start: '2018-04-01',
      cssClass: 'family',
      YOUR_DATA: {}
    },
    {
      title: 'event2',
      start: '2018-04-12',
      end: '2018-07-03',
      cssClass: ['family', 'career'],
      YOUR_DATA: {}
    }
  ]

>>>>>>> d47e512243f68c3f25188df21dcee9bbe1127d97
</script>

<style scoped>
  .comp-full-calendar {
    padding: 20px 0;
  }
</style>
