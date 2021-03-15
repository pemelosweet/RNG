import request from '@/utils/request'

// 数字字典
export function branch(params) {
  return request({
    url: 'code-manage/codesys/code-detail',
    method: 'get',
    params: params
  })
}
// 删除列表
export function deleteItem(params) {
  return request({
    url: 'monitor/special-apply/' + params,
    method: 'delete'
  })
}
// 新增线索分析

export function clue(params) {
  return request({
    url: 'monitor/special-apply',
    method: 'post',
    data: params
  })
}
// 保存线索分析

export function save(params) {
  return request({
    url: 'monitor/special-apply/saveApply',
    method: 'post',
    data: params
  })
}
// 线索分析统计
export function statistics(params) {
  return request({
    url: 'monitor/special-apply/total',
    method: 'get',
    params: params
  })
}
// 线索分析查询
export function research(params) {
  return request({
    url: 'monitor/special-apply',
    method: 'get',
    params: params
  })
}
// 查询新增详情
export function getDetail(params, url) {
  return request({
    url: url,
    method: 'get',
    params: params
  })
}
// 工作流

export function approvalStaus(specialApplyDO, workflow) {
  return request({
    url: 'monitor/special-apply/specialApply',
    method: 'post',
    data: {
      specialApplyDO: specialApplyDO,
      workflow: workflow
    }
  })
}
// 工作流更新接口
export function updateForm(specialApplyDO, workflow) {
  return request({
    url: 'monitor/special-apply/update',
    method: 'put',
    data: {
      specialApplyDO: specialApplyDO,
      workflow: workflow
    }
  })
}
// 删除附件
export function delAttach(params, url) {
  return request({
    url: url,
    method: 'get',
    params: params
  })
}
