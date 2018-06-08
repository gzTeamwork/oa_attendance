const state = {
  //  最近员工报餐数据
  lateDailyMeals: [],
  //  员工最近报餐数据
  userMeals: []

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
  },
  //  获取员工最近报餐数据 - 补足7天
  getSevenMeals: state => {
    let result = {}
    //  今日日期 - 开始日期
    let todayDate = window.Helper.timer().clone()
    for (let i = 0; i < 8; i++) {
      let curDate = todayDate.add(i, 'day')
      let curDateFormat = curDate.format('YYYY-MM-DD')

      console.log(state.userMeals[curDateFormat])

      if (state.userMeals[curDateFormat]) {
        console.log('匹配到记录' + curDateFormat)
        state.userMeals[curDateFormat].day = window.Helper.timer(curDate).day()
        state.userMeals[curDateFormat].menu = {
          meat: '暂未填写',
          vegetable: '暂未填写',
          soup: '暂未填写'
        }
        state.userMeals[curDateFormat].isToday = curDate === todayDate
        state.userMeals[curDateFormat].isCheck = state.userMeals[curDateFormat].need_meal ? 1 : 0

        result[curDateFormat] = state.userMeals[curDateFormat]
      } else {
        result[curDateFormat] = {
          meal_date: curDateFormat,
          day: curDate.day(),
          need_meal: 0,
          menu: {
            meat: '暂未填写',
            vegetable: '暂未填写',
            soup: '暂未填写'
          },
          isToday: curDate === todayDate,
          isCheck: false
        }
        console.log('匹配不到记录')
      }
    }
    return result
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
