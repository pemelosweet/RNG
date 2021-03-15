import request from '@/utils/request'

export function getList(paramsObj) {
  return request({
    url: 'monitor/governance/correction/check',
    method: 'get',
    params: paramsObj
  })
}

export function getViewAmend(correctId) { // 查看 -- 大额和可疑更正
  return request({
    url: 'monitor/governance/correction/' + correctId + '/checkResult',
    method: 'get'
  })
}

export function getViewSupply(correctId) { // 查看 -- 补充
  return request({
    url: 'monitor/governance/correction/' + correctId + '/supplyResult',
    method: 'get'
  })
}

export function viewMessage(tradeId) { // 查看--原报文
  return request({
    url: 'monitor/governance/correction/init/' + tradeId,
    method: 'get'
  })
}

export function verifyResult(correctId, feedback) {
  return request({
    url: 'monitor/governance/correction/feedback/' + correctId + '/' + feedback,
    method: 'put'
  })
}

export function getOriginalDetail(tradeId, xmlName) { // 原交易详情接口
  return request({
    url: 'monitor/transaction/view',
    method: 'get',
    params: {
      tradeId: tradeId,
      xmlName: xmlName
    }
  })
}

export function getAnsweringDetail(industry, xmlName) {
  return request({
    url: '/receivesys/recivesys/correction/monitor-use',
    method: 'post',
    data: {
      industry: industry,
      xmlName: xmlName
    }
  })
}
