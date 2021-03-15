import request from '@/utils/request'
// 查询信息
export function queryList(params) {
  return request({
    url: '/monitor/macrographyReport/findByTitle',
    method: 'get',
    params: params
  })
}
// 列表
export function getList(params) {
  return request({
    url: '/monitor/macrographyReport',
    method: 'get',
    params: params
  })
}
// 删除
export function delReport(id) {
  return request({
    url: 'monitor/macrographyReport' + '/' + id,
    method: 'delete'
  })
}
// detail回显
export function viewRoster(params) {
  return request({
    url: 'monitor/macrographyReport/findById' + '/' + params,
    method: 'get'
  })
}
