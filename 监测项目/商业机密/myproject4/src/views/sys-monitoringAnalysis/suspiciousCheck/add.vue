<template>
  <div class="suspiciousfocusList">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>新增</span>
      </div>
      <div class="text item">
        <!-- {{this.aggregate}}
        {{this.step}}
        {{this.dataArr.length}}
        {{this.dataArr}} -->
        <el-form :model="regularForm" ref="regularForm" :rules="rules" label-width="220px">
          <el-row class="toggle" :gutter="20">
            <el-col :span="8">
              <el-form-item label="分支机构名称：" label-width="180px">
                <!-- <el-input
                  disabled
                  v-model="this.name"
                  placeholder="请输入分支机构名称,最长20字符"
                  maxlength="20"
                ></el-input> -->
                <el-select
              style="width:100%"
              v-model="user_riid"
              placeholder="请选择机构"
						   disabled
              clearable
            >
              <el-option
                v-for="(item,index) in localBankArr"
                :key="index"
                :value="item.codeId"
                :label="item.codeName"
              ></el-option>
            </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item :inline="true" label-width="0px" prop="year">
                <span style="color:red">*</span>
                <el-date-picker
                  :disabled="this.disables"
                  size="mini"
                     :picker-options="pickerOptions5"
                  style="width:85%"
                  v-model="regularForm.year"
                  value-format="yyyy"
                  type="year"
                  placeholder="年份"
                ></el-date-picker>
                <span>年</span>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              
              <el-form-item :inline="true" label-width="0px" prop="quarter">
                 <span style="color:red">*</span>
                <!-- <span>第</span> -->
                <el-select
                  clearable
                  :disabled="this.disables"
                  v-model="regularForm.quarter"
                  placeholder="——"
                  style="width:60%"
                >
                  <el-option
                    v-for="(item,index) in quarter"
                    :key="index"
                    :value="item.value"
                    :label="item.label"
                  ></el-option>
                </el-select>
                <!-- <span>半年</span> -->
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="本期实际接收可疑报告份数：" prop="reportNum" style="margin-bottom:30px;">
                <el-input
                  :disabled="this.disables"
                  v-model="regularForm.reportNum"
                  class="page-class"
                  placeholder="请输入可疑报告份数,最长20字符"
                  
                  maxlength="20"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <el-form
          :model="formInline"
          ref="formInline"
          :rules="rules"
          class="demo-form-inline"
          label-width="220px"
        >
          <template>
            <el-row class="toggle" :gutter="20">
              <el-col :span="12">
                <el-form-item label="可疑客户名称：" prop="name" label-width="180px">
                  <el-input
                    v-model="formInline.name"
                    placeholder="请输入可疑客户名称,最长50字符"
                    maxlength="50"
                  ></el-input>
                </el-form-item>
              </el-col>
							<el-col :span="12">
                <el-form-item label="可疑客户证件号码：" prop="certificateNum" label-width="150px">
                  <el-input
                    v-model="formInline.certificateNum"
                    placeholder="请输入可疑客户证件号码,最长50字符"
                    
                    maxlength="50"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class="toggle" :gutter="20">
              <el-col :span="12">
                <el-form-item label="报告机构名称：" prop="reportM" label-width="180px">
                  <el-select
                    v-loading="load"
                    element-loading-spinner="el-icon-loading"
                    element-loading-background="rgba(0, 0, 0, 0.0)"
                    clearable
                    v-model="formInline.reportM"
                    filterable
                    remote
                    reserve-keyword
                    placeholder="请输入或选择报告机构名称"
                    :remote-method="remoteMethod"
                    :loading="loading"
                  >
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.label"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                  <!-- :picker-options="pickerOptions0"   控制时间是当天之后-->
                <el-form-item label="处理时间："   prop="dealDate" label-width="150px">
                  <el-date-picker
                  :picker-options="pickerOptions2"
                    v-model="formInline.dealDate"
                    value-format="yyyy-MM-dd"
                    align="right"
                    type="date"
                    placeholder="选择日期"
                  
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class="toggle" :gutter="20">
              <el-col :span="12">
                <el-form-item label="报告接收情况：" prop="receptionSituation" label-width="180px" :rules="[{ required:this.regularForm.quarter===0, message: '请输入报告接收情况', trigger: 'change' }]">
                  <el-select clearable v-model="formInline.receptionSituation" >
                    <el-option
                      v-for="(item,index) in receiveArr"
                      :key="index"
                      :label="item.codeName"
                      :value="item.codeId"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="处理状态：" prop="dealStatus" label-width="150px">
                  <el-select clearable v-model="formInline.dealStatus" @change="selectChange">
                    <el-option
                      v-for="(item,index) in stateArr"
                      :key="index"                      
                      :label="item.codeName"
                      :value="item.codeId"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class="toggle" :gutter="20">
              <el-col :span="12">
                <el-form-item label="涉罪可疑交易行为初判：" prop="preliminaryJudgement" label-width="180px">
                  <el-select clearable v-model="formInline.preliminaryJudgement" filterable>
                    <el-option
                      v-for="(item,index) in dialogJudgmentData"
                      :key="index"
                      :label="item.codeName"
                      :value="item.codeId"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  label="接收部门名称："
                  prop="receiveDepartment"
                  label-width="150px"
                >
                  <el-input
                    v-model="formInline.receiveDepartment"
                    placeholder="请输入接收部门名称,最长50字符"
                    
                    maxlength="50"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class="toggle" :gutter="20">
              <el-col :span="24">
                <el-form-item
                  label="判断理由："
                  prop="judgementReason"
                  label-width="180px"
                >
                  <el-input
                    type="textarea"
                    :rows="3"
                    v-model="formInline.judgementReason"
                    placeholder="请输入判断理由,最长1000字符"
                    
                    maxlength="1000"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </template>
        </el-form>
        <el-form :model="regularForm" ref="regularForm1" :rules="rules" label-width="220px">
          <el-row class="toggle" :gutter="20">
            <el-col :span="8">
              <el-form-item
                label="填报人："
                prop="fillUser"
                label-width="180px"
              >
                <el-input
                  :disabled="this.disables"
                  v-model="regularForm.fillUser"
                  placeholder="请输入填报人,最长20字符"
                  
                  maxlength="20"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="审批人："
                prop="approver"
                label-width="140px"
              >
                <el-input
                  :disabled="this.disables"
                  v-model="regularForm.approver"
                  placeholder="请输入审批人,最长20字符"
                  
                  maxlength="20"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="联系电话："
                prop="contact"
              >
                <el-input
                  :disabled="this.disables"
                  v-model="regularForm.contact"
                  placeholder="请输入联系电话,最长20字符"
                  
                  maxlength="20"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
				<div>
					<p style="color:red;font-size:10px">注：1）处理时间：若前期已对该客户进行了分析处理，本期无更改意见时，填写前次处理时间，若有更改意见时填写新的处理时间。</p>
					<p style="color:red;font-size:10px;margin-left: 1.7%">2）接收部门名称：仅当“处理状态”为“已报案”、“转送其他行政部门”、“报告机构直接报案”时填写，此处填写报案或转送信息的接收单位名称。</p>
          		<p style="color:red;font-size:10px;margin-left: 1.7%">3）报告接收情况：若上报频率填写半年时，可不填写此项。</p>
				</div>
        <div style="textAlign:center">
					<el-button type="primary" @click="lastCustomer()" :loading="loads">上一页</el-button>
          <el-button type="primary" @click="nextCustomer()" :loading="loads">填写下一客户信息</el-button>
          <el-button type="primary" @click="submitForm()"  :loading="loads">提交</el-button>
          <el-button type="primary" @click="goback()">返回</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
