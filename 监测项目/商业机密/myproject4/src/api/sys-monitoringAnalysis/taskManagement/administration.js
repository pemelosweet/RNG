import request from '@/utils/request'

export function seniorResultDistribution(params) {
  return request({
    url: 'monitor/listwarn/select',
    method: 'get',
    params: params
  })
}
