
import request from '@/utils/request'

export function getList(form, pageInfo) { // 清理任务审批列表
  return request({
    url: 'monitor/governance/clean/plan/result',
    method: 'get',
    params: {
      reportName: form.organ,
      tradeId: form.id,
      applyName: form.analyst,
      origin: form.source,
      startTime: form.dateValue,
      state: form.state,
      pageNum: pageInfo.pageNum,
      pageSize: pageInfo.pageSize
    }
  })
}

export function addCleanList(paramsObj) { // 自动清理提交审批
  return request({
    url: 'monitor/governance/clean/plan/approval/list',
    method: 'post',
    data: paramsObj
  })
}

export function updateForm(workflow, pkId) { // 清理工作流更新
  return request({
    url: 'monitor/governance/clean/plan/approval/' + pkId,
    method: 'put',
    data: workflow
  })
}

export function updateAdm(workflow, applyId) { // 行政调查工作流更新
  return request({
    url: 'monitor/governance/clean/plan/approval/' + applyId,
    method: 'put',
    data: workflow
  })
}
