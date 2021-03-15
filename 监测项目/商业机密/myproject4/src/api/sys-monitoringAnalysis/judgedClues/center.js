import request from '@/utils/request'
// 分支列表
export function getList(params) {
  return request({
    url: '/monitor/reportLeads/reportLeadsCenter',
    method: 'get',
    params: params
  })
}
// 分支列表
export function getParams(params) {
  return request({
    url: '/monitor/workflow/selectWorkflowParams?pkIds=' + params,
    method: 'get'
  })
}
// 移送
export function goTransfer(data) {
  return request({
    url: '/monitor/reportLeads/launchTransfer',
    method: 'post',
    data
  })
}
// 反洗钱局
export function opAuth() {
  return request({
    url: '/monitor/reportLeads/opAuth',
    method: 'get'
  })
}
// 查看反馈信息
// export function getFeedData(ReportFollowup) {
//   return request({
//     url: 'monitor/reportLeads/selectFeedback',
//     method: 'post',
//     data: ReportFollowup
//   })
// }
export function getFeedData(id) {
  return request({
    url: 'monitor/reportLeads/selectFeedback/' + id,
    method: 'get'

  })
}

