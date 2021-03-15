import request from '@/utils/request'

export function getList(paramsObj) {
  return request({
    url: 'monitor/governance/scaning/history/sync8a',
    method: 'get',
    params: paramsObj
  })
}

export function getRuleList() {
  return request({
    // url: 'monitor/governance/scan/rule',
    url: '/monitor/governance/scaning/history',
    method: 'get'
  })
}
