import request from '@/utils/request'

export function getIndexData(num, size, params) {
  return request({
    url: 'monitor/ruleConfig/selectByRuleConfig?pageSize=' + size + '&pageNum=' + num,
    method: 'post',
    data: params
  })
}
// 获取预警范围数据
export function earlyWarning() {
  return request({
    url: 'caml-model/model/query/feignSys',
    method: 'get'
  })
}

// 停用启用
export function startWarning(params) {
  return request({
    url: 'monitor/ruleConfig/stopStatus',
    method: 'post',
    data: params
  })
}

// 获取部门名称
export function getClassName(id) {
  return request({
    url: 'sysmanage/system/sysDept/get/' + id,
    method: 'get'
  })
}

// 查看 /modelConfig/lookConfig
export function lookInfoData(id) {
  return request({
    url: 'monitor/ruleConfig/lookConfig?mRcId=' + id,
    method: 'get'
  })
}
// 新建 保存
export function saveWarning(params) {
  return request({
    url: 'monitor/ruleConfig/saveByConfig',
    method: 'post',
    data: params
  })
}
// 编辑 保存 /modelConfig/editConfig
export function eitaSaveWarning(params) {
  return request({
    url: 'monitor/ruleConfig/editConfig',
    method: 'post',
    data: params
  })
}
// 删除
export function deleteWarning(params) {
  return request({
    url: 'monitor/ruleConfig/deleteConfig',
    method: 'post',
    data: params
  })
}

// 获取分配数据集用户的名称
export function doubletainCentratSets(arrId) {
  return request({
    url: 'sysmanage/outInterFace/getUser2/' + arrId,
    method: 'get'
  })
}

// 获取下拉框数据
export function selectInfo(lab) {
  return request({
    url: 'monitor/rules/ruleName?chClientType=' + lab,
    method: 'get'
  })
}

// 获取不能选择的数据
export function getSelectDisable() {
  return request({
    url: 'monitor/modelConfig/selectByStart',
    method: 'get'
  })
}

