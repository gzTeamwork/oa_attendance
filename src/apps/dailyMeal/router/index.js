const pageDailyMeal = () =>
  import ('./../components/dailyMeal.vue')

const dailyMealRouter = {
  //  报餐
  path: 'dailyMeal',
  name: 'daily meal',
  component: {
    template: '<router-view/>'
  },
  meta: {
    title: '每日报餐'
  },
  children: [{
    path: '',
    name: 'daily meal page',
    component: pageDailyMeal,
    meta: {
      title: '每日报餐'
    }
  }]
}

export default dailyMealRouter
