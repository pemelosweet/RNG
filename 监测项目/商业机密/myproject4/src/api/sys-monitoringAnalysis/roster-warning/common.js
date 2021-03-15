import request from '@/utils/request'

// 数据字典接口
export function dictionary(params) {
  return request({
    url: 'code-manage/codesys/code-detail/detail/' + params,
    method: 'get'
  })
}

// 机构组织树--tree
export function tree(params) {
  return request({
    url: '/sysmanage/outInterFace/tree',
    method: 'get',
    params: params

  })
}

// 机构组织树--tree
export function getTree(params) {
  return request({
    url: '/sysmanage/outInterFace/getTreeCode',
    method: 'get',
    params: params

  })
}

// 部门人员
export function deptUser(params) {
  return request({
    url: '/sysmanage/outInterFace/getUser',
    method: 'get',
    params: params

  })
}
// 省份
export function province(params) {
  return request({
    url: 'code-manage/codesys/district/province',
    method: 'get',
    params: params

  })
}
// 国家
export function country(params) {
  return request({
    url: 'code-manage/codesys/country',
    method: 'get',
    params: params

  })
}
// 查询
export function fetchData(params) {
  return request({
    url: 'monitor/listwarn/center/queryByLid/sync8a',
    method: 'get',
    params: params
  })
}
