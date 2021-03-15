import request from '@/utils/request'
// 查询预警条件
export function getList(params) {
  return request({
    url: 'monitor/listwarn/warn-rule-dic/queryAll',
    method: 'get',
    params: params
  })
}

// 查询预警要素
export function checkElement(params) {
  return request({
    url: 'monitor/listwarn/warn-rule-dic/queryAllByStatus',
    method: 'get',
    params: params
  })
}

// 新增预警规则
export function newRule(params) {
  return request({
    url: 'monitor/listwarn/warn-rule',
    method: 'post',
    data: params
  })
}

// 机构组织树--tree
export function warningRange(params) {
  return request({
    url: 'sysmanage/outInterFace/tree',
    method: 'get',
    params: params

  })
}

// 预警范围
export function warningRangeUser(params) {
  return request({
    url: 'sysmanage/outInterFace/getUser',
    method: 'get',
    params: params

  })
}

// 查询预警规则
export function searchRule(params) {
  return request({
    url: 'monitor/listwarn/warn-rule',
    method: 'get',
    params: params
  })
}

// 查看单条预警规则
export function ruleDetail(params) {
  return request({
    url: 'monitor/listwarn/warn-rule/' + params,
    method: 'get'

  })
}

// 删除单条预警规则
export function delRule(params) {
  return request({
    url: 'monitor/listwarn/warn-rule/' + params,
    method: 'delete'

  })
}

// 删除单条预警规则
export function queryRule(params) {
  return request({
    url: 'monitor/listwarn/warn-rule/query-warn',
    method: 'get',
    params
  })
}

// 删除单条预警规则
export function updateRule(data) {
  return request({
    url: 'monitor/listwarn/warn-rule/update-warn',
    method: 'put',
    data
  })
}

export function isEditable(params) {
  return request({
    url: 'monitor/listwarn/warn-rule/or-update',
    method: 'get',
    params
  })
}
