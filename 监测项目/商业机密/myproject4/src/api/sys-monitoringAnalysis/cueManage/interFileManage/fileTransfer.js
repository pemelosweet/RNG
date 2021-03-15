import request from '@/utils/request'

// 删除附件
export function deletefileApi(fileId) {
  return request({
    url: `/file-service/upload/delete-physical-file/${fileId}`,
    method: 'get'
  })
}

// 获取 ID
export function getIdApi() {
  return request({
    url: '/international/mail/key',
    method: 'get'
  })
}

export function getfileSizeApi(fileSize) {
  return request({
    url: '/international/mail/validate-size',
    method: 'get',
    params: fileSize
  })
}
// 删除附件
export function delAttach(fileId) {
  return request({
    url: '/file-service/upload/delete-attach/' + fileId,
    method: 'get'
  })
}

export function bigannex(noteId) {
  return request({
    url: '/monitor/listwarn/center/import/bigannex/' + noteId,
    method: 'get'
  })
}

export function delBigannex(fileId) {
  return request({
    url: '/monitor/listwarn/center/import/bigannex/' + fileId,
    method: 'delete'
  })
}
