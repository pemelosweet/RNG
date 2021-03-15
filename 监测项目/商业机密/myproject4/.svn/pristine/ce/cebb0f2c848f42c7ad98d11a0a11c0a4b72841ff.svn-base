import request from '@/utils/request'
// 模型预警处理

// 获取列表数据
export function warmSearch(size, num, paramsObj) {
  return request({
    url: 'caml-model/warning/select?pageSize=' + size + '&pageNum=' + num,
    method: 'post',
    data: paramsObj
  })
}

// 删除
export function warmDataDelete(id) {
  return request({
    url: 'caml-model/warning/delete?warningId=' + id,
    method: 'delete'
  })
}

// 批量删除
export function warmBatchDelete(params) {
  return request({
    url: 'caml-model/model/audit/deletedss?ids=' + params,
    method: 'delete'
  })
}
