import request from '@/utils/request'
// 下拉
export function queryEvaluationTaskName() {
  return request({
    url: 'monitor/viewEvaluation/queryEvaluationTaskName',
    method: 'get'
  })
}
// 查询
export function listinfo(map) {
  return request({
    url: 'monitor/viewEvaluation/listinfo',
    method: 'post',
    data: map
  })
}
// 生成/查看汇总表
export function viewSummary(evaluationTaskName) {
  return request({
    url: 'monitor/viewEvaluation/viewSummary/' + evaluationTaskName,
    method: 'get'
  })
}
// 自定义分类评级分段评级标准
export function customRating(map) {
  return request({
    url: 'monitor/viewEvaluation/customRating',
    method: 'post',
    data: map
  })
}
// 自定义分类评级分段评级标准校验
export function checkScoringStandardCount(map) {
  return request({
    url: 'monitor/viewEvaluation/checkScoringStandardCount',
    method: 'post',
    data: map
  })
}
// 自定义分类评级分段评级标准保存
export function scoringStandard(map) {
  return request({
    url: 'monitor/viewEvaluation/scoringStandard',
    method: 'post',
    data: map
  })
}
// 分段评分反显
export function sectionalGrading(map) {
  return request({
    url: 'monitor/viewEvaluation/sectionalGrading',
    method: 'post',
    data: map
  })
}

export function sectionalGradingSave(list) {
  return request({
    url: 'monitor/viewEvaluation/sectionalGradingSave',
    method: 'post',
    data: list
  })
}

export function checkSectionalGrading(list) {
  return request({
    url: 'monitor/viewEvaluation/checkSectionalGrading',
    method: 'post',
    data: list
  })
}

export function qualityEvaluationTable(evaluationTaskName) {
  return request({
    url: 'monitor/viewEvaluation/qualityEvaluationTable/' + evaluationTaskName,
    method: 'get'
  })
}

export function getDetail(name, titleName) {
  return request({
    url: `monitor/viewEvaluation/selectRicd/${titleName}/${name}`,
    method: 'get'
  })
}
