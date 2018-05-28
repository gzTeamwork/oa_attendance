const pageQrcode = () =>
  import ('./../pages/index.vue')
const pagePrintQrcode = () =>
  import ('./../pages/printCodes.vue')

const routerQrcode = {
  path: 'qrcode',
  name: '二维码管理页面',
  component: {
    template: '<router-view/>'
  },
  meta: {
    title: '二维码管理页面'
  },
  children: [{
    path: 'print',
    name: '打印二维码',
    component: pagePrintQrcode,
    meta: {
      title: '打印二维码'
    }
  }, {
    path: '',
    name: '二维码管理首页',
    component: pageQrcode,
    meta: {
      title: '二维码管理页面'
    }
  }]
}

export default routerQrcode
