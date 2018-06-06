import Vue from 'vue'
import Vuex from 'vuex'

// import TestUnit from './components/testUnit/'
import AppStatus from './components/appStatus'
import LoginUser from './components/loginUser'
import UserDuty from './components/userDuty'
import userDailyMeals from './components/userDailyMeals'
//  报餐store
import dailyMeals from '@/apps/dailyMeal/store'
//  二维码store
import qrcodeStore from '@/apps/qrcode/store'

Vue.use(Vuex)

const Store = new Vuex.Store({
  modules: {
    // testUnit: TestUnit,
    loginUser: LoginUser,
    userDuty: UserDuty,
    userDailyMeals: userDailyMeals,
    appStatus: AppStatus,
    qrcodes: qrcodeStore,
    dailyMeals: dailyMeals
  }
})
// console.log(Store)

export default Store
