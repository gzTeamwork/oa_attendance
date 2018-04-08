import Axios from 'axios'
import VueCookie from 'vue-cookies'
import EventBus from '@/libs/eventBus.js'
const configs = {
  corpId: 'wwdc02ce3b575253e3',
  corpSecret: 'ipWlHNDjalbGoLOqB2mCR4lNz2GqgiSmx03OJms8PDw',
  appSecrect: 'bLhYfEQsgz1zO5Y1kmoCQi_p96ZVCC65uRovbEX-qPM',
  agentId: '1000034'
}

let surl = 'http://oa.emking.cn/inforward/api/'
// let surl = 'http://admin.localhost.com/inforward/api/'

//  连接服务器 - 换取token
let wxWorkConnect = function (corpId, corpSecret) {
  Axios.get(surl + 'wx_work_connect', {
    params: {
      corp_id: corpId || this.configs.corpId,
      corp_secret: corpSecret || this.configs.corpSecret
    }
  })
    .then(res => {
      if (res.status === 200 && res.data.token !== undefined) {
        console.log('连接服务器成功!!')
        return res.data.token
      } else {
        console.log('链接服务器失败')
      }
    })
    .catch(error => {
      console.log(error)
    })
}

//  用户登录交互 - 带token
let wxWorkLogin = function (token) {
  let accessToken = token || VueCookie.get('corpAccessToken')
  Axios.get(surl + 'wx_work_login', {
    params: {
      token: accessToken
    }
  }).then(res => {})
}

let getToken = function () {
  Axios.get(surl + 'get_access_token', { params: {} }).then(res => {
    if (res.status === 200) {
      return res.date
    } else {
      console.log('通讯出错..')
    }
  })
}

//  获取用户信息
let getUserInfo = function (userCode) {
  Axios.get(surl + 'get_user_info', {
    params: {
      user_code: userCode || null
    }
  }).then(res => {
    if (res.status === 200) {
      EventBus.$emit('userInfo', res.data)
      return res.data
    }
  })
}

//  提交用户排班数据
let setuserAttendance = function (restDays, userId) {
  let result = ''
  Axios.get(surl + 'set_user_attendance', {
    params: {
      rest_days: restDays,
      user_id: userId
    }
  })
    .then(res => {
      if (res.status === 200) {
        console.log('ok')
      }
    })
    .catch(error => {})
}
const serverApi = {
  configs: configs,
  connect: wxWorkConnect,
  getAppToken: wxWorkConnect,
  login: wxWorkLogin,
  serverUrl: surl,
  getToken: getToken,
  getUserInfo: getUserInfo,
  attendSubmit: setuserAttendance
}
export default serverApi
