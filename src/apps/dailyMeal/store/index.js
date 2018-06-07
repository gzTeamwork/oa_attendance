const state = {
  //  最近员工报餐数据
  lateDailyMeals: []
}

const getters = {
  //  获取今天报餐统计
  getTodayMeals: state => {
    let todayDate = window.Helper.timer().clone()
    return state.lateDailyMeals[todayDate.format('YYYY-MM-DD')] || null
  },
  //  获取明天报餐统计
  getTomorrowMeals: state => {
    let tomorrowDate = window.Helper.timer().clone().add(1, 'day')
    return state.lateDailyMeals[tomorrowDate.format('YYYY-MM-DD')] || null
  }
}

const actions = {

}
const mutations = {
  'changeLatelyMeals': function (state, payload) {
    //  最近员工报餐改变  
    state.lateDailyMeals = payload
  },
  'changeUserMeals': function (state, payload) {
    //  7天内当前员工报餐
    state.userMeals = payload
  }

}
export default {
  state,
  getters,
  actions,
  mutations
}
