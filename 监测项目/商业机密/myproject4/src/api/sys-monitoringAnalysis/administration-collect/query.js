import request from '@/utils/request'

// 保存行政调查数据
export function postAdmInvestigation(params) {
  return request({
    url: 'monitor/admInvestigation',
    method: 'post',
    data: params
  })
}

// 查询行政调查数据
export function getAdmInvestigation(params) {
  return request({
    url: 'monitor/admInvestigation/page',
    method: 'post',
    data: params
  })
}

// 查询行政调查数据
export function getTotal(params) {
  return request({
    url: 'monitor/admInvestigation/total',
    method: 'get',
    params: params
  })
}

// 查询行政调查数据
export function getSingle(params) {
  return request({
    url: `monitor/admInvestigation/select`,
    method: 'get',
    params: params
  })
}
