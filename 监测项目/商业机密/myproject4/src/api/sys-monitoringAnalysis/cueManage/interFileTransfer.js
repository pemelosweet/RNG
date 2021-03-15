import request from '@/utils/request'

// 国际情报文件移送通报 - 接口

// 办理信息
export function getHanldemss(params) {
  return request({
    url: '/workflow/listApprovals',
    method: 'get',
    params: params
  })
}

// 相关附件 - 获取附件列表
export function getFilesapi(cid) {
  return request({
    url: `/international/file-listTb/${cid}`,
    method: 'get'
  })
}

// 相关附件 - 附件删除
export function delFilesapi(fileId) {
  return request({
    url: `/international/del-attachGj1/${fileId}`,
    method: 'delete'
  })
}

// 编辑 - 提交
export function editeListflow(params) {
  return request({
    url: '/international/wwwww',
    method: 'post',
    data: params
  })
}

// 编辑 - 保存
export function editeList(params) {
  return request({
    url: '/international/wwwww',
    method: 'post',
    data: params
  })
}

// 新增 - 保存
export function sendList(params) {
  return request({
    url: '/international/addCluesGj',
    method: 'post',
    data: params
  })
}

// 新增 - 提交
export function sendFlow(params) {
  return request({
    url: '/international/addCluesGjFlow',
    method: 'post',
    data: params
  })
}

// 获取记录信息
// export function getList(cid) {
//   return request({
//     url: `/international/transactGjFk/${cid}`,
//     method: 'get'
//   })
// }
