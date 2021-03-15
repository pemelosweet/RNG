import request from '@/utils/request'

export function getDataList(num, size, params) {
  return request({
    url: 'monitor/rules/selectByResult2?pageSize=' + size + '&pageNum=' + num,
    method: 'post',
    data: params
  })
}

export function getLookRuleList(id) {
  return request({
    url: 'monitor/rules/selectByIds/' + id,
    method: 'get'
  })
}

// 分配
export function giveRuleObjInfo(params) {
  return request({
    url: 'monitor/rules/ruleDistribution',
    method: 'post',
    data: params
  })
}
