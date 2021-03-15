import request from '@/utils/request'

export function getList(manage) {
  return request({
    url: 'monitor/thread/adm/sync8a',
    method: 'get',
    params: manage
  })
}
// 判断是否为分析员
export function getRoleList() {
  return request({
    url: 'monitor/thread/adm/userInfo/getRoleList',
    method: 'get'
  })
}
export function newApplicationForm(apply) {
  return request({
    url: 'monitor/thread/adm/apply',
    method: 'post',
    data: apply
  })
}
export function submissionApi(apply) {
  return request({
    url: 'monitor/thread/adm/apply/workflow',
    method: 'post',
    data: apply
  })
}
export function relatedAccessories(params) {
  return request({
    url: 'monitor/thread/adm/upload' + params,
    method: 'post'
  })
}
// 流转记录
export function circulationRecord(applyId, pageNum, pageSize) {
  return request({
    url: 'monitor/thread/adm/transact/' + applyId,
    method: 'get',
    params: {
      pageNum,
      pageSize
    }
  })
}
// 工作流业务表单更新-行政调查
export function updateExam(applyId, map) {
  return request({
    url: 'monitor/thread/adm/updateExam/' + applyId,
    method: 'PUT',
    data: map
  })
}
export function listCurrentActivities(params) {
  return request({
    url: 'monitor/workflow/listCurrentActivities',
    method: 'get',
    params: params
  })
}
export function fileApply(applyId) {
  return request({
    url: 'monitor/thread/adm/fileApply/' + applyId,
    method: 'get'
  })
}
// 工作流状态
export function stateApi(applyId) {
  return request({
    url: 'monitor/thread/adm/state/' + applyId,
    method: 'get'
  })
}
// 编辑时保存提交
export function save(apply) {
  return request({
    url: 'monitor/thread/adm/save',
    method: 'put',
    data: apply
  })
}
