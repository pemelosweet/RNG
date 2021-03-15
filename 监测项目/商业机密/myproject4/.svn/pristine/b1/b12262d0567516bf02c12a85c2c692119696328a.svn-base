import { Message } from 'element-ui'
export function messageBtn(obj) {
  let boolType = obj.loading
  boolType = !boolType
  Message.warning({
    message: obj.message,
    duration: 6000,
    showClose: true,
    onClose: function() {
      boolType = !boolType
    }
  })
}
// export function message(type, message) {
//   this.$message({
//     type: type,
//     message: message,
//     duration: 6000,
//     showClose: true
//   })
// }
