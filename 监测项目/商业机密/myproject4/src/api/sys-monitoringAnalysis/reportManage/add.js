import request from '@/utils/request'

// 新增
export function onSubmit(params) {
  return request({
    url: 'monitor/macrographyReport/save',
    method: 'post',
    data: params
  })
}
// 新增
export function theStaging(params) {
  return request({
    url: 'monitor/macrographyReport/saved',
    method: 'post',
    data: params
  })
}
// 管理员修改
export function modification(params) {
  return request({
    // url: 'monitor/macrographyReport/updateDeda',
    url: 'monitor/macrographyReport/updateGl',
    method: 'put',
    data: params
  })
}
// 工作流更新接口
// export function updateForm(workflow, jointAnalysisDO) {
//   return request({
//     url: 'monitor/macrographyReport/update',
//     method: 'put',
//     data: {
//       jointAnalysisDO: jointAnalysisDO,
//       workflow: workflow
//     }
//   })
// }
// 工作流更新接口
export function updateForm(params) {
  return request({
    url: 'monitor/macrographyReport/update',
    method: 'put',
    data: params
  })
}
