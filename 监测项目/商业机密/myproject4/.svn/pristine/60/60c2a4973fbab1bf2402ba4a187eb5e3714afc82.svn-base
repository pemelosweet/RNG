import request from '@/utils/request'
// 反馈信息权限管理
export function getList(paramsObj) { // 列表
  return request({
    url: 'monitor/feedback/JurisdictionDO/selectJurisdiction',
    method: 'get',
    params: {
      PageNum: paramsObj.pageNum,
      PageSize: paramsObj.pageSize
    }
  })
}

export function getQuery(paramsObj) { // 查询
  return request({
    url: 'monitor/feedback/JurisdictionDO/selectStateName',
    method: 'get',
    params: {
      userName: paramsObj.userName,
      state: paramsObj.state
    }
  })
}

export function updateState(paramsObj) { // 启用/禁用状态
  return request({
    url: 'monitor/feedback/JurisdictionDO/updateState',
    method: 'patch',
    data: paramsObj
  })
}

export function deleteData(roleId) { // 删除
  return request({
    url: 'monitor/feedback/JurisdictionDO/delectRoleId',
    method: 'delete',
    params: { roleId }
  })
}

export function addData(paramsObj) { // 新增
  return request({
    url: 'monitor/feedback/JurisdictionDO/insertFeedback',
    method: 'post',
    data: paramsObj
  })
}

export function updateData(paramsObj) { // 修改
  return request({
    url: 'monitor/feedback/JurisdictionDO/updateById',
    method: 'patch',
    data: paramsObj
  })
}

export function getRoleList() { // 库表获取角色
  return request({
    url: '/sysmanage/sys/user/roleAll',
    method: 'get'
  })
}
