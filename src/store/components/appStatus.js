const state = {
  message: null
}

const getters = {
  getAppMsg: state => {
    return state.message
  }
}

const actions = {

}

const mutations = {
  changeLog: function (state, payload) {
    state.message = payload
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
