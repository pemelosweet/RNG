import request from '@/utils/request'
// 线索管理-情报管理列表展示
export function getList(params) {
  return request({
    url: 'monitor/infoanaly/getInfoLists', // monitor/
    method: 'get',
    params: params
  })
}
// 线索管理-情报管理列表查询 信息查询-查询按钮
export function getListSearch(params) {
  return request({
    url: 'monitor/infoanaly/selectInfo', // monitor/
    method: 'get',
    params: params
  })
}
// 线索管理-情报管理--修改情报文件查看
export function infoCheck(infoId) {
  return request({
    url: 'monitor/infoanaly/infoCheck', // monitor/
    method: 'get',
    params: infoId
  })
}
// 线索管理-情报管理--触发信息查询
export function searchTriggerInfo(params) {
  return request({
    url: 'monitor/infoanaly/triggerInfo', // monitor/
    method: 'get',
    params: params
  })
}
// 线索管理-情报管理--主体信息查询
export function searchBodyInfo(params) {
  return request({
    url: 'monitor/infoanaly/selectSubject', // monitor/
    method: 'get',
    params: params
  })
}
// 线索管理-情报管理主--体信息增加
export function addBodyInfo(params) {
  return request({
    url: 'monitor/infoanaly/addSubject', // monitor/
    method: 'post',
    data: params
  })
}
// 线索管理-情报管理--主体信息删除
export function deleteBodyInfo(subId) {
  return request({
    url: 'monitor/information/deleteSubject', // monitor/
    method: 'delete',
    params: subId
  })
}
// 线索管理-情报管理--主体信息导出
export function drawupBodyInfo(Ids) {
  return request({
    url: 'monitor/infoanaly/subjectExport', // monitor/
    method: 'get',
    params: Ids
  })
}
// 线索管理-情报管理--主体信息导入
export function importBodyInfo(info) {
  return request({
    url: 'monitor/infoanaly/importSubject', // monitor/
    method: 'post',
    data: info
  })
}
// 线索管理-情报管理--修改情报文件状态
export function updateInfoState(info) {
  return request({
    url: 'monitor/infoanaly/updateInfoState', // monitor/
    method: 'put',
    params: info
  })
}
// 线索管理-情报管理--情报文件档案删除
export function infoDelete(infoId) {
  return request({
    url: 'monitor/infoanaly/infoDelete', // monitor/
    method: 'get',
    params: infoId
  })
}
// 线索管理-情报管理--附件列表
export function fileLists(obj) {
  return request({
    url: 'monitor/infoanaly/fileLists/' + obj.infoId + '?pageNum=' + obj.pageNum + '&pageSize=' + obj.pageSize,
    method: 'get'
  })
}
// 线索管理-情报管理--附件上传
export function uploadAttach(infoId) {
  return request({
    url: 'monitor/infoanaly/uploadAttach',
    method: 'get',
    params: infoId
  })
}
// 线索管理-情报管理--附件下载
export function fileDownload(fileId) {
  return request({
    url: 'monitor/infoanaly/fileDownload/' + fileId,
    method: 'get'
  })
}
export function getIntelligenceInfo(infoId) {
  return request({
    url: 'monitor/infoanaly/getIntelligenceInfo/' + infoId,
    method: 'get'
  })
}
// 起草一单制
export function startDraftByMultiInfo(params) {
  return request({
    url: 'monitor/numberTrans/startDraftByMultiInfo',
    method: 'post',
    data: params
  })
}
// 起草每单制
export function startDraftByOneInfo(params) {
  return request({
    url: 'monitor/numberTrans/startDraftByOneInfo',
    method: 'post',
    data: params
  })
}
// --------以下是线索管理-情报类文件管理的签(呈)批单的接口--------//

