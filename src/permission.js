// import router from './router'
// import store from './store'
// import { Message } from 'element-ui'
// import NProgress from 'nprogress' // progress bar
// import 'nprogress/nprogress.css' // progress bar style
// import { getToken } from '@/utils/auth' // get token from cookie
// import getPageTitle from '@/utils/get-page-title'
//
// NProgress.configure({ showSpinner: false }) // NProgress Configuration
//
// const whiteList = ['/login'] // no redirect whitelist
//
// router.beforeEach(async(to, from, next) => {
//   // start progress bar
//   NProgress.start()
//
//   // set page title
//   document.title = getPageTitle(to.meta.title)
//
//   // determine whether the user has logged in
//   const hasToken = getToken()
//
//   if (hasToken) {
//     if (to.path === '/login') {
//       // if is logged in, redirect to the home page
//       next({ path: '/' })
//       NProgress.done()
//     } else {
//       const hasGetUserInfo = store.getters.name
//       if (hasGetUserInfo) {
//         next()
//       } else {
//         try {
//           // get user info
//           await store.dispatch('user/getInfo')
//
//           next()
//         } catch (error) {
//           // remove token and go to login page to re-login
//           await store.dispatch('user/resetToken')
//           Message.error(error || 'Has Error')
//           next(`/login?redirect=${to.path}`)
//           NProgress.done()
//         }
//       }
//     }
//   } else {
//     /* has no token*/
//
//     if (whiteList.indexOf(to.path) !== -1) {
//       // in the free login whitelist, go directly
//       next()
//     } else {
//       // other pages that do not have permission to access are redirected to the login page.
//       next(`/login?redirect=${to.path}`)
//       NProgress.done()
//     }
//   }
// })
//
// router.afterEach(() => {
//   // finish progress bar
//   NProgress.done()
// })

import router from '@/router/index.js'
import store from '@/store/index.js'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// import getPageTitle from '@/utils/get-page-title.js'

const WHITE_LIST = ['/404', '/login']

// 路由的前置守卫
router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  // document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  if (store.getters.userToken) {
    // 有 token
    if (to.path === '/login') {
      next('/')
    } else {
      if (!store.getters.userId) {
        try {
          await store.dispatch('user/getUserInfo')
        } catch (e) {
          console.log(e)
        }
      }

      next()
    }
  } else {
    // 无 token
    if (WHITE_LIST.indexOf(to.path) !== -1) {
      // 在白名单内
      next()
    } else {
      // 不在白名单内
      next('/login')
    }
  }

  // finish progress bar
  NProgress.done()
})

// 路由的后置守卫
router.afterEach(() => {
  NProgress.done()
})
