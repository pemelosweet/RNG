import request from '@/utils/request'
// 模板管理
export function getList(paramsObj) {
  return request({
    url: '/caml-query/governor/template/condition',
    method: 'get',
    params: paramsObj
  })
}

export function delData(ids) {
  // 删除
  return request({
    url: '/caml-query/governor/template/' + ids,
    method: 'delete'
  })
}

export function initData() {
  // 新增模板--获取模板初始化数据
  return request({
    url: '/caml-query/governor/template/redirect',
    method: 'get'
  })
}

export function exitItem() {
  // 报告、交易--编辑
  return request({
    url: '/caml-query/governor/template/edit',
    method: 'get'
  })
}

export function tplRelease(ids) {
  // 报告、交易--编辑
  return request({
    url: '/caml-query/governor/template/release/' + ids,
    method: 'get'
  })
}

export function tplReleaseRevoke(ids) {
  // 报告、交易--编辑
  return request({
    url: '/caml-query/governor/template/revoke/release/' + ids,
    method: 'get'
  })
}

export function dyDownList(typeId) {
  // 获取数据字典里面列表
  return request({
    url: 'code-manage/codesys/code-detail/detail/' + typeId,
    method: 'get'
  })
}

export function addTpl(paramsObj) {
  // 新增
  return request({
    url: '/caml-query/governor/template',
    method: 'post',
    data: paramsObj
  })
}

export function updateTpl(paramsObj, id) {
  return request({
    url: '/caml-query/governor/template/' + id,
    method: 'post',
    data: paramsObj
  })
}

export function tplViewData(id) {
  // 模板返显
  return request({
    url: '/caml-query/governor/template/basis/' + id + '/select',
    method: 'get'
  })
}

export function getNetworkName(name) {
  // 义务机构网点名称
  return request({
    url: 'monitor/finn/getFinnsByName?name=' + name,
    method: 'get'
  })
}
