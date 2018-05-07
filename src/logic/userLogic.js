// 用户逻辑层,主要负责用户逻辑流程
import ServerApi from '@/libs/serverApi.js'
import WeixinApi from '@/libs/weixinApi.js'

/**
 * 检查用户登录
 */
// let checkUserAuth = function (toRouter = null) {
//   //  首先判断缓存是否可用
//   let userTicket = window.Cookies.get('userTicket') || null
//   if (userTicket === null) {
//     // 没有ticket,只能进行跳转授权登录了
//     WeixinApi.getUserAuth()
//   } else {
//     if (window.Store.)
//   }

//   if (window.Store.getters.needLogin) {
//     return false
//   } else {
//     let userInfo = JSON.parse(window.Cookies.get('loginUser')) || null
//     if (userInfo === null) {
//       //  需要跳转到授权页面进行登录
//       return false
//     } else {
//       //  还有缓存的则提交到数据仓库
//       window.Store.commit('changeUserInfo', userInfo)
//       return true
//     }
//   }
// }

//  用户登录
let userAuth = function (toRouter) {
  let path = toRouter.path || null
  let state = toRouter.params.state || null

  switch (state) {
    case 'wxwork_login':
      //  用户code登录
      let code = toRouter.params.code || console.error('用户授权回调获取code为' + toRouter.params.code)
      ServerApi.getUserInfoByCode(code)
      return true
      break

    default:
      let userInfo = window.Store.getters.getUserInfo || null

      if (path === '/userAuth') {
        //  当用户访问登录页面时候
        if (userInfo !== null) {
          //  有用户缓存的时候,则进行跳转
          window.location.href = '/'
        }
        return true
      } else {
        return (userInfo !== null)
      }
  }
}

let getUserInfoById = function (id) {
  ServerApi.getUserInfoById(id)
}

let userAuthed = function (userInfo) {
  if (userInfo === null) {
    console.error('用户登录回调处理参数为空')
  } else {
    window.Cookies.set('loginUser', JSON.stringify(userInfo), 7200)
    window.Store.commit('changeUserInfo', userInfo)
  }
}

export default {
  //  用户登录前准备
  userAuth: userAuth,
  //  用户登录后回调
  userAuthed: userAuthed,
  getUserInfoById: getUserInfoById
}
