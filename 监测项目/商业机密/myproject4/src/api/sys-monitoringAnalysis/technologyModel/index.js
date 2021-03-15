import request from '@/utils/request'
// 数据审核

// 获取查询列表数据
export function techSearch(paramsObj) {
  return request({
    url: 'caml-model/model/audit/selectquery',
    method: 'post',
    params: paramsObj
  })
}

// 删除
export function goDeleteds(id) {
  return request({
    url: 'caml-model/model/audit/goDeleteds?id=' + id,
    method: 'delete'
  })
}

// 批量删除
// export function techBatchDelete(params) {
//   return request({
//     url: 'caml-model/model/audit/deletedss?ids=' + params,
//     method: 'delete'
//   })
// }

// 审核
export function toaudit(paramsObj) {
  return request({
    url: 'caml-model/model/audit/toaudit',
    method: 'post',
    params: paramsObj
  })
}

// ---------------------------------------------发布列表
// 列表
export function selectqueryonline(paramsObj) {
  return request({
    url: 'caml-model/model/audit/selectqueryonline',
    method: 'post',
    params: paramsObj
  })
}
// 单个删除
export function deletedsOnLine(id) {
  return request({
    url: 'caml-model/model/audit/deletedsOnLine?modelOnlyId=' + id,
    method: 'delete'
  })
}
// 批量删除
export function pldeletedsOnLine(id) {
  return request({
    url: 'caml-model/model/audit/pldeletedsOnLine?modelOnlyId=' + id,
    method: 'delete'
  })
}
