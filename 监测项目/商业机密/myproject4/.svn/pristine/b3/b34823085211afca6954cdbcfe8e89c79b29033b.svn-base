<template>
  <div class="apporderwrap" style="margin-top:50px"  >
    <!-- <div class="modeltitle">反馈信息</div> -->
    <el-form :model="feedbackdata" :rules="feedbackRules"  ref="aForm">
      <fieldset class="classFiledset">
        <legend>线索基本情况</legend>
        <el-row :gutter="20" >
          <el-col :span="8">
            <el-form-item label="来文编号" prop="laiwenNcard">
              <el-input v-model="feedbackdata.laiwenNcard" maxlength="32" placeholder="请输入来文编号,最长为32字符" :disabled="this.banned"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="来文部门" prop="laiwenDept">
              <el-input v-model="feedbackdata.laiwenDept" maxlength="64"  placeholder="请输入来文部门,最长为64字符" :disabled="this.banned"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="来文日期" prop="laiwenDate">
              <el-date-picker :disabled="this.banned" :picker-options="pickerOptions" value-format="yyyy-MM-dd" v-model="feedbackdata.laiwenDate" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="中心函号" prop="centerNum">
              <el-input :disabled="this.banned" v-model="feedbackdata.centerNum" maxlength="32" placeholder="请输入中心函号,最长为32字符"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="中心移送线索编号" prop="evokeNum" >
              <el-input :disabled="this.banned" @blur="blurs" v-model="feedbackdata.evokeNum" maxlength="32"  placeholder="请输入中心移送线索编号,最长为32字符"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="中心移送线索名称" prop="evokename">
              <el-input :disabled="this.banned" v-model="feedbackdata.evokename" maxlength="16"   placeholder="请输入中心移送线索名称,最长为16字符"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">

            <el-form-item label="线索涉及可疑报告编号" prop="keyinum">
              <el-input :disabled="this.banned" v-model="feedbackdata.keyinum" maxlength="256"  placeholder="请输入线索涉及可疑报告编号,最长为256字符"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="办理处室" prop="banlichu">
              <el-input :disabled="this.banned" v-model="feedbackdata.banlichu" maxlength="32"  placeholder="请输入办理处室,最长为32字符"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="分析员" prop="analyst">
              <el-input :disabled="this.banned" v-model="feedbackdata.analyst"  maxlength="32"  placeholder="请输入分析员,最长为32字符"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
              <el-form-item label="涉罪类型：" prop="evokejudge">
              <el-select
                :disabled="this.banned"
                filterable
                v-model="feedbackdata.evokejudge"
                multiple
                placeholder="请选择涉罪类型"
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
            
              v-if="feedbackdata.isReplenishOne"
              prop="supplementOne"
              :rules="[{required:true, validator: szisValidInput1, trigger: 'blur'}]"
            >
              <el-input
                :disabled="this.banned"
                maxlength="100"
                v-model="feedbackdata.supplementOne"
                placeholder="请填写关于司法机构或行政调查已介入的可疑交易行为的补充,最长100字符"
              ></el-input>
            </el-form-item>
            <el-form-item
              v-if="feedbackdata.isReplenishTwo"
              prop="supplementTwo"
              :rules="[{required:true, validator: szisValidInput2, trigger: 'blur'}]"
            >
              <el-input
                :disabled="this.banned"
                maxlength="100"
                v-model="feedbackdata.supplementTwo"
                placeholder="请填写关于涉嫌其他犯罪的可疑交易行为的补充,最长100字符"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

      </fieldset>

      <fieldset class="classFiledset">
        <legend>案件基本类型</legend>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="主体名称" prop="subjectname">
              <el-input :disabled="this.banned" v-model="feedbackdata.subjectname" maxlength="128" placeholder="请输入主体名称,最长为128字符"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="主体证件号码" prop="subjectnum">
              <el-input :disabled="this.banned" v-model="feedbackdata.subjectnum" maxlength="128" placeholder="请输入主体证件号码,最长为128字符"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="主体原工作单位职务或职级" prop="subjectduty">
              <el-input :disabled="this.banned" v-model="feedbackdata.subjectduty" maxlength="32"  placeholder="请输入主体原工作单位职务或职级,最长为32字符"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="立案时间" prop="createcasetime">
              <el-date-picker :disabled="this.banned" :picker-options="pickerOptions" value-format="yyyy-MM-dd" v-model="feedbackdata.createcasetime" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="侦结时间" prop="endcasetime">
              <el-date-picker :disabled="this.banned" :picker-options="pickerOptions" value-format="yyyy-MM-dd" v-model="feedbackdata.endcasetime" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="起诉时间" prop="prosecutetime">
              <el-date-picker :disabled="this.banned" :picker-options="pickerOptions" value-format="yyyy-MM-dd" v-model="feedbackdata.prosecutetime" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="判决时间" prop="panjuecasetime">
              <el-date-picker :disabled="this.banned" :picker-options="pickerOptions" value-format="yyyy-MM-dd" v-model="feedbackdata.panjuecasetime" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="判决罪名" prop="panjuecharge">
              <el-input :disabled="this.banned" v-model="feedbackdata.panjuecharge" maxlength="128"  placeholder="请输入判决罪名,最长为128字符"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="判决金额" prop="panjuesum">
              <el-input  :disabled="this.banned" v-model="feedbackdata.panjuesum" maxlength="128"    placeholder="请输入判决金额,最长为128字符"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="判决刑罚" prop="panjuepenal">
              <el-input :disabled="this.banned" maxlength="128"   v-model="feedbackdata.panjuepenal"  placeholder="请输入判决刑罚,最长为128字符"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="挽回经济损失" prop="recoverEconomicLosses">
              <el-input  :disabled="this.banned" v-model="feedbackdata.recoverEconomicLosses" maxlength="128"  placeholder="请输入挽回经济损失,最长为128字符"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="抓捕嫌疑人数量" prop="arrestnum">
              <el-input  :disabled="this.banned" v-model="feedbackdata.arrestnum" maxlength="8"  placeholder="请输入抓捕嫌疑人数量,最长为8字符"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="案情简介" prop="introductionCase">
              <el-input  :disabled="this.banned" v-model="feedbackdata.introductionCase"  maxlength="500" placeholder="请输入案情简介,最长为500字符" type="textarea" :rows="3"></el-input>
            </el-form-item>
            <el-upload  
                v-if="!this.banned" 
                class="upload-demo" 
                ref="refuploadDetial"   
                :on-remove="handleRemove" 
                :before-upload="changeUpload"  
                :on-success="caseSuccess"  
                :on-error="uploadError"
                :action="actionDetialUrl" 
                multiple 
                style="margin-top:10px">
              <el-button size="small" type="primary"  style="margin-bottom:8px;">上传案情介绍</el-button>
            </el-upload>
            <div v-if="uploadDetial.length > 0">
               <div
                      v-for="(item,idx) in uploadDetial"
                      :key="idx"
                    >
                    <span style="float:left;font-size:12px;">{{item.attachName}}</span> 
                   <el-button
                        v-if="!banned"
                          icon='el-icon-delete'
                         style="float:right;margin-right:200px;"
                        type="text"
                        @click="DelDownload(item.attachId)"
                      >删除</el-button>
                      <el-button
                         icon="el-icon-download"
                          style="float:right;margin-right:100px;"
                        type="text"
                        @click="hanldDownload(item.attachId)"
                      >点击下载</el-button>
                      <div style="clear:both"></div>
                    </div>
            </div>
          </el-col>
        </el-row>
      </fieldset>

      <fieldset class="classFiledset">
        <legend>线索使用评价</legend>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="是否有助于明确侦查方向" prop="helpdirection">
              <el-input  :disabled="this.banned" v-model="feedbackdata.helpdirection" maxlength="8"  placeholder="是否有助于明确侦查方向,最长为8字符"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="是否有助于发现新证据" prop="helpevidence">
              <el-input  :disabled="this.banned" v-model="feedbackdata.helpevidence"   maxlength="8"  placeholder="是否有助于发现新证据,最长为8字符"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="是否有助于确定赃款去向" prop="helpmoneyto">
              <el-input  :disabled="this.banned" v-model="feedbackdata.helpmoneyto"  maxlength="8"   placeholder="是否有助于确定赃款去向,最长为8字符"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="发现新的线索数量" prop="helpdiscoverednum">
              <el-input  :disabled="this.banned"  v-model="feedbackdata.helpdiscoverednum"   maxlength="16"  placeholder="发现新的线索数量,最长为16字符"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="对线索数据质量的整体评价" prop="evaluationclues">
              <el-input  :disabled="this.banned" v-model="feedbackdata.evaluationclues"  maxlength="500"   placeholder="对线索数据质量的整体评价,最长为500字符" type="textarea" :rows="3"></el-input>
              <el-upload v-if="!this.banned" class="upload-demo" ref="refuploadEn"   :on-error="uploadError" :on-remove="handleRemove" :before-upload="changeUpload2"  :on-success="qualitySuccess" :action="actionEnUrl" multiple  style="margin-top:10px">
                <el-button size="small" type="primary">质量评价上传</el-button>
              </el-upload>
              <div v-if="uploadEn.length > 0">
                  <div
                      v-for="(item,idx) in uploadEn"
                      :key="idx"
                    >
                    <span   style="float:left;font-size:12px;">{{item.attachName}}</span>
                     <el-button
                      v-if="!banned"
                         style="float:right;margin-right:200px;"
                        type="text"
                          icon='el-icon-delete'
                        @click="DelDownload1(item.attachId)"
                      >删除</el-button>
                      <el-button
                         icon="el-icon-download"
                          style="float:right;margin-right:100px;"
                        type="text"
                        @click="hanldDownload(item.attachId)"
                      >点击下载</el-button>
                        <div style="clear:both"></div>
                    </div>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="对可疑报告的评价" prop="evaluationSuspiciousReports">
              <el-input  :disabled="this.banned" v-model="feedbackdata.evaluationSuspiciousReports" maxlength="500"  placeholder="请输入对可疑报告的评价,最长为500字符" type="textarea" :rows="3"></el-input>
            </el-form-item>
            <el-upload class="upload-demo" ref="refuploadSusp"   :on-error="uploadError" :on-remove="handleRemove" :before-upload="changeUpload3"   :on-success="reportSuccess" :action="actionSuspUrl" multiple style="margin-top:10px">
              <el-button v-if="!this.banned" size="small" type="primary"  style="margin-bottom:10px;">报告评价上传</el-button>
            </el-upload>
            <div v-if="uploadSusp.length > 0">
                 <div
                      v-for="(item,idx) in uploadSusp"
                      :key="idx"
                    >
                    <span   style="float:left;font-size:12px;">{{item.attachName}}</span>
                     <el-button
                      v-if="!banned"
                         style="float:right;margin-right:200px;"
                        type="text"
                          icon='el-icon-delete'
                        @click="DelDownload2(item.attachId)"
                      >删除</el-button>
                      <el-button
                         icon="el-icon-download"
                          style="float:right;margin-right:100px;"
                        type="text"
                        @click="hanldDownload(item.attachId)"
                      >点击下载</el-button>
                        <div style="clear:both"></div>
                    </div>
              </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="备注" prop="remark">
              <el-input type="textarea" :rows="3"  :disabled="this.banned" v-model="feedbackdata.remark"  maxlength="500" placeholder="请输入备注,最长为500字符"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </fieldset>
    </el-form>
  </div>
