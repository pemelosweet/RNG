import request from '@/utils/request'

// 首页 - 接口

export function getList() {
  return request({
    url: 'receivesys/home/list',
    method: 'post'
  })
}

//  大额 可疑 top5 切换数据
export function getTopFive(type) {
  return request({
    url: `receivesys/home/topnum/${type}`,
    method: 'get'
  })
}

// 获取下一个节点参数
export function oparateData(params) {
  return request({
    url: 'receivesys/workflow/listTasks',
    method: 'get',
    params: params
  })
}

// 事项提醒
export function matterTooltip(params) {
  return request({
    url: 'receivesys/bench/home-info',
    method: 'post',
    data: params
  })
}
