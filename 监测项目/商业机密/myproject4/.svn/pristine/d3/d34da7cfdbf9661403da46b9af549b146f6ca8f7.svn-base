import request from '@/utils/request'
// 查询信息
export function getList(params) {
  return request({
    url: '/monitor/permission/approve/central/list',
    method: 'get',
    params: params
  })
}
// 查询地域
export function getArea(params) {
  return request({
    url: '/code-manage/codesys/district/province',
    method: 'get',
    params: params
  })
}
// 查看详情
export function viewDetails(id) {
  return request({
    url: '/monitor/permission/approve/central/details/' + id + '/3',
    method: 'get'
  })
}
// 修改
export function clue2(params) {
  return request({
    url: 'monitor/permission/approve/central/first',
    method: 'put',
    data: params
  })
}
