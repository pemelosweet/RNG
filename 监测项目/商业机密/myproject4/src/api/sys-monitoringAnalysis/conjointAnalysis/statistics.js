import request from '@/utils/request'

// MSTR
export function getUrl(params) {
  return request({
    url: 'monitor/microstrategy/loadLable/lhfx',
    method: 'get',
    params: params
  })
}
export function getData(params) {
  return request({
    url: 'monitor/microstrategy/loadLable/gdbb',
    method: 'get',
    params: params
  })
}
// 是否登录
export function login(params) {
  return request({
    url: 'monitor/microstrategy/loginValidate',
    method: 'get',
    params: params
  })
}

