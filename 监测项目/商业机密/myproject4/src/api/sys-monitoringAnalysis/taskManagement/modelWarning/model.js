import request from '@/utils/request'

export function getSerchList(num, size, params) {
  return request({
    url: 'caml-model/warning/modelEarlyWarningTaskQuery?pageSize=' + size + '&pageNum=' + num,
    method: 'post',
    data: params
  })
}

export function getLookList(id) {
  return request({
    url: 'caml-model/warning/selectById/' + id,
    method: 'get'
  })
}

// 分配
export function giveObjInfo(params) {
  return request({
    url: 'monitor/modelWarning/modelEarlyWarningTaskQuery',
    method: 'post',
    data: params
  })
}

// 处置回显
export function getReasptInfo(id) {
  return request({
    url: 'monitor/dispose/commonPage/disPoseInfo?pkId=' + id,
    method: 'get'
  })
}

// 判断是否处置处置回显
export function getNoAllReaspt(id) {
  return request({
    url: 'monitor/initiative/checkIsCreateClue/' + id,
    method: 'get'
  })
}

// 分配成功调取
export function fpPeopleSuccessReaspt(modelName) {
  return request({
    url: 'caml-model/model/audit/selectByAuditTypeAndModelKey/' + modelName.modelName + '/' + modelName.warningNumber,
    method: 'get'
  })
}

