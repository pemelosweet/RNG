import request from '@/utils/request'

export function getList(form, pageInfo) {
  return request({
    url: 'monitor/governance/monitor/task-approval',
    method: 'get',
    params: {
      dataFrom: form.dataFrom,
      status: form.status,
      createDate: form.createDate,
      pageNum: pageInfo.pageNum,
      pageSize: pageInfo.pageSize
    }
  })
}

// export function approvalTask() {
//   return request({
//     url: '',
//     method: ''
//   })
// }
