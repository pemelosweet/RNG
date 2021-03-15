import request from '@/utils/request'
// 发起人工补正
export function getInfo(data, pageNum, pageSize) { // 获取补正信息
  return request({
    url: '/monitor/governance/correction/trade' + '?pageNum=' + pageNum + '&pageSize=' + pageSize,
    method: 'post',
    data
    // params: {
    //   correctType: form.correctType,
    //   industry: form.industry
    // }
  })
}

export function addCorrectData(obj) { // 添加发起人工补正--大额更正
  return request({
    url: '/monitor/governance/correction/correct',
    method: 'post',
    data: obj
  })
}
export function addWork(obj) { // 添加发起人工补正--大额更正--工作流
  return request({
    url: '/monitor/governance/correction/update/list',
    method: 'put',
    data: obj
  })
}
export function addWorkBC(obj) { // 添加发起人工补正--补充--工作流
  return request({
    url: '/monitor/governance/correction/update/supply',
    method: 'put',
    data: obj
  })
}
export function addsuspData(obj) { // 添加发起人工补正--可疑更正
  return request({
    url: 'monitor/governance/correction/correct',
    method: 'post',
    data: obj
  })
}

export function addSupplyData(obj) { // 添加发起人工补正--补充
  return request({
    url: 'monitor/governance/correction/supply',
    method: 'post',
    data: obj
  })
}

export function addOtherCorrectData(paramsObj) { // 从数据抽样其他地方发起人工补正--大额更正
  return request({
    url: '/monitor/governance/correction/data/list',
    method: 'post',
    data: paramsObj
  })
}

export function addOtherSuspData(paramsObj) { //  从数据抽样其他地方发起人工补正--可疑更正
  return request({
    url: 'monitor/governance/correction/data/list',
    method: 'post',
    data: paramsObj
  })
}

export function getFiled(paramsObj) {
  // 获取待更正字段列表下拉数据
  return request({
    url: 'monitor/governance/correction/correctField',
    method: 'get',
    params: paramsObj
  })
}

export function updateForm(workflow, correctId) { // 工作流更新
  console.log('correctId', correctId)
  return request({
    url: '/monitor/governance/correction/exam3/' + correctId,
    method: 'put',
    data: workflow
  })
}

export function correctCheck(data, uuid) { // 工作流校验
  return request({
    url: 'monitor/governance/correction/correctCheck/' + uuid,
    method: 'post',
    data: data
  })
}
// 人工补正校验错误接口
export function correctCheckError(uuid) { // 工作流校验
  return request({
    url: 'monitor/governance/correction/getResult/' + uuid,
    method: 'get'
  })
}
// 根据typeId查询数据字典
export function dataFiled(typeId) {
  return request({
    url: 'code-manage/codesys/code-detail/detail/' + typeId,
    method: 'get'
  })
}

// export function getRinmList(ficp) {
//   // 报告机构
//   return request({
//     url: 'receivesys/organization/getRinmList',
//     method: 'post',
//     data: {
//       // category: category,
//       ficp: ficp
//       // firc: firc
//     }
//   })
// }

export function getCRinmList(rinm) {
  // 报告机构
  return request({
    url: 'receivesys/organization/getRinmsToMointor/' + rinm,
    method: 'get'
  })
}
export function getLog() {
  // 报告机构
  return request({
    url: '/monitor/governance/correction/forsaveywlog',
    method: 'get'
  })
}

