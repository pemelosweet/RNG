import request from '@/utils/request'
// 中心列表
export function getList(params) {
  return request({
    url: '/monitor/reportLeads/ReportLeadsSearch',
    method: 'get',
    params: params
  })
}
