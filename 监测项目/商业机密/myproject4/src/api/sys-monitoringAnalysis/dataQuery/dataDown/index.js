import request from '@/utils/request'

export function getNearOffKey(params) { // 查询接口
  return request({
    url: '/caml-query/query/template/task',
    method: 'get',
    params: params
  })
}
export function delNearOffKey(id) { // 删除
  return request({
    url: '/caml-query/query/template/task-list/' + id,
    method: 'delete'
  })
}

export function findNearOffKey(id) { // 查询列表按钮
  return request({
    url: '/caml-query/query/template/task-list/' + id,
    method: 'get'
  })
}
// // 下载
// export function downLoadingNearOffKey(id) { // 查询列表按钮
//   return request({
//     url: '/caml-query/query/template/download/task-list/' + id,
//     method: 'get'
//   })
// }
