import request from '@/utils/request'
import sm3 from 'sm3'

export function updatePwdData(userName, pwOld, pwNew) {
  return request({
    url: '/sysmanage/outInterFace/updatePw-remote', // sysmanage/sys/user/updatePw-remote
    method: 'post',
    data: {
      userName: userName || '',
      pwOld: sm3(pwOld),
      pwNew: sm3(pwNew)
    }
  })
}

export function getDictionaryDatas(paramKey) {
  return request({
    url: 'code-manage/codesys/common-param/query-params/' + paramKey,
    method: 'get'
  })
}
