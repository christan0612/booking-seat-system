import axios from 'axios'
import { Message } from 'element-ui'
import router from '@/router'
import store from '@/store/Index'

const service = axios.create({
  baseURL: 'http://stage.answerme.com.tw/poc/api', // api的base_url
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
      // handle error code
      switch (res.errorCode) {
        case 'F0000001':
          // 當前的 path
          store.commit('setPreviousPage', router.history.current.path)
          router.push('/login')
          break
      }

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
