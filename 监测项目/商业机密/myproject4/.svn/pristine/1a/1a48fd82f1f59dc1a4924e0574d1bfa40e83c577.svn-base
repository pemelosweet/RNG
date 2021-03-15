import request from '@/utils/request'
// 数据管控---数据模型管理

// 获取查询列表数据
export function fuzzyQuery(paramsObj) {
  return request({
    url: 'caml-model/createData/selectByOne?PageSize=' + paramsObj.PageSize + '&PageNum=' + paramsObj.PageNum,
    method: 'post',
    data: paramsObj
  })
}

// 删除
export function dataDelete(id) {
  return request({
    url: 'caml-model/createData/delete?dataTemplateId=' + id,
    method: 'delete'
  })
}

// 批量删除
export function batchDelete(params) {
  return request({
    url: 'caml-model/createData/batchDelete?dataTemplateId=' + params,
    method: 'delete'
  })
}

// 启动
export function start(modelTable, dataTemplateId, cModelTable) {
  return request({
    url: 'caml-model/createData/start?modelTable=' + modelTable + '&&dataTemplateId=' + dataTemplateId + '&&cModelTable=' + cModelTable,
    method: 'post'
  })
}

// 批量启动
export function batchStart(modelTable, params, cModelTable) {
  return request({
    url: 'caml-model/createData/batchStart?dataTemplateId=' + params + '&&modelTable=' + modelTable + '&&cModelTable=' + cModelTable,
    method: 'post'
  })
}

// 编辑表数据
export function toEdit(name) {
  return request({
    url: 'caml-model/createData/selectByedit?tableName=' + name,
    method: 'post'
  })
}
// 编辑保存
export function sendToEditData(params) {
  return request({
    url: 'caml-model/createData/edit',
    method: 'post',
    data: params
  })
}

// 模板详情
export function selectDetails(id) {
  return request({
    url: 'caml-model/createData/selectDetails?dataTemplateId=' + id,
    method: 'get'
  })
}
// 新建模板请求数据
export function newDataRow() {
  return request({
    url: 'caml-model/newTemplate/selectByOne',
    method: 'get'
  })
}
// 新建模板请求数据二级数据
export function newDataRowTow(id) {
  return request({
    url: 'caml-model/newTemplate/selectByTwo?fMId=' + id,
    method: 'get'
  })
}

// 获取数据表名
export function newTableName(id) {
  return request({
    url: 'caml-model/newTemplate/selectByThree?dId=' + id,
    method: 'get'
  })
}

// 获取字段名
export function newDataFiled(ids, tableName, tableNameN, artificial, fMId) {
  return request({
    url: 'caml-model/newTemplate/selectByFour?tId=' + ids + '&&cTableName=' + tableName + '&&tableName=' + tableNameN + '&&artificial=' + artificial + '&&fMId=' + fMId,
    method: 'post'
  })
}

// 发送新建组装数据
export function sendAssembly(params) {
  return request({
    url: 'caml-model/createData/savaTemplate',
    method: 'post',
    data: params
  })
}

// 新增表
export function createTableJK(params) {
  return request({
    url: 'caml-model/newTemplate/create',
    method: 'post',
    data: params
  })
}

// 删除
export function TableDelete(params) {
  return request({
    url: 'caml-model/newTemplate/delete',
    method: 'post',
    data: params
  })
}

