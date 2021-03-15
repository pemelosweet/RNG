import request from '@/utils/request'

// 数据字典接口
export function dictionary(params) {
  return request({
    url: 'code-manage/codesys/code-detail/detail/' + params,
    method: 'get'
  })
}
export function getDepartment(params) {
  return request({
    url: 'sysmanage/outInterFace/listDept',
    method: 'get',
    params: params
  })
}
export function getTable(params) {
  return request({
    url: 'monitor/listwarn/center/sync8a',
    method: 'get',
    params: params
  })
}
// 查看单条名单
export function selectBusinessKey(params) {
  return request({
    url: 'monitor/listwarn/center/selectBusinessKey/' + params,
    method: 'get'
  })
}
// 查看单条名单
export function viewRoster(params) {
  return request({
    url: 'monitor/listwarn/center/' + params + '/sync8a',
    method: 'get'
  })
}
// 删除单条名单
export function delRoster(params) {
  return request({
    url: 'monitor/listwarn/center/' + params,
    method: 'delete'
  })
}

// 批量导出
export function exportData(params) {
  return request({
    url: 'monitor/listwarn/center/export',
    method: 'get',
    params: params
  })
}
// 手动添加名单
export function haddleAddRoster(params) {
  return request({
    url: 'monitor/listwarn/center',
    method: 'post',
    data: params
  })
}

// 校验文件名字
export function verifyFileName(params) {
  return request({
    url: 'monitor/listwarn/center/validateFileName',
    method: 'get',
    params: params
  })
}

// 查询历史-----导入文件
export function searchFileList(params) {
  return request({
    url: 'monitor/listwarn/center/impFileName/sync8a',
    method: 'get',
    params: params
  })
}
// 查询历史-----导入大文件
export function bigannex(params) {
  return request({
    url: 'monitor/listwarn/center/import/bigannex',
    method: 'get',
    params: params
  })
}
// 分析处室-关系映射 保存按钮
export function preservationApi(params) {
  return request({
    url: 'monitor/listwarn/analyze',
    method: 'post',
    data: params
  })
}

export function getPreservationApi(params) {
  return request({
    url: 'monitor/listwarn/analyze',
    method: 'get',
    params: params
  })
}
