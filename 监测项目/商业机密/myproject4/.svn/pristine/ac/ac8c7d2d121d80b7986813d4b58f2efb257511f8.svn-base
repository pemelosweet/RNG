import request from '@/utils/request'

// 线索管理-境内协查类文件列表查询 信息查询-获取列表
export function getAllList(params) {
  return request({
    url: 'monitor/assist/selectAll', // monitor/
    method: 'get',
    params: params
  })
}
export function getSheZuiList(params) {
  return request({
    url: 'monitor/assist/selectInitData',
    method: 'get',
    params: params
  })
}
// 线索管理-境内协查类文件列表查询 信息查询-查询按钮
export function getList(params) {
  return request({
    url: 'monitor/assist/criteQueries', // monitor/
    method: 'get',
    params: params
  })
}
// 线索管理-境内协查类文件管理批量设置为无效--移送处
export function setInvalid(params) {
  return request({
    url: 'monitor/assist/batchUpdate?assistIds=' + params, // monitor/
    method: 'put'
  })
}
// 线索管理-境内协查类文件管理--新增--移送处
export function addNew(params) {
  return request({
    url: 'monitor/assist/insert',
    method: 'post',
    data: params
  })
}
// 线索管理-境内协查类文件管理--查看
export function checkInfo(id) {
  return request({
    url: 'monitor/assist/checkOneFile/' + id,
    method: 'get'
  })
}
// 线索管理-境内协查类文件管理--删除列表数据
export function deleteList(id) {
  return request({
    url: 'monitor/assist/delete?assistIds=' + id,
    method: 'delete'
  })
}
// 线索管理-境内协查类文件管理--编辑
export function updateInfo(obj) {
  return request({
    url: 'monitor/assist/update',
    method: 'put',
    params: obj
  })
}
// 线索管理-境内协查类文件管理--上传附件
export function uploadFile(file) {
  return request({
    url: 'monitor/assist/upload-attach',
    method: 'post',
    params: file
  })
}
// 线索管理-境内协查类文件管理--下载附件
export function downloadFile(id) {
  return request({
    url: 'monitor/assist/down-attach/' + id,
    method: 'get'
  })
}
// 线索管理-境内协查类文件管理--附件列表
export function getFileList(id) {
  return request({
    url: 'monitor/assist/file-list/' + id,
    method: 'get'
  })
}
// 线索管理-境内协查类文件管理--删除附件
export function deleteFileById(id) {
  return request({
    url: 'monitor/assist/del-attach/' + id,
    method: 'delete'
  })
}
// 线索管理-境内协查类文件管理--批量删除附件
export function deleteFileList(idArray) {
  return request({
    url: 'monitor/assist/del-attach',
    method: 'delete',
    params: idArray
  })
}
// 线索管理-境内协查类文件管理 导入
export function importXml(file) {
  return request({
    url: 'monitor/assist/importXml',
    method: 'post',
    data: file
  })
}
// 线索管理-境内协查类文件管理 导出
export function exportXml(file) {
  return request({
    url: 'monitor/assist/exportXml',
    method: 'post',
    data: file
  })
}
// 线索管理-境内协查类文件管理 协查名单模板下载
export function downloadExcel() {
  return request({
    url: 'monitor/assist/download/assistNameListTemplate',
    method: 'get'
  })
}
// 新增协查联动接口/assist/getDeptAllRoles?deptName=
export function getDeptAllRoles(params) {
  return request({
    url: 'monitor/assist/getDeptAllRoles?deptName=' + params,
    method: 'get'
  })
}
// -------------以下是工作流接口-------------//

// 线索管理-境内协查类文件管理 协查分析-工作流
export function analystHandler(params) {
  return request({
    url: 'monitor/assist/analystHandler',
    method: 'post',
    data: params
  })
}
// 线索管理-境内协查类文件管理 协查批量提交-工作流
export function batchSubmitAssistFile(params) {
  return request({
    url: 'monitor/assist/batchSubmitAssistFile',
    method: 'post',
    data: params
  })
}
// 线索管理-境内协查类文件管理 更新审批状态-工作流
export function fileStatus(assistId) {
  return request({
    url: 'monitor/assist/fileStatus/' + assistId,
    method: 'post'
  })
}
// 线索管理-境内协查类文件管理 协查信息查询-工作流
export function getOneAssistInfo(assistId) {
  return request({
    url: 'monitor/assist/getOneAssistInfo/' + assistId,
    method: 'post'
  })
}
// 线索管理-境内协查类文件管理 分管领导审核-工作流
export function leaderCheck(params) {
  return request({
    url: 'monitor/assist/leaderCheck',
    method: 'post',
    params: params
  })
}
// 线索管理-境内协查类文件管理 协查分发-工作流
export function singleAssist(params) {
  return request({
    url: 'monitor/assist/singleAssist/distribute',
    method: 'post',
    params: params
  })
}
// 线索管理-境内协查类文件管理 获取用户权限
export function getRoot() {
  return request({
    url: 'monitor/assist/getRoleInfo',
    method: 'get'
  })
}
// 业务数据更新
export function updateFormInfo(params) {
  return request({
    url: 'monitor/assist/updateAssistData',
    method: 'put',
    data: params
  })
}
// 获取工作流当前节点名/assist/getCurrentActivitiesName
export function getCurrentActivitiesName(params) {
  return request({
    url: 'monitor/assist/getCurrentActivitiesName',
    method: 'post',
    data: params
  })
}
// 流转记录
export function updateForm(params) {
  return request({
    url: 'monitor/assist/circulation/recode?proInstId=' + params,
    method: 'get'
  })
}
// 流转记录2
export function updateForm2(params) {
  return request({
    url: 'monitor/assist/circulation/recode2?proInstId=' + params,
    method: 'get'
  })
}
// 涉罪类型
export function getSheZui(typeId) {
  return request({
    url: 'code-manage/codesys/code-detail/detail/' + typeId,
    method: 'get'
  })
}
// 修改接口
export function updateInvestigation(params) {
  return request({
    url: 'monitor/assist/update',
    method: 'put',
    data: params
  })
}
// 导出
export function exportFiles(typeId) {
  return request({
    url: 'monitor/assist/exportAssistFile/' + typeId,
    method: 'get'
  })
}
// 获取权限
export function getRoles() {
  return request({
    url: 'monitor/assist/getUserRoleInfo',
    method: 'get'
  })
}
export function isEditUser(id) {
  return request({
    url: 'monitor/assist/isEditUser/' + id,
    method: 'get'
  })
}
// 一件协查 {assistId}
export function batchQuery(id) {
  return request({
    url: 'monitor/assist/batchQuery/' + id,
    method: 'get'
  })
}
// 单个保存
export function singlePageSave(id) {
  return request({
    url: 'monitor/assist/singlePageSave',
    method: 'post',
    data: id
  })
}
