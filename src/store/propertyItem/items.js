const state = {
  items: []
}

const getters = {
  getQrcodeItems: state => {
    return state.items
  }
}

const actions = {

}
const mutations = {
  changeScanItems: function (state, payload) {
    state.items = payload
  }
}

export default {
  state,
  getters,
  actions,
  mutations

}
