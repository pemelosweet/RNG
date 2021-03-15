import request from '@/utils/request'
// 获取地区
export function getArea() {
  return request({
    url: 'code-manage/codesys/district/tree',
    method: 'get'
  })
}

// 获取省份
export function country(params) { // 交易发生地--国家
  return request({
    url: 'code-manage/codesys/country',
    method: 'get',
    params: params
  })
}

