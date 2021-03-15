import request from '@/utils/request'

// 获取地区
export function tree() {
  return request({
    url: 'code-manage/codesys/district/tree',
    method: 'get'
  })
}
// 删除附件
export function deleteAttach(fileId) {
  return request({
    url: 'monitor/thread/adm/deleteAttach/' + fileId,
    method: 'post'
  })
}

// 反馈表单附件列表
export function fileFeedback(feedbackId) {
  return request({
    url: 'monitor/thread/adm/fileFeedback/' + feedbackId,
    method: 'get'
  })
}
