import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

let LoginUser = () =>
  import ('./loginUser')
const Store = new Vuex.Store({
  modules: {
    loginUser: LoginUser
  },
  state: {
    test: '测试一下'
  }
})

export default Store
