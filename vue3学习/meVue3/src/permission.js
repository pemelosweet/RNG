import router from './router'
import store from './store'
import NProgress from 'nprogress' // 小进度头部
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '/@/utils/auth' // get token from cookie
NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist
router.beforeEach( (to, from, next) => {
    // NProgress.start()
    //   是否有token
    const hasToken = getToken()
    // console.log(hasToken, whiteList);
    var permissions_routers = ['admin', 'user']  // 模拟接口返回的权限
    store.dispatch('GenerateRoutes', {permissions_routers}).then(() => {
        // 根据roles权限生成可访问的路由表
        // 生成可访问的路由表
        // 动态添加可访问路由表
        router.addRoute(store.getters.addRouters,router) // 动态添加可访问路由表
        // next({ ...to, replace: true })
    })
    next()
   
   
})