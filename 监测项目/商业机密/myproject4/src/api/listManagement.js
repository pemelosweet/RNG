import request from '@/utils/request'

export function getList() {
  return request({
    url: 'listManagement',
    method: 'get'
  })
}

export function getbatchImport() {
  return request({
    url: 'listManagement/batchImport',
    method: 'get'
  })
}
