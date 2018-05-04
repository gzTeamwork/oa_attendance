const state = {
  userWeekMeals: [],
  tomorrowDailyMeals: []
}
const getters = {

}

const actions = {

}

const mutations = {
  changUserWeekMeals: function (state, payload) {
    //  员工报餐数据改变
    state.userWeekMeals = payload
  },
  changeTomorrowDailyMeals: function (state, payload) {
    state.tomorrowDailyMeals = payload
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
