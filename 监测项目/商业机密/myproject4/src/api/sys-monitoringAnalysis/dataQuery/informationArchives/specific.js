import request from '@/utils/request'
// 情报类文件档案查询--特定查询

// 数据字典接口
export function dictionary(params) {
  return request({
    url: 'code-manage/codesys/code-detail/detail/' + params,
    method: 'get'
  })
}

export function getList() {
  return request({
    url: '',
    method: ''
  })
}

export function getTplList() { // 获取模板下拉列表
  return request({
    url: 'monitor/governor/template/condition',
    method: 'get'
  })
}

export function getCRinmList(rinm) {
  // 报告机构
  return request({
    url: 'receivesys/organization/getRinmsToMointor/' + rinm,
    method: 'get'
  })
}

export function getCustomData(paramsObj) { // 定制结果列表
  return request({
    url: 'monitor/QueryTemplateDO/selectTemplaet',
    method: 'get',
    params: {
      pageNum: paramsObj.pageNum,
      pageSize: paramsObj.pageSize
    }
  })
}

export function addCustomData(paramsObj) { // 新增定制结果
  return request({
    url: 'monitor/QueryTemplateDO/insertquery',
    method: 'post',
    data: paramsObj
  })
}

export function updateCustomData(paramsObj) { // 修改定制结果
  return request({
    url: 'monitor/QueryTemplateDO/updateQueryTemplate',
    method: 'patch',
    data: paramsObj
  })
}

export function delCustomData(templateId) { // 删除定制结果列表
  return request({
    url: 'monitor/QueryTemplateDO/deleSensitivePerson',
    method: 'delete',
    params: { templateId }
  })
}

export function viewTransferData(subId) { // 查看移送主体
  return request({
    url: 'monitor/MainDO/MainselectById',
    method: 'get',
    params: subId
  })
}

export function viewClueData(clueType, infoId) { // 查看线索/协查/通报
  return request({
    url: 'monitor/informationtask/ClueDO/ClueselectById',
    method: 'get',
    params: {
      clueType: clueType,
      infoId: infoId
    }
  })
}

export function viewCustomData(templateId) { // 修改定制结果
  return request({
    url: 'monitor/QueryTemplateDO/queryselectById',
    method: 'get',
    params: { templateId }
  })
}
