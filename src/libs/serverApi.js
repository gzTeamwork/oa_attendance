import Vue from 'vue'

import Axios from 'axios'
// import Axios from './vueAxios.js'

// import apiConfig from '@/configs/api.Config.js'
// 接口配置
// const configs = apiConfig

const configs = () =>
  import ('@/configs/api.Config.js')

// 获取当前使用环境
const devMode = process.env.NODE_ENV === 'development'
console.log('本次访问模式为' + (devMode ? '开发模式' : '生产模式'))

// 接口地址 - 构建开发与生产api接口
let remoteRoot = 'http://oa.emking.cn/inforward/api/'
let localRoot = 'http://admin.localhost.com/inforward/api/'
let apiRoot = devMode ? localRoot : remoteRoot
// apiRoot = remoteRoot

//  构造axios实例
let vueAxios = Axios.create({
  baseURL: apiRoot
})

// 添加请求拦截器
vueAxios.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    window.Nprogress.start()
    return config
  },
  function (error) {
    // 对请求错误做些什么
    devMode && console.log(error)
    window.Nprogress.done()
    return Promise.reject(error)
  }
)

// 添加响应拦截器
vueAxios.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    window.Nprogress.done()
    //  响应状态判断
    if (response.status !== 200) {}
    return response
  },
  function (error) {
    // 对响应错误做点什么
    devMode && console.log(error)
    window.Nprogress.done()

    return Promise.reject(error)
  }
)

/** ** 接口方法 ** **/

let buildParams = function (params) {
  return (params.agent_id = configs.agentId)
}

//  连接服务器 - 换取appToken
let getAppToken = function (corpId, corpSecret) {
  vueAxios
    .get(apiRoot + 'wx_work_connect', {
      params: {
        corp_id: corpId || configs.corpId,
        corp_secret: corpSecret || configs.corpSecret
      }
    })
    .then(res => {
      if (res.status === 200 && res.data.token !== undefined) {
        console.log('连接服务器成功!!')
        Vue.window.EventBus.$emit('appToken', res.data.token)
        return res.data.token
      } else {
        console.log('链接服务器失败')
      }
    })
}

//  员工登录交互 - 带token
let wxWorkLogin = function (token) {
  let accessToken = token || window.Cookies.get('corpAccessToken')
  Axios.get(apiRoot + 'wx_work_login', {
    params: {
      token: accessToken
    }
  }).then(res => {})
}

/**
 * @deprecated 本函数已废弃,转为后台获取
 */
let getToken = function () {
  Axios.get(apiRoot + 'get_access_token', {
    params: {}
  }).then(res => {
    if (res.status === 200) {
      return res.data
    } else {
      console.log('通讯出错..')
    }
  })
}
//  获取当月排班数据
let getCurMonthEvents = function (today) {
  vueAxios
    .get('get_month_events', {
      params: {
        date: new Date(today).Format('yyyy-MM-dd')
      }
    })
    .then(res => {
      if (res.status === 200) {
        // window.EventBus.$emit('curMonthEvents', res.data)
        window.Store.commit('changeMonthEvents', res.data)
        console.log(
          '通过服务器获取' + new Date(today).Format('M') + '月排班数据'
        )
        return res.data
      } else {
        console.error('获取' + new Date(today).Format('M') + '月排班数据失败')
      }
    })
}
//  获取当月休假记录
let getRestEventsByMonth = function (today) {
  Axios.get(apiRoot + 'get_restevents_by_month', {
    params: {
      date: today
    }
  }).then(res => {
    if (res.status === 200) {
      window.EventBus.$emit('curMonthRests', res.data)
      console.log('通过服务器获取到当月休假时间')
      return res.data
    } else {
      console.error('获取休假事件失败')
    }
  })
}

//  获取员工信息
let getUserInfoByCode = function (userCode) {
  console.log('与服务器通讯获取用code换取用户信息')

  vueAxios
    .get('get_user_info_by_code', {
      params: {
        user_code: userCode
      }
    })
    .then(res => {
      if (res.status === 200) {
        console.log('成功获取员工信息')
        console.log(res.data)
        // window.Store.commit('changeUserTicket', res.data.user_ticket)
        window.Store.commit('changeUserInfo', res.data)
        return res.data
      } else {
        console.log(res.errmsg)
        return false
      }
    })
}

