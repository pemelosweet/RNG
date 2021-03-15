import request from '@/utils/request'

// 根据主键查看举报单详细信息及工作流信息
export function submit(data) {
  return request({
    url: `monitor/message/save`,
    method: 'post',
    data: data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export function query(params) {
  return request({
    url: `monitor/message/count`,
    method: 'get',
    params
  })
}

export function update(params) {
  return request({
    url: `monitor/message/update`,
    method: 'put',
    params
  })
}

export function validate(params) {
  return request({
    url: `monitor/message/details`,
    method: 'get',
    params
  })
}

export function exportData(params) {
  return request({
    url: `monitor/message/export`,
    method: 'get',
    params
  })
}
