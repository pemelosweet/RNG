import request from '@/utils/request'

// 列表页面获取table数据
export function getTable(params) {
  return request({
    url: 'monitor/listwarn/warn-job',
    method: 'GET',
    params: params
  })
}

// 列表页面--修改状态
export function delRule(id, status) {
  return request({
    url: `monitor/listwarn/warn-job/${id}/${status}`,
    method: 'patch'
  })
}

// 中心名单  ---添加名单----列表页面获取table数据
export function centerRoster(params) {
  return request({
    url: 'monitor/listwarn/center/page/forListWarn/sync8a',
    params: params
  })
}

// 分析员名单  ---添加名单----列表页面获取table数据
export function analyst(params) {
  return request({
    url: 'monitor/listwarn/analyst/sync8a',
    method: 'get',
    params: params
  })
}

// 查询预警规则
export function rule(params) {
  return request({
    url: 'monitor/listwarn/warn-rule',
    method: 'get',
    params: params
  })
}

// 发布任务
export function publish(params) {
  return request({
    url: 'monitor/listwarn/warn-job',
    method: 'post',
    data: params
  })
}

// 编辑/回显单条
export function single(params) {
  return request({
    url: `monitor/listwarn/warn-job/${params}`,
    method: 'get'
  })
}

// 修改名单
export function modify(params) {
  return request({
    url: `monitor/listwarn/warn-job`,
    method: 'put',
    data: params
  })
}

// 编辑/回显单条
export function deleteSingle(params) {
  return request({
    url: `monitor/listwarn/warn-job/${params}`,
    method: 'delete'
  })
}

export function approving(listWarnJobDO, workflow) {
  return request({
    url: `monitor/listwarn/warn-job/examination/and/approval`,
    method: 'post',
    data: {
      listWarnJobDO: listWarnJobDO,
      workflow: workflow
    }
  })
}

export function seniorApproving(listWarnJobDO, workflow) {
  return request({
    url: `monitor/listwarn/warn-job/senior/examination/and/approval`,
    method: 'post',
    data: {
      seniorListWarnJob: listWarnJobDO,
      workflow: workflow
    }
  })
}

export function auditInsert(form, workflow) {
  return request({
    url: `monitor/listwarn/warn-job/auditInsert`,
    method: 'post',
    data: {
      listWarnJobDO: form,
      workflow: workflow
    }
  })
}

export function getPermission() {
  return request({
    url: `monitor/listwarn/warn-job/isapprover`,
    method: 'get'
  })
}

export function validateName(params) {
  return request({
    url: `monitor/listwarn/warn-job/checkRe`,
    method: 'get',
    params
  })
}
