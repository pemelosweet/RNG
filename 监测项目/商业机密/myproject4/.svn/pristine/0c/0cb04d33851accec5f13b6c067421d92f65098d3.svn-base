import request from '@/utils/request'
import sm3 from 'sm3'
import md5 from 'js-md5'

export function loginByUsername(username, password, signature, certInfo, uuid, CertTimeOut, verifyCode) {
  const params = new URLSearchParams()
  params.append('username', username)
  // params.append('password', sm3(password))
  params.append('password', sm3(password) + ',' + md5(password))
  if (signature.indexOf('+') !== -1) {
    signature = signature.replace(/\+/g, '#')
  }
  console.log(signature)
  params.append('signature', encodeURIComponent(signature))
  params.append('certInfo', certInfo)
  params.append('CertTimeOut', CertTimeOut)
  params.append('uuid', uuid)
  params.append('verifyCode', verifyCode)
  params.append('ownsys', 'monitor')

  return request({
    url: 'login/caml/login',
    method: 'post',
    data: params
  })
}

export function validateUsername(username, password) {
  return request({
    url: 'receivesys/resign/checkUserInfo',
    method: 'post',
    data: {
      userName: username,
      password: sm3(password) + ',' + md5(password)
      // password: sm3(password)
    }
  })
}

export function logout() {
  return request({
    url: 'login/logout',
    method: 'get'
  })
}

// 获取用户信息
export function getUserInfo(ownsys) {
  return request({
    url: 'sysmanage/outInterFace/user-info',
    method: 'get',
    params: ownsys
  })
}
