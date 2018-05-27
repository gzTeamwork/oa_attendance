//  暂用简化版顶级页面路由,请分开加载使用
const pageScanItem = () =>
  import ('./../pages/scanItem.vue')
const scanItem = {
  path: '/scan',
  name: 'Scan Item Qrcode Page',
  component: pageScanItem,

  meta: {
    title: '盈富永泰资产管理二维码 - 扫码信息'
  }
}

export default scanItem
