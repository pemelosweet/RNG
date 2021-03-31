import Mock from 'mockjs'
const Random = Mock.Random

// 登录成功
const loginFn = Mock.mock({
  'data': {
    username: '13'
  },
  success: true,
  message: '登录成功',
  code: 200
})

Mock.mock(/\/oauth\/user\/login/, 'post', loginFn)
