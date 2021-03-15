import request from '@/utils/request'

export function getList(paramsObj) { // 有权限的列表
  // 规则列表
  return request({
    url: 'monitor/governance/scan/rule',
    method: 'get',
    params: paramsObj
  })
}

export function getNqList() { // 无权限的列表
  // 规则列表
  return request({
    url: 'monitor/governance/scan/rule/getScanList',
    method: 'get'
  })
}

export function addRuleData(paramsObj) {
  // 新增规则列表
  return request({
    url: 'monitor/governance/scan/rule',
    method: 'post',
    data: paramsObj
  })
}

export function updateRuleData(paramsObj) {
  // 修改规则列表
  return request({
    url: 'monitor/governance/scan/rule/update/one',
    method: 'put',
    data: paramsObj
  })
}

export function delRuleList(id) {
  // 删除
  return request({
    url: 'monitor/governance/scan/rule?id=' + id,
    method: 'delete'
  })
}

export function historyData(scanRuleId) { // 历史记录
  return request({
    url: 'monitor/workflow/get/historys',
    method: 'get',
    params: {
      id: scanRuleId
    }
  })
}

export function viewData(scanRuleId) { // 规则弹框查看返显
  return request({
    url: 'monitor/governance/scan/rule/get/one',
    method: 'get',
    params: {
      scanRuleId: scanRuleId
    }
  })
}

export function startStatus(paramsObj) {
  return request({
    url: 'monitor/governance/scan/rule/status',
    method: 'get',
    params: paramsObj
  })
}

export function stopStatus(paramsObj) {
  return request({
    url: 'monitor/governance/scan/rule/disable',
    method: 'get',
    params: paramsObj
  })
}

export function checkSql(sql) { // 检查自定义sql
  return request({
    url: 'monitor/governance/scan/rule/test/sql',
    method: 'get',
    params: {
      sql: sql
    }
  })
}

export function subApproval(id, type) { // 审批 type 1.启用  2.禁用  3.删除
  return request({
    url: 'monitor/governance/scan/rule/examination/and/approval',
    method: 'post',
    data: {
      id: id,
      type: type
    }
  })
}

export function approvalStaus(paramsObj) { // 新增规则提交审批
  return request({
    url: 'monitor/governance/scan/rule/examination/and/approval',
    method: 'post',
    data: paramsObj
  })
}

export function updateForm(workflow, correctId) { // 工作流更新
  return request({
    url: 'monitor/governance/scan/rule/exam/' + correctId,
    method: 'put',
    data: workflow
  })
}

export function getFiledEleList(type) { // 获取字段要素
  return request({
    url: 'monitor/governance/scan/rule/find/field?type=' + type,
    method: 'get'
  })
}

export function getIndustry() { // 获取行业
  return request({
    url: 'code-manage/codesys/code-detail/detail/industry',
    method: 'get'
  })
}
