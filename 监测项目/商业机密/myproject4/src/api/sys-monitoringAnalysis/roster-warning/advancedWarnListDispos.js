import request from '@/utils/request'

// 列表页面获取table数据
export function getList(params) {
  return request({
    url: 'monitor/listwarn/warnResult/seniorListWarnProcessing',
    method: 'get',
    params: params
  })
}
