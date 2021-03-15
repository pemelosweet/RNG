import request from '@/utils/request'
// 国际协查文件管理

// 列表  /monitor
export function getList(params) {
  return request({
    url: '/monitor/international/selectIntelBusiness',
    method: 'get',
    params: params
  })
}

export function viewData(ibId) {
  return request({
    url: '/monitor/international/selectById/' + ibId,
    method: 'get'
  })
}
export function getCountry() {
  return request({
    url: '/monitor/international/query-tree',
    method: 'get'
  })
}
export function getProccessList() {
  return request({
    url: '/monitor/international/selectflowex',
    method: 'get'
  })
}
export function getPower() {
  return request({
    url: '/monitor/international/judgmentAuthority',
    method: 'get'
  })
}
