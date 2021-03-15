<template>
  <div class="login-container">
    <el-row>
      <el-col :span="7" :style="asideBgLeftImg" class="aside-bg-left"></el-col>
      <el-col :span="17" :style="mainBgImg" class="main-bg">

        <div class="hearder">
          <h1 class="hearder-title">中国反洗钱监测分析系统</h1>
          <h4 class="hearder-desc">China Anti-Money Laundering Monitoring And Analysis System</h4>
        </div>

        <div class="main">
          <h3 class="main-title">用户登录</h3>
          <el-form ref="loginForm" :rules="rules" status-icon :model="loginForm" size="medium">
            <el-form-item prop="username">
              <el-input v-model='loginForm.username' @keyup.enter.native="handleLogin" placeholder='用户登录名'></el-input>
            </el-form-item>
            <el-form-item prop='password'>
              <el-input type="password" @keyup.enter.native="handleLogin" v-model='loginForm.password' autoComplete='on' placeholder='密码'></el-input>
            </el-form-item>
            <el-row>
              <el-col :span="16">
                <el-form-item prop="verifyCode">
                  <el-input v-model='loginForm.verifyCode' @keyup.enter.native="handleLogin" placeholder='验证码'></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8" style="text-align: right;"><img class="captcha-img" @click="handleGetCaptcha" :src='captchaImg' alt="图片加载失败"/></el-col>
            </el-row>
            <el-form-item>
              <el-col :span="24">
                <el-button @click.native.prevent='handleLogin' type="primary" :loading="loading" class="btn-full-width" size="medium">登 录</el-button>
              </el-col>
            </el-form-item>
            <el-form-item>
              <div class="button-group clearfix">
                <ul class="ul-inline">
                  <!-- <li>
                    <el-button @click='showRegisterDialog' type="text">机构注册</el-button>
                  </li>
                  <li>
                    <router-link :to="{name:'nologin_list'}">
                      <el-button type="text">公告</el-button>
                    </router-link>
                  </li> -->
                  <!-- <li>
                    <router-link :to="{name:'changeLog'}">
                      <el-button type="text">版本更新日志</el-button>
                    </router-link>
                  </li> -->
                  <!-- <li>
                    <el-button @click="figureCredentialDialogVisible = true" type="text">数字证书</el-button>
                  </li> -->
                  <!-- <li style="float:right">
                    <el-button @click='showResetPasswordDialog' type="text">重置密码</el-button>
                  </li> -->
                </ul>
              </div>
            </el-form-item>
          </el-form>
        </div>

      </el-col>
    </el-row>

    <!-- 机构注册 / 进度查询 -->
    <el-dialog :visible.sync='registerDialogVisible' width='25em' center>
      <el-row style='text-align:center;'>
        <el-col :span="11">
          <el-button class='btn-register' type="primary" @click='openPage("register")' size="medium">机构注册申请</el-button>
        </el-col>
        <el-col :span="11" :offset="2">
          <el-button class='btn-registerQuer' @click='openPage("registerProgress","机构注册申请进度查询")' size="medium">申请进度查询</el-button>
        </el-col>
      </el-row>
    </el-dialog>

    <!-- 密码重置 / 进度查询 -->
    <el-dialog :visible.sync='resetPasswordDialogVisible' width='25em' center>
      <el-row style='text-align:center;'>
        <el-col :span="11">
          <el-button class='btn-register' type="primary" @click='openPage("resetPassword")' size="medium">重置密码</el-button>
        </el-col>
        <el-col :span="11" :offset="2">
          <el-button class='btn-registerQuer' @click='openPage("registerProgress","重置密码进度查询")' size="medium">进度查询</el-button>
        </el-col>
      </el-row>
    </el-dialog>

    <!-- 数字证书 / 进度查询 -->
    <el-dialog :visible.sync='figureCredentialDialogVisible' width='25em' center>
      <el-row style='text-align:center;'>
        <el-col :span="11">
          <el-button class='btn-register' type="primary" @click='openPage("figureCredential")' size="medium">申请数字证书</el-button>
        </el-col>
        <el-col :span="11" :offset="2">
          <el-button class='btn-registerQuer' @click='openPage("registerProgress","数字证书申请进度查询")' size="medium">申请进度查询</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
