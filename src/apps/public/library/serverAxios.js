import Axios from 'axios'

// const configs = () =>
//   import ('@/configs/api.Config.js')

// 获取当前使用环境
const devMode = process.env.NODE_ENV === 'development'
console.log('本次访问模式为' + (devMode ? '开发模式' : '生产模式'))

// 接口地址 - 构建开发与生产api接口
let remoteRoot = 'http://oa.emking.cn/inforward/'
let localRoot = 'http://admin.localhost.com/inforward/'
let apiRoot = devMode ? localRoot : remoteRoot
// apiRoot = remoteRoot

//  构造axios实例
let vueAxios = Axios.create({
  baseURL: apiRoot
})

// 添加请求拦截器
vueAxios.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    // if (isObject(window.Nprogresswindow)) {
    //   window.Nprogresswindow.Nprogress.start()
    // }
    return config
  },
  function (error) {
    // 对请求错误做些什么
    devMode && console.log(error)
    // if (isObject(window.Nprogresswindow)) {
    //   window.Nprogress.done()
    // }
    return Promise.reject(error)
  }
)

// 添加响应拦截器
vueAxios.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    if (isObject(window.Nprogresswindow)) {
      window.Nprogress.done()
    }
    //  响应状态判断
    if (response.status > 200) {
      response.err_msg = errorResponse(response.status)
    }
    return response
  },
  function (error) {
    // 对响应错误做点什么
    devMode && console.log(error)

    if (isObject(window.Nprogresswindow)) {
      window.Nprogress.done()
    }

    return Promise.reject(error)
  }
)
const isObject = function (o) {
  return (typeof o === 'function')
}
const errorResponse = function (code) {
  let ermsg = [{
    400: '请求错误'
  }, {
    401: '未授权，请登录'
  }, {
    403: '拒绝访问'
  }, {
    404: '请求地址出错'
  }, {
    408: '请求超时'
  }, {
    500: '服务器内部错误'
  }, {
    501: '服务未实现'
  }, {
    502: '网关错误'
  }, {
    503: '服务不可用'
  }, {
    504: '网关超时'
  }, {
    505: 'HTTP版本不受支持'
  }]
  return ermsg[code] || '未知错误'
}

export default vueAxios
