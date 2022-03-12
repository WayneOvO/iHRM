// import axios from 'axios'
// import { MessageBox, Message } from 'element-ui'
// import store from '@/store'
// import { getToken } from '@/utils/auth'
//
// // create an axios instance
// const service = axios.create({
//   baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
//   // withCredentials: true, // send cookies when cross-domain requests
//   timeout: 5000 // request timeout
// })
//
// // request interceptor
// service.interceptors.request.use(
//   (config) => {
//     // do something before request is sent
//
//     if (store.getters.token) {
//       // let each request carry token
//       // ['X-Token'] is a custom headers key
//       // please modify it according to the actual situation
//       config.headers['X-Token'] = getToken()
//     }
//     return config
//   },
//   (error) => {
//     // do something with request error
//     console.log(error) // for debug
//     return Promise.reject(error)
//   }
// )
//
// // response interceptor
// service.interceptors.response.use(
//   /**
//    * If you want to get http information such as headers or status
//    * Please return  response => response
//    */
//
//   /**
//    * Determine the request status by custom code
//    * Here is just an example
//    * You can also judge the status by HTTP Status Code
//    */
//   (response) => {
//     const res = response.data
//
//     // if the custom code is not 20000, it is judged as an error.
//     if (res.code !== 20000) {
//       Message({
//         message: res.message || 'Error',
//         type: 'error',
//         duration: 5 * 1000
//       })
//
//       // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
//       if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
//         // to re-login
//         MessageBox.confirm(
//           'You have been logged out, you can cancel to stay on this page, or log in again',
//           'Confirm logout',
//           {
//             confirmButtonText: 'Re-Login',
//             cancelButtonText: 'Cancel',
//             type: 'warning'
//           }
//         ).then(() => {
//           store.dispatch('user/resetToken').then(() => {
//             location.reload()
//           })
//         })
//       }
//       return Promise.reject(new Error(res.message || 'Error'))
//     } else {
//       return res
//     }
//   },
//   (error) => {
//     console.log('err' + error) // for debug
//     Message({
//       message: error.message,
//       type: 'error',
//       duration: 5 * 1000
//     })
//     return Promise.reject(error)
//   }
// )
//
// export default service

import Axios from 'axios'
import store from '@/store/index.js'
import router from '@/router/index.js'
import { Message } from 'element-ui'
import { getTimeStamp } from '@/utils/auth.js'

const TIME_OUT = 60 * 60 * 1000 // 1h

// create an axios instance
const service = Axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout (ms)
})

// request interceptor
service.interceptors.request.use(
  async(config) => {
    if (store.getters.userToken) {
      // 有token
      if (Date.now() - getTimeStamp() > TIME_OUT) {
        // token过期了
        await store.dispatch('user/logout')
        router.push('/login')
        return Promise.reject(new Error('token过期了'))
      }
      config.headers['Authorization'] = `Bearer ${store.getters.userToken}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  (response) => {
    const { success, message, data } = response.data
    if (success) {
      return data
    } else {
      Message.error(message)
      return Promise.reject(new Error(message))
    }
  },
  (error) => {
    Message.error(error.message)
    return Promise.reject(new Error(error.message))
  }
)

export default service
