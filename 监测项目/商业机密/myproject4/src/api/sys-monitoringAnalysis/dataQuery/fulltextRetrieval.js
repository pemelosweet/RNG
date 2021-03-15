import request from '@/utils/request'
// 全文检索

export function getOptionDBInfos() {
  return request({
    url: '/caml-search/retrieval_scope/initialize',
    method: 'get'
  })
}
// 非结构化列表
export function getList(params) { // 列表
  return request({
    url: '/caml-search/query_hit_page', // 之前用的
    // url: '/caml-search/structured_mq',
    method: 'get',
    params: params
  })
}
// 结构化列表
export function getListBefore(params) { // 列表
  return request({
    // url: '/caml-search/query_hit_page', // 之前用的
    url: '/caml-search/structured_mq',
    method: 'get',
    params: params
  })
}
export function getInfoByTableNameAndId(params) { // 列表
  return request({
    url: '/caml-query/structure/select/details/' + params.id + '/' + params.index_type,
    method: 'get'
  })
}
// 非结构下载
export function toUrl(params) { // 状态
  return request({
    url: '/caml-hbase/hbase/more/' + params.uuid + '/' + encodeURI(JSON.stringify(params.downloadTwo)) + '/' + encodeURI(JSON.stringify(params.downloadOne)),
    method: 'get'
  })
}
export function toUrlStatus(params) { // 状态
  return request({
    url: '/caml-hbase/hbase/morestate/' + params,
    method: 'get'
  })
}
// 结构化下载
export function toUrlJieGou(params) { // 状态
  return request({
    url: '/caml-query/structure/export/' + params.uuid + '/' + encodeURI(JSON.stringify(params.downloadFour)) + '/' + encodeURI(JSON.stringify(params.downloadThree)),
    method: 'get'
  })
}
export function toUrlStatusJieGou(params) { // 状态
  return request({
    url: '/caml-query/structure/morestate/' + params,
    method: 'get'
  })
}
// export function getBaoGao(params) {
//   return request({
//     url: '/caml-query/report/query/import/attach_path/sync8a?ta',
//     method: 'get',
//     params: params
//   })
// }