// 线索管理-情报类文件管理的签(呈)批单列表条件查询
export function getQianListSearch(info) {
  return request({
    url: 'monitor/numberTrans/querySigns', // monitor/
    method: 'get',
    params: info
  })
}
// 线索管理-情报类文件管理的签(呈)批单列表
export function getQianList(info) {
  return request({
    url: 'monitor/numberTrans/signLists', // monitor/
    method: 'get',
    params: info
  })
}
// 线索管理-情报类文件管理的签(呈)批单--新增签呈批单
export function insertQian(info) {
  return request({
    url: 'monitor/numberTrans/newSignData', // monitor/
    method: 'post',
    data: info
  })
}
// 线索管理-情报类文件管理的签(呈)批单--线索列表
export function getClueLists(obj) {
  return request({
    url: 'monitor/numberTrans/getClueLists/' + obj.signId + '?pageNum=' + obj.pageNum + '&pageSize=' + obj.pageSize,
    method: 'get'
  })
}
// 线索管理-情报类文件管理的签(呈)批单--通过title查询线索列表
export function getInfoByTitle(title) {
  return request({
    url: 'monitor/numberTrans/getInfoByTitle',
    method: 'get',
    params: title
  })
}
// 线索管理-情报类文件管理的签(呈)批单--增加线索
export function addClue(info) {
  return request({
    url: 'monitor/numberTrans/addClue?infoIds=' + info.infoIds + '&signId=' + info.signId, // monitor/
    method: 'post'
  })
}
// 线索管理-情报类文件管理的签(呈)批单--删除线索
export function deleteClue(info, signId) {
  return request({
    url: `monitor/numberTrans/deleteClue?infoIds=${info}&signId=${signId}`,
    method: 'delete'
  })
}
// 线索管理-情报类文件管理的签(呈)批单--编辑表编号和情报字号
export function updateserialNum(info) {
  return request({
    url: 'monitor/numtransfer/updateserialNum', // monitor/
    method: 'patch',
    params: info
  })
}
// 线索管理-情报类文件管理的签(呈)批单--删除签呈批单
export function deleteodd(obj) {
  return request({
    url: 'monitor/numberTrans/deleteSign/' + obj.signIds, // monitor/
    method: 'delete'
  })
}
// 线索管理-情报类文件管理的签(呈)批单--编号
export function getNumberedLists(obj) {
  return request({
    url: 'monitor/numberTrans/getNumberedLists/' + obj.signId + '?pageNum=' + obj.pageNum + '&pageSize=' + obj.pageSize,
    method: 'get'
  })
}

// 线索管理-情报类文件管理的签(呈)批单--编号编辑
export function updateNumber(obj) {
  return request({
    url: 'monitor/numberTrans/updateNumber',
    method: 'put',
    data: obj
  })
}
// 线索管理-情报类文件管理的签(呈)批单--提交审核
export function submitCheck(params) {
  return request({
    url: 'monitor/numberTrans/submitCheck',
    method: 'post',
    data: params
  })
}
// 线索管理-情报类文件管理的签(呈)批单--查看签呈批单
export function getSignDetailInfo(params) {
  return request({
    url: 'monitor/numberTrans/getSignDetailInfo/' + params,
    method: 'get'
  })
}
export function numberTransUpdate(params) {
  return request({
    url: 'monitor/numberTrans/numberTransUpdate',
    method: 'put',
    data: params
  })
}
// 编号移送流转记录
export function recode(params) {
  return request({
    url: 'monitor/numberTrans/circulation/recode?proInstId=' + params,
    method: 'get'
  })
}
// 上传附件
export function getFileList(params) {
  return request({
    url: 'monitor/numberTrans/fileLists/' + params,
    method: 'get'
  })
}
// 附件删除
export function deleteFileById(id) {
  return request({
    url: 'monitor/numberTrans/deleteFile/' + id,
    method: 'delete'
  })
}
// 下载签呈批单
export function downloadQian(id) {
  return request({
    url: 'monitor/numberTrans/fileDownloadFormatZip?signIds=' + id,
    method: 'get'
  })
}
// 签呈批单编辑
export function signDataUpdate(params) {
  return request({
    url: 'monitor/numberTrans/signDataUpdate',
    method: 'put',
    data: params
  })
}
export function getInfoId(params) {
  return request({
    url: 'monitor/infoanaly/getMainId/' + params,
    method: 'get'
  })
}
// 签呈批单获取线索详情
export function getClueInfoById(id) {
  return request({
    url: 'monitor/numberTrans/getClueInfoById/' + id,
    method: 'get'
  })
}
// 发送线索至外部委
export function sendClue(data) {
  return request({
    url: 'monitor/numberTrans/onlineTrans/subSys',
    method: 'post',
    data
  })
}

export function getDepart() {
  return request({
    url: 'monitor/numberTrans/query-tree ',
    method: 'get'
  })
}
