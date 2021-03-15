import request from '@/utils/request'

// 数据字典接口
export function dictionary(params) {
  return request({
    url: 'code-manage/codesys/code-detail/detail/' + params,
    method: 'get'
  })
}

export function singlecuru(params) {
  return request({
    url: 'monitor/information/match-singlecuru', // 出入境
    method: 'get',
    params
  })
}
export function singleper(params) {
  return request({
    url: 'monitor/information/match-singleper', // 身份证
    method: 'get',
    params
  })
}
export function batchcuru(data) {
  return request({
    url: 'monitor/information/match-batchcuru', // 出入境
    method: 'post',
    data
  })
}
export function batchper(data) {
  return request({
    url: 'monitor/information/match-batchper', // 身份证
    method: 'post',
    data
  })
}

export function getDate() {
  return request({
    url: 'monitor/information/codesys/code-detail',
    method: 'get'
  })
}

export function updateDate(data) {
  return request({
    url: `code-manage/codesys/code-detail/detail/PPXXQX/0001/${data.num}`,
    method: 'put'
  })
}
