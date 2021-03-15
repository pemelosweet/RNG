import { loginByUsername, logout, getUserInfo } from '@/api/login'
import { getToken, getRedirectURL, removeRedirectURL, setToken, removeToken } from '@/utils/auth'
import { MessageBox } from 'element-ui'
const user = {
  state: {
    riid: '',
    user: '',
    status: '',
    code: '',
    token: getToken(),
    name: '',
    id: '',
    avatar: '',
    introduction: '',
    system: '',
    industry: '',
    institution: '',
    roles: [],
    permissions_routers: [],
    setting: {
      articlePlatform: []
    },
    alert: {
      isShow: false,
      title: '您的证书即将到期！'
    }
  },

  mutations: {
    SET_CODE: (state, code) => {
      state.code = code
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting
    },
    SET_STATUS: (state, status) => {
      state.status = status
    },
    SET_ID: (state, id) => {
      state.id = id
    },
    SET_RIID: (state, riid) => {
      state.riid = riid
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_INDUSTRY: (state, industry) => {
      state.industry = industry
    },
    SET_INSTITUTION: (state, institution) => {
      state.institution = institution
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_SYSTEM: (state, system) => {
      state.system = system
    },
    SET_PERMISSIONS_ROUTERS: (state, permissions_routers) => {
      state.permissions_routers = permissions_routers
    },
    SET_ALERT: (state, alert) => {
      state.alert.isShow = alert.isShow
      state.alert.title = alert.title
    }
  },
  actions: {
    // 用户名登录
    LoginByUsername({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        loginByUsername(username, userInfo.password, userInfo.signature, userInfo.certInfo, userInfo.uuid, userInfo.CertTimeOut, userInfo.verifyCode)
          .then(response => {
            const data = response.data
            const token = data.access_token
            const certInfo = data.certInfo
            const redirect = data.redirect
            const loginLimit = data.loginLimit

            // 非个工作日
            if (loginLimit) {
              resolve({ message: loginLimit })
            } else {
              if (token) {
                commit('SET_TOKEN', token)
                setToken(token)
              }
              if (certInfo && certInfo.isShow === '0') {
                commit('SET_ALERT', certInfo)
              }
              // 密码修改
              if (redirect && redirect.isRedirect === '0') {
                console.log('userName' + redirect.user_name)
                resolve({ route: 'updataPassword', message: redirect.message, userName: redirect.user_name })
              } else {
                resolve({ route: '/' })
              }
            }
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // 验证用户名密码
    validateUser({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        loginByUsername(username, userInfo.password)
          .then(response => {
            const data = response.data
            const token = data.access_token
            commit('SET_TOKEN', token)
            setToken(token)
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // 获取用户信息
    GetUserInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getUserInfo({ ownsys: 'monitor' })
          .then(response => {
            // console.log('userInfo' + response.data.role)
            const data = response.data
            if (!data) {
              // 由于mockjs 不支持自定义状态码只能这样hack
              reject('error')
            }
            if (data.permission_routers && data.permission_routers.length > 0) {
              // 验证返回的permission_routers是否是一个非空数组
              commit('SET_PERMISSIONS_ROUTERS', data.permission_routers)
            } else {
              reject('getInfo: permission_routers must be a non-null array !')
            }
            if (data.user_role && data.user_role.length > 0) {
              // 验证返回的roles是否是一个非空数组
              commit('SET_ROLES', data.user_role)
            } else {
              reject('getInfo: roles must be a non-null array !')
            }
            if (data.institution) {
              // 验证返回的roles是否是一个非空数组
              commit('SET_INSTITUTION', data.institution)
            } else {
              reject('getInfo: institution must be a non-null array !')
            }
            sessionStorage.setItem('name', data.name)
            commit('SET_ID', data.userName)
            commit('SET_RIID', data.riid)
            commit('SET_NAME', data.name)
            commit('SET_SYSTEM', data.system)
            resolve(data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // 第三方验证登录
    // LoginByThirdparty({ commit, state }, code) {
    //   return new Promise((resolve, reject) => {
    //     commit('SET_CODE', code)
    //     loginByThirdparty(state.status, state.email, state.code).then(response => {
    //       commit('SET_TOKEN', response.data.token)
    //       setToken(response.data.token)
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // 登出
    FedLogOut({ commit }) {
      const logoutUrl = getRedirectURL()
      return new Promise((resolve, reject) => {
        MessageBox.confirm('可以取消继续留在该页面， 或者重新登录', '提示', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(_ => {
            logout()
              .then(res => {
                if (res.code === 599) {
                  console.log('点击登出了！')
                  commit('SET_TOKEN', '')
                  commit('SET_ROLES', [])
                  commit('SET_PERMISSIONS_ROUTERS', [])
                  commit('SET_INSTITUTION', '')
                  removeToken()
                  if (logoutUrl) {
                    removeRedirectURL()
                    location.href = logoutUrl
                    return
                  }
                  // resolve()
                  location.href = window.portalPath
                  // location.reload() // 为了重新实例化vue-router对象 避免bug
                }
              })
          })
      })
    },

    // 互斥 被迫下线
    ForcedLogOut({ commit }, noRole) {
      const tip = noRole
      return new Promise(resolve => {
        MessageBox.confirm(tip, '提示', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            commit('SET_TOKEN', '')
            commit('SET_ROLES', [])
            commit('SET_PERMISSIONS_ROUTERS', [])
            commit('SET_INSTITUTION', '')
            removeToken()
            if (getRedirectURL()) {
              const urlStr = getRedirectURL()
              removeRedirectURL()
              location.href = urlStr
              return
            }
            resolve()
            // location.reload()
            location.href = window.portalPath
          })
      })
    },

    // 动态修改权限
    ChangeRole({ commit }, role) {
      return new Promise(resolve => {
        commit('SET_TOKEN', role)
        setToken(role)
        getUserInfo(role).then(response => {
          const data = response.data
          commit('SET_ROLES', data.role)
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          commit('SET_INTRODUCTION', data.introduction)
          commit('SET_SYSTEM', data.system)
          resolve()
        })
      })
    }
  }
}

export default user
