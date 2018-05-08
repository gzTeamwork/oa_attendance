import Vue from 'vue'
import Vuex from 'vuex'

import TestUnit from './components/testUnit/'
import LoginUser from './components/loginUser.js'
import UserDuty from './components/userDuty.js'
import userDailyMeals from './components/userDailyMeals'
Vue.use(Vuex)

const Store = new Vuex.Store({
  modules: {
    testUnit: TestUnit,
    loginUser: LoginUser,
    userDuty: UserDuty,
    userDailyMeals: userDailyMeals

  }
})
// console.log(Store)

export default Store
