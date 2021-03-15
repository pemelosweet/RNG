import request from '@/utils/request'

// 数字证书 - 接口

export function basicInfo(riid) {
  // 基本信息
  return request({
    url: 'receivesys/certificate/basic',
    method: 'get'
    // params: riid
  })
}

export function applyFig(params) {
  // 数字证书申请
  return request({
    url: 'receivesys/certificate',
    method: 'post',
    data: params
  })
}

export function getList(cerId) {
  // 申请信息展示
  return request({
    url: 'receivesys/certificate/showInfo',
    method: 'post',
    data: cerId
  })
}

export function downList(cerid) {
  // 下载
  return request({
    url: 'receivesys/certificate/download/' + cerid,
    method: 'get',
    params: cerid
  })
}

// 更新表单
export function updateForm(params, id) {
  return request({
    url: `receivesys/organization/updateOrgInfoChangeStream/${id}`,
    method: 'put',
    data: params
  })
}
