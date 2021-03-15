import request from '@/utils/request'

export function getIndex(params) {
  return request({
    url: '/dataQuery/dataType/index',
    method: 'get',
    params
  })
}

export function getReceipt(params) {
  return request({
    url: '/dataQuery/receipt',
    method: 'get',
    params
  })
}
