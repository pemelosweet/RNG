import request from '@/utils/request'

// 上传附件
// export function uploadApi(files) {
//   return request({
//     url: '/caml-report-inner/fill-report/upload-allAttach',
//     method: 'post',
//     data: files
//   })
// }

export function uploadApi(fileobj) {
  const param = new FormData()
  param.append('files', fileobj.file)
  return request({
    method: 'post',
    url: '/docmanager/upload',
    headers: { 'Content-Type': 'multipart/form-data' },
    data: param
  })
}

// 举报事由（下拉数据）
export function queryApi(typeId) {
  return request({
    url: 'code-manage/codesys/code-detail/detail/' + typeId + '',
    method: 'get'
  })
}

export function jurisdictionApi(typeId) {
  return request({
    url: 'code-manage/codesys/code-detail/detail/' + typeId + '',
    method: 'get'
  })
}

// 检测身份
export function identityApi() {
  return request({
    url: '/monitor/fill-report/manager-flag',
    method: 'get'
  })
}

// 举报列表明细展示授权方法
export function empowerApi(params) {
  return request({
    url: '/monitor/fill-report/empower',
    method: 'PATCH',
    params: params
  })
}

// 发起处理流程
export function initiateProcessingFlowApi(id, reporterMark, workflow) {
  return request({
    url: '/monitor/fill-report/workflow-start',
    method: 'put',
    data: {
      id,
      reporterMark,
      workflow
    }
  })
}

export function initProcess(reportId, reportNo) {
  return request({
    url: '/monitor/fill-report/init-process',
    method: 'post',
    params: {
      reportId,
      reportNo
    }
  })
}

export function judgmentAuthority() {
  return request({
    url: '/monitor/fill-report/judgmentAuthority',
    method: 'get'
  })
}
