const state = {
  //  最近员工报餐数据
  lateDailyMeals: []
}

const getters = {
  getTodayMeals: state => {
    let todayDate = window.Helper.timer().clone()
    return state.lateDailyMeals[todayDate.format('YYYY-MM-DD')] || null
  },
  getTomorrowMeals: state => {
    let tomorrowDate = window.Helper.timer().clone().add(1, 'day')
    return state.lateDailyMeals[tomorrowDate.format('YYYY-MM-DD')] || null
  }
}

const actions = {

}
const mutations = {
  //  最近员工报餐改变
  'changeLatelyMeals': function (state, payload) {
    state.lateDailyMeals = payload
  }

}
export default {
  state,
  getters,
  actions,
  mutations
}
