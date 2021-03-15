import request from '@/utils/request'
// c查询
export function getsourceBusinessArr(params, id) {
  return request({
    url: 'monitor/listwarn/sensitive/type/' + id,
    method: 'get',
    params: params
  })
}
// c查询
export function MYgetsourceBusinessArr(params, id) {
  return request({
    url: 'monitor/listwarn/sensitive/type/forPage/' + id,
    method: 'get',
    params: params
  })
}
// 新增
export function add(params) {
  return request({
    url: 'monitor/listwarn/sensitive',
    method: 'post',
    data: params
  })
}
// 修改
export function modification(id, params) {
  return request({
    url: `monitor/listwarn/sensitive/get/${id}`,
    method: 'patch',
    data: params
  })
}
// 回显

export function put(id) {
  return request({
    url: `monitor/listwarn/sensitive/${id}/sync8a`,
    method: 'get'
  })
}
// 删除
export function deleteClue(params) {
  return request({
    url: `monitor/listwarn/sensitive/${params}`,
    method: 'delete'

  })
}