</template>
<script>
import { dictionary } from '@/api/sys-monitoringAnalysis/roster-warning/common.js'
import { commonPattern, spaceBarAndSpecial } from '@/utils/formValidate'
import {
  delloadapi
} from '@/api/sys-monitoringAnalysis/cueManage/dataEntry/add.js'
import { noSpaceAndTs, isValidTengFei } from '@/utils/formValidate.js'
import { getfileListapi, getNumapi } from '@/api/sys-monitoringAnalysis/cueManage/dataEntry/approvalOrder.js'
export default {
  props: {
    uploadChild: {
      type: Boolean
    },
    formFather: {
      type: Object
    },
    banned: {
      type: Boolean
    }
  },
  watch: {
    uploadChild(val) {
      if (val) {
        this.$refs.refuploadDetial.submit()
        this.$refs.refuploadEn.submit()
        this.$refs.refuploadSusp.submit()
      }
    },
    formFather: {
      handler(val) {
        if (val) {
          this.feedbackdata = val
          console.log(val, 222)

          // const psclueIdArr = []
          // var arr = val.evokejudge
          // arr.forEach(el => {
          //   if (el.psclueId.indexOf('1401') !== -1) {
          //     const tempArr = el.psclueId.split('-')
          //     this.feedbackdata.supplementOne = tempArr[1]
          //     this.feedbackdata.isReplenishOne = true
          //     psclueIdArr.push('1401')
          //   } else if (el.psclueId.indexOf('1402') !== -1) {
          //     const tempArr = el.psclueId.split('-')
          //     this.feedbackdata.supplementTwo = tempArr[1]
          //     this.feedbackdata.isReplenishTwo = true
          //     psclueIdArr.push('1402')
          //   } else {
          //     psclueIdArr.push(el.psclueId)
          //   }
          // })
          // arr = psclueIdArr
          // this.feedbackdata.evokejudge = arr
        }
      },
      deep: true,
      immediate: true
    }

  },
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7
        }
      },
      dialogJudgmentData: [],
      subLoading: false,
      // file
      uploadDetial: [],
      uploadEn: [],
      uploadSusp: [],
      // form
      feedbackdata: {
        laiwenNcard: '',
        laiwenDept: '',
        laiwenDate: '',
        centerNum: '',
        evokeNum: '',
        evokename: '',
        evokejudge: [],
        banlichu: '',
        analyst: '',
        keyinum: '',
        isReplenishOne: false,
        isReplenishTwo: false,
        supplementOne: '',
        supplementTwo: '',
        subjectname: '',
        subjectnum: '',
        createcasetime: '',
        subjectduty: '',
        endcasetime: '',
        prosecutetime: '',
        panjuecasetime: '',
        panjuecharge: '',
        panjuesum: '',
        panjuepenal: '',
        recoverEconomicLosses: '',
        arrestnum: '',
        introductionCase: '',

        helpdirection: '',
        helpevidence: '',
        helpmoneyto: '',
        helpdiscoverednum: '',
        evaluationclues: '',
        evaluationSuspiciousReports: '',
        remark: ''
      },
      // rules

      feedbackRules: {
        laiwenNcard: [
          { required: true, message: '内容不能为空', trigger: 'blur' },
          { validator: isValidTengFei, trigger: 'blur' }
        ],
        laiwenDept: [
          { required: true, message: '内容不能为空', trigger: 'blur' },
          { validator: noSpaceAndTs, trigger: 'blur' }
        ],
        laiwenDate: [
          { required: true, message: '内容不能为空', trigger: 'blur' },
          { validator: noSpaceAndTs, trigger: 'blur' }
        ],
        centerNum: [
          { required: true, message: '内容不能为空', trigger: 'blur' },
          { validator: noSpaceAndTs, trigger: 'blur' }
        ],
        evokeNum: [
          { required: true, message: '内容不能为空', trigger: 'blur' }
        ],
        evokename: [
          { required: true, message: '内容不能为空', trigger: 'blur' },
          { validator: noSpaceAndTs, trigger: 'blur' }
        ],
        evokejudge: [
          { required: true, message: '内容不能为空', trigger: 'change' }
        ],
        banlichu: [
          { required: true, message: '内容不能为空', trigger: 'blur' },
          { validator: noSpaceAndTs, trigger: 'blur' }
        ],
        analyst: [
          { required: true, message: '内容不能为空', trigger: 'blur' },
          { validator: noSpaceAndTs, trigger: 'blur' }
        ],
        keyinum: [
          { message: '内容不能为空', trigger: 'blur' },
          { validator: noSpaceAndTs, trigger: 'blur' }
        ],

        subjectname: [

          { validator: spaceBarAndSpecial, trigger: 'blur' }
        ],
        subjectnum: [

          { validator: this.cardFormat, trigger: 'blur' }
        ],
        createcasetime: [

          { validator: noSpaceAndTs, trigger: 'blur' }
        ],
        subjectduty: [

          { validator: noSpaceAndTs, trigger: 'blur' }
        ],
        endcasetime: [

          { validator: noSpaceAndTs, trigger: 'blur' }
        ],
        prosecutetime: [

          { validator: noSpaceAndTs, trigger: 'blur' }
        ],
        panjuecasetime: [

          { validator: noSpaceAndTs, trigger: 'blur' }
        ],
        panjuecharge: [

          { validator: noSpaceAndTs, trigger: 'blur' }
        ],
        panjuesum: [

          { validator: this.isValidMoney, trigger: 'blur' }
        ],
        panjuepenal: [

          // { validator: noSpaceAndTs, trigger: 'blur' }
        ],
        recoverEconomicLosses: [

          // { validator: noSpaceAndTs, trigger: 'blur' }
        ],
        arrestnum: [
          { validator: this.onlyNumberValidateNotNull, trigger: 'blur' }
        ],
        helpdirection: [
          { validator: noSpaceAndTs, trigger: 'blur' }
        ],
        helpevidence: [
          { validator: noSpaceAndTs, trigger: 'blur' }
        ],
        helpmoneyto: [
          { validator: noSpaceAndTs, trigger: 'blur' }
        ],
        helpdiscoverednum: [
          { validator: this.onlyNumberValidateNotNull, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    actionDetialUrl() {
      return `/monitor/inputafter/upload-allAfterInput?aId=${this.$route.query.aId}&fileType=1`
    },
    actionEnUrl() {
      return `/monitor/inputafter/upload-allAfterInput?aId=${this.$route.query.aId}&fileType=2`
    },
    actionSuspUrl() {
      return `/monitor/inputafter/upload-allAfterInput?aId=${this.$route.query.aId}&fileType=3`
    }
  },
  mounted() {
    this.getfiles()
    this.getDictionary('TOSC')
  },
  methods: {
    cardFormat(rule, value, callback) {
      var idCardReg = /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/
      if (value) {
        if (!idCardReg.test(value)) {
          callback(new Error('身份证号码为15或18位'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    },
    blurs() {
      getNumapi(this.feedbackdata.evokeNum).then(res => {
        if (res.code === 200) {
          if (!res.data) {
            this.$message({
              message: '该编号在库中不存在，请重新检查！',
              type: 'warning',
              duration: 6000
            })
          }
        }
      }
      )
      console.log(this.feedbackdata.evokeNum, 'kkk')
    },
    validateForm() {
      let flag = false
      this.$refs['aForm'].validate((valid) => {
        flag = valid
      })
      return flag
    },
    uploadError() {
      this.subLoading = false
      this.$emit('loadState', this.subLoading)
      this.$message({
        message: '上传失败',
        type: 'error',
        duration: 6000
      })
    },
    // 下载
    download(id) {
      location.href = `/file-service/upload/download/${id}`
    },
    // 金额校验
    isValidMoney(rule, value, callback) {
      var money = /(^[1-9]([0-9]+)?(\.[0-9]{1,3})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/
      if (value === '' || value === undefined || value === null) {
        callback()
      } else {
        if (!money.test(value)) {
          callback(new Error('请输入正确的数字，最多保留三位小数!'))
        } else {
          callback()
        }
      }
    },
    //  删除附件
    DelDownload(id) {
      delloadapi(id).then(res => {
        if (res.code === 200) {
          this.$message({
            message: '删除成功',
            type: 'success',
            duration: 6000
          })
        }
      }).then(() => {
        this.uploadDetial.filter((item, index) => {
          if (item.attachId.indexOf(id) !== -1) {
            this.uploadDetial.splice(index, 1)
          }
        })
      })
    },
    handleRemove(file, fileList) {
      if (file && file.status === 'success') {
        var id = file.response.data.attachId
        delloadapi(id).then(res => {
          if (res.code === 200) {
            this.$message({
              message: '删除成功',
              type: 'success',
              duration: 6000
            })
          }
        })
      }

      // console.log(file.response.data.attachId, '22')
    },
    DelDownload1(id) {
      delloadapi(id).then(res => {
        if (res.code === 200) {
          this.$message({
            message: '删除成功',
            type: 'success',
            duration: 6000
          })
        }
      }).then(() => {
        this.uploadEn.filter((item, index) => {
          if (item.attachId.indexOf(id) !== -1) {
            this.uploadEn.splice(index, 1)
          }
        })
      })
    },
    DelDownload2(id) {
      delloadapi(id).then(res => {
        if (res.code === 200) {
          this.$message({
            message: '删除成功',
            type: 'success',
            duration: 6000
          })
        }
      }).then(() => {
        this.uploadSusp.filter((item, index) => {
          if (item.attachId.indexOf(id) !== -1) {
            this.uploadSusp.splice(index, 1)
          }
        })
      })
    },
    // 下载附件
    hanldDownload(id) {
      location.href = `/file-service/upload/download/${id}?moduleName=${encodeURI('线索管理')}`
    },
    changeUpload(file, fileList) {
      const fileNum = this.uploadDetial
      if (this.$refs['refuploadDetial'].uploadFiles.length > 1) {
        this.$message({
          message: '只能上传一个附件!',
          type: 'warning'
        })
        return false
      }
      if (fileNum.length > 0) {
        this.$message({
          message: '只能上传一个附件!',
          type: 'warning'
        })
        return false
      }
      console.log(this.$refs.refuploadSusp, 22222222)

      const isLt2k = file.size / 1024 / 1024 > 50
      if (isLt2k) {
        this.$message({
          message: '上传文件大小不能超过100M!',
          type: 'warning'
        })
        return false
      }

      this.subLoading = true
      this.$emit('loadState', this.subLoading)
    },
    changeUpload2(file, fileList) {
      const fileNum = this.uploadEn
      if (this.$refs['refuploadEn'].uploadFiles.length > 1) {
        this.$message({
          message: '只能上传一个附件!',
          type: 'warning'
        })
        return false
      }

      if (fileNum.length > 0) {
        this.$message({
          message: '只能上传一个附件!',
          type: 'warning'
        })
        return false
      }
      const isLt2k = file.size / 1024 / 1024 > 50
      if (isLt2k) {
        this.$message({
          message: '上传文件大小不能超过100M!',
          type: 'warning'
        })
        return false
      }

      this.subLoading = true
      this.$emit('loadState', this.subLoading)
    },
    changeUpload3(file, fileList) {
      const fileNum = this.uploadSusp
      if (this.$refs['refuploadSusp'].uploadFiles.length > 1) {
        this.$message({
          message: '只能上传一个附件!',
          type: 'warning'
        })
        return false
      }

      if (fileNum.length > 0) {
        this.$message({
          message: '只能上传一个附件!',
          type: 'warning'
        })
        return false
      }
      const isLt2k = file.size / 1024 / 1024 > 50
      if (isLt2k) {
        this.$message({
          message: '上传文件大小不能超过100M!',
          type: 'warning'
        })
        return false
      }

      this.subLoading = true
      this.$emit('loadState', this.subLoading)
    },
    // 文件上传
    caseSuccess(response, file, fileList) {
      if (response.code === 200) {
        this.subLoading = false
        this.$emit('loadState', this.subLoading)
        this.$message({
          message: '上传成功',
          type: 'success',
          duration: 6000
        })
      } else {
        this.subLoading = false
        this.$emit('loadState', this.subLoading)
        this.$message({
          message: response.message,
          type: 'error',
          duration: 6000
        })
      }
    },
    qualitySuccess(response, file, fileList) {
      if (response.code === 200) {
        this.subLoading = false
        this.$emit('loadState', this.subLoading)
        this.$message({
          message: '上传成功',
          type: 'success',
          duration: 6000
        })
      } else {
        this.subLoading = false
        this.$emit('loadState', this.subLoading)
        this.$message({
          message: response.message,
          type: 'error',
          duration: 6000
        })
      }
    },
    reportSuccess(response, file, fileList) {
      if (response.code === 200) {
        this.subLoading = false
        this.$emit('loadState', this.subLoading)
        this.$message({
          message: '上传成功',
          type: 'success',
          duration: 6000
        })
      } else {
        this.subLoading = false
        this.$emit('loadState', this.subLoading)
        this.$message({
          message: response.message,
          type: 'error',
          duration: 6000
        })
      }
    },
    onlyNumberValidateNotNull(rule, value, callback) {
      if (value !== null) {
        if (value === '' || value === undefined) {
          callback()
        } else {
          if (!commonPattern.number.test(value)) {
            callback(new Error('必须输入数值'))
          } else {
            callback()
          }
        }
      } else {
        callback()
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
            default:
              break
          }
        }
      }).then(() => {
        this.$refs.aForm.clearValidate()
      })
    },
    // 涉罪校验
    szisValidInput1(rule, value, callback) {
      if (!commonPattern.spaceBar.test(this.feedbackdata.supplementOne)) {
        callback(new Error('内容不能含有空格'))
      } else if (
        commonPattern.specialChar.test(this.feedbackdata.supplementOne) ||
        commonPattern.specialEng.test(this.feedbackdata.supplementOne)
      ) {
        callback(new Error('内容不能填写特殊字符'))
      } else if (this.supplementOne === '') {
        callback(new Error('请输入内容'))
      } else {
        callback()
      }
    },
    szisValidInput2(rule, value, callback) {
      if (!commonPattern.spaceBar.test(this.feedbackdata.supplementTwo)) {
        callback(new Error('内容不能含有空格'))
      } else if (
        commonPattern.specialChar.test(this.feedbackdata.supplementTwo) ||
        commonPattern.specialEng.test(this.feedbackdata.supplementTwo)
      ) {
        callback(new Error('内容不能填写特殊字符'))
      } else if (this.supplementTwo === '') {
        callback(new Error('请输入内容'))
      } else {
        callback()
      }
    },
    // 判断涉罪类型是否显示补充
    replenish() {
      if (this.feedbackdata.evokejudge.indexOf('1402') !== -1) {
        this.feedbackdata.isReplenishTwo = true
      } else {
        this.feedbackdata.isReplenishTwo = false
      }
      if (this.feedbackdata.evokejudge.indexOf('1401') !== -1) {
        this.feedbackdata.isReplenishOne = true
      } else {
        this.feedbackdata.isReplenishOne = false
      }
    },
    getfiles() {
      // 1:案情，2:线索数据，3:可疑报告
      getfileListapi(this.feedbackdata.fkId, '1').then(res => {
        this.uploadDetial = res.data ? res.data : []
      })
      getfileListapi(this.feedbackdata.fkId, '2').then(res => {
        this.uploadEn = res.data ? res.data : []
      })
      getfileListapi(this.feedbackdata.fkId, '3').then(res => {
        this.uploadSusp = res.data ? res.data : []
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.apporderwrap {
  .classFiledset {
    border-radius: 5px;
    // border-color: #67c23a;
    border-color: #e1f3d8;
    margin-bottom: 10px;
  }

  .el-select {
    width: 100%;
  }

  .el-date-editor--date {
    width: 100% !important;
  }
  .el-date-editor {
    width: 100%;
  }

  .el-radio + .el-radio {
    margin-left: 1px !important;
  }
  .el-radio__label {
    font-size: 14px;
    padding-left: 5px;
  }
  .block {
    margin-top: 40px;
    .font {
      margin-bottom: 15px;
    }
    .blockTitle {
      margin-bottom: 20px;
    }
  }
  .apporderwrap {
    .flex-modelmain {
      border-left: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
    }
    .flex-row {
      width: 100%;
      display: flex;
      justify-content: flex-end;
    }
    .row-header-column {
      display: flex;
      flex: 0 0 30%;
      margin-bottom: 10px;

      span {
        flex: 0 0 120px;
        text-align: right;
        align-self: center;
      }
      .el-input {
        flex: 1;
      }
    }
    .flex-col-1 {
      flex: 1;
      display: flex;
      border-top: 1px solid #ccc;
      border-right: 1px solid #ccc;
    }
    .flex-label {
      flex: 0 0 150px;
      padding: 10px 20px;
      text-align: left;
      border-right: 1px solid #ccc;
      // flex垂直居中的方法
      display: flex;
      align-items: center;
    }
    .flex-input {
      flex: 1;
      padding: 10px 20px;
      align-self: center;
    }
  }
  .table-title {
    padding: 10px 20px;
    font-weight: bold;
  }
  .modeltitle {
    text-align: center;
    font-weight: bold;
    margin-bottom: 10px;
  }
  // .dialog-block{
  //   .leader{
  //     width: 100%;
  //     margin-left:30px;
  //   }
  // }
}
</style>
