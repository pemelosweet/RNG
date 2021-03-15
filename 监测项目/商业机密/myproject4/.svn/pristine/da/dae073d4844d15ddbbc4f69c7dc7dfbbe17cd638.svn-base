import request from '@/utils/request'

// 列表页面获取table数据
export function getTable(params) {
  return request({
    url: 'monitor/listwarn/authorization/sync8a',
    method: 'get',
    params: params
  })
}

// 批量保存授权管理
export function Addauthorization(params, submitPath) {
  return request({
    url: submitPath,
    method: 'post',
    data: params
  })
}
// 保存授权管理
export function Addauthorization2(params) {
  return request({
    url: 'monitor/listwarn/authorization',
    method: 'post',
    data: params
  })
}

// 删除授权管理
export function delAuthorization(params) {
  return request({
    url: `monitor/listwarn/authorization/${params}`,
    method: 'delete'
  })
}

// 新建授权-- 添加名单----列表页面获取table数据
export function centerRoster(params) {
  return request({
    url: 'monitor/listwarn/authorization/listName/sync8a',
    params: params
  })
}

// 列表页面获取table数据
export function getSingle(id, powResult) {
  return request({
    url: `monitor/listwarn/authorization/${id}/sync8a/${powResult}`,
    method: 'get'
  })
}
