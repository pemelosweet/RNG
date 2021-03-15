import {
  monitorAnalysisRouterMap,
  // reportAgencyRouterMap,
  constantRouterMap
} from '@/router'

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param permissions_routers
 * @param route
 */
function hasPermission(permissions_routers, route) {
  if (route.meta && route.meta.role) {
    return permissions_routers.some(role => route.meta.role.indexOf(role) >= 0)
  } else {
    return true
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param permissions_routers
 */
function filterAsyncRouter(asyncRouterMap, permissions_routers) {
  const accessedRouters = asyncRouterMap.filter(route => {
    if (hasPermission(permissions_routers, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, permissions_routers)
      }
      return true
    }
    return false
  })
  return accessedRouters
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({
      commit
    }, data) {
      return new Promise(resolve => {
        const {
          permissions_routers,
          system
        } = data
        if (system === 'receivesys') {
          // const accessedRouters = filterAsyncRouter(reportAgencyRouterMap, permissions_routers)
          // commit('SET_ROUTERS', accessedRouters)
        } else if (system === 'monitor') {
          const accessedRouters = filterAsyncRouter(monitorAnalysisRouterMap, permissions_routers)
          commit('SET_ROUTERS', accessedRouters)
        }
        resolve()
      })
    }
  }
}

export default permission
