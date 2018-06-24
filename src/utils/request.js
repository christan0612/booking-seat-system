import axios from 'axios'
import { Message } from 'element-ui'

const service = axios.create({
  baseURL: '', // api的base_url
  timeout: 15000 // 請求超過時間
})

// 攔截 response
service.interceptors.response.use(
  response => {
    const res = response.data.statusDTO

    if (res.status !== 'SUCCESS') {
      Message({
        showClose: true,
        message: res.message,
        type: 'error'
      })
      return Promise.reject(response.data)
    } else {
      return response.data
    }
  },
  error => {
    Message({
      showClose: true,
      message: error.message,
      type: 'error'
    })
    return Promise.reject(error)
  }
)

export default service
