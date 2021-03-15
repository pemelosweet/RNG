<template>
  <div class="rosterManageanalyst-handleImport">
    <el-card>
      <div slot="header">
        <span>录入标注名单信息</span>
      </div>

      <el-form :model="form" label-width="135px" :rules="rules" ref="ruleForm">

        <el-row class="toggle">
          <el-col :span="8">
            <el-form-item label="主体名称：" prop="subjectName">
              <el-input v-model="form.subjectName"  maxlength="512" placeholder="最长512字符数"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="触发点：">
              <el-select v-model="form.triggerPointeger" filterable clearable>
                <el-option v-for="(item,index) in triggerPointegerArr" :key="index" :label="item.codeName" :value="item.codeId"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="分析员：">
              <el-input disabled v-model="form.creUser"  maxlength="128" placeholder="最长128字符数"></el-input>
            </el-form-item>
          </el-col>
        <!-- </el-row>
        <el-row> -->
            <el-col :span="8">
            <el-form-item label="主体类型：" prop="subjectType">
              <el-select v-model="form.subjectType" placeholder="请选择" filterable clearable :disabled="isType">
                <el-option v-for="(item,index) in subjectTypeOption" :key="index" :label="item.codeName" :value="item.codeId"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="证件类型：" prop="certificateType">
              <el-select v-model="form.certificateType" @change="certificate" clearable :disabled="isType">
                <el-option v-for="(item,index) in certificateTypeArr" :key="index" :label="item.codeName" :value="item.codeId" clearable></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="证件号码：" prop="certificateNum" ref="subjectINum">
              <el-input v-model="form.certificateNum"  maxlength="128" :disabled="isType" placeholder="最长128字符数"></el-input>
            </el-form-item>
          </el-col>
        <!-- </el-row>
        <el-row> -->
          <el-col :span="8">
            <el-form-item label="国籍/地区：">
              <el-select v-model="form.nationality" placeholder="请选择" filterable clearable>
                <el-option
                  v-for="(item,index) in subjectNationalityArr"
                  :key="index"
                  :value="item.numCode"
                  :label="item.chSName"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="标注状态：">
              <el-select v-model="form.markState" placeholder="请选择" filterable clearable>
                <el-option v-for="(item,index) in noteStatus" :key="index" :label="item.codeName" :value="item.codeId"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="初次标注：">
              <el-date-picker disabled v-model="form.firstMarkDate" value-format="yyyy-MM-dd" placeholder=""></el-date-picker>
            </el-form-item>
          </el-col>
        <!-- </el-row>
        <el-row> -->
            <el-col :span="8">
            <el-form-item label="移送状态：" prop="transferState">
              <el-input v-model="form.transferState" placeholder="最长50字符数" clearable maxlength="50"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="可疑类型：">
              <el-select v-model="form.suspiciousType" filterable clearable>
                <el-option v-for="(item,index) in suspiciousTypeArr" :key="index" :label="item.codeName" :value="item.codeId"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="最后标注：">
              <el-date-picker disabled v-model="form.lastMarkDate" value-format="yyyy-MM-dd" placeholder=""></el-date-picker>
            </el-form-item>
          </el-col>
        <!-- </el-row>
        <el-row> -->
          <el-col :span="8">
            <el-form-item label="可疑程度：">
              <el-select v-model="form.suspiciousDegree" filterable clearable>
                <el-option v-for="(item,index) in suspiciousDegreeArr" :key="index" :label="item.codeName" :value="item.codeId"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
            <el-col :span="8">
              <el-form-item label="移送编码：" prop="transferNum">
                <el-input v-model="form.transferNum"  maxlength="50" placeholder="最长50字符数"></el-input>
              </el-form-item>
            </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="建议：" prop="suggest">
              <el-input v-model="form.suggest" type="textarea"  maxlength="500" placeholder="最长500字符数"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <template>
          <el-row :gutter="20" :key="index" v-for="(item,index) in form.suspicious">
            <el-col :span="20">
              <el-form-item :label="`可疑账户${index+1}：`" :prop="'suspicious.' + index + '.value'" :rules="rules.value">
                <el-input v-model="item.value"  maxlength="64" placeholder="最长64字符数"></el-input>
              </el-form-item>
            </el-col>
            <el-button size="small" type="primary" icon="el-icon-plus" plain @click="addItem" v-if="form.suspicious.length==1||index==form.suspicious.length-1"></el-button>
            <el-button type="warning" plain @click="delItem(index)" v-if="form.suspicious.length>1" icon="el-icon-minus"></el-button>
          </el-row>
        </template>

        <el-row>
          <el-form-item label="备注：" prop="remarks">
            <el-input type="textarea" v-model="form.remarks"  maxlength="1024" placeholder="最长1024字符数"></el-input>
          </el-form-item>
        </el-row>
      </el-form>

      <div class="btnalign" style="textAlign:center">
        <el-button type="primary" @click="submitForm('ruleForm')" :loading="isTrue">确定</el-button>

        <el-button type="default" @click="backTo">返回</el-button>

      </div>
    </el-card>
  </div>

