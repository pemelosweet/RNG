import request from '@/utils/request'

export function getList(paramsObj) {
  return request({
    url: 'monitor/governance/monitor/task-history',
    method: 'get',
    params: paramsObj
  })
}
