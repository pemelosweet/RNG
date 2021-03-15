import request from '@/utils/request'

// 线索管理-匹配信息查询 信息查询-查询按钮
export function exports(params) {
  return request({
    url: 'monitor/information/result-export',
    method: 'get',
    params
  })
}

// 重查外部委
export function againSearch(params) {
  return request({
    url: `monitor/information/batch/send/${params.type}/${params.ids}`,
    method: 'put'
  })
}

// 通知消息跳转查询
export function getNoticeData(params, data) {
  return request({
    url: `monitor/information/studio/singleper/${params.id}/${params.type}`,
    method: 'post',
    data
  })
}

export function updateTime(obj, data) {
  return request({
    url: `monitor/information/expireTime/${obj.type}`,
    method: 'put',
    data
  })
}
