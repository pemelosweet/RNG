import request from '@/utils/request'
// 交易详情--大额
export function getTradeDetail(tradeId, type) {
  return request({
    url: '/caml-query/gbase/trade/trade/one/sync8a',
    method: 'get',
    params: {
      tradeId: tradeId,
      type: type
    }
  })
}

// 机构类型一级
export function getIndustryFrist() {
  return request({
    url: 'monitor/statistics/code/industry',
    method: 'get',
    params: {
      type: ''
    }
  })
}
// 机构类型二级
export function getIndustrySecond(params) {
  return request({
    url: 'monitor/statistics/code/industry',
    method: 'get',
    params: params
  })
}

// 义务机构名称
export function getRinmList(params) { // 报告机构
  return request({
    url: 'monitor/statistics/code/select-org',
    method: 'get',
    params
  })
}
