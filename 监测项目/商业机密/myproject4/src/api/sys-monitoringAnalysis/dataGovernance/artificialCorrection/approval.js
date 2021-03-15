import request from '@/utils/request'

export function getList(form, pageInfo) { // 补正任务审批
  return request({
    url: 'monitor/governance/correction/exam',
    method: 'get',
    params: {
      reportBody: form.reportBody,
      proposer: form.proposer,
      dataState: form.dataState,
      startAppTime: form.startAppTime,
      pageNum: pageInfo.pageNum,
      pageSize: pageInfo.pageSize
    }
  })
}

export function approvalData(examineResult, examineOpinion) {
  return request({
    url: 'monitor/governance/correction/exam',
    method: 'post',
    data: {
      examineResult,
      examineOpinion
    }
  })
}

export function getApprovalInfo(correctId) { // 审批弹框查看回显
  return request({
    url: 'monitor/governance/correction/' + correctId,
    method: 'get'
  })
}

export function getDetailInfo(tradeId) {
  return request({
    url: 'monitor/governance/correction/high/trade/' + tradeId,
    method: 'get'
  })
}
