import request from '@/utils/request'
// 数据管控---建模数据信息

// 获取查询列表数据
export function searchModeling(paramsObj) {
  return request({
    url: 'model-jy/model/query/selectModel?pageSize=' + paramsObj.pageSize + '&pageNum=' + paramsObj.pageNum,
    method: 'post',
    data: paramsObj
  })
}
// 获取查询列表数据--可用数据列表
export function searchModeling1(paramsObj) {
  return request({
    url: 'model-jy/model/query/selectModel1?pageSize=' + paramsObj.pageSize + '&pageNum=' + paramsObj.pageNum,
    method: 'post',
    data: paramsObj
  })
}

// 批量删除及删除
export function dataAllDeletes(id, type, taskId) {
  return request({
    url: 'model-jy/model/query/deleteds?dsId=' + id + '&type=' + type + '&taskId=' + taskId,
    method: 'delete'
  })
}
// 预览数据
export function previewData(data) {
  return request({
    url: 'model-jy/previewData/select',
    method: 'get',
    params: data
  })
}
// 预览数据的人工上传
export function artificialUpload(Id) {
  return request({
    url: 'model-jy/model/query/openexcel?id=' + Id,
    method: 'post'
  })
}

// 分配数据集
export function addDataCentratSets(token) {
  return request({
    url: 'model-jy/model/query/feignSys?token=' + token,
    method: 'get'
  })
}
// 获取分配数据集用户的名称
export function obtainCentratSets(token, arrId) {
  return request({
    url: 'model-jy/model/query/feignSysMy2?token=' + token + '&&deptId=' + arrId,
    method: 'get'
  })
}
// 查看数据连接
export function viewDataConnection(taskId) {
  return request({
    url: 'model-jy/model/userlist/selectlinkinfor?taskId=' + taskId,
    method: 'get'
  })
}

// 查看数据模板详情
export function dataTemplateDetails(taskId) {
  return request({
    url: 'model-jy/model/query/dataTemplateDetails?taskId=' + taskId,
    method: 'get'
  })
}
// 查看数据可见范围 dataVisibility
export function dataVisibility(taskId) {
  return request({
    url: 'model-jy/model/query/dataVisibility?dsId=' + taskId,
    method: 'get'
  })
}

// 添加数据集
export function dSUser(params) {
  return request({
    url: 'model-jy/model/query/dSUser',
    method: 'post',
    data: params
  })
}
