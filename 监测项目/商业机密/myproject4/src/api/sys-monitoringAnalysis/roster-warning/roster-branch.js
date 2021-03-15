import request from '@/utils/request'
export function getTable(params) {
  return request({
    url: 'monitor/listwarn/analysis/sync8a',
    method: 'get',
    params: params
  })
}
export function getDepartment(params) {
  return request({
    url: 'sysmanage/outInterFace/listDept',
    method: 'get',
    params: params
  })
}
export function dataYw(params) {
  return request({
    url: 'monitor/listwarn/sensitive/TCCD',
    method: 'get',
    params: params
  })
}

// 查看单条名单
export function viewBranch(params) {
  return request({
    url: 'monitor/listwarn/analysis/' + params + '/sync8a',
    method: 'get'
  })
}
// 删除单条名单
export function delRoster(params) {
  return request({
    url: 'monitor/listwarn/analysis/' + params,
    method: 'delete'
  })
}
// 手动添加名单
export function haddleAddBranch(params) {
  return request({
    url: 'monitor/listwarn/analysis',
    method: 'post',
    data: params
  })
}
// 校验文件名字
export function BranchverifyFileName(params) {
  return request({
    url: 'monitor/listwarn/analysis/validateFileName',
    method: 'get',
    params: params
  })
}
