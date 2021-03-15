import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/dataQuery/dataType/index',
    method: 'get',
    params
  })
}

export function getCustomresult(params) { // 定制结果
  return request({
    url: '/dataQuery/dataType/index',
    method: 'get',
    params
  })
}
