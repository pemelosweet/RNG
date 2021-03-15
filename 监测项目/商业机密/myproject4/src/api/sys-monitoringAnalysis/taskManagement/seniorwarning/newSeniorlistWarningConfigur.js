import request from '@/utils/request'

// 新建 - 高级名单预警配置

// 编辑 - 提交
export function editListapi(params) {
  return request({
    url: 'monitor/listwarn/analyze/update',
    method: 'put',
    data: params
  })
}

// 查看
export function lookListapi(analyzeId) {
  return request({
    url: `monitor/listwarn/analyze/selectClue/${analyzeId}`,
    method: 'get'
  })
}

// 新建 - 提交
export function sendListapi(params) {
  return request({
    url: 'monitor/listwarn/analyze/insert',
    method: 'post',
    data: params
  })
}

// 涉罪类型
export function getCrimapi() {
  return request({
    url: 'code-manage/codesys/code-detail/detail/TOSC',
    method: 'get'
  })
}

// 预警范围
export function getWarnrangapi() {
  return request({
    url: 'sysmanage/outInterFace/getTreeCode',
    method: 'get'
  })
}

// 预警范围人员
export function getrangNameapi(params) {
  return request({
    url: `sysmanage/outInterFace/getUser2/${params}`,
    // url: 'monitor/model/query/feignSysMy2',
    method: 'get'
    // params: params
  })
}
export function getSeZui() {
  return request({
    url: `monitor/listwarn/analyze/selectConfig`,
    method: 'get'
  })
}
