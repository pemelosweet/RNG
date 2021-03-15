<template>
  <div class="judgedClues_subsequentAdd">
    <el-card>
      <div slot="header">
        <span>添加后续办理情况</span>
      </div>
      <el-form :model="form" :rules="rules" ref="ruleForm" label-width="160px">
        <div class="block">
          <div class="itemBlock">
            <div>
              <el-form-item label="涉罪类型：" prop="psclueId">
                <el-select
                  filterable
                  v-model="form.psclueId"
                  multiple
                  placeholder="请选择"
                  @change="replenish"
                >
                  <el-option
                    v-for="(item,index) in dialogJudgmentData"
                    :key="index"
                    :label="item.codeName"
                    :value="item.codeId"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                v-if="isReplenishOne"
                prop="supplementOne"
                :rules="[{validator: szisValidInput1, trigger: 'blur'}]"
              >
                <el-input
                  maxlength="100"
                  v-model="supplementOne"
                  placeholder="请填写关于司法机构或行政调查已介入的可疑交易行为的补充"
                ></el-input>
              </el-form-item>
              <el-form-item
                v-if="isReplenishTwo"
                prop="supplementTwo"
                :rules="[{validator: szisValidInput2, trigger: 'blur'}]"
              >
                <el-input
                  maxlength="100"
                  v-model="supplementTwo"
                  placeholder="请填写关于涉嫌其他犯罪的可疑交易行为的补充"
                ></el-input>
              </el-form-item>
            </div>
            <!-- <preliminary-judgment 
             :lableWidth="160" 
             ref="judgment" 
             :propVal="'initJudge'" 
             :judgmentInp1="judgmentInp1" 
             :judgmentInp2="judgmentInp2"
              @judgment="getJudgment" 
              :echoJudgment="reportCluePreJudgment" 
              @judgmentOther="getJudgmentOther">
            </preliminary-judgment>-->
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item
                  label="立案名目："
                  label-width="160px"
                  prop="register"
                  :rules="[{required: isDetection, message: '立案名目不能为空', trigger: 'blur' },{validator: isValidInput, trigger: 'blur'}]"
                >
                  <el-input
                    v-model="form.register"
                    placeholder="请输入立案名目,最长50字符"
                    clearable
                    maxlength="50"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
              label="案件侦破情况："
              label-width="160px"
              prop="caseNote"
              :rules="[{ required: isDetection, message: '案件侦破情况不能为空', trigger: 'blur' },{validator: isValidInput, trigger: 'blur'}]"
            >
              <el-input
                v-model="form.caseNote"
                placeholder="请输入案件侦破情况,最长50字符"
                clearable
                maxlength="50"
              ></el-input>
            </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="专项行动及专案名称："
                  label-width="160px"
                  prop="caseName"
                  :rules="[{validator: isValidInput, trigger: 'blur'}]"
                >
                  <el-input
                    v-model="form.caseName"
                    placeholder="请输入专项行动及专案名称,最长50字符"
                    clearable
                    maxlength="50"
                  ></el-input>
                </el-form-item>
              </el-col>
             
            </el-row>

            <el-row :gutter="20">
           
              <el-col :span="8">
                <el-form-item label="线索状态：" label-width="160px" prop="withState">
                  <el-select v-model="form.withState" placeholder="请选择">
                    <el-option label="仅报告" value="仅报告"></el-option>
                    <el-option label="立案" value="立案"></el-option>
                    <el-option label="结案" value="结案"></el-option>
                    <el-option label="撤案" value="撤案"></el-option>
                    <el-option label="不予立案" value="不予立案"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
                  <el-col :span="8">
                <el-form-item
                  label="接收处室："
                  label-width="160px"
                  prop="reviceDep"
                  :rules="[{validator: isValidInput, trigger: 'blur'}]"
                >
                  <el-input
                    v-model="form.reviceDep"
                    placeholder="请输入接收处室,最长50字符"
                    clearable
                    maxlength="50"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  :inline="true"
                  label="涉罪金额："
                  label-width="160px"
                  prop="cart"
                  :rules=" [
            { required: isDetection, validator:isValidMoney }

          ]"
                >
                  <el-input
                    style="width:70%"
                    v-model="form.cart"
                    placeholder="请输入涉罪金额,最长20字符"
                    clearable
                    maxlength="20"
                  ></el-input>
                  <span>万元</span>
                </el-form-item>
              </el-col>
         
            </el-row>

            <el-row :gutter="20">
                   <el-col :span="8">
                <el-form-item
                  label="报告时间："
                  label-width="160px"
                  prop="reportDate"
                  :rules="[{ required: isReport, message: '时间不能为空', trigger: 'blur' }]"
                >
                  <el-date-picker
                   :picker-options="pickerOptions2"
                    v-model="form.reportDate"
                    placeholder="选择日期"
                    type="date"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="立案时间："
                  label-width="160px"
                  prop="registerTime"
                  :rules="[{ required: isRegister, message: '时间不能为空', trigger: 'blur' }]"
                >
                  <el-date-picker
                   :picker-options="pickerOptions2"
                    v-model="form.registerTime"
                    placeholder="选择日期"
                    type="date"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="结案时间："
                  label-width="160px"
                  prop="endTime"
                  :rules="[{ required: isDetection, message: '时间不能为空', trigger: 'blur' }]"
                >
                  <el-date-picker
                   :picker-options="pickerOptions2"
                    v-model="form.endTime"
                    placeholder="选择日期"
                    type="date"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>

            
            <el-form-item
              label="领导批示及有关线索的评价："
              class="searchBlock_special_formIten"
              label-width="160px"
            >
              <el-input
                v-model="form.evaluation"
                type="textarea"
                placeholder="请输入领导批示及有关线索的评价,最长100字符"
                clearable
                maxlength="100"
              ></el-input>
            </el-form-item>

            <el-form-item label="案件总结：" label-width="160px">
              <el-input
                v-model="form.experience"
                type="textarea"
                placeholder="请输入案件总结,最长500字符"
                clearable
                maxlength="500"
              ></el-input>
            </el-form-item>

            <el-form-item
              label="交办方向："
              label-width="160px"
              :rules="[{validator: isValidInput22, trigger: 'blur'}]"
              prop="handDirection"
            >
              <el-input
                v-model="form.handDirection"
                placeholder="请输入交办方向,最长500字符"
                clearable
                maxlength="500"
              ></el-input>
            </el-form-item>

            <el-form-item label="附件： " label-width="160px">
              <el-upload
                :action="formUrl7"
                multiple
                class="upload-btn"
                :onSuccess="uploadSuccess"
                  :on-error="uploadError"
                :before-upload="beforeAvatarUploads"
                :on-preview="downFile"
                :on-remove="handleRemove"
              >
                <el-button type="text">添加附件</el-button>
              </el-upload>
            </el-form-item>

            <!-- <el-row>
            <el-col :span="6">
              <el-form-item label="填报人（联系人）：" >
                <span>北京营管部</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="电话：" >
                <span>1872364532352</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="审核人：" >
                <span>北京营管部</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="电话：" >
                <span>1872364532352</span>
              </el-form-item>
            </el-col>
            </el-row>-->
            <!-- <preliminary-judgment 
             :lableWidth="100" 
             ref="judgment1" 
             :propVal="'initJudge2'" 
             :judgmentInp1="judgmentInp1" 
             :judgmentInp2="judgmentInp2"
              @judgment="getJudgment2" 
              :echoJudgment="reportCluePreJudgment2" 
              @judgmentOther="getJudgmentOther2">

            </preliminary-judgment>-->
          </div>
        </div>
      </el-form>
      <div v-if="this.$route.query.sbID ==='0'" style="paddingTop:30px; textAlign:center">
        <el-button type="primary" @click="closeT">返 回</el-button>
      </div>
      <div v-else style="paddingTop:30px; textAlign:center">
        <el-button type="primary" @click="submitForm('ruleForm')" :loading="loading">保 存</el-button>
        <template v-if="isCenter">
          <router-link :to="{name:'judgedClues_manage'}">
            <el-button type="primary">返 回</el-button>
          </router-link>
        </template>
        <template v-if="!isCenter">
          <router-link :to="{name:'judgedClues_index'}" style="marginLeft:20px">
            <el-button>返 回</el-button>
          </router-link>
        </template>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getToken } from '@/utils/auth'
