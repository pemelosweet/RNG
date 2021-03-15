import request from '@/utils/request'
// 规则 -- 提交回调-数据更新
export function ruleAnalysisUpdate(id, params) {
  return request({
    url: '/monitor/rules/update?warningNum=' + id,
    method: 'put',
    data: params
  })
}
