import request from '@/utils/request'

export function validateSize(fileSize) {
  return request({
    url: '/receivesys-release/file-transmit/validate-size',
    method: 'get',
    params: fileSize
  })
}

export function fileSend(data) {
  return request({
    url: '/receivesys-release/file-transmit/file-send',
    method: 'post',
    data
  })
}

export function getIdApi(data) {
  return request({
    url: '/receivesys-release/file-transmit/getKey',
    method: 'get',
    data
  })
}
export function getTK() {
  return request({
    url: '/file-service/fileupload/token?type=1',
    method: 'get'
  })
}
// 删除附件
export function deleteFile(transmitIds) {
  return request({
    url: '/file-service/file-transmit/delete-attach',
    method: 'patch',
    params: transmitIds
  })
}
// 清空附件
export function deleteAllFile() {
  return request({
    url: '/receivesys-release/file-transmit/deletes-attach',
    method: 'patch'
  })
}
// 附件查询
export function searchFile(param) {
  return request({
    url: '/receivesys-release/file-transmit/select-transmit?pageNum=' + param.pageNum + '&pageSize=' + param.pageSize,
    method: 'get'
  })
}
export function syncTran() {
  return request({
    url: '/file-service/sync/transmit',
    method: 'get'
  })
}

