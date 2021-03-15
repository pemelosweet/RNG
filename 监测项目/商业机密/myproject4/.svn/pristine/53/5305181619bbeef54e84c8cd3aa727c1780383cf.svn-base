import request from '@/utils/request'
// 定制结果
// export function getResultData() { // 根据数据库表定制结果
//   return request({
//     url: '/caml-query/governor/template/customResults',
//     method: 'get'
//   })
// }

export function getList() { // 列表
  return request({
    url: '/caml-query/governor/template/custom/results',
    method: 'get'
  })
}

// export function saveTableData(obj) { // 保存
//   return request({
//     url: '/caml-query/governor/template/customResults',
//     method: 'post',
//     data: obj
//   })
// }

// export function delList(id) { // 删除
//   return request({
//     url: '/caml-query/governor/template/delCustomResults/' + id,
//     method: 'delete'
//   })
// }

export function getViewData(id, tableId) { // 修改回显
  return request({
    url: '/caml-query/governor/template/byCustomResult/' + id + '/' + tableId,
    method: 'get'
  })
}

export function updateData(paramsObj, id) { // 修改
  return request({
    url: '/caml-query/governor/template/uptCustomResults/' + id,
    method: 'post',
    data: paramsObj
  })
}

export function updateState(id, state) { //
  return request({
    url: '/caml-query/governor/template/customApply/' + id + '/' + state,
    method: 'post'
  })
}
