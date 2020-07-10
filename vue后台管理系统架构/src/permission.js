import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  NProgress.start()

  // 是否有token
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasGetUserInfo = store.getters.authority
      console.log(hasGetUserInfo, 1111)
      if (hasGetUserInfo.length !== 0) {
        next()
      } else {
        try {
          await store.dispatch('user/getInfo').then(res => {
            const permissions_routers = res.roles
            store.dispatch('GenerateRoutes', { permissions_routers }).then(() => {
              console.log(store.getters.addRouters, 1111)
              // 根据roles权限生成可访问的路由表
              // 生成可访问的路由表
              // 动态添加可访问路由表
              router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
              next({ ...to, replace: true })
            })
          })
          next()
        } catch (error) {
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      // 重定向到登录
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
