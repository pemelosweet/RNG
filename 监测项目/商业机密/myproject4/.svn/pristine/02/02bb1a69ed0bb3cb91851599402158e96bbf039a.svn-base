import request from '@/utils/request'
// 分支列表
export function getList(params) {
  return request({
    url: '/monitor/reportLeads/reportLeadsSearch',
    method: 'get',
    params: params
  })
}
// 中心列表
export function getListNew(params) {
  return request({
    url: '/monitor/reportLeads/reportLeadsSearchWorkFlow',
    method: 'get',
    params: params
  })
}
// 删除
export function delList(id, clewState) {
  return request({
    url: '/monitor/reportLeads/delete/' + id + '/' + clewState,
    method: 'delete'
  })
}
// 导出
export function exportList(params) {
  return request({
    url: '/monitor/reportLeads/exportBatch',
    method: 'get',
    params: params
  })
}
// 工作流 已提交
export function approvalStaus(reportLeads, workflow) {
  return request({
    url: 'monitor/reportLeads/clue/examination', // 保存变提交
    method: 'post',
    data: {
      reportLeads: reportLeads,
      workflow: workflow
    }
  })
}
// 工作流 分内审批
export function getapproval(reportLeads, workflow) {
  return request({
    url: 'monitor/reportLeads/clue/submitCenter', // 保存变提交
    method: 'post',
    data: {
      reportLeads: reportLeads,
      workflow: workflow
    }
  })
}

// 工作流 已分发(单个)
export function updateForm(reportLeads, workflow) {
  return request({
    url: 'monitor/reportLeads/clue/distribute', // 提交变分发
    method: 'post',
    data: {
      reportLeads: reportLeads,
      workflow: workflow
    }
  })
}

// 工作流 已分发(批量)
// export function updateForms(map) {
//   return request({
//     url: 'monitor/reportLeads/clue/distributes', // 提交变分发
//     method: 'post',
//     data: map
//   })
// }
export function updateForms(reportLeads, workflow) {
  return request({
    url: 'monitor/reportLeads/clue/distributes', // 提交变分发
    method: 'post',
    data: {
      reportLeads: reportLeads,
      workflow: workflow
    }
  })
}
// 工作流 已分配
export function updateForm2(reportLeads, workflow) {
  return request({
    url: 'monitor/reportLeads/clue/allocation', // 分发变分配
    method: 'post',
    data: {
      reportLeads: reportLeads,
      workflow: workflow
    }
  })
}
export function updateForms2(reportLeads, workflow) {
  return request({
    url: 'monitor/reportLeads/clue/allocations', // 分发变分配
    method: 'post',
    data: {
      reportLeads: reportLeads,
      workflow: workflow
    }
  })
}
// 工作流 已分析
export function updateForm3(reportAnalyze, workflow) {
  return request({
    url: 'monitor/reportLeads/analyzeInsert ', // 分配变待已分析
    method: 'post',
    data: {
      reportAnalyze: reportAnalyze,
      workflow: workflow
    }
  })
}
// 工作流 已分析
export function updateForm4(reportAnalyze, workflow) {
  return request({
    url: 'monitor/reportLeads/auditInsert ', // ???
    method: 'post',
    data: {
      reportAnalyze: reportAnalyze,
      workflow: workflow
    }
  })
}
// 已分析 - 待审核

export function upstate(reportLeads) {
  return request({
    url: 'monitor/reportLeads/updateClewState1 ',
    method: 'put',
    data: {
      reportLeads: reportLeads
    }
  })
}
// /置为无效
export function invalid(params) {
  return request({
    url: 'monitor/reportLeads/setInvalid',
    method: 'put',
    data: params
  })
}
//  保存
export function saveApi(params) {
  return request({
    url: 'monitor/reportLeads/reportAnalyzesInsert',
    method: 'post',
    data: params
  })
}
