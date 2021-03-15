import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/artificialCorrection/list',
    method: 'get',
    params
  })
}

export function getInfo(params) {
  return request({
    url: '/artificialCorrection/info',
    method: 'get',
    params
  })
}

export function getNotice(params) {
  // 人工补正要求管理
  return request({
    url: '/artificialCorrection/info',
    method: 'get',
    params
  })
}
