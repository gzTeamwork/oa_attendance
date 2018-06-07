import vueAxios from '@/apps/public/library/serverAxios.js'

//  获取员工近日报餐数据
let getUserWeekMeal = function (userid, todayDate) {
  let datas = []
  //  产生数据
  todayDate = new Date()

  let weekDate = new Date()

  let meats = ['蜜汁叉烧', '烧排骨', '酱油鸡', '蒸鱼']
  let vegetables = ['菠菜', '生菜', '娃娃菜']
  let soups = ['鸡汤', '鸭汤', '鱼汤', '骨头汤', '清保凉']

  weekDate.setDate(weekDate.getDate() - 2)
  for (let i = 0; i < 7; i++) {
    weekDate.setDate(weekDate.getDate() + 1)
    let event = {
      date: weekDate.Format('yyyy-MM-dd'),
      day: weekDate.getDay(),
      menu: {
        meat: meats[Math.round(Math.random() * meats.length) - 1] || meats[0],
        vegetable: vegetables[Math.round(Math.random() * vegetables.length) - 1] ||
          vegetables[0],
        soup: soups[Math.round(Math.random() * soups.length) - 1] || soups[0]
      },
      isCheck: false,
      isToday: todayDate.Format('yyyy-MM-dd') === weekDate.Format('yyyy-MM-dd')
    }
    datas.push(event)
  }

  // window.Store.commit('changeUserWeekMeals', datas)
  vueAxios
    .get('get_user_daily_meal_in_week', {
      params: {
        user_id: userid || null,
        begin_date: todayDate || new Date()
      }
    })
    .then(res => {
      window.Store.commit('changeUserDailyMealInWeek', res.data)
    })

  return datas
}

//  提交员工报餐数据
let attendUserDailyMeal = function (userid, mealEvent) {
  vueAxios
    .get('attend_user_daily_meal', {
      params: {
        user_id: userid || null,
        meal_check: mealEvent.isCheck ? 1 : 0,
        meal_date: mealEvent.date || null
      }
    })
    .then(res => {
      //  指派数据UserMeals
      window.Store.commit('changeUserDailyMeal', res.data)
    })
}

//  获取明天员工报餐统计
let getTomorrowDailyMeals = function () {
  vueAxios.get('get_tomorrow_daily_meals').then(res => {
    window.Store.commit('changeTomorrowDailyMeals', res.data)
  })
}

//  全新接口 -- 20180605 by zicok

/**
 * getLastMealsTotal
 * 获取最近报餐记录 - 默认获取最近2天
 * meals_api/get_lately_meals
 */

let getLateMealsTotal = function (days = 2) {
  vueAxios.get('mealsapi/total_recent_meals', {
    params: {
      days: days
    }
  }).then(res => {
    window.Store.commit('changeLatelyMeals', res.data)
  })
}

let getUserSevenDayMeals = function (userId, todayDate) {
  vueAxios.get('mealsapi/user_recent_meals', {
    params: {
      user_id: userId || null,
      begin_date: todayDate || new Date()
    }
  }).then(res => {
    window.Store.commit('changeUserMeals', res.data)
  })

}
/**
 * 服务器数据交互接口类
 */
const serverApi = {
  //  获取员工近日报餐数据
  getUserWeekMeal: getUserWeekMeal,
  //  批量提交员工报餐数据
  // attendUserMeal: attendUserMeal,
  //  获取明天报餐数据
  getTomorrowDailyMeals: getTomorrowDailyMeals,
  // 提交员工单日报餐
  attendUserDailyMeal: attendUserDailyMeal,

  //  获取最近报餐统计数据
  getLateMealsTotal: getLateMealsTotal,
  //  获取最近7日报餐统计
  getUserSevenDayMeals: getUserSevenDayMeals

}
export default serverApi
