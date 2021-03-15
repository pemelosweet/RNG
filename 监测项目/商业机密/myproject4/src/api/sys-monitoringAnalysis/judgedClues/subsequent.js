import request from '@/utils/request'

// 新增
export function onSubmit(params) {
  return request({
    url: 'monitor/reportLeads/Subsequent',
    method: 'post',
    data: params
  })
}
