import request from '@/utils/request'
// 审核
export function viewAuditInformation(aId) {
  return request({
    url: 'caml-model/model/audit/viewAuditInformation?path=' + aId,
    method: 'get'
  })
}

// 回显数据集
export function reViewDataRang(pid, sid) {
  return request({
    url: 'caml-model/model/audit/viewAuditInformationing?pid=' + pid + '&sid=' + sid,
    method: 'get'
  })
}

