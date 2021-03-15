import request from '@/utils/request'

export function getList(paramsObj) { // 数据抽样列表
  return request({
    url: '/monitor/governance/sampale/task',
    method: 'get',
    params: paramsObj
  })
}

export function addSamplingList(paramsObj) { // 建立抽样任务
  return request({
    url: 'monitor/governance/sampale/task',
    method: 'post',
    data: paramsObj
  })
}

export function updateSamplingList(paramsObj) { // 建立抽样任务
  return request({
    url: 'monitor/governance/sampale/task/updOne',
    method: 'put',
    data: paramsObj
  })
}

export function viewSamplingList(id) { // 查看抽样任务
  return request({
    url: 'monitor/governance/sampale/task/one/' + id,
    method: 'get'
  })
}

export function delSamplingList(id) { // 删除抽样任务
  return request({
    url: '/monitor/governance/sampale/task?id=' + id,
    method: 'delete'
  })
}

export function executionTask(id) { // 执行任务
  return request({
    url: 'monitor/governance/sampale/task/satrt/sample/task',
    method: 'get',
    params: { id: id }
  })
}

// 根据typeId查询数据字典
export function dataTask(typeId, paramsObj) {
  return request({
    url: 'code-manage/codesys/code-detail/detail/' + typeId,
    method: 'get',
    params: paramsObj
  })
}
// 根据typeId查询数据字典--模糊查询
export function dataDimqueryTask(paramsObj) {
  return request({
    url: 'code-manage/codesys/code-detail',
    method: 'get',
    params: paramsObj
  })
}

export function ftccList(paramsObj) { // 字典获取涉外收支交易分类与代码
  return request({
    url: 'code-manage/codesys/tsct',
    method: 'get',
    params: paramsObj
  })
}

export function currencyList(paramsObj) { // 字典获取涉外收支交易分类与代码
  return request({
    url: 'code-manage/codesys/money',
    method: 'get',
    params: paramsObj
  })
}

export function getSampleList(id, pageInfo) { // 查看交易
  return request({
    url: 'monitor/governance/sampale/task/sample/result/sync8a',
    method: 'get',
    params: {
      id: id,
      pageNum: pageInfo.pageNum,
      pageSize: pageInfo.pageSize
    }
  })
}

export function getTradeDetail(tradeId, xmlName) {
  return request({
    url: 'monitor/transaction/view',
    method: 'get',
    params: {
      tradeId: tradeId,
      xmlName: xmlName
    }
  })
}
