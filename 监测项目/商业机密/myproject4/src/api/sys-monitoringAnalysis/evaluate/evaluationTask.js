import request from '@/utils/request'

// 评价任务列表
export function listAll(map) {
  return request({
    url: 'monitor/evaluationManager/list-All',
    method: 'post',
    data: map
  })
}
// 评价任务列表删除单个
export function deleteTask(evaluationTaskId, status) {
  return request({
    url: 'monitor/evaluationManager/deleteTask/' + evaluationTaskId + '/' + status,
    method: 'get'
  })
}
// 获取指标体系
export function systems() {
  return request({
    url: 'monitor/evaluationManager/systems',
    method: 'get'
  })
}
// 获取评价范围
export function ranges() {
  return request({
    url: 'monitor/evaluationManager/ranges',
    method: 'get'
  })
}
// 根据指标体系展示数据
export function queryFirstTargetName(targetSystem) {
  return request({
    url: 'monitor/evaluationManager/queryFirstTargetName/' + targetSystem,
    method: 'get'
  })
}
// 根据评价范围展示数据
export function queryOrganization(evaluationRange) {
  return request({
    url: 'monitor/evaluationManager/queryOrganization/' + evaluationRange,
    method: 'get'
  })
}
// 查看任务反显数据
export function queryTask(evaluationTaskId) {
  return request({
    url: 'monitor/evaluationManager/queryTask/' + evaluationTaskId,
    method: 'get'
  })
}
// 保存
export function checkTaskUpdate(evaluationTask) {
  return request({
    url: 'monitor/evaluationManager/checkTaskUpdate',
    method: 'post',
    data: evaluationTask
  })
}
// 创建新的
export function judge(evaluationTask) {
  return request({
    url: 'monitor/evaluationManager/judge',
    method: 'post',
    data: evaluationTask
  })
}
// 编辑保存后校验
export function checkTargetTemplate(evaluationTask) {
  return request({
    url: 'monitor/evaluationManager/checkTargetTemplate',
    method: 'post',
    data: evaluationTask
  })
}
// 任务生效
export function taskEffective(evaluationTaskId) {
  return request({
    url: 'monitor/evaluationManager/taskEffective/' + evaluationTaskId,
    method: 'get'
  })
}
export function queryOrganizationByKeyWord(evaluationRange, keyWord) {
  return request({
    url: 'monitor/evaluationManager/queryOrganizationByKeyWord',
    method: 'get',
    params: {
      evaluationRange,
      keyWord
    }
  })
}
