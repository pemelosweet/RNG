import request from '@/utils/request'
// 数据审核

// 获取查询列表数据
export function techSearch(paramsObj) {
  return request({
    url: 'model-jy/model/audit/selectquery',
    method: 'post',
    params: paramsObj
  })
}

// 删除
export function goDeleteds(params) {
  return request({
    url: 'model-jy/model/audit/goDeleteds?id=' + params.id + '&modelOnlyId=' + params.modelOnlyId + '&createId=' + params.createId + '&auditType=' + params.auditType,
    method: 'delete'
  })
}

// 批量删除
// export function techBatchDelete(params) {
//   return request({
//     url: 'model-jy/model/audit/deletedss?ids=' + params,
//     method: 'delete'
//   })
// }

// 审核
export function toaudit(paramsObj) {
  return request({
    url: 'model-jy/model/audit/toaudit',
    method: 'post',
    params: paramsObj
  })
}
// 查看提交信息
export function lookSubtoaudit(modelAId) {
  return request({
    url: 'model-jy/model/audit/selectBySumit?modelAId=' + modelAId,
    method: 'get'
  })
}

// ---------------------------------------------发布列表
// 列表
export function selectqueryonline(paramsObj) {
  return request({
    url: 'model-jy/model/audit/selectqueryonline',
    method: 'post',
    params: paramsObj
  })
}
// 单个删除
export function deletedsOnLine(id) {
  return request({
    url: 'model-jy/model/audit/deletedsOnLine?modelOnlyId=' + id,
    method: 'delete'
  })
}
// 批量删除
export function pldeletedsOnLine(id) {
  return request({
    url: 'model-jy/model/audit/pldeletedsOnLine?modelOnlyId=' + id,
    method: 'delete'
  })
}
