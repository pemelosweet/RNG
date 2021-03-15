import request from '@/utils/request'

export function getAnalysisiIndex(params) {
  return request({
    url: '/cueManage/analysis/index',
    method: 'get',
    params
  })
}
