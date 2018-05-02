let loginUser = new Vuex.Store({
  state: {
    userId: null,
    name: null,
    loginTime: null
  },
  mutations: {
    changeUserInfo(state, payload) {
      console.log(payload)
      state.userId = payload.user_id
    }
  }

})

export default loginUser
