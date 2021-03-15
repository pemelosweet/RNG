import request from '@/utils/request'

export function newsCenter(params) {
  return request({
    url: '/dataSubmit/NewsCenter', // 数据报送-消息中心
    method: 'get',
    params
  })
}
export function newsCenterDetail(params) {
  return request({
    url: '/dataSubmit/NewsCenterDetail', // 数据报送-消息中心详情
    method: 'get',
    params
  })
}
export function receipt(params) {
  return request({
    url: '/dataSubmit/receipt', // 数据报送-回执管理
    method: 'get',
    params
  })
}
export function worryManage(params) {
  return request({
    url: '/dataSubmit/worryManage', // 数据报送-异常管理
    method: 'get',
    params
  })
}
export function wrongCheck(params) {
  return request({
    url: '/dataSubmit/wrongCheck', // 数据报送-异常查看
    method: 'get',
    params
  })
}
export function onlineFill(params) {
  return request({
    url: '/dataSubmit/onlineFill', // 数据报送-在线填报
    method: 'get',
    params
  })
}
export function zeroReportConform(params) {
  return request({
    url: '/businessManage/zeroReportConform', // 业务管理-零报告确认
    method: 'get',
    params
  })
}
export function pageLoading(params) {
  return request({
    url: '/dataSubmit/pageLoading', // 数据报送-页面加载
    method: 'get',
    params
  })
}
export function hadFound(params) {
  return request({
    url: '/dataSubmit/hadFound', // 数据报送-页面加载-查看
    method: 'get',
    params
  })
}
export function notFound(params) {
  return request({
    url: '/dataSubmit/notFound', // 数据报送-页面加载-编辑
    method: 'get',
    params
  })
}
export function fileOfficial(params) {
  return request({
    url: '/businessManage/fileOfficial', // 业务管理-文件公函
    method: 'get',
    params
  })
}
