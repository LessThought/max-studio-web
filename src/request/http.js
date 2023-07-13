import axios from 'axios'
import { ElMessage } from 'element-plus'

// 请求超时时间
axios.defaults.timeout = 10000 * 6

// 请求基础URL
axios.defaults.baseURL = 'http://localhost:8090'

// 响应拦截器
axios.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      return Promise.resolve(response) // resolve表示请求成功
    }
  },
  (error) => {
    if (error.response.stats) {
      console.log(error.response)
      switch (error.response.stats) {
        case 500:
          ElMessage.error('服务器异常')
          break
        case 404:
          ElMessage.error('资源不存在')
          break
        default:
          ElMessage.warning(error.response.data.message)
          return Promise.reject(error.response) // reject表示请求失败
      }
    }
  }
)

export function get (url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, { params: params })
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(err.data)
      })
  })
}

export function axiosDelete (url, params) { // 不能用delete，因为这是axios的内置函数
  return new Promise((resolve, reject) => {
    axios.delete(url, params)
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(err.data)
      })
  })
}

export function post (url, data = {}, info) {
  return new Promise((resolve, reject) => {
    let newData = data
    if (info) {
      newData = new FormData()
      for (const i in data) {
        newData.append(i, data[i])
      }
    }
    axios.post(url, newData)
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(err.data)
      })
  })
}

export function put (url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.put(url, params)
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(err.data)
      })
  })
}
