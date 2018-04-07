/*
 * @Author: Zicokuo
 * @Date: 2018-04-07 00:45:24
 * @Last Modified by: Zicokuo
 * @Last Modified time: 2018-04-07 01:46:42
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
let getUserAuth = function (corpid, redirectUri, scope) {
  // https://open.weixin.qq.com/connect/oauth2/authorize?appid=CORPID&redirect_uri=REDIRECT_URI&response_type=code&scope=SCOPE&agentid=AGENTID&state=STATE#wechat_redirect
  let url = 'https://open.weixin.qq.com/connect/oauth2/authorize'
  let result = ''
  let params = {
    corpid: corpid,
    redirect_uri: redirectUri,
    scope: scope || 'snsapi_base'
  }
  axios.get(url, { params: params }).then(response => {
    if (response.status === 200) {
      result = response.date
    }
  })
  return result
}

const weixinApi = {
  configs: configs,
  getAccessToken: getAccessToken,
  getUserAuth: getUserAuth
}
export default weixinApi
