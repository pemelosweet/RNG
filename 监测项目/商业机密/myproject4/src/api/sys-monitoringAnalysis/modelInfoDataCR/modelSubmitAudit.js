import request from '@/utils/request'
// 数据管控---数据模型管理

// 获取查询列表数据
export function fuzzyQuery(paramsObj) {
  return request({
    url: 'model-jy/model/audit/getTestList',
    method: 'get',
    params: paramsObj
  })
}

// 获取项目列表数据
export function getProductList(paramsObj) {
  return request({
    url: 'model-jy/model/audit/getProductList',
    method: 'get',
    params: paramsObj
  })
}

// 点击提交审核调取接口
export function onClickSubmitPro(id) {
  return request({
    url: 'model-jy/model/audit/submit?modelAId=' + id,
    method: 'post'
  })
}
// 点击提交审核调取接口
export function onClickSubmitPath(id) {
  return request({
    url: 'model-jy/model/audit/submit?path=' + id,
    method: 'get'
  })
}
