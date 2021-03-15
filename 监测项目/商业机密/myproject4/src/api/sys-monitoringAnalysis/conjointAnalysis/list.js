import request from '@/utils/request'
// 查询信息
export function getList(params) {
  return request({
    url: '/monitor/joint-analysis/forPage',
    method: 'get',
    params: params
  })
}
// 查询新增详情
export function getDetail(params, url) {
  return request({
    url: url,
    method: 'get',
    params: params
  })
}
// 修改联合分析

export function modification(params) {
  return request({
    url: 'monitor/joint-analysis',
    method: 'put',
    data: params
  })
}
// 删除附件
export function delAttach(params, url) {
  return request({
    url: url,
    method: 'get',
    params: params
  })
}
// 删除分析结果附件
export function delAttachRseout(params, url) {
  return request({
    url: url,
    method: 'delete',
    params: params
  })
}
// 分支机构
export function branch(params) {
  return request({
    url: 'code-manage/codesys/code-detail',
    method: 'get',
    params: params
  })
}
// 工作流更新接口
export function updateForm(workflow, jointAnalysisDO) {
  return request({
    url: 'monitor/joint-analysis/update',
    method: 'put',
    data: {
      jointAnalysisDO: jointAnalysisDO,
      workflow: workflow
    }
  })
}
// 结束工作流
export function finish(params, jointId) {
  return request({
    url: 'monitor/joint-analysis/finishAnalysis/' + jointId,
    method: 'put',
    data: params
  })
}
