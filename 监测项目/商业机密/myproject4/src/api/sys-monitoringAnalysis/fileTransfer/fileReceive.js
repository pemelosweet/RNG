import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/monitor/intel-transmit/select-transmit',
    method: 'get',
    params
  })
}

export function remove(params) {
  return request({
    url: '/monitor/intel-transmit/delete-attach',
    method: 'patch',
    params
  })
}

export function removeAll() {
  return request({
    url: '/monitor/intel-transmit/deletes-attach',
    method: 'patch'
  })
}

export function downloads(params) {
  return request({
    url: '/monitor/upload/down-attach',
    method: 'get',
    params
  })
}
export function getTK() {
  return request({
    url: '/monitor/fileupload/token?type=1',
    method: 'get'
  })
}
// 获取fileID
export function getFileIds(id) {
  return request({
    url: '/file-service/upload/' + id,
    method: 'get'
  })
}
// 打包下载附件
export function downloadFileZip(id) {
  return request({
    url: '/file-service/upload/download-file-zip/' + id,
    method: 'get'
  })
}

