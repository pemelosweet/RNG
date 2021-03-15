import request from '@/utils/request'

//  可疑交易报告预警配置 - 新建

// 报送方向
export function getDirectionapi() {
  return request({
    url: `code-manage/codesys/code-detail/detail/DORP`,
    method: 'get'
  })
}

// 报送机构类别
export function getInsCategories(params) {
  return request({
    url: `monitor/findByReportDispose/findByFicp`,
    method: 'get',
    params: params
  })
}

// 报告机构
export function getReportapi() {
  return request({
    url: `receivesys/organization/getRinmList`,
    method: 'post'
  })
}

// 编辑 - 提交
export function editListapi(params) {
  return request({
    url: 'monitor/taskManage/suspicious/update',
    method: 'put',
    data: params
  })
}

// 查看
export function lookListapi(suspiciousId) {
  return request({
    url: `monitor/taskManage/suspicious/selectClue/${suspiciousId}`,
    method: 'get'
  })
}

// 新建 - 提交
export function sendListapi(params) {
  return request({
    url: 'monitor/taskManage/suspicious/insert',
    method: 'post',
    data: params
  })
}

// 涉罪类型
export function getCrimapi() {
  return request({
    url: 'code-manage/codesys/code-detail/detail/TOSC',
    method: 'get'
  })
}

// 预警范围
export function getWarnrangapi() {
  return request({
    url: 'sysmanage/outInterFace/getTreeCode',
    method: 'get'
  })
}

// 预警范围人员
export function getrangNameapi(params) {
  return request({
    url: `sysmanage/outInterFace/getUser2/${params}`,
    // url: 'monitor/model/query/feignSysMy2',
    method: 'get'
    // params: params
  })
}

