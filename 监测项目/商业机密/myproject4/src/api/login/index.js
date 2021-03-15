import request from '@/utils/request'

//  公告  -接口

// 列表
export function basicInfo(riid) {
  return request({
    url: 'receivesys/note/openinfo',
    method: 'post',
    data: riid
  })
}

export function viewOne(id) {
  return request({
    url: `receivesys/note/open/${id}`,
    method: 'get'
  })
}
