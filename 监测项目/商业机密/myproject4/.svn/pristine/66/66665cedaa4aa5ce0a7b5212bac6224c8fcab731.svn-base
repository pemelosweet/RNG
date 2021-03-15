import request from '@/utils/request'

export function getList(paramsObj) {
  return request({
    url: '/monitor/governance/correction/selectHistories',
    method: 'get',
    params: paramsObj
  })
}

export function viewData(correctId, pageInfo) { // 查看
  return request({
    url: 'monitor/governance/correction/getList/' + correctId,
    method: 'get',
    params: pageInfo
  })
}