// import { getControllerId } from '@/api/login/register'
import captchaImg from '@/assets/login/captcha.jpg'
// import { getCaptcha } from '@/api/login.js'
import { getUUID } from '@/utils'
import { common_Validate, user_Validate } from '@/utils/formValidate'
import { getToken } from '@/utils/auth'
import certificateIe from '@/certificateIe.js'
import certificate from '@/certificate.js'
export default {
  name: 'login',
  data() {
    return {
      loading: false,
      asideBgLeftImg: {
        backgroundImage: 'url(' + require('@/assets/login/aside-bg-left.jpg') + ')'
      },
      mainBgImg: {
        backgroundImage: 'url(' + require('@/assets/login/main-bg.jpg') + ')'
      },
      captchaImg: captchaImg,
      registerDialogVisible: false,
      resetPasswordDialogVisible: false,
      figureCredentialDialogVisible: false,
      CryptoAgent: '', // 数字证书，
      SelectCertResult: '',
      signObj: 'skdjfaklsdjfklasdjfklajsdlf',
      loginForm: {
        username: '',
        password: '',
        uuid: '',
        verifyCode: '',
        signature: '', //
        certInfo: '', //
        CertTimeOut: ''
      },
      isCertificate: false,
      rules: {
        username: [{ validator: user_Validate, trigger: 'blur' }],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        captchverifyCodea: [
          {
            required: true,
            validator: common_Validate,
            trigger: 'blur'
          },
          { min: 4, max: 4, message: '字符长度必须4位', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    // if (window.useCfca) {
    //   try {
    //     this.certificate = certificate
    //     console.log('登录初始化CFCA加载成功', this.certificate)
    //     this.init()
    //   } catch (error) {
    //     console.log('CFCA加载失败')
    //     console.log(error)
    //     this.loginForm.certInfo = ''
    //     this.loginForm.CertTimeOut = ''
    //     this.loginForm.signature = ''
    //     return
    //   }
    // } else {
    //   this.$confirm('是否使用证书登录?', '提示', {
    //     distinguishCancelAndClose: true,
    //     confirmButtonText: '是',
    //     cancelButtonText: '否',
    //     showClose: false,
    //     type: 'warning'
    //   }).then(() => {
    //     try {
    //       this.isCertificate = true
    //       this.certificate = certificate
    //       this.init()
    //     } catch (error) {
    //       console.log('CFCA加载失败')
    //       console.log(error)
    //     }
    //   }).catch(res => {
    //     if (res === 'cancel') {
    //       this.certificate = null
    //     }
    //   })
    // }
    if (window.useCfca) {
      if (
        navigator.appName.indexOf('Internet') >= 0 ||
        navigator.appVersion.indexOf('Trident') >= 0
      ) {
        console.log('走老ie程序首页')
        try {
          this.certificate = certificateIe
          console.log('登录初始化CFCA加载成功', this.certificate)
          this.certificate.init()
        } catch (error) {
          console.log('CFCA加载失败')
          return
        }
      } else {
        console.log('走websorty首页')
        try {
          // this.certificate = certificate
          // console.log('登录初始化CFCA加载成功', this.certificate)
          // this.certificate.init()
          this.certificate = certificate
          console.log('登录初始化CFCA加载成功')
          this.init()
        } catch (error) {
          console.log('CFCA加载失败')
          this.loginForm.certInfo = ''
          this.loginForm.CertTimeOut = ''
          this.loginForm.signature = ''
          return
        }
      }
    } else {
      if (
        navigator.appName.indexOf('Internet') >= 0 ||
        navigator.appVersion.indexOf('Trident') >= 0
      ) {
        console.log('走老ie程序首页')
        this.$confirm('是否使用证书登录?', '提示', {
          distinguishCancelAndClose: true,
          confirmButtonText: '是',
          cancelButtonText: '否',
          showClose: false,
          type: 'warning'
        })
          .then(() => {
            try {
              this.isCertificate = true
              this.certificate = certificateIe
              this.certificate.init()
            } catch (error) {
              console.log('CFCA加载失败')
              console.log(error)
            }
          })
          .catch(res => {
            if (res === 'cancel') {
              this.certificate = null
            }
          })
      } else {
        console.log('走websorty首页')
        this.$confirm('是否使用证书登录?', '提示', {
          distinguishCancelAndClose: true,
          confirmButtonText: '是',
          cancelButtonText: '否',
          showClose: false,
          type: 'warning'
        })
          .then(() => {
            try {
              this.isCertificate = true
              this.certificate = certificate
              this.init()
              // this.certificate.init()
            } catch (error) {
              console.log('CFCA加载失败')
              console.log(error)
            }
          })
          .catch(res => {
            if (res === 'cancel') {
              this.certificate = null
            }
          })
      }
    }
  },

  created() {
    this.handleGetCaptcha()
    // this.getDictionary('MMCD,MMZDCD')
  },
  methods: {
    init() {
      async function init1(params) {
        await certificate.onLoad()
      }
      init1()
    },
    handleGetCaptcha() {
      this.loginForm.uuid = getUUID()
      this.captchaImg =
        `/sysmanage/outInterFace/loginCode.jpg?uuid=${this.loginForm.uuid}`
    },
    // 登录
    handleLogin() {
      if (getToken()) {
        this.$message({
          message: '您已在浏览器其它页签中登录，请退出后在进行登录！',
          type: 'warning'
        })
        return
      }

      // if (window.useCfca) {
      //   if (!this.certificate.CryptoAgent) {
      //     this.$message({
      //       message: '请使用IE10及以上版本浏览器',
      //       type: 'warning',
      //       showClose: true
      //     })
      //     return
      //   }
      // } else {
      //   if (this.isCertificate && !this.certificate.CryptoAgent) {
      //     this.$message({
      //       message: '请使用IE10及以上版本浏览器',
      //       type: 'warning',
      //       showClose: true
      //     })
      //     return
      //   }
      // }
      if (
        navigator.appName.indexOf('Internet') >= 0 ||
        navigator.appVersion.indexOf('Trident') >= 0
      ) {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true
            if (window.useCfca) {
              try {
                this.loginForm.certInfo = this.certificate.GetCertInfo()
                console.log('获取CFCA证书信息成功', this.certificate.GetCertInfo())
                this.loginForm.CertTimeOut = this.certificate.expireDate()
                console.log('获取CFCA证书生效日期成功', this.certificate.expireDate())
                this.loginForm.signature = this.certificate.getSingature(this.loginForm.username)
                console.log('CFCA签名成功', this.certificate.getSingature(this.loginForm.username))
              } catch (error) {
                console.log(error)
                console.log('CFCA信息读取出错')
                this.loginForm.certInfo = ''
                this.loginForm.CertTimeOut = ''
                this.loginForm.signature = ''
              }
            } else {
              try {
                this.loginForm.certInfo = this.isCertificate ? this.certificate.GetCertInfo() : ''
                console.log('获取CFCA证书信息成功', this.certificate.GetCertInfo())
                this.loginForm.CertTimeOut = this.isCertificate ? this.certificate.expireDate() : ''
                console.log('获取CFCA证书生效日期成功', this.certificate.expireDate())
                this.loginForm.signature = this.isCertificate
                  ? this.certificate.getSingature(this.loginForm.username)
                  : ''
                console.log('CFCA签名成功', this.certificate.getSingature(this.loginForm.username))
              } catch (error) {
                console.log(error)
                console.log('CFCA信息读取出错')
                this.loginForm.certInfo = this.isCertificate ? this.certificate.GetCertInfo() : ''
                this.loginForm.CertTimeOut = this.isCertificate ? this.certificate.expireDate() : ''
                this.loginForm.signature = this.isCertificate
                  ? this.certificate.getSingature(this.loginForm.username)
                  : ''
              }
            }

            this.$store
              .dispatch('LoginByUsername', this.loginForm)
              .then(res => {
                if (res.message) {
                  this.$confirm(res.message, '提示', {
                    confirmButtonText: '确 定',
                    type: 'warning'
                  })
                    .then(() => {
                      this.loading = false
                      if (res.route) {
                        this.$router.push({ name: res.route, params: { userName: res.userName }})
                      }
                    })
                    .catch(() => {
                      this.loading = false
                    })
                } else {
                  this.loading = false
                  this.$router.push({ path: res.route })
                }
              })
              .catch(() => {
                this.loading = false
              })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      } else {
        this.$refs.loginForm.validate(async(valid) => {
          if (valid) {
            this.loading = true
            if (window.useCfca) {
              try {
                this.loginForm.certInfo = await this.certificate.GetCertInfo().then(value => {
                  return value
                })
                  .catch(() => {
                    this.loading = false
                  })
                this.loginForm.signature = await this.certificate.getSingature(this.loginForm.username).then(res => {
                  return res
                })
                  .catch(() => {
                    this.loading = false
                  })
              // this.loginForm.certInfo = this.certificate.GetCertInfo()
              // console.log('获取CFCA证书信息成功', this.certificate.GetCertInfo())
              // this.loginForm.CertTimeOut = this.certificate.expireDate()
              // console.log('获取CFCA证书生效日期成功', this.certificate.expireDate())
              // this.loginForm.signature = this.certificate.getSingature(this.loginForm.username)
              // console.log('CFCA签名成功', this.certificate.getSingature(this.loginForm.username))
              } catch (error) {
                console.log(error)
                console.log('CFCA信息读取出错')
                this.loginForm.certInfo = ''
                this.loginForm.CertTimeOut = ''
                this.loginForm.signature = ''
              }
            } else {
              try {
                this.loginForm.certInfo = await this.certificate.GetCertInfo().then(value => {
                  return value
                })
                  .catch(() => {
                    this.loading = false
                  })
                this.loginForm.signature = await this.certificate.getSingature(this.loginForm.username).then(res => {
                  return res
                })
                  .catch(() => {
                    this.loading = false
                  })
              // this.loginForm.certInfo = this.isCertificate ? this.certificate.GetCertInfo() : ''
              // console.log('获取CFCA证书信息成功', this.certificate.GetCertInfo())
              // this.loginForm.CertTimeOut = this.isCertificate ? this.certificate.expireDate() : ''
              // console.log('获取CFCA证书生效日期成功', this.certificate.expireDate())
              // this.loginForm.signature = this.isCertificate
              //   ? this.certificate.getSingature(this.loginForm.username)
              //   : ''
              // console.log('CFCA签名成功', this.certificate.getSingature(this.loginForm.username))
              } catch (error) {
                console.log(error)
                console.log('CFCA信息读取出错')
                this.loginForm.certInfo = this.isCertificate ? this.certificate.GetCertInfo() : ''
                this.loginForm.CertTimeOut = this.isCertificate ? this.certificate.expireDate() : ''
                this.loginForm.signature = this.isCertificate
                  ? this.certificate.getSingature(this.loginForm.username)
                  : ''
              }
            }

            this.$store
              .dispatch('LoginByUsername', this.loginForm)
              .then(res => {
                if (res.message) {
                  this.$confirm(res.message, '提示', {
                    confirmButtonText: '确 定',
                    type: 'warning'
                  })
                    .then(() => {
                      this.loading = false
                      if (res.route) {
                        this.$router.push({ name: res.route, params: { userName: res.userName }})
                      }
                    })
                    .catch(() => {
                      this.loading = false
                    })
                } else {
                  this.loading = false
                  this.$router.push({ path: res.route })
                }
              })
              .catch(() => {
                this.loading = false
              })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      }
    },
    // getDictionary(params) {
    //   getDictionaryDatas(params)
    //     .then(res => {
    //       if (res.code === 200) {
    //         const pwdMinLen = res.data.MMCD
    //         const pwdMaxLen = res.data.MMZDCD
    //         this.rules.password.push({
    //           min: parseInt(pwdMinLen),
    //           message: '密码长度必须在' + parseInt(pwdMinLen) + '~' + parseInt(pwdMaxLen) + '位之间',
    //           trigger: 'blur'
    //         }, {
    //           max: parseInt(pwdMaxLen),
    //           message: '密码长度必须在' + parseInt(pwdMinLen) + '~' + parseInt(pwdMaxLen) + '位之间',
    //           trigger: 'blur'
    //         })
    //       }
    //     })
    //     .catch()
    // },
    openPage(routerName, queryParams) {
      this.$router.push({ name: routerName, params: { title: queryParams }})
    },
    showRegisterDialog() {
      this.registerDialogVisible = !this.registerDialogVisible
    },
    showResetPasswordDialog() {
      this.resetPasswordDialogVisible = !this.resetPasswordDialogVisible
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import 'src/styles/login.scss';

.login-container {
  .main {
    & .main-title {
      margin-bottom: 25px;
    }
  }
  .el-button--medium {
    font-size: 1.1em;
  }
}
</style>
