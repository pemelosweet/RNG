import request from '@/utils/request'
// 规则预警处理

// 获取左侧tree数据
export function getTreeData() {
  return request({
    url: 'monitor/rules/selectByOne ',
    method: 'get'
  })
}

// 获取查询列表数据
export function fuzzyListData(size, num, paramsObj) {
  return request({
    url: 'monitor/rules/selectByResult?pageSize=' + size + '&pageNum=' + num,
    method: 'post',
    data: paramsObj
  })
}
