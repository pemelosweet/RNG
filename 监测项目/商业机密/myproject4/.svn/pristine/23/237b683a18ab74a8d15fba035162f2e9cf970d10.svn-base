import request from '@/utils/request'
// 查看抽样评价结果

// 列表查询
export function listInfo(params) {
  return request({
    url: 'monitor/statistical/listInfo',
    method: 'post',
    data: params
  })
}
// 版本号下拉
export function versionList() {
  return request({
    url: 'monitor/statistical/versionList',
    method: 'get'
  })
}
// 列表统计
export function statistics(params) {
  return request({
    url: 'monitor/statistical/statistics',
    method: 'post',
    data: params
  })
}
// 查看历史 （可疑交易报告）
export function historyRecording(transactionReportId) {
  return request({
    url: 'monitor/random/historyRecording/' + transactionReportId,
    method: 'get'
  })
}
// 随机 查询列表
export function query(params) {
  return request({
    url: 'monitor/random/suspiciousReportList/sync8a',
    method: 'post',
    data: params
  })
}
// 随机 评分
export function organizationList(ricd, xmlId) {
  return request({
    url: 'monitor/random/organizationList/' + ricd + '/' + xmlId,
    method: 'get'
  })
}
// 随机 确定
export function save(params) {
  return request({
    url: 'monitor/random/saveEvaluation',
    method: 'post',
    data: params
  })
}
