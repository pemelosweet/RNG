import request from '@/utils/request'

// 提交修改表单
export function resetPass(riid) {
  return request({
    url: 'receivesys/resetPass',
    method: 'post',
    data: riid
  })
}

export function accounts(id) {
  return request({
    url: `receivesys/resetPass/${id}`,
    method: 'get'
  })
}
// 获取 noteId
export function attachId() {
  return request({
    url: '/receivesys/resign/returnId',
    method: 'get'
  })
}
// 更新表单
export function updateForm(params, id) {
  return request({
    url: `receivesys/organization/updateOrgInfoChangeStream/${id}`,
    method: 'put',
    data: params
  })
}
