import request from '@/utils/request'

export function getList(paramsObj) {
  return request({
    url: 'monitor/governance/approval/approval/list',
    method: 'get',
    params: paramsObj
  })
}

export function getExecute(tradeId) {
  return request({
    url: 'monitor/governance/approval/approval/' + tradeId,
    method: 'post'
  })
}
