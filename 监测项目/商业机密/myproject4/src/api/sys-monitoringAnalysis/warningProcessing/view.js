import request from '@/utils/request'
// 模型预警处理

// 获取列表数据
export function warmSearch(num, size, paramsObj) {
  return request({
    url: 'caml-model/warning/modelAlertDetails?pageNum=' + num + '&pageSize=' + size,
    method: 'get',
    params: paramsObj
  })
}
// 获取列表数据
export function creatXsTable(id) {
  return request({
    url: 'monitor/initiative/checkIsCreateClue/' + id,
    method: 'get'
  })
}

export function jumpIndex(codeMark, paramsObj) {
  return request({
    url: 'monitor/initiative/createClueByTrigger/' + codeMark,
    method: 'post',
    data: paramsObj
  })
}
