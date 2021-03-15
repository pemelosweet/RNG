import request from '@/utils/request'

// 根据主键查看举报单详细信息
export function queryApi(id) {
  return request({
    url: '/monitor/fill-report/' + id + '/query',
    method: 'get'
  })
}
// 查看附件
export function uploadApi(id) {
  return request({
    url: '/monitor/fill-report/file-list/' + id,
    method: 'get'
  })
}
// 查看附件
export function workflowUpdate(id, workflow, report) {
  return request({
    url: '/monitor/fill-report/workflow-update',
    method: 'put',
    data: {
      id,
      workflow,
      report
    }
  })
}
