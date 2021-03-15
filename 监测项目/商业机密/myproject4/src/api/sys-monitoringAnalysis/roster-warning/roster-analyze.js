import request from '@/utils/request'

// 查询列表
export function getTable(params) {
  return request({
    url: 'monitor/listwarn/analyst/sync8a',
    method: 'get',
    params: params
  })
}
// 查看/编辑 单条名单
export function viewRoster(params) {
  return request({
    url: 'monitor/listwarn/analyst/' + params + '/sync8a',
    method: 'get'
  })
}

// 编辑回显示 单条名单
export function select(params) {
  return request({
    url: 'monitor/listwarn/analyst/select/' + params + '/sync8a',
    method: 'get'
  })
}

// 删除单条名单
export function delRoster(params) {
  return request({
    url: 'monitor/listwarn/analyst/' + params,
    method: 'delete'
  })
}

// 手动添加名单
export function haddleAddRoster(params) {
  return request({
    url: 'monitor/listwarn/analyst',
    method: 'post',
    data: params
  })
}
// listwarn/analyst/import/
export function fileRepeat(params) {
  return request({
    url: 'monitor/listwarn/analyst/import/' + params,
    method: 'get'
  })
}

