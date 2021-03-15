import request from '@/utils/request'
// =----------- 新增  -------------
export function sendList(params) {
  return request({
    url: '/monitor/international/addIntelBusiness',
    method: 'post',
    data: params
  })
}
// 发送新增
export function sendLists(params) {
  return request({
    url: '/monitor/international/sendInfomation',
    method: 'post',
    data: params
  })
}
// 详情
export function getList(mailId) {
  return request({
    url: `/monitor/international/selectByInternationalOne/${mailId}`,
    method: 'get'
  })
}

// 附件
export function getfileList(mailId) {
  return request({
    url: `/monitor/international/file-list/${mailId}`,
    method: 'get'
  })
}
export function getIndex(id) {
  return request({
    url: `/monitor/international/judgmentIndex?ourIndex=${encodeURI(id)}`,
    method: 'get'
  })
}
export function getIndex1(id) {
  return request({
    url: `/monitor/international/judgmentIndex?foreignIndex=${encodeURI(id)}`,
    method: 'get'
  })
}

