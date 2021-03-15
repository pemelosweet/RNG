import request from '@/utils/request'

// 监测分析工作台--事项提醒
export function matterTooltip(params) { // 列表
  return request({
    url: 'monitor/bench/list/1',
    method: 'get',
    params: params
  })
}

export function matterTooltip2(params) { // 列表
  return request({
    url: 'monitor/bench/list/0',
    method: 'get',
    params: params
  })
}

export function dealStatus(params) { // 快速处理
  return request({
    url: 'monitor/bench/changeStatus',
    method: 'post',
    params: params
  })
}

export function isDelData(id) { // 判断模板是否已删除
  return request({
    url: 'caml-query/governor/template/is-del/' + id,
    method: 'get'
  })
}