//  获取员工信息 - 员工票据
let getUserInfoByTicket = function (userTicket) {
  Axios.get(apiRoot + 'get_user_info_by_ticket', {
    params: {
      user_ticket: userTicket || null
    }
  }).then(res => {
    if (res.status === 200) {
      console.log('成功获取员工票据')
      // window.EventBus.$emit('userInfo', res.data)
      window.Store.commit('changeUserInfo', res.data)
      return res.data
    }
  })
}

let getUserInfoById = function (userId) {
  vueAxios
    .get('get_user_info_by_id', {
      params: {
        user_id: userId || null
      }
    })
    .then(res => {
      if (res.status === 200) {
        console.log('成功获取员工信息')
        // Store.commit('changeUserInfo', res.data)
        window.Store.commit('changeUserInfo', res.data[0])
        return res.data
      }
    })
}
let remUserRestDay = function (cdate, userId) {
  vueAxios
    .get('rem_rest_day_by_user', {
      params: {
        rest_day: cdate,
        user_id: userId || null
      }
    })
    .then(res => {
      if (res.status === 200) {
        console.log('成功移除员工休息日期' + cdate)
      }
    })
}
//  获取员工的休假日
let getRestDayByUser = function (userid) {
  vueAxios
    .get('get_rest_day_by_user', {
      params: {
        user_id: userid || null
      }
    })
    .then(res => {
      if (res.status === 200) {
        console.log('成功获取员工的休假日')
        window.Store.commit('changeMonthEvents', res.data)

        // window.EventBus.$emit('curUserRestDay', res.data)
      } else {
        console.log(res.errmsg)
      }
    })
}

//  获取全部员工
let getAllUser = function () {
  vueAxios
    .get('get_all_user', {
      params: {}
    })
    .then(res => {
      if (res.status === 200) {
        console.info('获取所有员工信息成功( • ̀ω•́ )✧')
        window.EventBus.$emit('getAllUser', res.data)
        return res.data
      } else {
        console.log(res.errmsg)
      }
    })
}

//  提交员工排班数据
let setuserAttendance = function (oldRestDay, restDay, userId, userName) {
  vueAxios
    .get('set_user_attendance', {
      params: {
        old_day: oldRestDay || null,
        rest_day: restDay,
        user_id: userId,
        user_name: userName,
        status: 'rest'
      }
    })
    .then(res => {
      if (res.status === 200) {
        console.log('当前员工提交休假日期成功!')
        window.EventBus.$emit('toastMsg', '成功提交员工休息日')
        return true
      } else {
        console.log(res.errmsg)
        return false
      }
    })
}
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

  window.Store.commit('changeUserWeekMeals', datas)
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

/**
 * 服务器数据交互接口类
 */
const serverApi = {
  //  获取api根地址
  getApiRoot: apiRoot,
  //  建立数据接口基本数据
  buildParams: buildParams,
  //  serverApi配置项
  configs: configs,
  //  链接后台服务器
  connect: getAppToken,
  //  同名方法
  getAppToken: getAppToken,

  login: wxWorkLogin,

  serverUrl: apiRoot,

  getToken: getToken,
  //  获取所有员工信息
  getAllUser: getAllUser,
  //  提交员工排班数据
  attendSubmit: setuserAttendance,
  //  获取当月休假记录
  getRestEventsByMonth: getRestEventsByMonth,
  //  获取当月排班数据
  getCurMonthEvents: getCurMonthEvents,
  // 通过用户code获取用户信息
  getUserInfoByCode: getUserInfoByCode,
  //  获取员工的休假纪录
  getRestDayByUser: getRestDayByUser,
  //  取消员工休息日期
  userCancelRestDay: remUserRestDay,
  //  通过员工user_id获取员工信息,调试开发专用
  getUserInfoById: getUserInfoById,
  //  通过员工票据获取员工信息
  getUserInfoByTicket: getUserInfoByTicket,
  //  获取员工近日报餐数据
  getUserWeekMeal: getUserWeekMeal,
  //  批量提交员工报餐数据
  // attendUserMeal: attendUserMeal,
  //  获取明天报餐数据
  getTomorrowDailyMeals: getTomorrowDailyMeals,
  // 提交员工单日报餐
  attendUserDailyMeal: attendUserDailyMeal
  // //  获取被扫描物品信息
  // getItemInfoByScan: getItemInfoByScan,
  // //  获取物品二维码列表
  // getScanItems: getScanItems
}
export default serverApi
