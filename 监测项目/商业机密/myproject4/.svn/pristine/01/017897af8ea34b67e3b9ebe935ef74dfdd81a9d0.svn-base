import request from '@/utils/request'

export function getList(paramObj) {
  return request({
    url: 'monitor/governance/correction/notice',
    method: 'get',
    params: paramObj
  })
}

export function sendNotice(ids) { // 一键发送通知
  return request({
    url: 'monitor/governance/correction/modify?correctId=' + ids,
    method: 'put'
  })
}

export function getViewInfo(correctId) { // 查看人工补正更正（大额，可疑）
  return request({
    url: 'monitor/governance/correction/exam/' + correctId,
    method: 'get'
  })
}
