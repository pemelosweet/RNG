import request from '@/utils/request'

export function industry(params) {
  // 所属行业
  return request({
    url: 'code-manage/codesys/organ-type/organ-type',
    method: 'get',
    params: params
  })
}

export function industrChild(id) {
  // 所属子行业
  return request({
    url: 'code-manage/codesys/organ-type/organ-type/child/' + id,
    method: 'get'
  })
}

export function branchList(typeId) {
  // 分支机构
  return request({
    url: 'code-manage/codesys/code-detail',
    method: 'get',
    params: typeId
  })
}

export function rinmList(category) {
  // 报告机构
  return request({
    url: 'receivesys/organization/getRinmList',
    method: 'post',
    data: {
      ficp: category
    }
  })
}

export function getCRinmList(rinm) { // 获取报告机构名称--联想下拉效果接口(全部行业)
  // 报告机构
  return request({
    url: 'receivesys/organization/getRinmsToMointor/' + rinm,
    method: 'get'
  })
}

export function getRinmName(params) { // 获取报告机构名称--联想下拉效果接口(银证保)
  return request({
    url: '/receivesys/organization/getRinms/' + params,
    method: 'get'
  })
}

export function getRicdName(params) { // 获取报告机构编码
  return request({
    url: '/receivesys/organization/getRicds/' + params,
    method: 'get'
  })
}

export function getNetworkName(params) { // 获取网点机构名称--联想下拉效果接口
  return request({
    url: '/receivesys-release/getBarInfoByRicd2/' + params,
    method: 'get'
  })
}

export function industryType() {
  // 行业类型
  return request({
    url: 'code-manage/codesys/organ-type/organ-type',
    method: 'get'
  })
}

export function getRinmList(params) { // 报告机构模糊查询--查8a
  return request({
    url: 'monitor/statistics/code/select-org',
    method: 'get',
    params: params
  })
}