</template>

<script>
import { mapGetters } from 'vuex'
import { adminisValidInput, isValidInput, ValidCanSpace, commonPattern } from '@/utils/formValidate'
import {
  haddleAddRoster,
  select
} from '@/api/sys-monitoringAnalysis/roster-warning/roster-analyze.js'
import { getsourceBusinessArr } from '@/api/sys-monitoringAnalysis/roster-warning/levelConfiguration.js'
import { dictionary } from '@/api/sys-monitoringAnalysis/roster-warning/common.js'
export default {
  data() {
    return {
      isTrue: false,
      isType: false,
      form: {
        subjectName: '',
        triggerPointeger: '',
        certificateNum: '',
        laId: '',
        markState: '',
        firstMarkDate: '',
        certificateType: '',
        suspiciousType: '',
        lastMarkDate: '',
        nationality: '',
        suspiciousDegree: '',
        dense: '',
        transferState: '',
        transferNum: '',
        suggest: '',
        remarks: '',
        subjectType: '',
        creUser: '',
        suspicious: [
        // 可疑账户
          {
            value: ''
          }
        ]
      },
      saveEventDiagon: false,
      analyze: '',
      noteStatus: [], // 标注状态
      subjectNationalityArr: [], // 国籍
      triggerPointegerArr: [], // 触发点
      certificateTypeArr: [], // 证件类型
      suspiciousTypeArr: [], // 可疑类型
      suspiciousDegreeArr: [], // 可疑程度
      rules: {
        certificateType: [{ required: true, message: '请选择证件类型', trigger: 'change' }],
        certificateNum: [{ required: true, validator: adminisValidInput, trigger: 'blur' }],
        // 非必填
        suggest: [{ validator: isValidInput, trigger: 'blur' }, { max: 500, message: '长度不能超过 500 个字符', trigger: 'blur' }],
        value: [{ validator: adminisValidInput, trigger: 'blur' }],
        subjectName: [{ required: true, validator: ValidCanSpace, trigger: 'blur' }],
        transferState: [{ validator: adminisValidInput, trigger: 'blur' }],
        transferNum: [{ validator: adminisValidInput, trigger: 'blur' }]
        // remarks: [{ validator: adminisValidInput, trigger: 'blur' }]
      },
      analysisId: '',
      ismanagement: false, // 宋显鹏添加
      subjectTypeOption: []
    }
  },
  computed: {
    paramsObj() {
      const obj = JSON.parse(JSON.stringify(this.form))
      if (this.$route.params.id === undefined) {
        delete obj.firstMarkDate
        delete obj.lastMarkDate
      }
      const tempArr = []
      this.form.suspicious.forEach(e => {
        tempArr.push(e.value)
      })
      obj.suspiciousAccout = tempArr.join()
      return obj
    },
    ...mapGetters(['name'])
  },
  watch: {
    'form.subjectType'() {
      if (this.form.subjectType === '机构') {
        this.$refs.ruleForm.clearValidate()
        this.rules.certificateType[0].required = false
        this.rules.certificateNum = [{ required: false, validator: adminisValidInput, trigger: 'blur' }]
      } else {
        this.$refs.ruleForm.clearValidate()
        this.rules.certificateType[0].required = true
        this.rules.certificateNum = [{ required: true, validator: adminisValidInput, trigger: 'blur' }]
      }
    }
  },
  mounted() {
    this.form.creUser = this.name
    this.getDictionary('COUNTRY')
    // 宋显鹏添加 工作流处置按钮标识
    if (this.$route.query.ismanagement) {
      console.log(this.$route.query)
      this.ismanagement = true
      this.form.subjectName = this.$route.query.subjectName
      this.form.certificateNum = this.$route.query.ctid
      const arr = this.$route.query.numberArr.split(',')
      if (arr !== '') {
        this.form.suspicious = []
        for (let i = 0; i < arr.length; i++) {
          const element = {
            value: arr[i]
          }
          this.form.suspicious.push(element)
        }
      }
    }
    // if (window.history && window.history.pushState) {
    //   // 向历史记录中插入了当前页
    //   history.pushState(null, null, document.URL)
    //   window.addEventListener('popstate', this.goBackav, false)
    // }
    this.detailType = this.$route.params.type
  },
  methods: {
    getsourceBusinessArr() {
      var paramsObj = {
        pageNum: 1,
        pageSize: 9999
      }
      getsourceBusinessArr(paramsObj, '2').then(res => {
        if (res.code === 200) {
          this.subjectTypeOption = res.data.list
        }
      })
    },
    goBackav() {
      console.log('点击了浏览器的返回按钮')
      if (this.ismanagement && this.saveEventDiagon === false) {
        if (JSON.parse(sessionStorage.getItem('dealWithInfo'))) {
          const objDealwithInfo = JSON.parse(sessionStorage.getItem('dealWithInfo'))
          const bigObject = {
            objIsDeal1002: objDealwithInfo.objIsDeal1002 ? objDealwithInfo.objIsDeal1002 : {},
            objIsDeal1003: JSON.parse(sessionStorage.getItem('dealWithInfo')).objIsDeal1003,
            objIsDeal1004: objDealwithInfo.objIsDeal1004 ? objDealwithInfo.objIsDeal1004 : {},
            objIsDeal1005: objDealwithInfo.objIsDeal1005 ? objDealwithInfo.objIsDeal1005 : {},
            echoState: this.$route.query.echoState,
            centerData: this.$route.query.centerData,
            ifIsmanagement: true
          }
          sessionStorage.setItem('dealWithInfo', JSON.stringify(bigObject))
        } else {
          const bigObject = {
            objIsDeal1002: {},
            objIsDeal1003: {},
            objIsDeal1004: {},
            objIsDeal1005: {},
            echoState: this.$route.query.echoState,
            centerData: this.$route.query.centerData,
            ifIsmanagement: true
          }
          sessionStorage.setItem('dealWithInfo', JSON.stringify(bigObject))
        }
        this.$router.go(-1)
      } else {
        window.history.back()
      }
    },
    currentDay(params) {
      const oDate = new Date()
      const y = oDate.getFullYear()
      const m = oDate.getMonth() + 1
      const d = oDate.getDate()
      return y + '-' + m + '-' + d
    },
    // 证件类型校验
    certificate() {
      switch (this.form.certificateType) {
        case '110003':
          this.rules.certificateNum = [
            { required: true, message: '请填正确的身份证号码', trigger: 'blur' },
            { pattern: /^[a-zA-Z0-9]{15}$|^[a-zA-Z0-9]{18}$/, message: '请输入正确的身份证号码,15或18位', trigger: 'blur' }
          ]
          break
        case '110001':
          this.rules.certificateNum = [
            { required: true, message: '请填正确的身份证号码', trigger: 'blur' },
            { pattern: /^[a-zA-Z0-9]{15}$|^[a-zA-Z0-9]{18}$/, message: '请输入正确的身份证号码,15或18位', trigger: 'blur' }
          ]
          break
        case '':
          this.rules.certificateNum = [{ validator: this.onlyNumberValidate, trigger: 'blur' }]
          break
        default:
          this.rules.certificateNum = [{ required: true, max: 128, validator: this.onlyNumberValidate, trigger: 'change' }]
          break
      }
    },
    onlyNumberValidate(rule, value, callback) {
      if (value !== null && value !== '' && value !== undefined) {
        if (value.length <= 5 || value.length >= 129) {
          callback(new Error('内容应在6-128位之间'))
        } else if (commonPattern.headerAndFooter.test(value)) {
          callback(new Error('首尾不能有空格'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    },
    // 获取数据字典
    getDictionary(params) {
      dictionary(params).then(res => {
        if (res.code === 200) {
          switch (params) {
            case 'TAGGS':
              this.noteStatus = res.data
              break
            case 'TPOINT':
              this.triggerPointegerArr = res.data
              break
            case 'SFZJ':
              this.certificateTypeArr = res.data
              break
            case 'SUSTYPE':
              this.suspiciousTypeArr = res.data
              break
            case 'DBDE':
              this.suspiciousDegreeArr = res.data
              break
            case 'COUNTRY':
              this.subjectNationalityArr = res.data
              break
            default:
              break
          }
        }
      })
    },
    // 表单提交验证
    submitForm(formName) {
      this.certificate()
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.isTrue = true
          haddleAddRoster(this.paramsObj)
            .then(res => {
              if (res.code === 200) {
                // --------------工作流处置--------------宋显鹏添加
                if (this.ismanagement) {
                  this.analysisId = res.data
                  const objDealwithInfo = JSON.parse(sessionStorage.getItem('dealWithInfo'))
                  if (JSON.parse(sessionStorage.getItem('dealWithInfo'))) {
                    const bigObject = {
                      objIsDeal1002: {},
                      objIsDeal1003: objDealwithInfo.objIsDeal1003 ? objDealwithInfo.objIsDeal1003 : {},
                      objIsDeal1004: objDealwithInfo.objIsDeal1004 ? objDealwithInfo.objIsDeal1004 : {},
                      objIsDeal1005: objDealwithInfo.objIsDeal1005 ? objDealwithInfo.objIsDeal1005 : {},
                      echoState: this.$route.query.echoState,
                      centerData: this.$route.query.centerData,
                      ifIsmanagement: true
                    }
                    bigObject.objIsDeal1002.analysisId = this.analysisId
                    bigObject.objIsDeal1002.ismanagement = this.$route.query.ismanagement
                    sessionStorage.setItem('dealWithInfo', JSON.stringify(bigObject))
                  } else {
                    const bigObject = {
                      objIsDeal1002: {},
                      objIsDeal1003: {},
                      objIsDeal1004: {},
                      objIsDeal1005: {},
                      echoState: this.$route.query.echoState,
                      centerData: this.$route.query.centerData,
                      ifIsmanagement: true
                    }
                    bigObject.objIsDeal1002.analysisId = this.analysisId
                    bigObject.objIsDeal1002.ismanagement = this.$route.query.ismanagement
                    sessionStorage.setItem('dealWithInfo', JSON.stringify(bigObject))
                  }
                  this.$router.go(-1)
                } else {
                  this.isTrue = false
                  this.$router.push({ name: 'rosterWarning_rosterManageanalyst' })
                }
                if (this.detailType === 'new') {
                  this.$message({
                    type: 'success',
                    message: '添加成功！',
                    duration: 6000,
                    customClass: 'zZindex'
                  })
                } else {
                  this.$message({
                    type: 'success',
                    message: '修改成功！',
                    duration: 6000,
                    customClass: 'zZindex'
                  })
                }

                // this.stopRepeat = 0
                // ------------------修改截止-------------------
              }
            })
            .catch(() => {
              this.isTrue = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 添加一条可疑账户
    addItem() {
      if (this.form.suspicious.length < 5) {
        this.form.suspicious.push({
          value: ''
        })
      } else {
        this.$message({
          message: '您最多只能添加5个',
          type: 'warning',
          duration: 6000
        })
      }
    },
    // 删除一条可疑帐号
    delItem(index) {
      this.form.suspicious.splice(index, 1)
    },
    // 回显名单方法
    echoRoster(obj) {
      for (var key in this.form) {
        for (var key2 in obj) {
          if (key === key2) {
            this.form[key] = obj[key2]
          }
        }
      }
    },
    // 编辑主体名单
    editRoster(params) {
      select(params).then(res => {
        if (res.code === 200) {
          // 回显账户信息
          res.data.laId = params
          const susAccountDOList = res.data.susAccountDOList
          if (susAccountDOList) {
            this.form.suspicious = []
            susAccountDOList.forEach(item => {
              this.form.suspicious.push({ value: item.suspiciousAccout })
            })
          }
          // 回显表单内容
          this.echoRoster(res.data)
        }
      })
    },
    backTo() {
      if (JSON.parse(sessionStorage.getItem('searchData'))) {
        const obj = JSON.parse(sessionStorage.getItem('searchData'))
        obj.ifReview = true
        sessionStorage.setItem('searchData', JSON.stringify(obj))
      }
      if (this.ismanagement) {
        if (JSON.parse(sessionStorage.getItem('dealWithInfo'))) {
          const objDealwithInfo = JSON.parse(sessionStorage.getItem('dealWithInfo'))
          const bigObject = {
            objIsDeal1002: objDealwithInfo.objIsDeal1002 ? objDealwithInfo.objIsDeal1002 : {},
            objIsDeal1003: JSON.parse(sessionStorage.getItem('dealWithInfo')).objIsDeal1003,
            objIsDeal1004: objDealwithInfo.objIsDeal1004 ? objDealwithInfo.objIsDeal1004 : {},
            objIsDeal1005: objDealwithInfo.objIsDeal1005 ? objDealwithInfo.objIsDeal1005 : {},
            echoState: this.$route.query.echoState,
            centerData: this.$route.query.centerData,
            ifIsmanagement: true
          }
          sessionStorage.setItem('dealWithInfo', JSON.stringify(bigObject))
        } else {
          const bigObject = {
            objIsDeal1002: {},
            objIsDeal1003: {},
            objIsDeal1004: {},
            objIsDeal1005: {},
            echoState: this.$route.query.echoState,
            centerData: this.$route.query.centerData,
            ifIsmanagement: true
          }
          sessionStorage.setItem('dealWithInfo', JSON.stringify(bigObject))
        }
      }
      this.$router.go(-1)
    },
    backView() {
      const subject = this.$route.query.subject
      if (subject.ctac) {
        const arr = []
        subject.ctac.split(',').forEach(res => {
          arr.push({ value: res })
        })
        this.form.suspicious = arr
        console.log(arr)
      }
      this.form.subjectName = subject.ctnm
      this.form.certificateType = subject.citp
      this.form.certificateNum = subject.ctid
      this.form.subjectType = subject.subjectType
    }
  },
  destroyed() {
    window.removeEventListener('popstate', this.goBackav, false)
  },
  created() {
    this.getDictionary('TAGGS')
    this.getDictionary('TPOINT')
    this.getDictionary('SFZJ')
    this.getDictionary('SUSTYPE')
    this.getDictionary('DBDE')
    this.getsourceBusinessArr()
    if (this.$route.params.id) {
      this.editRoster(this.$route.params.id)
      this.isType = false
    } else {
      this.form.firstMarkDate = this.currentDay()
      this.form.lastMarkDate = this.currentDay()
    }
    if (this.$route.query.subject) {
      console.log(this.$route.query.subject)
      this.backView()
    }
  }
}
</script>

<style lang="scss">
.rosterManageanalyst-handleImport {
  .el-select {
    width: 100%;
  }
  .el-date-editor {
    min-width: 100%;
  }
  .check-box--input {
    position: absolute;
    width: 90%;
  }
  // .el-checkbox {
  //   margin-left: 12px;
  // }
  .el-col-8 {
    height: 55px;
  }
  @media screen and(max-width: 1400px) {
    .toggle{
      .el-col-8 {
      width: 50%;
      }
    }
  }
}
</style>
