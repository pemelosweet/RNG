import request from '@/utils/request'

//  可疑交易报告预警配置
export function getListapi(params) {
  return request({
    url: 'monitor/taskManage/suspicious/listAnalyzeRelation',
    method: 'get',
    params: params
  })
}

// 停用 启用
export function stopListapi(params) {
  return request({
    url: 'monitor/taskManage/suspicious/stopStatus',
    method: 'post',
    params: params
  })
}

// 删除
export function deleteListapi(suspiciousId) {
  return request({
    url: `monitor/taskManage/suspicious/delete/${suspiciousId}`,
    method: 'delete'
  })
}

