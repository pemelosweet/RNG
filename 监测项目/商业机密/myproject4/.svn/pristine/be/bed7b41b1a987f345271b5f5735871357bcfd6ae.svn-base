import request from '@/utils/request'

// 评价指标模板查询
export function targetlist(map) {
  return request({
    url: 'monitor/target/target-list',
    method: 'post',
    data: map
  })
}
// 评价指标模板新增
export function targetAdd(map) {
  return request({
    url: 'monitor/target/target-add',
    method: 'post',
    data: map
  })
}
// 评价指标模板列表删除
export function deleteTab(targetId) {
  return request({
    url: 'monitor/target/delete/' + targetId,
    method: 'get'
  })
}
// 评价指标模板列表修订反显数据
export function getTargetEntity(targetId) {
  return request({
    url: 'monitor/target/getTargetEntity/' + targetId,
    method: 'get'
  })
}
// 评价指标模板列表修订保存数据
export function updateTarget(map) {
  return request({
    url: 'monitor/target/updateTarget',
    method: 'post',
    data: map
  })
}
