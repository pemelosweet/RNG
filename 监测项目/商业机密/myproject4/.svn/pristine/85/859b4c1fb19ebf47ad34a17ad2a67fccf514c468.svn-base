import request from '@/utils/request'

// 查看详情
export function viewRoster(params) {
  return request({
    url: 'monitor/keySusReport/list/' + params,
    method: 'get'
  })
}
// 查看详情
export function examine(approveState, approveText, id) {
  return request({
    url: 'monitor/keySusReport/approve?approveState=' + approveState + '&approveText=' + approveText + '&keySusId=' + id,
    method: 'put'
  })
}
