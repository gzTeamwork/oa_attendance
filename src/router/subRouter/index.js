const pageDailyMeal = () =>
  import ('@/pages/components/dailyMeal.vue')

const pageEventCalendar = () =>
  import ('@/pages/components/eventCalendar.vue')

const pageUserRest = () =>
  import ('@/pages/components/duty.vue')

const subRouter = [{
  //  报餐
  path: 'dailyMeal',
  name: 'daily meal',
  component: pageDailyMeal,
  meta: {
    title: '每日报餐'
  }
}, {
  //  报餐
  path: 'schedule',
  name: 'event calendar',
  component: pageEventCalendar,
  meta: {
    title: '排班日历'
  }
}, {

  //  调休
  path: 'userRest',
  name: 'user rest',
  component: pageUserRest,
  meta: {
    title: '员工调休'
  }
}]

export default subRouter
