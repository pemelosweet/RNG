import request from '@/utils/request'

// 统计报表--按主体统计
export function getList(form, pageInfo) { // 获取列表
  return request({
    url: 'caml-query/subject/statist/sync8a',
    method: 'get',
    params: {
      custNameData: form.custNameData,
      credTypeData: form.credTypeData,
      credNoData: form.credNoData,
      starStatisticalTime: form.statisticalTime[0],
      endStatisticalTime: form.statisticalTime[1],
      industryType: form.CustomerType,
      region: form.region,
      indChild: form.indChild,
      st: form.str,
      customerData: form.customerData,
      sort: form.sort,
      type: form.type,
      sortType: form.sortType,
      total: form.total,
      pageNum: pageInfo.pageNum,
      pageSize: pageInfo.pageSize
    }
  })
}

// 轮询获取状态
export function getDataFlag(key) {
  return request({
    url: '/caml-query/statistics/judgeCache/' + key,
    method: 'get'
  })
}

// 获取缓存数据
export function getCacheData(key) {
  return request({
    url: '/caml-query/statistics/cache/' + key,
    method: 'get'
  })
}

export function exportApi(params) {
  return request({
    url: '/caml-query/subject/statist/export',
    method: 'get',
    params
  })
}

export function exportAllApi(params) {
  return request({
    url: '/caml-query/subject/statist/all',
    method: 'get',
    params
  })
}

export function getSum(form, pageInfo) { // 获取列表
  return request({
    url: 'caml-query/subject/statist/sum',
    method: 'get',
    params: {
      custNameData: form.custNameData,
      credTypeData: form.credTypeData,
      credNoData: form.credNoData,
      starStatisticalTime: form.statisticalTime[0],
      endStatisticalTime: form.statisticalTime[1],
      industryType: form.CustomerType,
      region: form.region,
      st: form.str,
      customerData: form.customerData,
      sort: form.sort,
      type: form.type,
      sortType: form.sortType,
      total: form.total,
      indChild: form.indChild,
      pageNum: pageInfo.pageNum,
      pageSize: pageInfo.pageSize
    }
  })
}

// 获取义务机构类型
export function typeInstitutions(params) {
  return request({
    url: 'code-manage/codesys/organ-type/organ-type',
    method: 'get',
    params: params
  })
}
export function getRinmList(id) { // 行业获取业务报告名称
  return request({
    url: 'receivesys/organization/selectOrgInfoByFicp',
    method: 'get',
    params: {
      id: id
    }
  })
}
export function getRinmList1(industry, region, rinm) { // 地区 行业获取业务报告名称
  return request({
    url: 'monitor/statistics/code/select-org',
    method: 'get',
    params: {
      industry: industry,
      region: region,
      rinm: rinm
    }
  })
}
export function getInstitutionName(rinm, region, industry) { //  行业获取业务报告名称
  return request({
    url: 'receivesys/organization/selectOrgInfoByFicp2',
    method: 'get',
    params: {
      rinm: rinm,
      region: region,
      industry: industry
    }
  })
}
export function getRinmList2(region) { // 地区获取业务报告名称
  return request({
    url: 'receivesys/organization/selectOrgInfoByFicp2',
    method: 'get',
    params: {
      region: region
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

// 机构类型一级
export function getIndustryFrist() {
  return request({
    url: 'monitor/codeDetail/info/industryForLarge',
    method: 'get',
    params: {
      type: ''
    }
  })
}

// 机构类型二级
export function getIndustrySecond(params) {
  return request({
    url: 'monitor/codeDetail/info/industryForLarge',
    method: 'get',
    params: params
  })
}

