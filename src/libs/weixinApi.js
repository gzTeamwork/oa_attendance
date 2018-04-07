/*
 * @Author: Zicokuo
 * @Date: 2018-04-07 00:45:24
 * @Last Modified by: Zicokuo
 * @Last Modified time: 2018-04-07 22:30:55
 */
import axios from 'axios'
const configs = {
  corpId: 'wwdc02ce3b575253e3',
  corpSecret: 'ipWlHNDjalbGoLOqB2mCR4lNz2GqgiSmx03OJms8PDw',
  appSecrect: 'bLhYfEQsgz1zO5Y1kmoCQi_p96ZVCC65uRovbEX-qPM',
  agentId: '1000034'
}
//  获取access_token
let getAccessToken = function (corpid, corpsecret) {
  // https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid=ID&corpsecret=SECRECT
  let url = 'https://qyapi.weixin.qq.com/cgi-bin/gettoken'
  let result = ''
  axios
    .get(url, { params: { corpid: corpid, corpsecret: corpsecret } })
    .then(response => {
      if (response.status === 200) {
        result = response.data
      }
    })
  return result
}
//  网页授权员工身份 - 换取token
let getUserAuth = function (corpid, redirectUri, scope, state) {
  // https://open.weixin.qq.com/connect/oauth2/authorize?appid=CORPID&redirect_uri=REDIRECT_URI&response_type=code&scope=SCOPE&agentid=AGENTID&state=STATE#wechat_redirect
  let result = ''
  let url = 'https://open.weixin.qq.com/connect/oauth2/authorize'
  let params = {
    appid: corpid,
    redirect_uri: redirectUri,
    scope: scope || 'snsapi_base',
    agentid: configs.agentId,
    state: state || 'wxwork_login'
  }
  url = url + '?' + toQuery(params) + '#wechat_redirect'
  axios.get(url).then(response => {
    if (response.status === 200) {
      result = response.date
    }
  })
  return result
}

//  获取用户信息 - get user info
let getUserInfo = function (userCode, accessToken) {
  //  https://qyapi.weixin.qq.com/cgi-bin/user/getuserinfo?access_token=ACCESS_TOKEN&code=CODE
  let result = null
  let url =
    'https://qyapi.weixin.qq.com/cgi-bin/user/getuserinfo?access_token=ACCESS_TOKEN&code=CODE'
  axios
    .get(url, {
      params: { access_token: accessToken, code: userCode }
    })
    .then(res => {
      if (res.status === 200) {
        result = res.date
      }
    })
  return result
}

//  序列化查询数组
let toQuery = function (datas) {
  return Object.keys(datas)
    .map(function (key) {
      // body...
      return encodeURIComponent(key) + '=' + encodeURIComponent(datas[key])
    })
    .join('&')
}

const weixinApi = {
  configs: configs,
  getAccessToken: getAccessToken,
  getUserAuth: getUserAuth,
  getUserInfo: getUserInfo
}
export default weixinApi
