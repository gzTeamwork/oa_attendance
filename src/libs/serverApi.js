import Axios from 'axios'
import VueCookie from 'vue-cookies'

// let surl = 'http://oa.emking.cn/inforward/api/'
let surl = 'http://admin.localhost.com/inforward/api/'

//  连接服务器 - 换取token
let wxWorkConnect = function (corpId, corpSecret) {
  Axios.get(surl + 'wx_work_connect', {
    params: {
      corp_id: corpId,
      corp_secret: corpSecret
    }
  }).then(res => {
    if (res.status === 200 && res.date.token !== undefined) {
      VueCookie.set('corpAccessToken', res.date.token)
    }
  })
}

//  用户登录交互 - 带cookie
let wxWorkLogin = function (appKey) {
  let userCookie = VueCookie.get('corpAccessToken')
  Axios.get(surl + 'wx_work_login', {
    params: {
      app_key: appKey,
      user_cookie: userCookie
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
const serverApi = {
  connect: wxWorkConnect,
  login: wxWorkLogin,
  serverUrl: surl,
  getToken: getToken
}
export default serverApi
