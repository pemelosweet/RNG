import request from '@/utils/request'

export function getList(orgForm) {
  return request({
    url: '/receivesys/resign', // /receivesys/resign
    method: 'post',
    data: {
      rinm: orgForm.rinm, // 报告机构名称
      firc: orgForm.firc, // 总部注册地址code
      socialCreditCode: orgForm.socialCreditCode, // 统一
      ficp: orgForm.ficp, // 报告机构类别 ：
      ricd: orgForm.ricd, // 金融机构编码
      category: orgForm.category, // 子行业id
      note: orgForm.note, // 备注
      dtnm: orgForm.dtnm, // 负责部门名称
      dfcc: orgForm.dfcc, // 传真
      dznm: orgForm.dznm, // 负责人姓名
      dzct: orgForm.dzct, // 负责人办公电话
      dzmt: orgForm.dzmt, // 负责人移动电话
      dcnm: orgForm.dcnm, // 联系人姓名
      dcct: orgForm.dcct, // 联系人办公电话
      dcmt: orgForm.dcmt, // 联系人移动电话
      dfar: orgForm.dfar, // 通讯地址
      dzip: orgForm.dzip,
      riid: orgForm.riid, // 机构noteId   -黄志虎
      localBankCode: orgForm.localBank.codeId, //  -黄志虎
      localBank: orgForm.localBank.codeName // 机构noteId   -黄志虎
    }
  })
}

export function getControllerId() {
  return request({
    url: '/receivesys/resign/returnId',
    method: 'get'
  })
}

export function getOrgInfo(riid) { // 查看机构信息
  return request({
    url: '/receivesys/organization/orgInfo/' + riid,
    method: 'get'
  })
}

export function getDeptInfo(riid) { // 查看机构信息
  return request({
    url: '/receivesys/organization/deptInfo/' + riid,
    method: 'get'
  })
}

export function getFileInfo(noteId) { // 获取下载文件名称
  return request({
    url: '/file-service/fileupload/' + noteId,
    method: 'get'
  })
}

export function downloadFile(fileNames, riid) {
  return request({
    url: '/receivesys/certificate/downloadInfo/' + fileNames + '/' + riid,
    method: 'get'
  })
}

export function hasFicp(ficp, firc) { // 是否是金融行业
  return request({
    url: '/receivesys/resign/judge/',
    method: 'post',
    data: {
      ficp: ficp,
      firc: firc
    }
  })
}
// 添加账户 ----黄志虎
export function account(params) {
  return request({
    url: 'receivesys/resign/addAccount',
    method: 'post',
    data: params

  })
}
// 判断机构是否注册过 ----黄志虎
export function isResign(params) {
  return request({
    url: `receivesys/resign/getAccountInfo/${params}`,
    method: 'get'

  })
}
// 获取分支机构 ----黄志虎
export function branch(params) {
  return request({
    url: `code-manage/codesys/code-detail/detail/${params}`,
    method: 'get'

  })
}
