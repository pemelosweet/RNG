import Mock from 'mockjs'
const BASE_URL = process.env.VUE_APP_YZL_URL+':'+process.env.VUE_APP_YZL_PORT+process.env.VUE_APP_YZL_API
console.log(BASE_URL)
const addFn = Mock.mock({
  data:{
    'id': 'SPID000000_' + '@increment',
    'account': '@string',
    'name': '@cname',
    'sex|1': ['男', '女', '保密'],
    'birthday': '@date',
    'icon': '@image("200x200", "@color")',
    //中国大区
    "cregion": "@region",
    // 省
    "cprovince": "@province",
    //市
    "ccity": "@city",
    //省 + 市
    "ss": "@city(true)",
    //县
    "country": "@county",
    //省市县
    "countrysx": "@county(true)",
    //邮政编码
    "code": "@zip",
    "goodsStar|1-5": "★",
  },
  success: true,
  message: 'ok',
  status: 200
})

// 获取用户信息
const getUserInfo = {
  data: Mock.mock({
    'data|10': [{
      'id': 'SPID000000_' + '@increment',
      'name': '@cname',
      'sex|1': ['男', '女', '保密'],
      'birthday': '@date',
      'icon': '@image("200x200", "@color")',
      //中国大区
      "cregion": "@region",
      // 省
      "cprovince": "@province",
      //市
      "ccity": "@city",
      //省 + 市
      "ss": "@city(true)",
      //县
      "country": "@county",
      //省市县
      "countrysx": "@county(true)",
      //邮政编码
      "code": "@zip",
      "goodsStar|1-5": "★",
    }]
  }),
  success: true,
  message: 'ok',
  status: 200
}

Mock.mock(/addFn/, 'post' ,addFn)

Mock.mock(/etUserInfo/, 'get', function () {
  return getUserInfo
})
