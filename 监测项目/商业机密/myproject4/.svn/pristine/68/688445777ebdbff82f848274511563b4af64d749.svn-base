import request from '@/utils/request'

// 义务机构报告情况时间序列分析

// 统计按钮
export function getStatistical(dto, pageInfo) {
  return request({
    url: '/monitor/count/sequence/sync8a',
    method: 'get',
    params: {
      statisticsType: dto.statisticsType,
      tosc: dto.tosc,
      type: dto.type,
      startDate: dto.startDate,
      endDate: dto.endDate,
      ricds: dto.ricds,
      areas: dto.areas,
      industrys: dto.industrys,
      pageNum: pageInfo.pageNum,
      pageSize: pageInfo.pageSize
    }
  })
}

export function getSum(params) {
  return request({
    url: 'monitor/count/sequence/sync8aSum',
    method: 'get',
    params
    // params: {
    //   statisticsType: dto.statisticsType,
    //   tosc: dto.tosc,
    //   type: dto.type,
    //   startDate: dto.startDate,
    //   endDate: dto.endDate,
    //   ricds: dto.ricds,
    //   areas: dto.areas,
    //   industrys: dto.industrys
    // }
  })
}

// 涉罪类型 （下拉数据）
export function crimeApi(typeId) {
  return request({
    url: '/code-manage/codesys/code-detail/detail/' + typeId,
    method: 'get'
  })
}
