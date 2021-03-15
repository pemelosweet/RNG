import request from '@/utils/request'

// 评价指标模板查询
export function listAll(map) {
  return request({
    url: 'monitor/organization/list-All',
    method: 'post',
    data: map
  })
}
// 增加评价机构模板
export function organizationAdd(map) {
  return request({
    url: 'monitor/organization/organization-add',
    method: 'post',
    data: map
  })
}
// 删除评价机构对象
export function del(organizationId) {
  return request({
    url: 'monitor/organization/delete/' + organizationId,
    method: 'get'
  })
}
// 通过id获取评价机构模板对象
export function getEntityOrganization(organizationId) {
  return request({
    url: 'monitor/organization/getEntityOrganization/' + organizationId,
    method: 'get'
  })
}
// 修改评价机构对象
export function updateOrganization(map) {
  return request({
    url: 'monitor/organization/updateOrganization',
    method: 'post',
    data: map
  })
}
// 机构名称
export function listRinm(category, keyword) {
  return request({
    url: 'monitor/organization/listRinm',
    method: 'get',
    params: {
      category,
      keyword
    }
  })
}
// 查看评价机构
export function evaluationOrganization(organizationTemplateName) {
  return request({
    url: 'monitor/organization/list-EvaluationOrganization',
    method: 'post',
    params: {
      organizationTemplateName
    }
  })
}

export function listFicp(map) {
  return request({
    url: 'monitor/organization/list-Ficp',
    method: 'post',
    data: map
  })
}

export function listCategory(map) {
  return request({
    url: 'monitor/organization/list-Category',
    method: 'post',
    data: map
  })
}
