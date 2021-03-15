import request from '@/utils/request'

// 查询信息
export function getList(params) {
  return request({
    url: 'monitor/keySusReport/forPage',
    method: 'get',
    params: params
  })
}
export function getPower(params) {
  return request({
    url: 'monitor/reportClue/isApprove',
    method: 'get',
    params: params
  })
}
