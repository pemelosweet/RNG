import request from '@/utils/request'
// 查询信息
export function getList(params) {
  return request({
    url: '/monitor/permission/approve/district/list',
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
export function viewDetails(params, type) {
  return request({
    url: '/monitor/permission/approve/district/details' + '/' + params + '/' + type,
    method: 'get'

  })
}
// 修改
export function clue(params) {
  return request({
    url: 'monitor/permission/approve/district',
    method: 'put',
    data: params
  })
}
