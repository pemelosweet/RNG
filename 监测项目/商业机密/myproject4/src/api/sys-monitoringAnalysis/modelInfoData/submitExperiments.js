import request from '@/utils/request'
// 数据管控---数据模型管理

// 获取查询列表数据
export function selectInfo() {
  return request({
    url: 'caml-model/model/audit/getOffenseType',
    method: 'get'
  })
}
// 获取选择数据来源列表
export function getDs(paramsObj) {
  return request({
    url: 'caml-model/model/audit/getDs',
    method: 'get',
    params: paramsObj
  })
}

// 获取人员
export function getAuditList(params) {
  return request({
    url: 'caml-model/model/audit/getAuditName?groupname=' + params,
    method: 'post'
  })
}

// 提交审核
export function submitAudit(params) {
  return request({
    url: 'caml-model/model/audit/submitAudit',
    method: 'post',
    data: params
  })
}

// 树回显
export function addDataCentratSets(token) {
  return request({
    url: 'caml-model/model/query/feignSys?token=' + token,
    method: 'get'
  })
}

// 获取分配数据集用户的名称
export function obtainCentratSets(token, arrId) {
  return request({
    url: 'caml-model/model/query/feignSysMy2?token=' + token + '&&deptId=' + arrId,
    method: 'get'
  })
}

// 表名称测试
export function tableNameCheck(paramsObj) {
  return request({
    url: 'caml-model/model/audit/tableNameCheck',
    method: 'get',
    params: paramsObj
  })
}

// 表结构测试
export function tableStrickCheck(paramsObj) {
  return request({
    url: 'caml-model/model/audit/Verifydatabaseconnection',
    method: 'get',
    params: paramsObj
  })
}
