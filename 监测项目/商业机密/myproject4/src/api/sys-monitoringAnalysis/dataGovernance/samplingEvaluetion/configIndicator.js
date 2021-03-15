import request from '@/utils/request'

// 列表查询
export function getList(params) {
  return request({
    url: 'monitor/configuration/list-All',
    method: 'post',
    data: params
  })
}
// 发布
export function release(id) {
  return request({
    url: 'monitor/configuration/releaseIndex/' + id,
    method: 'get'
  })
}
// 删除
export function deleteList(id) {
  return request({
    url: 'monitor/configuration/deleteIndexEvaluation/' + id,
    method: 'get'
  })
}
// 查询单个详情
export function getDetail(id) {
  return request({
    url: 'monitor/configuration/getEntity/' + id,
    method: 'get'
  })
}
// 新建指标版本
export function add(params) {
  return request({
    url: 'monitor/configuration/insertIndicatorVersion',
    method: 'post',
    data: params
  })
}
// 修改指标版本
export function put(params) {
  return request({
    url: 'monitor/configuration/updateIndexEvaluation',
    method: 'post',
    data: params
  })
}
