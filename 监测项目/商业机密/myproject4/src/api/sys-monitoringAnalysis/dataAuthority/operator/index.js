import request from '@/utils/request'
// 查询信息
export function getList(params) {
  return request({
    url: '/monitor/permission/application/list',
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
    url: '/monitor/permission/application/details' + '/' + params + '/' + type,
    method: 'get'

  })
}
// 新建
export function clue(params) {
  return request({
    url: 'monitor/permission/application/create',
    method: 'post',
    data: params
  })
}
// 新建页面初始化
export function createState(params) {
  return request({
    url: 'monitor/permission/application/create',
    method: 'get',
    params: params
  })
}
