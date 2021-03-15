import request from '@/utils/request'

export function getList() {
  return request({
    url: '/common/dataVisible',
    method: 'get'
  })
}

export function getDealcontrast() {
  return request({
    url: '/dealContrast',
    method: 'get'
  })
}

export function changeLog() {
  return request({
    url: '/changeLog',
    method: 'get'
  })
}
