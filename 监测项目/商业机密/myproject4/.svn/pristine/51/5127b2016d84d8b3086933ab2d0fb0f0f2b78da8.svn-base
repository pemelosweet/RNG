import request from '@/utils/request'

export function saveLetter(params) {
  return request({
    url: '/monitor/fill-report/saveLetter',
    method: 'post',
    data: params
  })
}

export function findLetter(reportNo) {
  return request({
    url: '/monitor/fill-report/findLetter',
    method: 'get',
    params: {
      reportNo: reportNo
    }
  })
}
