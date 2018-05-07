import axios from 'axios'
const configs = {
  corpId: 'wwdc02ce3b575253e3',
  corpSecret: 'ipWlHNDjalbGoLOqB2mCR4lNz2GqgiSmx03OJms8PDw',
  appSecrect: 'bLhYfEQsgz1zO5Y1kmoCQi_p96ZVCC65uRovbEX-qPM',
  agentId: '1000034'
}
//  直接获取access_token
let getAccessToken = function (corpid, corpsecret) {
  // https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid=ID&corpsecret=SECRECT

  let url = 'https://qyapi.weixin.qq.com/cgi-bin/gettoken'
  let result = window.Cookies.get('access_token')

  if (result !== null) {
    console.log('从缓存中提取access_token')
    return result
  }

  axios.post(url, {
    params: {
      corpid: corpid || configs.corpId,
      corpsecret: corpsecret || configs.corpSecret
    }
  }).then(res => {
    if (res.status === 200 && res.data.errcode === 0) {
      console.log('成功获取企业微信应用AccessToken')
      window.Cookies.set(
        'access_token',
        res.data.access_token,
        res.data.expires_in
      )
      result = res.data
    } else {
      console.log(res.data.errmsg)
    }
  })

  return result
}
//  网页授权员工身份 - 换取token
let getUserAuth = function (corpid, redirectUri, scope, state) {
  // https://open.weixin.qq.com/connect/oauth2/authorize?appid=CORPID&redirect_uri=REDIRECT_URI&response_type=code&scope=SCOPE&agentid=AGENTID&state=STATE#wechat_redirect
  let url = getUserAuthUrl(corpid, redirectUri, scope, state)
  console.log(url)

  window.location.href = url
}

let getUserAuthUrl = function (corpid, redirectUri, scope, state) {
  let url = 'https://open.weixin.qq.com/connect/oauth2/authorize'
  let params = {
    appid: corpid || configs.corpId,
    redirect_uri: redirectUri || window.location.origin + window.location.pathname,
    response_type: 'code',
    scope: scope || 'snsapi_privateinfo',
    agentid: configs.agentId,
    state: state || 'wxwork_login'
  }
  url = url + '?' + toQuery(params) + '#wechat_redirect'
  return url
}

//  通过code获取用户信息 - get user info
let getUserInfoByCode = function (userCode, accessToken) {
  //  https://qyapi.weixin.qq.com/cgi-bin/user/getuserinfo?access_token=ACCESS_TOKEN&code=CODE
  let result = null
  let url = 'https://qyapi.weixin.qq.com/cgi-bin/user/getuserinfo'
  axios
    .get(url, {
      params: {
        access_token: accessToken,
        code: userCode
      }
    })
    .then(res => {
      if (res.status === 200 && res.data.errcode === 0) {
        console.info('成功通过code换取userInfo')
        window.Cookies.set('user_ticket', res.data.user_ticket, res.data.expire_in)
        result = res.data
      } else {
        console.error(res.data.errmsg)
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
  getUserInfoByCode: getUserInfoByCode
}
export default weixinApi
