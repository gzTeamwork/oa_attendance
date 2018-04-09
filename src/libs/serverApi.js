import Axios from 'axios';
import VueCookie from 'vue-cookies';
import EventBus from '@/libs/eventBus.js';

// 接口配置
const configs = {
  corpId: 'wwdc02ce3b575253e3',
  corpSecret: 'ipWlHNDjalbGoLOqB2mCR4lNz2GqgiSmx03OJms8PDw',
  appSecrect: 'bLhYfEQsgz1zO5Y1kmoCQi_p96ZVCC65uRovbEX-qPM',
  agentId: '1000034'
}

// 接口地址

// let surl = "http://oa.emking.cn/inforward/api/";
let surl = 'http://admin.localhost.com/inforward/api/';

//  连接服务器 - 换取token
let getAppToken = function (corpId, corpSecret) {
  Axios.get(surl + 'wx_work_connect', {
    params: {
      corp_id: corpId || configs.corpId,
      corp_secret: corpSecret || configs.corpSecret
    }
  }).then(res => {
    if (res.status == 200 && res.data.token !== undefined) {
      console.log('连接服务器成功!!')
      EventBus.$emit('appToken', res.data.token)
      return res.data.token
    } else {
      console.log('链接服务器失败')
    }
  })
};

//  用户登录交互 - 带token
let wxWorkLogin = function (token) {
  let accessToken = token || VueCookie.get('corpAccessToken')
  Axios.get(surl + 'wx_work_login', {
    params: {
      token: accessToken
    }
  }).then(res => {})
};

let getToken = function () {
  Axios.get(surl + 'get_access_token', { params: {} }).then(res => {
    if (res.status === 200) {
      return res.data
    } else {
      console.log('通讯出错..')
    }
  })
};
//  获取当月休假记录
let getRestEventsByMonth = function (today) {
  Axios.get(surl + 'get_restevents_by_month', {
    params: {
      date: today
    }
  }).then(res => {
    if (res.status === 200) {
      console.log('通过服务器获取到当月休假时间')
      return res.data
    } else {
      console.error('获取休假事件失败')
    }
  })
};

//  获取用户信息
let getUserInfo = function (userCode) {
  let result = null
  Axios.get(surl + 'get_user_info', {
    params: {
      user_code: userCode || null
    }
  }).then(res => {
    if (res.status == 200) {
      console.log('成功获取用户信息')
      EventBus.$emit('userInfo', res.data)
      return (result = res.data)
    } else {
      console.log(res.errmsg)
    }
  })
};

//  获取用户的休假日
let getRestDayByUser = function (userid) {
  let result = '';
  Axios.get(surl + 'get_rest_day_by_user', {
    params: {
      user_id: userid || null
    }
  }).then(res => {
    if (res.status === 200) {
      console.log('成功获取用户的休假日')
      EventBus.$emit('curUserRestDay', res.data)
      return res.data
    } else {
      console.log(res.errmsg)
    }
  })
};

//  提交用户排班数据
let setuserAttendance = function (oldRestDay, restDay, userId) {
  let result = '';
  Axios.get(surl + 'set_user_attendance', {
    params: {
      old_day: oldRestDay || null,
      rest_day: restDay,
      user_id: userId
    }
  })
    .then(res => {
      if (res.status === 200) {
        console.log('当前用户提交休假日期成功!')
          
        return true
      } else {
        console.log(res.errmsg)
        return false
      }
    })
    .catch(error => {})
};
const serverApi = {
  configs: configs,
  connect: getAppToken,
  getAppToken: getAppToken,
  login: wxWorkLogin,
  serverUrl: surl,
  getToken: getToken,
  getUserInfo: getUserInfo,
  attendSubmit: setuserAttendance,
  getRestEventsByMonth: getRestEventsByMonth,
  getRestDayByUser: getRestDayByUser
}
export default serverApi
