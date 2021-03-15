import request from '@/utils/request'

// 根据主键查看举报单详细信息及工作流信息
export function inWorkflow(id) {
  return request({
    url: '/monitor/fill-report/' + id + '/detail',
    method: 'get'
  })
}

// 保存举报单审批信息
export function storageInformation(params) {
  return request({
    url: '/monitor/fill-report/approve',
    method: 'post',
    data: params
  })
}

// 处理状态-分支机构
export function findBranch() {
  return request({
    url: '/monitor/fill-report/find-branch',
    method: 'get'
  })
}

// 获取部门
export function findDept() {
  return request({
    url: '/monitor/fill-report/find-dept',
    method: 'get'
  })
}
