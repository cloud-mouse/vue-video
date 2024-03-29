import axios from 'axios'
import store from '@/store'
import { Toast } from 'vant'
import { getToken } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // 跨域请求时发送cookies
  timeout: 2000000 // 请求超时
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 在发出请求前做点什么
    if (store.getters.token) {
      // 使每个请求头携带token
      // ['Authorization'] 是header请求头中的key
      // 请根据实际情况修改
      config.headers.Authorization = `Bearer ${getToken()}`
    }
    return config
  },
  error => {
    // 处理请求错误
    console.log(error) // for debug
    return Promise.reject(error)
  }
)
// 响应拦截器
service.interceptors.response.use(
  /**
    *如果您想要获取诸如头或状态之类的http信息
    *请返回response=>response
  */
  /**
    *通过自定义代码确定请求状态
    *这里只是一个例子
    *您还可以通过HTTP状态代码判断状态
  */
  response => {
    const res = response.data
    // 如果自定义代码不是0，则判断为错误。
    if (res.code !== 200) {
      // console.log('err' + res.message) // for debug
      // 402: 未授权/未登录
      // if (res.code === 402) {
      //   // 清除缓存登录状态
      //   store.dispatch('user/resetToken')
      //   return res
      // }
      Toast(res.msg || '请求异常')
      return Promise.reject(res)
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    return Promise.reject(error)
  }
)

export default service
