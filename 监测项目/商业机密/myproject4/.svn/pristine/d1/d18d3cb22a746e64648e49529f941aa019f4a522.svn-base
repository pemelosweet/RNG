import request from '@/utils/request'
// 主体账户参数管理

// 获取查询列表数据
export function rankingListData(params) {
  return request({
    url: 'caml-model/accountParam/conditionQuery',
    method: 'get',
    params: params
  })
}

// 新增参数接口
export function addRankingData(params) {
  return request({
    url: 'caml-model/accountParam/addParam',
    method: 'post',
    data: params
  })
}
// 新建页面数据获取
export function lookRankingData(id) {
  return request({
    url: 'caml-model/accountParam/getSubInfo/' + id,
    method: 'get'
  })
}
// 获取查看历史修改参数
export function rankingHistoryList(obj) {
  return request({
    url: 'caml-model/accountParam/getUpdateInfo',
    method: 'get',
    params: obj
  })
}

// 修改接口
export function updataRanking(params) {
  return request({
    url: 'caml-model/accountParam/updateEqualsAdd',
    method: 'post',
    data: params
  })
}

// 校验名称是否重复
export function onBlurEvent(name) {
  return request({
    url: 'caml-model/accountParam/reCheck?key=' + name,
    method: 'get'
  })
}
