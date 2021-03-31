const getters = {
    // 实验vuex的计数器
    count: state => state.test.count,  // 计数器
    // 权限控制getters
    mljrouters: state => state.permission.routers,// 完整路由表
    routers: state => state.permission.routers,//  完整路由表
    addRouters: state => state.permission.addRouters,// 通过校验路由表
    permission_routers: state => state.permission.routers,//  完整路由表
  }
  export default getters