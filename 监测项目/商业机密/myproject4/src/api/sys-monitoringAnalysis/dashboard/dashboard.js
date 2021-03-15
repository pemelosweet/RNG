import request from '@/utils/request'
// 仪表盘
export function getUrl(params) {
  return request({
    url: 'monitor/microstrategy/loadLable/ybp',
    method: 'get',
    params: params
  })
}
