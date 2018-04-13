import '@/libs/wxworkSDK/wxworkSDK.min.js'
const wxworkConfig = {
  beta: true, // 必须这么写，否则wx.invoke调用形式的jsapi会有问题
  debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
  appId: 'wwdc02ce3b575253e3', // 必填，企业微信的corpID
  timestamp: '123', // 必填，生成签名的时间戳
  nonceStr: '', // 必填，生成签名的随机串
  signature: '', // 必填，签名，见附录1
  jsApiList: [] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
}

export default wxworkConfig
