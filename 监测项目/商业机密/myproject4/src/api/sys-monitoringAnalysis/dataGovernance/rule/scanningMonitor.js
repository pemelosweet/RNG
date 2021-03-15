import request from '@/utils/request'

export function getList(paramsObj) {
  return request({
    url: 'monitor/governance/scan/rule/requestion',
    method: 'get',
    params: paramsObj
  })
}

export function getRuleList() {
  return request({
    url: '/monitor/governance/scaning/history',
    method: 'get'
  })
}

export function cleanList(form, pageInfo) { // 自动清理列表
  return request({
    url: '/monitor/governance/clean/plan/list',
    method: 'get',
    params: {
      planName: form.planName,
      planCode: form.planCode,
      pageNum: pageInfo.pageNum,
      pageSize: pageInfo.pageSize
    }
  })
}

export function delRowList(tradeId) { // 自动清理列表
  return request({
    url: '/monitor/governance/scan/rule/requestion/delScanResult?tradeId=' + tradeId,
    method: 'delete'
  })
}
export function industryXu() {
  // 所属行业
  return request({
    url: 'monitor/statistics/code/industry?type=ALLCHILD',
    method: 'get'
  })
}
