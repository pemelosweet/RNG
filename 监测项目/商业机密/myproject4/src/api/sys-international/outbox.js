import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/outbox',
    method: 'get',
    params
  })
}