import { branch } from '@/api/sys-monitoringAnalysis/conjointAnalysis/list.js'
import { common_Validate, commonPattern } from '@/utils/formValidate'
import { onSubmit } from '@/api/sys-monitoringAnalysis/suspiciousCheck/add.js'
import { dictionary } from '@/api/sys-monitoringAnalysis/roster-warning/common.js'
import { mapGetters } from 'vuex'
import { rinmList } from '@/api/common/industry'
export default {
  data() {
    // var validatePass = (rule, value, callback) => {
    //   if (!commonPattern.spaceBar.test(value)) {
    //     callback(new Error('内容不能含有空格'))
    //   } else if (commonPattern.specialChar.test(value) || commonPattern.specialEng.test(value)) {
    //     callback(new Error('内容不能填写特殊字符'))
    //   } else {
    //     if (this.formInline.dealStatus === '01') {
    //       if (value === '') {
    //         callback(new Error('请输入接收部门名称'))
    //       }
    //       callback()
    //     } else if (this.formInline.dealStatus === '05') {
    //       if (value === '') {
    //         callback(new Error('请输入接收部门名称'))
    //       }
    //       callback()
    //     } else if (this.formInline.dealStatus === '06') {
    //       if (value === '') {
    //         callback(new Error('请输入接收部门名称'))
    //       }
    //       callback()
    //     } else {
    //       callback()
    //     }
    //   }
    // }
    return {
      pickerOptions5: {
        disabledDate(time) {
          var nowDate = new Date()
          return time.getFullYear() > nowDate.getFullYear()
        }
      },
      pickerOptions2: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e6
        }
      },
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7// 如果没有后面的-8.64e7就是不可以选择今天的
        }
      },
      localBankArr: [],
      disables: false,
      load: true,
      loading: false,
      loads: false,
      options: [],
      list: [],
      dataArr: [],
      step: 0,
      negative: 0,
      dialogJudgmentData: [],
      rinmOptions: [], // 报告机构列表
      receiveArr: [],
      stateArr: [],
      customerArr: [],
      aggregate: {},
      quarter: [
        { label: '全年', value: 0 },
        { label: '上半年', value: 1 },
        { label: '下半年', value: 2 }

        // { label: '四', value: 4 }
      ],
      regularForm: {
        branchM: '',
        year: '',
        quarter: '',
        reportNum: '',
        fillUser: '',
        approver: '',
        contact: ''
      },
      formInline: {
        receptionSituation: '',
        dealDate: '',
        reportM: '',
        receiveDepartment: '',
        dealStatus: '',
        judgementReason: '',
        preliminaryJudgement: '',
        name: '',
        certificateNum: ''
      },
      rules: {
        branchM: [{ required: true, message: '请输入分支机构名称', trigger: 'blur' }],
        reportNum: [{ required: true, validator: this.onlyNumberValidate, trigger: 'blur' }],
        // receptionSituation: [{ required: true, message: '请输入报告接收情况', trigger: 'change' }],
        year: [
          { required: true, message: '请输入年份', trigger: 'blur' },
          { min: 4, max: 4, message: '请输入正确的年份格式', trigger: 'blur' }
        ],
        quarter: [{ required: true, message: '请输入期数', trigger: 'change' }],
        dealDate: [{ required: true, message: '请输入时间', trigger: 'blur' }],
        reportM: [{ required: true, message: '请输入报告机构名称', trigger: 'change' }],
        // receiveDepartment: [{ required: true, message: '请输入接收部门名称', trigger: 'blur' }],
        receiveDepartment: [{ validator: this.isValidInput, trigger: 'blur' }],
        name: [{ required: true, validator: common_Validate, trigger: 'blur' }],
        certificateNum: [{ required: true, validator: this.onlyNumberValidate, trigger: 'blur' }],
        preliminaryJudgement: [{ required: true, message: '请输入判断结果', trigger: 'change' }],
        dealStatus: [{ required: true, message: '请选择处理状态', trigger: 'change' }],
        judgementReason: [{ required: true, message: '请输入判断理由', trigger: 'blur' }],
        fillUser: [{ required: true, validator: common_Validate, trigger: 'blur' }]
        // approver: [{ required: true, validator: common_Validate, trigger: 'blur' }]
        // contact: [{ required: true, message: '请输入联系电话', trigger: 'blur' }]
      }
    }
  },
  mounted() {
    this.getBranch()
    this.getData()
    this.getDictionary('KEYSUSREC')
    this.getDictionary('TOSC')
    this.getDictionary('KEYSUSSTATUS')
  },
  computed: {
    ...mapGetters(['name', 'user_riid']),
    paramsObj() {
      const obj = Object.assign({}, this.formInline)
      return obj
    },
    recps() {
      return this.formInline.receptionSituation
    },
    recps2() {
      return this.formInline.dealDate
    },
    recps3() {
      return this.formInline.reportM
    },
    recps4() {
      return this.formInline.receiveDepartment
    },
    recps5() {
      return this.formInline.dealStatus
    },
    recps6() {
      return this.formInline.judgementReason
    },
    recps7() {
      return this.formInline.preliminaryJudgement
    },
    recps8() {
      return this.formInline.name
    },
    recps9() {
      return this.formInline.certificateNum
    }
  },
  watch: {
    recps(val) {
      this.dataArr[this.step].receptionSituation = val
    },
    recps2(val) {
      this.dataArr[this.step].dealDate = val
    },
    recps3(val) {
      this.dataArr[this.step].reportM = val
    },
    recps4(val) {
      this.dataArr[this.step].receiveDepartment = val
    },
    recps5(val) {
      this.dataArr[this.step].dealStatus = val
    },
    recps6(val) {
      this.dataArr[this.step].judgementReason = val
    },
    recps7(val) {
      this.dataArr[this.step].preliminaryJudgement = val
    },
    recps8(val) {
      this.dataArr[this.step].name = val
    },
    recps9(val) {
      this.dataArr[this.step].certificateNum = val
    }
  },
  methods: {
    selectChange(val) {
      if (this.formInline.receiveDepartment === '') {
        this.$refs.formInline.clearValidate(['receiveDepartment'])
      }
      if (val === '01' || val === '05' || val === '06') {
        this.rules.receiveDepartment = [{ required: true, message: '请输入接收部门名称', trigger: 'blur' }, { validator: this.isValidInput, trigger: 'blur' }]
      } else {
        this.rules.receiveDepartment = [{ validator: this.isValidInput, trigger: 'blur' }]
      }
    },
    // 获取分支机构
    getBranch() {
      branch({ typeId: 'FZJGD' }).then(res => {
        if (res.code === 200) {
          const arr = res.data.list
          arr.forEach(el => {
            if (el.codeId === 'A1000131000023') {
              el.codeName = '上海总部'
            }
          })
          this.localBankArr = arr
        }
      })
    },
    // input校验
    isValidInput(rule, value, callback) {
      if (!commonPattern.spaceBar.test(value)) {
        callback(new Error('内容不能含有空格'))
      } else if (commonPattern.specialChar.test(value) || commonPattern.specialEng.test(value)) {
        callback(new Error('内容不能填写特殊字符'))
      } else {
        callback()
      }
    },
    // 数字检查
    onlyNumberValidate(rule, value, callback) {
      if (!commonPattern.spaceBar.test(value)) {
        callback(new Error('内容不能含有空格'))
      } else if (commonPattern.specialChar.test(value) || commonPattern.specialEng.test(value)) {
        callback(new Error('内容不能填写特殊字符'))
      } else if (!commonPattern.number.test(value)) {
        callback(new Error('必须输入数值'))
      } else {
        callback()
      }
    },
    getData() {
      rinmList()
        .then(res => {
          if (res.code === 200) {
            this.load = false
            this.rinmOptions = res.data
          } else {
            res.message
          }
        })
        .then(() => {
          this.list = this.rinmOptions.map(item => {
            return { value: item.riid, label: item.rinm }
          })
        })
        .catch(() => {
          this.load = false
        })
    },
    remoteMethod(query) {
      // console.log(this.list, 8888)
      if (query !== '') {
        this.loading = true
        setTimeout(() => {
          this.loading = false
          this.options = this.list.filter(item => {
            return item.label.indexOf(query) > -1
          })
        }, 200)
      } else {
        this.options = []
      }
    },
    // 获取字典
    getDictionary(params) {
      dictionary(params).then(res => {
        if (res.code === 200) {
          switch (params) {
            case 'TOSC':
              this.dialogJudgmentData = res.data
              break
            case 'KEYSUSREC':
              this.receiveArr = res.data
              break
            case 'KEYSUSSTATUS':
              this.stateArr = res.data
              break
            default:
              break
          }
        }
      })
    },
    // 上一页
    lastCustomer() {
      if (this.step > 0) {
        this.step--
        this.formInline = Object.assign({}, this.dataArr[this.step])
        if (this.formInline.dealStatus === '01' || this.formInline.dealStatus === '05' || this.formInline.dealStatus === '06') {
          this.rules.receiveDepartment = [{ required: true, message: '请输入接收部门名称', trigger: 'blur' }, { validator: this.isValidInput, trigger: 'blur' }]
        } else {
          this.rules.receiveDepartment = [{ validator: this.isValidInput, trigger: 'blur' }]
        }
      } else {
        this.$message({
          message: '已经为第一条信息',
          type: 'warning',
          duration: 6000
        })
      }
    },
    // 填写下一个客户信息
    nextCustomer() {
      var valid1 = false
      var valid2 = false
      var valid3 = false
      this.$refs.regularForm.validate(valid => {
        if (valid) {
          valid1 = true
        }
      })
      this.$refs.regularForm1.validate(valid => {
        if (valid) {
          valid2 = true
        }
      })
      this.$refs.formInline.validate(valid => {
        if (valid) {
          valid3 = true
        }
      })
      setTimeout(() => {
        if (valid1 && valid2 && valid3) {
          if (this.formInline.dealStatus === '01' || this.formInline.dealStatus === '05' || this.formInline.dealStatus === '06') {
            this.rules.receiveDepartment = [{ required: true, message: '请输入接收部门名称', trigger: 'blur' }, { validator: this.isValidInput, trigger: 'blur' }]
          } else {
            this.rules.receiveDepartment = [{ validator: this.isValidInput, trigger: 'blur' }]
          }
          this.step++
          this.disables = true
          const newRegularForm = Object.assign({}, this.formInline)
          if (this.dataArr.length > this.step) { // 长度大于页数
            this.formInline = Object.assign({}, this.dataArr[this.step])
          } else if (this.dataArr.length === this.step) { // 长度等于页数
            this.formInline = {
              receptionSituation: '',
              dealDate: '',
              reportM: '',
              receiveDepartment: '',
              dealStatus: '',
              judgementReason: '',
              preliminaryJudgement: '',
              name: '',
              certificateNum: ''
            }
            this.$refs.formInline.resetFields()
          } else {
            this.formInline = {
              receptionSituation: '',
              dealDate: '',
              reportM: '',
              receiveDepartment: '',
              dealStatus: '',
              judgementReason: '',
              preliminaryJudgement: '',
              name: '',
              certificateNum: ''
            }
            this.dataArr.push(newRegularForm)
            this.$refs.formInline.resetFields()
          }
          if (this.formInline.dealStatus === '01' || this.formInline.dealStatus === '05' || this.formInline.dealStatus === '06') {
            this.rules.receiveDepartment = [{ required: true, message: '请输入接收部门名称', trigger: 'blur' }, { validator: this.isValidInput, trigger: 'blur' }]
          } else {
            this.rules.receiveDepartment = [{ validator: this.isValidInput, trigger: 'blur' }]
          }
        }
      }, 100)
    },
    // 提交表单
    submitForm() {
      this.$refs.formInline.validate(valid => {
        if (valid) {
          this.$refs.regularForm.validate(valid => {
            if (valid) {
              this.$refs.regularForm1.validate(valid => {
                if (valid) {
                  this.aggregate = {
                    branchM: this.name,
                    year: this.regularForm.year,
                    quarter: this.regularForm.quarter,
                    reportNum: this.regularForm.reportNum,
                    fillUser: this.regularForm.fillUser,
                    approver: this.regularForm.approver,
                    contact: this.regularForm.contact,
                    keySusMainDOList: []
                  }
                  if (this.dataArr.length > this.step) {
                    this.aggregate.keySusMainDOList = this.dataArr
                  } else if (this.dataArr.length === 0) {
                    this.aggregate.keySusMainDOList = this.dataArr
                    this.dataArr.push(this.formInline)
                  } else if (this.dataArr.length === this.step) {
                    this.aggregate.keySusMainDOList = this.dataArr
                    this.dataArr.push(this.formInline)
                  }
                  this.aggregate.keySusMainDOList = this.dataArr
                  console.log(this.aggregate)
                  this.loads = true
                  onSubmit(this.aggregate)
                    .then(res => {
                      if (res.code === 200) {
                        this.loads = false
                        this.$message({
                          message: '添加成功',
                          type: 'success',
                          duration: 6000
                        })
                      } else {
                        this.loads = false
                      }
                    })
                    .then(() => {
                      this.$router.push({ name: 'suspiciousCheck' })
                    })
                    .catch(() => { this.loads = false })
                } else {
                  return false
                }
              })
            } else {
              return false
            }
          })
        } else {
          return false
        }
      })
      this.$refs.formInline.validate(valid => {
        if (valid) {
          return
        } else {
          if (this.dataArr.length !== 0) {
            this.$message({
              message: '填写内容需符合校验规则，若当页不填写，请点击上一页后保存',
              type: 'warning',
              duration: 6000
            })
          }
          return false
        }
      })
      this.$refs.regularForm.validate(valid => {
        if (valid) {
          return
        } else {
          return false
        }
      })
      this.$refs.regularForm1.validate(valid => {
        if (valid) {
          return
        } else {
          return false
        }
      })
    },
    goback() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss">
.suspiciousfocusList {
  .el-date-editor--date {
    min-width: 100% !important;
  }
  .el-select {
    width: 100%;
  }
  .rangeData {
    .el-date-editor--daterange {
      min-width: 100%;
    }
  }
  // @media screen and(max-width: 1400px) {
  //   .toggle {
  //     .el-col-8 {
  //       width: 50%;
  //     }
  //   }
  // }
}
</style>