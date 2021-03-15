import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  // baseURL: 'http://10.10.121.108:8771', // api的base_url
  timeout: 120000 // 请求超时时间
})
// request拦截器
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['Authorization'] = ' bearer ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
      config.headers['X-Requested-With'] = ' XMLHTTPRequest '
    }
    return config
  },
  error => {
    // Do something with request error
    Message.error({ message: '请求超时!' })
    console.log('err：' + error) // for debug
    Promise.reject(error)
  }
)

// respone拦截器
service.interceptors.response.use(

  response => {
    /**
     * code为非200是抛错
     */
    const res = response
    // if (res && res.request.status === 0) {
    //   store.dispatch('ForcedLogOut', res.data.message)
    //   return
    // }
    if (res) {
      switch (res.data.code) {
        // 成功
        case 200:
          return res.data
        case 208:
          return res.data
        case 599:
          return res.data
        case 9001:
          Message.error({
            duration: 6000,
            message: res.data.message,
            showClose: true
          })
          break
        case 10086:
          if (!getToken()) {
            console.log('没有token')
            Message.error({
              duration: 6000,
              message: res.data.message,
              showClose: true
            })
            return
          }
          store.dispatch('ForcedLogOut', res.data.message)
          return
        case 444:
          Message.error({
            duration: 6000,
            message: res.data.message,
            showClose: true
          })
          break
        default:
          Message.error({
            duration: 6000,
            message: res.data.message,
            showClose: true
          })
      }
      return Promise.reject('error')
    }
  },
  error => {
    if (error && error.response) {
      switch (error.response.status) {
        case 401:
          error.message = '抱歉，您没有访问此操作的权限！'
          break
        case 404:
          error.message = '抱歉，您请求的资源不存在！'
          break
        default:
          error.message = `服务正在处理，请稍侯。`
      }
    } else {
      error.message = '服务正在处理，请稍侯。'
    }
    Message.error({
      duration: 6000,
      message: error.message,
      showClose: true
    })
    return Promise.reject(error)
  }
)

export default service
