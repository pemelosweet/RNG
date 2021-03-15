import request from '@/utils/request'

export function getList() {
  return request({
    url: 'institutionalusermanagement/informationManagement',
    method: 'get'
  })
}
