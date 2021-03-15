import request from '@/utils/request'

export function getList() {
  return request({
    url: '/fileReceive',
    method: 'get'
  })
}
