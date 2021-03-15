import request from '@/utils/request'

// 获取下一个节点参数
function getNext(params) {
  return request({
    url: 'monitor/workflow/listNextActivityDefinitions',
    method: 'get',
    params: params
  })
}

// 获取人员
function getUsers(params) {
  return request({
    url: 'monitor/workflow/listActivityResources',
    method: 'get',
    params: params
  })
}

// 提交下个节点2
function postNext(params) {
  return request({
    url: 'monitor/resign',
    method: 'post',
    data: params
  })
}

// 获取表单内容
function getForm(params) {
  return request({
    url: 'monitor/workflow/formContent',
    method: 'get',
    params: params
  })
}

// 获取意见  listApprovals
function getOpinion(params) {
  return request({
    url: 'monitor/workflow/listApprovals',
    method: 'get',
    params: params
  })
}
// 获取按钮
function getButton(params) {
  return request({
    url: 'monitor/workflow/listRoleOperations',
    method: 'get',
    params: params
  })
}

// 机构注册更新表单
function putOrgRegister(params, id) {
  return request({
    url: `monitor/organization/updateOrgInfoStream/${id}`,
    method: 'put',
    data: params
  })
}

// 文件下载
function attach(params) {
  return request({
    url: `file-service/fileupload/download`,
    method: 'get',
    params: params
  })
}
// 工作台获取数据
function operatPlatform(params) {
  return request({
    url: 'monitor/workflow/listTasks',
    method: 'get',
    params: params
  })
}

// 工作台获取通知数据
function tallPlatform(params) {
  return request({
    url: 'monitor/workflow/listTasks/count',
    method: 'get',
    params: params
  })
}

// 工作流----流程图
function flowRecord(params) {
  return request({
    url: 'monitor/workflow/listFlowRecords',
    method: 'get',
    params: params
  })
}
// 工作流----获取退回节点
function backNode(params) {
  return request({
    url: 'monitor/workflow/listCanSendbackActivities',
    method: 'get',
    params: params
  })
}
// 工作流--------退回
function sendBack(params) {
  return request({
    url: 'monitor/workflow/sendBackActivity',
    method: 'put',
    data: params
  })
}
// 工作流--------收回
function takeBack(params) {
  return request({
    url: 'monitor/workflow/withdrawWorkitem',
    method: 'put',
    data: params
  })
}
// 工作流--------转办
function deliver(params) {
  return request({
    url: 'monitor/workflow/reassignWorkitem',
    method: 'put',
    data: params
  })
}
// 工作流--------撤销签收
function withdrawal(params) {
  return request({
    url: 'monitor/workflow/undoAcceptWorkitem',
    method: 'put',
    data: params
  })
}
// 工作流--------回收
function takeBackEvent(params) {
  return request({
    url: 'monitor/workflow/withdrawWorkitem',
    method: 'put',
    data: params
  })
}
// 工作流--------回收成功
function takeBackSuccess(params) {
  return request({
    url: 'monitor/clueManage/workflow/withdraw ',
    method: 'put',
    data: params
  })
}

// 工作流--------处置
function disposalComplet(params) {
  return request({
    url: 'monitor/dispose/add/choseStatusAndOpinion',
    method: 'post',
    data: params
  })
}
// 工作流--------查看
function lookComplet(proInstId, bsPkId) {
  return request({
    url: 'monitor/dispose/getDisposeInfo/' + proInstId + '/' + bsPkId,
    method: 'get'
  })
}
// 工作流--------查看处置是否显示
function lookCancelDealWith(id) {
  return request({
    url: 'monitor/dispose/judgeIsDisposed?pkId=' + id,
    method: 'get'
  })
}
// 工作流--------判断是否已处理
function lookDealWith(workflowData) {
  return request({
    url: 'monitor/dispose/checkIsCreateClue/before',
    method: 'post',
    data: workflowData
  })
}
export {
  getNext,
  getUsers,
  postNext,
  getForm,
  getOpinion,
  getButton,
  putOrgRegister,
  attach,
  operatPlatform,
  flowRecord,
  sendBack,
  backNode,
  takeBack,
  deliver,
  disposalComplet,
  lookComplet,
  lookDealWith,
  tallPlatform,
  withdrawal,
  takeBackEvent,
  takeBackSuccess,
  lookCancelDealWith
}
