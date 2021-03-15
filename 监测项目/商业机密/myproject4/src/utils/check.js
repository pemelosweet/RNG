
const checkObj = {
  chinaNull: /[\u4e00-\u9fa5]/, // 校验中文
  specialEnglish: /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im, // 校验英文特殊符号
  sprcialChina: /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im, // 校验中文特殊符号
  englishNull: /[abcdefghijklmnopqrstuvwxyz]/im, // 校验英文
  numberNull: /[1234567890]/im, // 校验数字
  blankSpace: /[ ]/im // 校验空格
}

// 只能输入数字
export const numberCheck = function(rule, value, callback) {
  if (checkObj.specialEnglish.test(value) || checkObj.sprcialChina.test(value)) {
    callback(new Error('禁止输入特殊字符'))
  } else if (checkObj.blankSpace.test(value)) {
    callback(new Error('禁止输入空格'))
  } else if (checkObj.chinaNull.test(value)) {
    callback(new Error('禁止输入中文'))
  } else if (checkObj.englishNull.test(value)) {
    callback(new Error('禁止输入英文'))
  } else {
    callback()
  }
}

// 禁止输入空格和特殊字符
export const validateAgentName = function(rule, value, callback) {
  if (checkObj.blankSpace.test(value)) {
    callback(new Error('禁止输入空格'))
  } else if (checkObj.specialEnglish.test(value) || checkObj.sprcialChina.test(value)) {
    callback(new Error('禁止输入特殊字符'))
  } else {
    callback()
  }
}
