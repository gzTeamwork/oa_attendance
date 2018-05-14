let state = {
  msg: null
}

let getters = {
  testMsg: state => state.msg
}

let actions = {
  testCommit({
    commit,
    state
  }, datas) {
    state.msg = datas
  }
}

export default {
  state,
  actions,
  getters
}