import { delAttach } from '@/api/sys-monitoringAnalysis/judgedClues/add.js'
import { mapGetters } from 'vuex'
import preliminaryJudgment from '@/views/sys-monitoringAnalysis/monitoringWarning/rosterWarning/components/preliminaryJudgment.vue'
import { FollowSubmits } from '@/api/sys-monitoringAnalysis/judgedClues/add.js'
import { dictionary } from '@/api/sys-monitoringAnalysis/roster-warning/common.js'
import { commonPattern } from '@/utils/formValidate'
export default {
  components: {
    preliminaryJudgment
  },
  data() {
    return {
      pickerOptions2: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e6
        }
      },
      hxId: '',
      judgmentInp1: '', // 初步判断1401 input
      judgmentInp2: '', // 初步判断1402 input
      reportCluePreJudgment: [], // 回显的数据
      reportCluePreJudgment2: [], // 回显的数据
      dialogJudgmentData: [],
      isReplenishOne: false,
      isReplenishTwo: false,
      supplementOne: '',
      supplementTwo: '',
      isReport: false, // 仅报告
      isRegister: false, // 立案
      isDetection: false, // 破案
      isRetreat: false, // 撤案
      isNo: false, // 不予立案
      id: '',
      loading: false,
      token: getToken(),
      form: {
        psclueId: [],
        initJudge: [],
        initJudge2: [],
        crimeType: [],
        crimeTypeOther: '',
        withState: '',
        reviceDep: '',
        cart: '',
        reportDate: '',
        registerTime: '',
        endTime: '',
        register: '',
        caseName: '',
        evaluation: '',
        experience: '',
        caseNote: '',
        handDirection: ''
      },
      submitAry: [],
      rules: {
        psclueId: [
          { type: 'array', required: true, message: '请至少选择一个类型', trigger: 'change' }
        ],
        initJudge: [
          { type: 'array', required: true, message: '请至少选择一个类型', trigger: 'change' }
        ],
        initJudge2: [
          { type: 'array', required: true, message: '请至少选择一个类型', trigger: 'change' }
        ],
        crimeType: [{ required: true, message: '请选择涉罪类型', trigger: 'change' }],
        withState: [{ required: true, message: '请选择状态', trigger: 'change' }],
        // cart: [{ required: true, message: '请输入涉罪类型', trigger: 'blur' }],
        // register: [{ required: true, message: '请输入涉罪类型', trigger: 'blur' }],
        caseNote: [{ required: true, message: '请输入涉罪类型', trigger: 'blur' }]
      }
    }
  },
  computed: {
    pre_withState() {
      return this.form.withState
    },
    ...mapGetters(['userInfo', 'institution', 'name']),
    isCenter() {
      return this.institution === this.GLOBAL.INSTITUTION_CENTER
    },
    formUrl7() {
      return `/monitor/reportLeads/upAttachs?token=${this.token}&id=${this.hxId}&type=06`
    }
  },
  watch: {
    pre_withState(val) {
      switch (val) {
        case '仅报告':
          this.whoIsValid('isReport')
          break
        case '立案':
          this.whoIsValid('isRegister')
          break
        case '结案':
          this.whoIsValid('isDetection')
          break
        case '撤案':
          this.whoIsValid('isRetreat')
          break
        case '不予立案':
          this.whoIsValid('isNo')
          break
        default:
          break
      }
    }
  },
  mounted() {
    this.getDictionary('TOSC')
  },
  methods: {
    // whoIsValid 谁应该验证
    whoIsValid(type) {
      this.isReport = false // 仅报告
      this.isRegister = false // 立案
      this.isDetection = false // 结案
      this.isRetreat = false // 撤案
      this.isNo = false // 不予立案
      this[type] = true
    },
    // 获取子组件发射的信息  --- 初步判断
    getJudgment(val) {
      this.form.initJudge = val
    },
    getJudgment2(val) {
      this.form.initJudge2 = val
    },
    getDictionary(params) {
      dictionary(params).then(res => {
        if (res.code === 200) {
          switch (params) {
            case 'TOSC':
              this.dialogJudgmentData = res.data
              break
            default:
              break
          }
        }
      })
    },
    beforeAvatarUploads(file) {
      const isLt500M = file.size / 1024 / 1024 < 500
      if (!isLt500M) {
        this.successOrError('上传文件大小不能超过500MB', 'error')
      }
      return isLt500M
    },
    // 成功或失败
    successOrError(msg, type, time) {
      this.$message({
        message: msg || '操作成功',
        type: type || 'info',
        duration: time || 6000
      })
    },
    // 分析附件上传
    uploadSuccess(response, file, fileList) {
      if (response.code === 200) {
        console.log(this.hxId === '')
        if (this.hxId === '') {
          this.hxId = response.data.noteId
        }
        this.successOrError('上传成功', 'success')
      } else {
        this.$message({
          message: response.message,
          type: 'error',
          duration: 6000
        })
      }
    },
    uploadError() {
      this.$message({
        message: '上传失败',
        type: 'error',
        duration: 6000
      })
    },
    // 下载附件
    downFile(file) {
      console.log(file, 888)
      location.href = '/file-service/upload/download/' + file.attachId + '?' + 'moduleName=' + encodeURI('上报分析申请')
    },
    // 删除附件
    handleRemove(file, fileList) {
      if (file && file.status === 'success') {
        if (file.response) {
          this.delUrl = 'file-service/upload/delete-attach/' + file.response.data.attachId + '?' + 'moduleName=' + encodeURI('上报分析申请')
        } else if (file.attachId) {
          this.delUrl = 'file-service/upload/delete-attach/' + file.attachId + '?' + 'moduleName=' + encodeURI('上报分析申请')
        }
        // this.delUrl = 'file-service/upload/delete-attach/' + file.attachId
        delAttach('', this.delUrl).then(res => {
          this.$message({
            message: '删除附件成功',
            type: 'success',
            duration: 6000
          })
        })
      }
    },
    // 涉罪校验
    szisValidInput1(rule, value, callback) {
      if (!commonPattern.spaceBar.test(this.supplementOne)) {
        callback(new Error('内容不能含有空格'))
      } else if (
        commonPattern.specialChar.test(this.supplementOne) ||
        commonPattern.specialEng.test(this.supplementOne)
      ) {
        callback(new Error('内容不能填写特殊字符'))
      } else if (this.supplementOne === '') {
        callback(new Error('内容不能为空'))
      } else {
        callback()
      }
    },
    szisValidInput2(rule, value, callback) {
      if (!commonPattern.spaceBar.test(this.supplementTwo)) {
        callback(new Error('内容不能含有空格'))
      } else if (
        commonPattern.specialChar.test(this.supplementTwo) ||
        commonPattern.specialEng.test(this.supplementTwo)
      ) {
        callback(new Error('内容不能填写特殊字符'))
      } else if (this.supplementTwo === '') {
        callback(new Error('内容不能为空'))
      } else {
        callback()
      }
    },
    // 判断涉罪类型是否显示补充
    replenish() {
      if (this.form.psclueId.indexOf('1402') !== -1) {
        this.isReplenishTwo = true
      } else {
        this.isReplenishTwo = false
      }
      if (this.form.psclueId.indexOf('1401') !== -1) {
        this.isReplenishOne = true
      } else {
        this.isReplenishOne = false
      }
    },
    // 金额校验
    isValidMoney(rule, value, callback) {
      var money = /(^[1-9]([0-9]+)?(\.[0-9]{1,3})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/
      if (this.isDetection) {
        if (value > 99999999999999999999) {
          callback(new Error('最多输入20位!'))
          return
        }
        if (value === '') {
          callback(new Error('内容不能为空'))
        } else if (!money.test(value)) {
          callback(new Error('请输入正确的数字，最多保留三位小数!'))
        } else {
          callback()
        }
      } else {
        if (value > 99999999999999999999) {
          callback(new Error('最多输入20位!'))
          return
        }
        if (value === '') {
          callback()
        } else if (!money.test(value)) {
          callback(new Error('请输入正确的数字，最多保留三位小数!'))
        } else {
          callback()
        }
      }
    },
    // 金额校验
    // isValidMoney(rule, value, callback) {
    //   var money = /(^[1-9]([0-9]+)?(\.[0-9]{1,3})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/

    //   if (this.isDetection) {
    //     if (value > 99999999999999999999) {
    //       callback(new Error('最多输入20位!'))
    //       return
    //     }
    //     if (value === '') {
    //       callback(new Error('内容不能为空'))
    //     } else if (!money.test(value)) {
    //       callback(new Error('请输入正确的数字，最多保留三位小数!'))
    //     } else {
    //       callback()
    //     }
    //   } else {
    //     callback()
    //   }
    // },
    // 获取初步判断其他
    getJudgmentOther(val1, val2) {
      this.form.preliminaryJudgmentInp1 = val1
      this.form.preliminaryJudgmentInp2 = val2
    },
    getJudgmentOther2(val1, val2) {
      this.form.preliminaryJudgmentInp1 = val1
      this.form.preliminaryJudgmentInp2 = val2
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
    // input校验
    isValidInput22(rule, value, callback) {
      if (commonPattern.specialCharM.test(value) || commonPattern.specialEngM.test(value)) {
        callback(new Error('内容不能填写特殊字符'))
      } else {
        callback()
      }
    },
    // 保存
    submitForm(formName) {
      console.log(this.$refs[formName], 111)

      this.$refs[formName].validate(valid => {
        if (valid) {
          const clueId = this.$route.query.id
          this.id = clueId
          const submitObj = Object.assign({}, this.form)
          // const ary0 = []
          // this.form.psclueId.forEach(el => {
          //   const obj3 = {}
          //   if (el === '1401') {
          //     el = '1401-' + this.supplementOne
          //   } else if (el === '1402') {
          //     el = '1402-' + this.supplementTwo
          //   }
          //   obj3.psclueId = el
          //   ary0.push(obj3)
          // })
          // submitObj.crimeType = ary0
          const ary0 = []
          this.form.psclueId.forEach(el => {
            if (el === '1401') {
              el = '1401-' + this.supplementOne
            } else if (el === '1402') {
              el = '1402-' + this.supplementTwo
            }
            ary0.push(el)
          })
          submitObj.crimeType = ary0.join(',')
          submitObj.clueId = this.id
          submitObj.id = this.hxId
          this.submitAry.push(submitObj)
          console.log(this.submitAry, 222)
          this.loading = true
          setTimeout(() => {
            FollowSubmits(submitObj).then(res => {
              if (res.code === 200) {
                this.loading = false
                this.$message({
                  message: '保存成功',
                  type: 'success',
                  duration: 6000
                })
                setTimeout(() => {
                  if (this.isCenter) {
                    this.$router.push({
                      name: 'judgedClues_manage'
                    })
                  } else {
                    this.$router.push({
                      name: 'judgedClues_index'
                    })
                  }
                }, 1)
              } else {
                this.loading = false
              }
            }).catch(
              () => {
                this.loading = false
              }
            )
          }, 1)
        } else {
          return false
        }
      })
    },
    // 关 闭
    closeT() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss">
$margin: 20px;
.judgedClues_subsequentAdd {
  .block {
    .el-select {
      width: 100%;
    }
    
    .el-date-editor--daterange {
      min-width: 100%;
      max-width: 100%;
    }
    .el-date-editor--date {
      min-width: 100%;
      max-width: 100%;
    }
    .el-date-editor {
      width: 100%;
    }
    .itemBlock {
      margin-left: 5%;
      margin-bottom: $margin;
      .messageLine {
        margin-bottom: $margin;
      }
    }
    .searchBlock_special_formIten {
      .el-form-item__label {
        line-height: inherit;
      }
    }
  }
}
</style>