import request from '@/utils/request'

// 工作流 待认领
export function claimApi(warnResultSum8ADos, workflow) {
  return request({
    url: 'monitor/listwarn/query/allocation',
    method: 'post',
    data: {
      warnResultSum8ADos: warnResultSum8ADos,
      workflow: workflow
    }
  })
}
