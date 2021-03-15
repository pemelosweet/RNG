import request from '@/utils/request'

// 新增
export function onSubmit(params) {
  return request({
    url: 'monitor/reportLeads/cluesInsert',
    method: 'post',
    data: params
  })
}
// 分析研判意见 保存
export function AnalysisSubmit(params) {
  return request({
    url: 'monitor/reportLeads/analyzeInsert',
    method: 'post',
    data: params
  })
}
// 审核意见 保存
export function ExamineSubmit(params) {
  return request({
    url: 'monitor/reportLeads/auditInsert',
    method: 'post',
    data: params
  })
}
// 移送 保存
export function TransferSubmit(params) {
  return request({
    url: 'monitor/reportLeads/transferInsert',
    method: 'post',
    data: params
  })
}
// 移送 修改
export function TransferUpdate(params) {
  return request({
    url: 'monitor/reportLeads/updateTransfer',
    method: 'put',
    data: params
  })
}
// 后续办理 保存
export function FollowSubmit(params) {
  return request({
    url: 'monitor/reportLeads/subsequentInserts',
    method: 'post',
    data: params
  })
}
// 后续办理 保存
export function FollowSubmits(params) {
  return request({
    url: 'monitor/reportLeads/subsequentInserts',
    method: 'post',
    data: params
  })
}
// 后续办理 修改
export function FollowUpdate(params) {
  return request({
    url: 'monitor/reportLeads/subsequentInsert',
    method: 'post',
    data: params
  })
}
// 后续办理 回显
export function getFollowList(params) {
  return request({
    url: '/monitor/reportLeads/selectFollowUp',
    method: 'get',
    params: params
  })
}
// 回显
export function getList(id) {
  return request({
    url: '/monitor/reportLeads/selectClue/' + id,
    method: 'get'
  })
}
// 修改
export function Update(reportLeads) {
  return request({
    url: 'monitor/reportLeads/update',
    method: 'put',
    data: reportLeads
  })
}
// 工作流修改
export function Updates(reportLeads, workflow) {
  return request({
    url: 'monitor/reportLeads/returnUpdate',
    method: 'put',
    data: {
      reportLeads: reportLeads,
      workflow: workflow
    }
  })
}
// 删除附件
export function delAttach(params, url) {
  return request({
    url: url,
    method: 'get',
    params: params
  })
}
// 工作流的退回保存按钮
export function backSave(params) {
  return request({
    url: 'monitor/reportLeads/reportLeadsUpdate',
    method: 'post',
    data: params
  })
}
// 工作流的待审核保存按钮
export function lastSave(params) {
  return request({
    url: 'monitor/reportLeads/reportAuditInsert',
    method: 'post',
    data: params
  })
}
// 删除
export function delInfo(id) {
  return request({
    url: '/monitor/reportLeads/identAndInformation/' + id,
    method: 'delete'
  })
}
