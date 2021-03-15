import request from '@/utils/request'
export function Authority() {
  return request({
    url: 'caml-query/migration/judgmentAuthority',
    method: 'get'
  })
}
// 保存方法
export function AddList(data) {
  return request({
    url: 'caml-query/migration/saveByData',
    method: 'post',
    data
  })
}

// 修改方法
export function upDataList(data) {
  return request({
    url: 'caml-query/migration/edit',
    method: 'post',
    data
  })
}
export function getInfo(id) {
  return request({
    url: 'caml-query/migration/getMigrationData/' + id,
    method: 'get'
  })
}
export function onlineNearLine(id, type) {
  return request({
    url: 'caml-query/migration/onlineNearLine?migrationMode=' + id + '&migrationTableName=' + type,
    method: 'get'
  })
}
export function UpdateData(data) {
  return request({
    url: 'monitor/migration/updateMigrationData',
    method: 'put',
    data
  })
}

export function tableNameOnline(id, type) {
  return request({
    url: 'caml-query/migration/tableNameOnline?migrationMode=' + id + '&migrationTableName=' + type,
    method: 'get'
  })
}
