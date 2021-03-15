
const getters = {
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  // visitedViews: state => state.tagsView.visitedViews,
  // cachedViews: state => state.tagsView.cachedViews,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  user_name: state => state.user.id,
  user_riid: state => state.user.riid,
  permissions_routers: state => state.user.permissions_routers,
  introduction: state => state.user.introduction,
  industry: state => state.user.industry,
  institution: state => state.user.institution,
  roles: state => state.user.roles,
  status: state => state.user.status,
  system: state => state.user.system,
  setting: state => state.user.setting,
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,
  errorLogs: state => state.errorLog.logs,
  alert: state => state.user.alert,
  // categoryForm: state => state._categoryForm // demo
  // susp: state => {
  //   if (!state.suspicious.susp) {
  //     state.suspicious.susp = JSON.parse(sessionStorage.getItem('susp'))
  //   }
  //   return state.suspicious.susp
  // }, // 在线-可疑
  // sendObj: state => {
  //   if (!state.suspicious.sendObj) {
  //     state.suspicious.sendObj = JSON.parse(sessionStorage.getItem('sendObj'))
  //   }
  //   return state.suspicious.sendObj
  // },
  // editId: state => {
  //   if (!state.suspicious.sendObj) {
  //     state.suspicious.editId = sessionStorage.getItem('editId')
  //   }
  //   return state.suspicious.editId
  // },
  // npay: state => {
  //   if (!state.unionpay.npay) {
  //     state.unionpay.npay = JSON.parse(sessionStorage.getItem('npay'))
  //   }
  //   return state.unionpay.npay
  // },
  // npaysendObj: state => {
  //   if (!state.unionpay.sendObj) {
  //     state.unionpay.sendObj = JSON.parse(sessionStorage.getItem('sendObj'))
  //   }
  //   return state.unionpay.sendObj
  // },
  // npayEditId: state => {
  //   if (!state.unionpay.sendObj) {
  //     state.unionpay.editId = sessionStorage.getItem('editId')
  //   }
  //   return state.unionpay.editId
  // },
  // 工作流
  workFlow2business: state => state.workFlow.workFlow2business,
  business2workFlow: state => state.workFlow.business2workFlow,
  workFlowInfobusiness: state => state.workFlow.workFlowInfobusiness,
  businessFlag: state => state.workFlow.businessFlag,
  buttonData: state => state.workFlow.buttonData,
  dialog: state => state.workFlow.dialog,
  formContent: state => state.workFlow.formContent,
  attachList: state => state.workFlow.attachList,
  flowRecord: state => state.workFlow.flowRecord,
  seniorListNumberArr: state => state.workFlow.seniorListNumberArr

}
export default getters
