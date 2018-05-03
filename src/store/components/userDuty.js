const state = {
  curMonthEvents: []

}

const getters = {
  getMonthEvents: state => {
    return state.curMonthEvents
  }
}

const actions = {

}

const mutations = {
  changeMonthEvents: function (state, payload) {
    let newEvents = []
    console.log('接收当月排班数据')
    payload.map((e, i) => {
      let event = payload[i]
      event.date = new Date(e.date).Format('yyyy/MM/dd')
      event.title = '日历事件'
      newEvents.push(event)
    })
    state.curMonthEvents = newEvents
    return state.curMonthEvents
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
