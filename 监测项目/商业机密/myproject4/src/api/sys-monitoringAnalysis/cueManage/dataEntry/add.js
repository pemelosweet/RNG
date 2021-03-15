import request from '@/utils/request'

// 数据录入 审批单

// 工作台 -- 提交 审批
export function updateFlowapi(params) {
  return request({
    url: '/monitor/inputafter/updateFlow',
    method: 'post',
    data: params
  })
}

// 流转记录
export function getcircuitapi(aId) {
  return request({
    url: `/monitor/inputafter/transactGj/${aId}`,
    method: 'get'
  })
}

// 获取附件列表
export function getfileListapi(aId) {
  return request({
    url: `/monitor/inputafter/file-list/${aId}/0`,
    method: 'get'
  })
}

// 获取详情
export function getviewapi(aId) {
  return request({
    url: `/monitor/inputafter/selectByaid/${aId}`,
    method: 'get'
  })
}

// 首次 保存
export function sendSaveapi(params) {
  return request({
    url: '/monitor/inputafter/add',
    method: 'post',
    data: params
  })
}

// 数据录入 - 提交
export function sendSubmitapi(params) {
  return request({
    url: '/monitor/inputafter/addFlow',
    method: 'post',
    data: params
  })
}
// 删除附件
export function delloadapi(fileId) {
  return request({
    url: `/monitor/inputafter/deletefile/${fileId}?moduleName=${encodeURI('线索管理')}`,
    method: 'delete'
  })
}
// 类型
export function ChooseType() {
  return request({
    url: `/monitor/inputafter/judgmentAuthority`,
    method: 'get'
  })
}

