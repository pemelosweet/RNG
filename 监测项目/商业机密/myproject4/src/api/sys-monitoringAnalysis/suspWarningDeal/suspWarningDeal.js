import request from '@/utils/request'

export function sendgetListData(params) {
  return request({
    url: 'monitor/findByReportDispose/findAll',
    method: 'post',
    data: params
  })
}
