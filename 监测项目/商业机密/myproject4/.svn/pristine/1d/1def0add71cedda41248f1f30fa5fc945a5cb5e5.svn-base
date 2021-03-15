import request from '@/utils/request'
// 数据迁移
export function getList(paramsObj) {
  return request({
    url: 'caml-query/migration/selectByAll?pageSize=' + paramsObj.pageSize + '&pageNum=' + paramsObj.pageNum,
    method: 'post',
    data: paramsObj
  })
}
export function deleteList(id) {
  return request({
    url: 'caml-query/migration/deleteByData?dataId=' + id,
    method: 'delete'
  })
}
export function implement(paramsObj) {
  return request({
    url: 'caml-query/migration/implement',
    method: 'post',
    data: paramsObj
  })
}

export function tableNameOnline(paramsObj) {
  return request({
    url: 'caml-query/migration/tableNameOnline',
    method: 'post',
    data: paramsObj
  })
}
export function getLists(paramsObj) {
  return request({
    url: 'caml-query/migration/statisticalLog?pageSize=' + paramsObj.pageSize + '&pageNum=' + paramsObj.pageNum,
    method: 'post',
    data: paramsObj
  })
}
// 工作流 已提交
export function approvalStaus(dataId, workflow) {
  return request({
    url: 'monitor/migration/submitMigrationApply', // 保存变提交
    method: 'post',
    data: {
      dataId: dataId,
      workflow: workflow
    }
  })
}
