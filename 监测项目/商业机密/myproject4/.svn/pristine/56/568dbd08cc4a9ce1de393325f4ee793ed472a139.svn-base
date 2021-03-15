import request from '@/utils/request'

export function getList(form, pageInfo) {
  return request({
    url: 'monitor/governance/monitor/j-task',
    method: 'get',
    params: {
      startDate: form.dateValue[0],
      endDate: form.dateValue[1],
      dataFrom: form.receiver,
      status: form.status,
      checkResult: form.checkResult,
      pageNum: pageInfo.pageNum,
      pageSize: pageInfo.pageSize
    }
  })
}

export function getResultList(id, form) { // 查看反馈
  return request({
    url: 'monitor/governance/monitor/j-task/' + id + '/feed-back',
    method: 'get',
    params: form
  })
}

export function contrastData(ids) { // 查看--对比
  return request({
    url: 'monitor/governance/monitor/j-task/contrast?ids=' + ids,
    method: 'get'
  })
}

export function viewData(id, pageInfo) { // 查看详情
  return request({
    url: 'monitor/governance/monitor/j-task/feed-back/' + id + '/detail',
    method: 'get',
    params: {
      pageNum: pageInfo.pageNum,
      pageSize: pageInfo.pageSize,
      ecdComparisonRes: pageInfo.ecdComparisonRes
    }
  })
}

export function approvalStaus(id, workflow) { // 提交审批
  return request({
    url: 'monitor/governance/monitor/j-task/examination/and/app',
    method: 'post',
    data: {
      id: id,
      workflow: workflow
    }
  })
}

export function updateForm(workflow, correctId) { // 工作流更新接口
  return request({
    url: 'monitor/governance/monitor/j-task/exam/' + correctId,
    method: 'put',
    data: workflow
  })
}
export function feedback(id) { // 工作流更新接口
  return request({
    url: 'monitor/governance/monitor/j-task/feedback',
    method: 'get',
    params: {
      id: id
    }
  })
}
// export function artificialCorrection(tradeId, industry) { // 工作流更新接口
//   return request({
//     url: 'monitor/governance/correction/correctCheck/' + tradeId + '/0' + '/' + industry,
//     method: 'get'
//   })
// }
export function artificialCorrection(data) { // 工作流更新接口
  return request({
    url: 'monitor/governance/correction/correctCheck',
    method: 'post',
    data
  })
}
