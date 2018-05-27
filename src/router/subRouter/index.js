const pageDailyMeal = () =>
  import ('@/pages/components/dailyMeal.vue')

const pageEventCalendar = () =>
  import ('@/pages/components/eventCalendar.vue')

const pageUserRest = () =>
  import ('@/pages/components/userDuty.vue')

const pageUserAuth = () =>
  import ('@/pages/components/userAuth.vue')

const pageQrcode = () =>
  import ('@/apps/qrcode/pages')
const subRouter = [{

    //  报餐
    path: 'dailyMeal',
    name: 'daily meal',
    component: pageDailyMeal,
    meta: {
      title: '每日报餐'
    }

  }, {

    //  报餐
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
  {
    path: 'qrcode',
    name: '二维码管理页面',
    component: pageQrcode,
    meta: {
      title: '二维码管理页面'
    }
  }, {

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
