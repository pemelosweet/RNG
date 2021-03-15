import request from '@/utils/request'

// 可疑交易统计分析
export function getList(form, pageInfo) { // 获取列表
  return request({
    url: 'monitor/payorg/statistics',
    method: 'get',
    params: {
      statisticalType: form.statisticalType,
      starStatisticalTime: form.statisticalTime[0],
      endStatisticalTime: form.statisticalTime[1],
      region: form.region,
      industryType: form.industryType,
      mechanismType: form.mechanismType,
      st: form.str,
      tsdr: form.tsdr,
      CustomerType: form.CustomerType,
      order: form.order,
      sort: form.sort,
      pageNum: pageInfo.pageNum,
      pageSize: pageInfo.pageSize
    }
  })
}

export function getSum(form, pageInfo) { // 获取列表
  return request({
    url: 'monitor/payorg/statistics/sum',
    method: 'get',
    params: {
      statisticalType: form.statisticalType,
      starStatisticalTime: form.statisticalTime[0],
      endStatisticalTime: form.statisticalTime[1],
      region: form.region,
      industryType: form.industryType,
      mechanismType: form.mechanismType,
      st: form.str,
      tsdr: form.tsdr,
      CustomerType: form.CustomerType,
      order: form.order,
      sort: form.sort,
      pageNum: pageInfo.pageNum,
      pageSize: pageInfo.pageSize
    }
  })
}

// 统计报表--大额导出
export function getExport(form) { // 获取列表
  return request({
    url: 'monitor/payorg/statistics/export',
    method: 'get',
    params: {
      statisticalType: form.statisticalType,
      starStatisticalTime: form.statisticalTime[0],
      endStatisticalTime: form.statisticalTime[1],
      region: form.region,
      industryType: form.CustomerType,
      mechanismType: form.mechanismType,
      st: form.str,
      CustomerType: form.nature,
      tsdr: form.tsdr,
      ids: form.ids
    }
  })
}

export function getRinmList(category, area, rinm) { // 报告机构
  return request({
    url: 'monitor/statistics/code/select-org',
    method: 'get',
    params: {
      industry: category,
      region: area,
      rinm: rinm
    }
  })
}
// 机构类型
export function getIndustry() {
  return request({
    url: 'code-manage/codesys/organ-type/tree',
    method: 'get',
    params: {
    }
  })
}

// 获取地区
export function administrativeDivision(params) {
  return request({
    url: 'monitor/statistics/code/select-dept',
    method: 'get',
    params
  })
}
