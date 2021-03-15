import request from '@/utils/request'

export function getList(form, pageInfo) {
  return request({
    url: 'monitor/governance/scan/rule',
    method: 'get',
    params: {
      srName: form.srName,
      srStatus: form.srStatus,
      pageNum: pageInfo.pageNum,
      pageSize: pageInfo.pageSize
    }
  })
}

export function approvalData(name, status) {
  return request({
    url: 'monitor/governance/scan/rule/trial/lists',
    method: 'post',
    data: {

    }
  })
}
