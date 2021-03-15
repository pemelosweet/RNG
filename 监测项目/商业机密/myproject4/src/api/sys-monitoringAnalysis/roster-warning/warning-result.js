import request from '@/utils/request'

// 列表页面获取table数据
export function getTable(params) {
  return request({
    url: 'monitor/listwarn/warnResult',
    method: 'get',
    params: params
  })
}

// 列表页面获取主体信息数据 /
export function getData(params) {
  return request({
    url: `monitor/listwarn/warnResult/listWarnRuleTotal/sync8a`,
    method: 'get',
    params: params

  })
}

// 列表页面获取主体信息数据 /
export function mainData(params) {
  return request({
    url: `monitor/listwarn/warnResult/selectBatch`,
    method: 'get',
    params: params

  })
}

// 列表页面获取某个主体交易结果
export function single(params) {
  return request({
    url: `monitor/listwarn/warnResult/listWarnRuleOne`,
    method: 'get',
    params: params
  })
}

// 列表页面获取某个主体交易结果
export function getTitle(params) {
  return request({
    url: `monitor/listwarn/warn-rule/forResultTotal/${params}`,
    method: 'get'

  })
}

// 获取任务对应所有主体
export function querySubject(params) {
  return request({
    url: `monitor/listwarn/warnResult/listWarnRuleTotal/forbatch/sync8a`,
    method: 'get',
    params: params
  })
}

export function changeStatus(data) {
  return request({
    url: `monitor/listwarn/warnResult/updateHandleState`,
    method: 'put',
    data
  })
}
