import request from '@/utils/request'

// 数据字典接口
export function getElement(params) {
  return request({
    url: 'code-manage/codesys/code-detail/detail/' + params,
    method: 'get'
  })
}

// 添加预警要素
export function addRule(params, method) {
  return request({
    url: 'monitor/listwarn/warn-rule-dic',
    method: method,
    data: params
  })
}

// 查询预警条件
export function getTableRule(params) {
  return request({
    url: 'monitor/listwarn/warn-rule-dic/queryAll',
    method: 'get',
    params: params
  })
}

// 启动暂停预警条件
export function killRule(params) {
  return request({
    url: 'monitor/listwarn/warn-rule-dic',
    method: 'delete',
    params: params
  })
}

// // 查看单条名单
// export function viewRoster(params) {
//   return request({
//     url: 'monitor/listwarn/analyst/' + params,
//     method: 'get'
//   })
// }
// // 删除单条名单
// export function delRoster(params) {
//   return request({
//     url: 'monitor/listwarn/analyst/' + params,
//     method: 'delete'
//   })
// }

