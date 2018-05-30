const state = {
  //  被扫码的对象
  scanItem: null,
  //  储存获取到的二维码
  Qrcodes: []
}

const getters = {
  //  获取被扫码的对象信息
  getScanItem: state => {
    return state.scanItem
  },
  //  获取二维码
  getQrcodes: state => {
    return state.Qrcodes
  }
}

const actions = {

}

const mutations = {
  changeScanItem: function (state, payload) {
    state.scanItem = payload
  },
  changeQrcodes: function (state, payload) {
    state.Qrcodes = payload
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
