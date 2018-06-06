const qrcodeIndex = () =>
  import ('@/pages/qrcode/index.vue')
const qrcodeItem = () =>
  import ('@/pages/qrcode/itemInfo.vue')
const pageAppBar = () =>
  import ('@/pages/appBar.vue')
const qrcodeRouter = {
  path: 'qrcode',
  name: 'qrcode index page',
  component: pageAppBar,
  meta: {
    title: '二维码管理系统'
  },
  children: [{
    path: '',
    name: 'qrcode index page',
    component: qrcodeIndex,
    meta: {
      title: '扫码系统管理页'
    }
  }]
}

export default qrcodeRouter
