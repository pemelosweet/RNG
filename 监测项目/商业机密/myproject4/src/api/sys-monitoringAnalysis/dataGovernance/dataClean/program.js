import request from '@/utils/request'

export function getCleanList(paramsObj) { // 自动清理列表
  return request({
    url: '/monitor/governance/clean/plan/list',
    method: 'get',
    params: paramsObj
  })
}

export function getCleanRuleList(srId) { // 自动清理列表(根据匹配规则)
  return request({
    url: '/monitor/governance/clean/plan/planRule',
    method: 'get',
    params: { srId: srId }
  })
}

export function addCleanData(form) { // 自动清理新增
  return request({
    url: 'monitor/governance/clean/plan',
    method: 'post',
    data: form
  })
}

export function updateCleanData(paramsObj) { // 自动清理修改
  return request({
    url: '/monitor/governance/clean/plan',
    method: 'put',
    data: paramsObj
  })
}

export function delCleanData(id) { // 删除
  return request({
    url: 'monitor/governance/clean/plan/' + id,
    method: 'delete'
  })
}

export function cleanCheck(tradeId) {
  return request({
    url: '/monitor/governance/approval/approval/check/' + tradeId,
    method: 'get'
  })
}
