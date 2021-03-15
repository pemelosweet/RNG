import request from '@/utils/request'
// 审核
export function viewAuditInformation(aId, modelAId) {
  return request({
    url: 'model-jy/model/audit/viewAuditInformation?path=' + aId + '&modelAId=' + modelAId,
    method: 'get'
  })
}

// 回显数据集
export function reViewDataRang(pid, sid) {
  return request({
    url: 'model-jy/model/audit/viewAuditInformationing?pid=' + pid + '&sid=' + sid,
    method: 'get'
  })
}

// 编辑预警范围
export function editRangerOrder(obj) {
  return request({
    url: 'model-jy/model/audit/updateBySubmitMessage',
    method: 'post',
    data: obj
  })
}
