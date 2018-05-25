const state = {
  info: []
}

const getters = {
  getItemInfo: state => {
    return state.info
  }
}

const actions = {

}

const mutations = {
  changeScanItemInfo: function (state, payload) {
    state.info = payload
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
