import routerQrcode from '@/apps/qrcode/router'
import routerDailyMeal from '@/apps/dailyMeal/router'

// const pageDailyMeal = () =>
//   import ('@/pages/components/dailyMeal.vue')

const pageEventCalendar = () =>
  import ('@/pages/components/eventCalendar.vue')

const pageUserRest = () =>
  import ('@/pages/components/userDuty.vue')
//  加载用户验证页面
const pageUserAuth = () =>
  import ('@/pages/components/userAuth.vue')

const subRouter = [{

    //  排班
    path: 'schedule',
    name: 'event calendar',
    component: pageEventCalendar,
    meta: {
      title: '排班日历'
    }

  }, {

    //  调休
    path: 'userRest',
    name: 'user rest',
    component: pageUserRest,
    meta: {
      title: '员工调休'
    }

  }, {

    //  员工授权
    path: 'userAuth',
    name: 'user auth',
    component: pageUserAuth,
    meta: {
      title: '用户授权登录'
    }

  },
  //  扫码管理
  routerQrcode,
  routerDailyMeal, {

    //  默认路由
    path: '',
    name: 'user rest',
    component: pageUserRest,
    meta: {
      title: '员工调休'
    }

  }
]

export default subRouter
