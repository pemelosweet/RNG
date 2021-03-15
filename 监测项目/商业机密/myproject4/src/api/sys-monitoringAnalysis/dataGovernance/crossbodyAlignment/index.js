import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/monitor/governance/interagency/task', // 跨机构比对
    method: 'get',
    params: params
  })
}

export function addTaskData(baseTask) { // 新增
  return request({
    url: '/monitor/governance/interagency/task',
    method: 'post',
    data: baseTask
    // headers: {
    //   'Content-Type': 'multipart/form-data'
    // }
  })
}

export function updateTaskData(baseTask) { // 更新
  return request({
    url: '/monitor/governance/interagency/task/update',
    method: 'put',
    data: baseTask
  })
}

export function delTaskData(id) {
  return request({
    url: 'monitor/governance/interagency/task/' + id,
    method: 'delete'
  })
}

export function viewTaskData(id) {
  return request({
    url: '/monitor/governance/interagency/task/' + id,
    method: 'get'
  })
}

export function executionTask(id) {
  // 执行任务
  return request({
    url: 'monitor/governance/interagency/task/task/' + id,
    method: 'post'
  })
}

export function getResultList(baseTask, pageInfo) {
  // 查看比对结果
  return request({
    url: '/monitor/governance/interagency/task/result/sync8a',
    method: 'get',
    params: {
      id: baseTask.id,
      taskPerformS: baseTask.taskPerformS,
      pageNum: pageInfo.pageNum,
      pageSize: pageInfo.pageSize
    }
  })
}

export function getResultDetail(compId) {
  // 查看结果详情
  return request({
    url: 'monitor/governance/interagency/task-history/' + compId + '/result-info',
    method: 'get'
  })
}

export function rinmList(ficp) {
  // 报告机构
  return request({
    url: 'receivesys/organization/getRinmList',
    method: 'post',
    data: {
      ficp: ficp
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
