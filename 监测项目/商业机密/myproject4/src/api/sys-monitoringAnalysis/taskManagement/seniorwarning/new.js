import request from '@/utils/request'

// 新建 - 高级名单预警列表
// 编辑 - 提交
export function getList(params) {
  return request({
    url: 'monitor/listwarn/query/SeniorlistWarnResult',
    method: 'get',
    params
  })
}
// 查询回显
export function EchoList(id) {
  return request({
    url: 'monitor/listwarn/analyze/selectSeniorListWarn/' + id,
    method: 'get'
  })
}

// 分配
export function distributionList(data) {
  return request({
    url: 'monitor/listwarn/warnResult/insertRange',
    method: 'post',
    data
  })
}
