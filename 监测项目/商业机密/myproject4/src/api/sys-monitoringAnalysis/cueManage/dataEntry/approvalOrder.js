import request from '@/utils/request'

// 数据录入申请 录入

// 流转记录
export function getcircuitapi(aId) {
  return request({
    url: `/monitor/inputafter/transactGj/${aId}`,
    method: 'get'
  })
}

// 获取附件列表
export function getfileListapi(aId, fileType) {
  return request({
    url: `/monitor/inputafter/file-list/${aId}/${fileType}`,
    method: 'get'
  })
}

// 获取详情
export function getviewapi(aId) {
  return request({
    url: `/monitor/inputafter/selectByaid/${aId}`,
    method: 'get'
  })
}

// 保存 提交
export function sendSubmitapi(params) {
  return request({
    url: '/monitor/inputafter/addInfomation',
    method: 'post',
    data: params
  })
}
// 查询编号
export function getNumapi(id) {
  return request({
    url: `/monitor/inputafter/selectEvokeNum?evokeNum=${encodeURI(id)}`,
    method: 'get'
  })
}
