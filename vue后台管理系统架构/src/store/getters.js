const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  authority: state => state.user.permissions_routers,
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,
  name: state => state.user.name
}
export default getters
