import request from '@/utils/request'

export function getList(pramaObj) {
  // 抽取查询列表
  return request({
    url: 'monitor/governance/monitor/c-task',
    method: 'get',
    params: pramaObj
  })
}

export function saveTaskData(paramsObj) {
  // 新建监测任务保存
  return request({
    url: 'monitor/governance/monitor/c-task',
    method: 'post',
    data: paramsObj
  })
}

export function approvalData(id, workflow) { // 提交审批
  return request({
    url: 'monitor/governance/monitor/j-task/examination/and/approval',
    method: 'post',
    data: {
      id: id,
      workflow: workflow
    }
  })
}

export function getResultList(id, params) {
  return request({
    url: 'monitor/governance/monitor/c-task/' + id + '/feed-back',
    method: 'get',
    params: params
  })
}

export function getResultListBao(id, params) {
  return request({
    url: 'monitor/governance/monitor/j-task/' + id + '/feed-back',
    method: 'get',
    params: params
  })
}

export function approvalStaus(id, workflow) { // 提交审批
  return request({
    url: 'monitor/governance/monitor/j-task/examination/and/approval',
    method: 'post',
    data: {
      id: id,
      workflow: workflow
    }
  })
}

// 根据typeId查询数据字典
export function dataTask(typeId) {
  return request({
    url: 'code-manage/codesys/code-detail/detail/' + typeId,
    method: 'get'
  })
}

export function addGetList(paramsObj) {
  // 获取新增抽取列表
  return request({
    url: 'monitor/gbase/trade/list/sync8a',
    method: 'post',
    data: paramsObj
  })
}

export function sendData(id) {
  // 发送
  return request({
    url: 'monitor/governance/monitor/c-task/send/out/sync8a',
    method: 'get',
    params: {
      id
    }
  })
}

export function detailData(id, dPageInfo) {
  return request({
    url: 'monitor/governance/monitor/c-task/feed-back/' + id + '/detail',
    method: 'get',
    params: {
      pageNum: dPageInfo.pageNum,
      pageSize: dPageInfo.pageSize,
      ecdComparisonRes: dPageInfo.ecdComparisonRes
    }
  })
}

export function detailDataBao(id, dPageInfo) {
  return request({
    url: 'monitor/governance/monitor/j-task/feed-back/' + id + '/detail',
    method: 'get',
    params: {
      pageNum: dPageInfo.pageNum,
      pageSize: dPageInfo.pageSize,
      ecdComparisonRes: dPageInfo.ecdComparisonRes
    }
  })
}

export function getTradeData(tradeId, type) {
  return request({
    url: 'caml-query/gbase/trade/trade/one/sync8a',
    method: 'get',
    params: {
      tradeId: tradeId,
      type: type
    }

  })
}

export function updateForm(workflow, correctId) { // 工作流更新接口
  return request({
    url: 'monitor/governance/monitor/c-task/exam/' + correctId,
    method: 'put',
    data: workflow
  })
}
export function extractAll(map) { // 工作流更新接口
  return request({
    url: 'monitor/gbase/trade/listAll/sync8a',
    method: 'post',
    data: map
  })
}
export function taskGetList(id, pageInfo) { // 工作流更新接口
  return request({
    url: 'monitor/governance/monitor/j-task/task/' + id,
    method: 'get',
    params: pageInfo
  })
}
export function getTradeDatas(tradeId, type) { // 工作流更新接口
  return request({
    url: '/caml-query/gbase/trade/trade/one/sync8a',
    method: 'get',
    params: {
      tradeId,
      type
    }
  })
}
