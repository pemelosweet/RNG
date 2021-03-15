import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/institutionalusermanagement/batchImport',
    method: 'get',
    params
  })
}
