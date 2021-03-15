import request from '@/utils/request'
// 线索管理--反馈查询
export function getList(paramsObj) { // 获取列表
  return request({
    url: 'monitor/feedback/FeedbackafterDO/selecFeedbackapage',
    method: 'get',
    params: {
      PageNum: paramsObj.pageNum,
      PageSize: paramsObj.pageSize
    }
  })
}

export function getQueryList(paramsObj) { // 获取列表
  return request({
    url: 'monitor/feedback/FeedbackafterDO/selectFeedbacka',
    method: 'post',
    data: paramsObj
  })
}

export function getFeedData(fkId) { // 查看反馈信息
  return request({
    url: 'monitor/feedback/FeedbackafterDO/selectfkId',
    method: 'get',
    params: { fkId }
  })
}

export function getClueData(fkId) { // 查看线索信息
  return request({
    url: 'monitor/feedback/FeedbackafterDO/selectselectevokeNum?fkId=' + fkId,
    method: 'get'
  })
}

export function getSubjectData(fkId, citizenidnumber) { // 查看主体信息
  return request({
    url: 'monitor/feedback/FeedbackafterDO/selectSubjectnumById',
    method: 'get',
    params: {
      fkId: fkId
    //   citizenidnumber: citizenidnumber
    }
  })
}

export function dictionaryList(typeId) {
  return request({
    url: 'code-manage/codesys/code-detail',
    methods: 'get',
    params: { typeId: typeId }
  })
}
