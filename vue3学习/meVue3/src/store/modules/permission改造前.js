import {
    routes, // 基础路由
    // reportAgencyRouterMap,
   roleRoutes  // 动态路由
} from '/@/router'
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
 * @param roleRoutes
 * @param permissions_routers
 */
function filterAsyncRouter(roleRoutes, permissions_routers) {
    const accessedRouters = roleRoutes.filter(route => {
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
        mljrouters: routes,
        routers: routes,
        addRouters: []
    },
    mutations: {
        SET_ROUTERS: (state, routers) => {
            state.addRouters = routers
            state.routers = routes.concat(routers)
        }
    },
    actions: {
        GenerateRoutes({
            commit
        }, data) {
            return new Promise(resolve => {
                const {
                    permissions_routers  // 从传入的data将数组结构出来
                } = data
                const accessedRouters = filterAsyncRouter(roleRoutes, permissions_routers)
                commit('SET_ROUTERS', accessedRouters)
                resolve()
            })
        }
    }
}
export default permission