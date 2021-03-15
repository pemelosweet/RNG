import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/dataHandl/process/dispatch',
    method: 'get',
    params
  })
}

export function getExecute() {
  return request({
    url: '/dataHandl/process/execute',
    method: 'get'
  })
}

