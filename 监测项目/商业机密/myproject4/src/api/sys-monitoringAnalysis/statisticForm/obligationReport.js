import request from '@/utils/request'

// 义务机构报告与补正...

// 统计按钮
export function getStatistical(improve, pageInfo) {
  return request({
    url: '/monitor/count/correction/sync8a',
    method: 'get',
    params: {
      ricds: improve.ricds,
      startDate: improve.startDate,
      endDate: improve.endDate,
      industrys: improve.industrys,
      areas: improve.areas,
      orderBy: improve.orderBy,
      pageNum: pageInfo.pageNum,
      pageSize: pageInfo.pageSize
    }
  })
}

export function getSum(params) {
  return request({
    url: 'monitor/count/correction/sync8aSum',
    method: 'get',
    params
  // params: {
  //   ricds: params.ricds,
  //   startDate: params.startDate,
  //   endDate: params.endDate,
  //   industrys: params.industrys,
  //   areas: params.areas,
  //   orderBy: params.orderBy
  // }
  })
}
