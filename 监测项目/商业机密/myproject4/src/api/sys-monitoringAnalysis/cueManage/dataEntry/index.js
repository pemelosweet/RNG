import request from '@/utils/request'

// 数据录入
export function getListapi(params) {
  return request({
    url: '/monitor/inputafter/selectApprovalData',
    method: 'get',
    params: params
  })
}

