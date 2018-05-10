const state = {
  userWeekMeals: [],
  tomorrowDailyMeals: [],
  userDailyMeals: []
}
const getters = {
  getTomorrowDailyMeals: state => {
    return state.tomorrowDailyMeals
  }
}

const actions = {

}

const mutations = {
  changeUserWeekMeals: function (state, payload) {
    //  员工报餐数据改变
    state.userWeekMeals = payload
  },
  changeTomorrowDailyMeals: function (state, payload) {
    state.tomorrowDailyMeals = payload
  },
  changeUserDailyMeal: function (state, payload) {

  },
  changeUserDailyMealInWeek: function (state, payload) {
    console.log(payload)
    state.userDailyMeals = payload
    console.log('用户报餐数据发生改变..')
    state.userWeekMeals.map((event, index) => {
      if (payload[event.date]) {
        state.userWeekMeals[index].isCheck = payload[event.date].need_meal || false
      }
    })
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
