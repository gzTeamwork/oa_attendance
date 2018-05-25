import Vue from 'vue'
import Vuex from 'vuex'

// import TestUnit from './components/testUnit/'
import AppStatus from './components/appStatus'
import LoginUser from './components/loginUser'
import UserDuty from './components/userDuty'
import userDailyMeals from './components/userDailyMeals'

import scanItem from './propertyItem/item'
import scanItems from './propertyItem/items'
Vue.use(Vuex)

const Store = new Vuex.Store({
  modules: {
    // testUnit: TestUnit,
    loginUser: LoginUser,
    userDuty: UserDuty,
    userDailyMeals: userDailyMeals,
    appStatus: AppStatus,
    scanItem: scanItem,
    scanItems: scanItems
  }
})
// console.log(Store)

export default Store
