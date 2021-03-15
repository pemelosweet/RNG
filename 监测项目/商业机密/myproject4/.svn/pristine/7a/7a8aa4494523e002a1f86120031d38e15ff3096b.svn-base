import request from '@/utils/request'
// 自主分析-自主分析文件列表
export function getList(params) {
  return request({
    url: '/monitor/initiative/getInitAnalysisLists', // monitor/
    method: 'get',
    params: params
  })
}
// 自主分析-自主分析列表条件查询
export function getListByInfo(params) {
  return request({
    url: '/monitor/initiative/selectiveQuery', // monitor/
    method: 'get',
    params: params
  })
}
// 自主分析-自主分析列表查看
export function showInfoById(anaId) {
  return request({
    url: '/monitor/initiative/getInitAnalysisInfo/' + anaId, // monitor/
    method: 'get'
  })
}
// 自主分析-自主分析删除
export function deleteById(params) {
  return request({
    url: '/monitor/initiative/batchDelete?anaIds=' + params, // monitor/
    method: 'delete'
  })
}
// 自主分析-新增情报档案表
export function addNewDoc(params) {
  return request({
    url: '/monitor/initiative/createNewDoc',
    method: 'post',
    data: params
  })
}
// 自主分析-修改接口
export function updateInfo(params) {
  return request({
    url: '/monitor/initiative/dataUpdate',
    method: 'put',
    params: params
  })
}
// 自主分析-情报数据查询
export function getInfoData(anaId) {
  return request({
    url: '/monitor/initiative/getInfoData' + anaId,
    method: 'get'
  })
}
// 自主分析-自主分析提交
export function submitInitAnalysis(params) {
  return request({
    url: '/monitor/initiative/submitInitAnalysis',
    method: 'post',
    data: params
  })
}
// 自主分析-触发信息查询详情
export function triggerInfo(params) {
  return request({
    url: '/monitor/initiative/triggerInfo',
    method: 'get',
    params: params
  })
}
// 自主分析-主体信息列表查询
export function selectSubjectList(params) {
  return request({
    url: '/monitor/initiative/getSubjectByAnaId',
    method: 'get',
    params: params
  })
}
// 自主分析-主体信息条件查询
export function selectSubject(params) {
  return request({
    url: '/monitor/initiative/selectSubject',
    method: 'get',
    params: params
  })
}
// 自主分析-主体信息新增
export function addSubject(params) {
  return request({
    url: '/monitor/initiative/addSubject',
    method: 'post',
    data: params
  })
}
export function upSubject(params) {
  return request({
    url: '/monitor/initiative/updateSubjectInfo',
    method: 'put',
    data: params
  })
}
export function delSubject(id) {
  return request({
    url: '/monitor/initiative/deleteSubject/' + id,
    method: 'delete'
  })
}
// 自主分析-修改
export function editRecode(params) {
  return request({
    url: '/monitor/initiative/editRecode',
    method: 'put',
    data: params
  })
}
// 自主分析-主体信息导入/initiative/subjectExport
export function importSubject(params) {
  return request({
    url: '/monitor/initiative/importSubject2Time?anaId=' + params,
    method: 'post'
  })
}
// 自主分析-主体信息导出
export function subjectExport(params) {
  return request({
    url: '/monitor/initiative/subjectExport?ids=' + params,
    method: 'get'
  })
}
// 自主分析 导入摸板下载
export function downloadSubject() {
  return request({
    url: '/monitor/initiative/downloadNameTemplate',
    method: 'get'
  })
}
// 自主分析 附件信息--附件列表
export function getFileListById(params) {
  return request({
    url: '/monitor/initiative/fileLists/' + params,
    method: 'get'
  })
}
// 自主分析 附件信息--附件删除
export function delFileListById(params) {
  return request({
    url: '/monitor/initiative/deleteFile/' + params,
    method: 'delete'
  })
}
// 自主分析 -- 自主分析提交-工作流
export function submitInitAnalysisWorkflow(params) {
  return request({
    url: '/monitor/initiative/submitInitAnalysis',
    method: 'post',
    data: params
  })
}
// 自主分析 -- 自主分析提交-数据更新
export function initAnalysisUpdate(params) {
  return request({
    url: '/monitor/initiative/initAnalysisUpdate',
    method: 'put',
    data: params
  })
}
// 自主分析 -- 流转记录/initiative/circulation/recode
export function recode(params) {
  return request({
    url: '/monitor/initiative/circulation/recode?proInstId=' + params,
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
// 涉罪类型
export function getSBId(id) {
  return request({
    url: '/monitor/initiative/getClueIdByIndexNum/' + id,
    method: 'get'
  })
}
// 上报分析申请为空的问题
export function getClueIdByIndexNum(id) {
  return request({
    url: 'monitor/initiative/getClueIdByIndexNum/' + id,
    method: 'get'
  })
}
export function getJuBaoId(id) {
  return request({
    url: 'monitor/initiative/triggerInfo?type=' + encodeURI('举报') + '&indexNum=' + id,
    method: 'get'
  })
}
export function isEditUser(id) {
  return request({
    url: 'monitor/initiative/isEditUser/' + id,
    method: 'get'
  })
}
export function getClueInfo(indexNum) {
  return request({
    url: 'monitor/initiative/getClueInfo/' + indexNum,
    method: 'get'
  })
}
// 工作流反显主体信息列表

export function getworkFlowInfo(data) {
  return request({
    url: 'monitor/initiative/triggerSource/subInfo',
    method: 'get',
    params: data
  })
}
