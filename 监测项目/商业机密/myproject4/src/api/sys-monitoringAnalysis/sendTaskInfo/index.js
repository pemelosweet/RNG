import request from '@/utils/request'

// 身份证件
export function newBranch(typeId) {
  return request({
    url: 'code-manage/codesys/code-detail/detail/' + typeId,
    method: 'get'
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

// 保存

export function analyst(params) {
  return request({
    url: 'monitor/analyse-task/analyseInsert',
    method: 'post',
    data: params
  })
}
// 编辑
export function analystUpdate(params) {
  return request({
    url: 'monitor/analyse-task/update',
    method: 'put',
    data: params
  })
}
// 直接发布
export function centerInsert(params) {
  return request({
    url: 'monitor/analyse-task/centerInsert',
    method: 'post',
    data: params
  })
}
// 结束任务
export function stopTask(params) {
  return request({
    url: 'monitor/analyse-task/endTask',
    method: 'post',
    data: params
  })
}
// 工作流

export function approvalStaus(jointAnalysisDO, workflow) {
  return request({
    url: 'monitor/joint-analysis/examination/and/approval',
    method: 'post',
    data: {
      jointAnalysisDO: jointAnalysisDO,
      workflow: workflow
    }
  })
}
// 判断汇总分析结果是否显示
export function judgmentResultDisplay(params) {
  return request({
    url: 'monitor/joint-analysis/opAuth',
    method: 'get',
    params: params
  })
}
// 判断已发布能否编辑
export function canEdit(params) {
  return request({
    url: 'monitor/joint-analysis/opAuth2',
    method: 'get',
    params: params
  })
}
export function canEdit1() {
  return request({
    url: 'monitor/joint-analysis/opAuth3',
    method: 'get'
  })
}
export function canEdit4() {
  return request({
    url: 'monitor/joint-analysis/opAuth4',
    method: 'get'
  })
}
// mastr
// export function branch1(params) {
//   return request({
//     url: 'code-manage/codesys/code-detail',
//     method: 'get',
//     params: params
//   })
// }
// 分支行的接口----------------------------------------
// 1.开始分析&&结束分析接口
export function changeStatus(obj) {
  return request({
    url: 'monitor/analyse-task/updateTaskInformation',
    method: 'put',
    data: obj
  })
}
