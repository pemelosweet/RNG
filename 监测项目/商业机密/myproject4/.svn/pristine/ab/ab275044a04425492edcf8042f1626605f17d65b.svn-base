import request from '@/utils/request'

export function getModelName(params) {
  return request({
    url: 'model-jy/model/audit/modelName',
    method: 'get',
    params: params
  })
}

export function getIndexData(num, size, params) {
  return request({
    url: 'monitor/modelConfig/selectByModelConfig?pageSize=' + size + '&pageNum=' + num,
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
    url: 'monitor/modelConfig/stopStatus',
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
    url: 'monitor/modelConfig/lookConfig?mCid=' + id,
    method: 'get'
  })
}
// 新建 保存
export function saveWarning(params) {
  return request({
    url: 'monitor/modelConfig/saveByConfig',
    method: 'post',
    data: params
  })
}
// 编辑 保存 /modelConfig/editConfig
export function eitaSaveWarning(params) {
  return request({
    url: 'monitor/modelConfig/editConfig',
    method: 'post',
    data: params
  })
}
// 删除
export function deleteWarning(id, name) {
  return request({
    url: 'monitor/modelConfig/deleteConfig?mCid=' + id + '&modelName=' + name,
    method: 'delete'
  })
}

// 获取分配数据集用户的名称
export function doubletainCentratSets(arrId) {
  return request({
    url: 'sysmanage/outInterFace/getUser2/' + arrId,
    method: 'get'
  })
}

// // 获取是否已分配的数据名称
// export function aleryModelName() {
//   return request({
//     url: 'monitor/modelConfig/selectByModelConfig2',
//     method: 'get'
//   })
// }
