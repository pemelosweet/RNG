import request from '@/utils/request'

export function getList() {
  return request({
    url: 'artificialCorrection/info',
    method: 'get'
  })
}
