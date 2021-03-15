import request from '@/utils/request'
// 抽样历史记录
export function getList(paramsObj) { // 数据抽样历史列表
  return request({
    url: 'monitor/governance/sampale/task/history/lists',
    method: 'get',
    params: paramsObj
  })
}

export function viewSamplingList(id) { // 查看抽样任务
  return request({
    url: 'monitor/governance/sampale/task/one/' + id,
    method: 'get'
  })
}
