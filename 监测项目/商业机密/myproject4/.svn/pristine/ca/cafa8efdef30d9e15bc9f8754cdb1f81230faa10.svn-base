import request from '@/utils/request'

// 统计按钮
export function statistical(data) {
  return request({
    url: '/caml-query/count/flow/sync8a',
    method: 'post',
    data: data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

// 轮询获取状态
export function getDataFlag(key) {
  return request({
    url: '/caml-query/statistics/judgeCache/' + key,
    method: 'get'
  })
}

// 获取缓存数据
export function getCacheData(key) {
  return request({
    url: '/caml-query/statistics/cache/' + key,
    method: 'get'
  })
}

// 批量导出
export function exportApi(params) {
  return request({
    url: '/caml-query/count/flow/excel',
    method: 'get',
    params
  })
}
// 上传文件后台校验
export function uploadApi(countType, data) {
  return request({
    url: '/' + countType + '/fileValidate',
    method: 'post',
    data: data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
