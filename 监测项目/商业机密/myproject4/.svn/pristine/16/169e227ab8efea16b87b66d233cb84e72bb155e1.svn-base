import request from '@/utils/request'

// 高级名单预警配置
export function getListapi(params) {
  return request({
    url: 'monitor/listwarn/analyze/listAnalyzeRelation',
    method: 'get',
    params: params
  })
}

// 停用 启用
export function stopListapi(params) {
  return request({
    url: 'monitor/listwarn/analyze/stopStatus',
    method: 'post',
    params: params
  })
}

// 删除
export function deleteListapi(analyzeId) {
  return request({
    url: `monitor/listwarn/analyze/delete/${analyzeId}`,
    method: 'delete'
  })
}
// 推送
export function pushInfo(params) {
  return request({
    url: 'monitor/listwarn/analyze/pushMode',
    method: 'get',
    params: params
  })
}

// 涉罪类型
export function getCrimapi() {
  return request({
    url: 'code-manage/codesys/code-detail/detail/TOSC',
    method: 'get'
  })
}
