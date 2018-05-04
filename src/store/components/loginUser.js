import VueCookie from 'vue-cookies';

const state = {
  needAuth: true,
  userTicket: null,
  userInfo: null,
  userRestDays: [],
  expired: null
}

const getters = {
  getUserInfo: state => {
    let cookieUser = JSON.parse(VueCookie.get('loginUser')) || null
    if (cookieUser == null) {

    } else {
      state.userInfo = cookieUser
      state.needAuth = false
    }
    let user = cookieUser || state.userInfo
    return user
  },
  needLogin: state => {
    return state.needAuth
  },
  getUserRestDay: state => {
    return state.userRestDays
  }
}

const actions = {

}

const mutations = {
  //  更变用户信息
  changeUserInfo(state, payload) {
    state.userInfo = payload
    state.needAuth = false
    VueCookie.set('loginUser', JSON.stringify(payload), 7200)
  },
  //  获取用户休息日
  changeUserRestDay(state, payload) {
    state.userRestDays = payload
    return state.userRestDays
  },
  changeNeedAuth(state, payload) {
    state.needAuth = payload === true
    return state.needAuth
  },
  changUserTicket(state, payload) {
    state.userTicket = payload.user_ticket
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
