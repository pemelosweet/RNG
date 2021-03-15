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
          <h3 class="main-title">修改密码</h3>
          <el-form :model='updataPwForm' :rules="rules" ref="updataPwForm" size="medium">
            <el-form-item label="" prop="passwd">
              <el-input type="password" v-model="updataPwForm.passwd" autoComplete="on" class="form-input" placeholder="原密码"></el-input>
            </el-form-item>
            <el-form-item label="" prop="newPasswd">
              <el-input type="password" v-model="updataPwForm.newPasswd" autoComplete="on" class="form-input" placeholder="新密码"></el-input>
            </el-form-item>
            <el-form-item label="" prop="checkNewpass">
              <el-input type="password" v-model="updataPwForm.checkNewpass" autoComplete="on" class="form-input" placeholder="确认新密码"></el-input>
            </el-form-item>

            <el-form-item>
              <el-col :span="24">
                <el-button type="primary" class="btn-full-width" @click.native.prevent="handleSubmit('updataPwForm')">提交</el-button>
              </el-col>
            </el-form-item>
            <el-form-item>
              <el-col :span="24">
                <el-button type="warning" class="btn-full-width" @click.native.prevent="openPage('/login')">返回</el-button>
              </el-col>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// import { updatePwd_validatePass, updatePwd_validatePass2 } from '@/utils/formValidate.js'
import { updatePwdData, getDictionaryDatas } from '@/api/login/updatePwd.js'

export default {
  name: 'updataPassword',
  data() {
    var commonPattern = {
      spaceBar: /^\S*$/,
      numAndLetter: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/
    }
    var updatePwd_validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'))
      } else if (!commonPattern.spaceBar.test(value)) {
        callback(new Error('内容不能含有空格'))
        return
      } else {
        if (this.updataPwForm.checkNewpass !== '') {
          this.$refs.updataPwForm.validateField('checkNewpass')
        }
        callback()
      }
    }

    var updatePwd_validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.updataPwForm.newPasswd) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }

    var numAndLetter_validate = (rule, value, callback) => {
      if (!commonPattern.numAndLetter.test(value)) {
        callback(new Error('必须包含数字和字母'))
      } else {
        callback()
      }
    }
    return {
      asideBgLeftImg: {
        backgroundImage: 'url(' + require('@/assets/login/aside-bg-left.jpg') + ')'
      },
      mainBgImg: {
        backgroundImage: 'url(' + require('@/assets/login/main-bg.jpg') + ')'
      },
      updataPwForm: {
        userName: '',
        passwd: '',
        newPasswd: '',
        checkNewpass: ''
      },
      rules: {
        passwd: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        newPasswd: [
          { required: true, validator: updatePwd_validatePass, trigger: 'blur' }, { min: 8, max: 16, message: '密码包含数字、字母，8-16字', trigger: 'blur' }, { validator: numAndLetter_validate, trigger: 'blur' }
        ],
        checkNewpass: [{ required: true, validator: updatePwd_validatePass2, trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getDictionary('MMCD,MMZDCD,MMFZD')
    console.log(this.$route.params.userName)
    this.updataPwForm.userName = this.$route.params.userName
  },
  methods: {
    openPage(url) {
      this.$router.push(url)
    },
    handleSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          updatePwdData(
            this.updataPwForm.userName,
            this.updataPwForm.passwd,
            this.updataPwForm.newPasswd
          )
            .then(res => {
              if (res.code === 200) {
                const msg = res.message === 'success' ? '修改成功' : '修改失败'
                this.$confirm(msg, '提示', {
                  confirmButtonText: '确 定',
                  type: 'success'
                })
                  .then(() => {
                    this.$router.push({ path: '/login' })
                  })
                  .catch()
              } else {
                this.$message({
                  type: 'error',
                  message: res.message
                })
              }
            })
            .catch()
        } else {
          return false
        }
      })
    },
    getDictionary(params) {
      getDictionaryDatas(params)
        .then(res => {
          if (res.code === 200) {
            const pwdMinLen = res.data.MMCD
            const pwdMaxLen = res.data.MMZDCD
            const pwdComplex = res.data.MMFZD
            // var codeThree = /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z]+$)(?![a-z0-9]+$)(?![a-z]+$)(?![0-9]+$)[a-zA-Z0-9]$/
            var password_Validate = (rule, value, callback) => {
              var count = 0
              if (value.match(/^.*(?=.*\d).*$/)) {
                count++
              }
              if (value.match(/^.*(?=.*[a-z]).*$/)) {
                count++
              }
              if (value.match(/^.*(?=.*[A-Z]).*$/)) {
                count++
              }
              if (value.match(/^.*(?=.*[!@#$%^&*?]).*$/)) {
                count++
              }
              if (value.match(/^.*(?=.*[_]).*$/)) {
                count++
              }
              if (count < pwdComplex) {
                callback(new Error('密码必须是字母大写、小写、数字、特殊字符、下划线中任意' + pwdComplex + '种组合！'))
              }
              callback()
            }
            this.rules.passwd.push({
              min: parseInt(pwdMinLen),
              message: '密码长度必须在' + parseInt(pwdMinLen) + '~' + parseInt(pwdMaxLen) + '位之间',
              trigger: 'blur'
            }, {
              max: parseInt(pwdMaxLen),
              message: '密码长度必须在' + parseInt(pwdMinLen) + '~' + parseInt(pwdMaxLen) + '位之间',
              trigger: 'blur'
            })
            this.rules.newPasswd.push({
              min: parseInt(pwdMinLen),
              message: '密码长度必须在' + parseInt(pwdMinLen) + '~' + parseInt(pwdMaxLen) + '位之间',
              trigger: 'blur'
            }, {
              max: parseInt(pwdMaxLen),
              message: '密码长度必须在' + parseInt(pwdMinLen) + '~' + parseInt(pwdMaxLen) + '位之间',
              trigger: 'blur'
            }, {
              validator: password_Validate, trigger: 'blur'
            })
            this.rules.checkNewpass.push({
              min: parseInt(pwdMinLen),
              message: '密码长度必须在' + parseInt(pwdMinLen) + '~' + parseInt(pwdMaxLen) + '位之间',
              trigger: 'blur'
            }, {
              max: parseInt(pwdMaxLen),
              message: '密码长度必须在' + parseInt(pwdMinLen) + '~' + parseInt(pwdMaxLen) + '位之间',
              trigger: 'blur'
            })
          }
        })
        .catch()
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
    font-size: 1.2em;
  }
}
</style>
