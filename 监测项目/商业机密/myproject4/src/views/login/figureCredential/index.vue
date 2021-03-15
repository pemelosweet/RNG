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
          <h3 class="main-title">用户验证</h3>

          <el-form ref="loginForm" :rules="rules" status-icon :model="loginForm" size="medium">
            <el-form-item prop="username">
              <el-input v-model='loginForm.username' @keyup.enter.native="handleLogin" placeholder='报告机构编码'></el-input>
            </el-form-item>
            <el-form-item prop='password'>
              <el-input type="password" @keyup.enter.native="handleLogin" v-model='loginForm.password' autoComplete='on' placeholder='密码'></el-input>
            </el-form-item>
            <!-- <el-row>
              <el-col :span="16">
                <el-form-item prop="captcha">
                  <el-input v-model='loginForm.captcha' @keyup.enter.native="handleLogin" placeholder='验证码'></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8" style="text-align: right;"><img class="captcha-img" :src='captchaImg' /></el-col>
            </el-row> -->
            <el-form-item>
              <el-col :span="24">
                <el-button @click="handleLogin" type="primary" class="btn-full-width" :loading="loading">验 证</el-button>
              </el-col>
            </el-form-item>
            <el-form-item>
              <el-col :span="24">
                <router-link :to="{name:'login'}">
                  <el-button type="warning" class="btn-full-width">返回登录</el-button>
                </router-link>
              </el-col>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import captchaImg from '@/assets/login/captcha.jpg'
import { common_Validate, user_Validate } from '@/utils/formValidate'
import { validateUsername } from '@/api/login'
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
      loginForm: {
        username: '',
        password: '',
        captcha: ''
      },
      rules: {
        username: [
          { validator: user_Validate, trigger: 'blur' }
          // { max: 50, message: '字符长度必须50位', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ],
        captcha: [
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
  methods: {
    // 密码 验证码
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          validateUsername(this.loginForm.username, this.loginForm.password).then(res => {
            if (res.code === 200) {
              if (res.data === 1) {
                this.loading = false
                this.$router.push({ name: 'figureCredential_onlinFill', query: { depCode: this.loginForm.username }})
              } else {
                this.loading = false
                this.$message.error(res.message)
              }
            }
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style rel='stylesheet/scss' lang='scss' scoped>
@import 'src/styles/login.scss';

.login-container {
  .main {
    & .main-title {
      margin-bottom: 25px;
    }
  }
}
</style>

