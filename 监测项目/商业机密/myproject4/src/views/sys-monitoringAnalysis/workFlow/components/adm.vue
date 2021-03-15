<template>
  <div>
    <el-button type="primary" plain @click="formPrinting" v-if="activeName === 'applicationForm'"> 打 印</el-button>
    <el-form :model="formDataVal" ref="formDataVal">
      <el-tabs type="border-card" v-model="activeName">
        <el-tab-pane label="行政调查申请单" name="applicationForm">
          <el-row class="table">
            <div style="width:830px;height:auto;margin:0 auto;">
              <el-col :span="24">
                <el-col :span="10" class="item_title" style="text-align:right;padding-right:10px;">
                  中国人民银行（
                </el-col>
                <el-col :span="8">
                  <el-form-item prop="title" :rules="[{ required: false, validator: characterSpaceChecking, trigger: 'blur' }]">
                    <el-input v-model="formDataVal.title" maxlength="20" placeholder="最多输入20位" :disabled="$route.query.workitemName !== '表单录入' || $route.query.roleType === 'done'"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6" class="item_title" style="padding-left: 10px;">
                  ）
                </el-col>
              </el-col>
            </div>
            <el-col :span="24">
              <p style="font-size: 18px;">反洗钱跨辖区协助调查申请表</p>
            </el-col>
            <!-- <h3>中国人民银行（<el-input style="width: 50%" v-model="formDataVal.title" maxlength="20" placeholder="最多输入20位" :disabled="$route.query.workitemName !== '表单录入'"></el-input>）</h3>
            <p>反洗钱跨辖区协助调查申请表</p> -->
            <div style="text-align:right;width: 830px;margin:10px auto;">编号：{{ formDataVal.applyNum }}</div>
            <table border="1" style="width: 830px;">
              <tr>
                <td width="230" height="70;" align="center" style="background:#ccc;">拟调查义务机构</td>
                <td width="600" colspan="6">
                  <el-form-item prop="reportBody" :rules="[{required: true, message: '请选择拟调查义务机构', trigger: 'change'}]">
                    <el-select v-model="formDataVal.reportBody" filterable remote clearable reserve-keyword placeholder="请输入关键词" @focus="bodyFocus" :remote-method="remoteMethod" :disabled="$route.query.workitemName !== '表单录入' || $route.query.roleType === 'done'" :loading="loading" style="width:100%;">
                      <el-option v-for="item in reportingBodyName" :key="item.ricd" :label="item.rinm" :value="item.ricd">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td height="70" style="background:#ccc;">拟调查可疑交易<br>活动主体或账号</td>
                <td colspan="6">
                  <el-form-item prop="subjectAccount" :rules="[{required: true, message: '请输入拟调查可疑交易活动主体或账号', trigger: 'blur'}]">
                    <el-input v-model="formDataVal.subjectAccount" :disabled="$route.query.workitemName !== '表单录入' || $route.query.roleType === 'done'" maxlength="255"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td height="70" style="background:#ccc;">涉及区域</td>
                <!-- <td colspan="6">
                  <p>{{formDataVal.involveArea}}</p>
                </td> -->
                <td colspan="6">
                  <el-row v-for="(el, index) in formDataVal.regionalContainer" :key="index">
                    <el-col :span="6">
                      <el-form-item :prop="`regionalContainer.${index}.involveArea`" :rules="[{required: true, message: '请选择省份', trigger: 'change'}]">
                        <el-select v-model="el.involveArea" clearable @change="involveAreaChange(el)" placeholder="请选择省份" :disabled="$route.query.workitemName !== '表单录入' || $route.query.roleType === 'done'" ref="involveArea_cs">
                          <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item>
                        <el-select v-model="el.involveArea2" clearable @change="involveArea2Change(el)" @focus="involveArea2Focus(el)" placeholder="请选择城市" :disabled="$route.query.workitemName !== '表单录入' || $route.query.roleType === 'done'">
                          <el-option
                            v-for="item in el.options2"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item>
                        <el-select v-model="el.involveArea3" multiple @focus="involveArea3Focus(el)" placeholder="请选择地区" :disabled="$route.query.workitemName !== '表单录入' || $route.query.roleType === 'done'">
                          <el-option
                            v-for="item in el.options3"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="4">
                      <el-form-item>
                        <el-button v-if="formDataVal.regionalContainer.length > 1" type="danger" plain class="el-icon-remove-outline" style="float:right;" :disabled="$route.query.workitemName !== '表单录入' || $route.query.roleType === 'done'" @click="removeInvolveArea(index)"></el-button>
                        <el-button v-if="index === formDataVal.regionalContainer.length - 1" type="primary" plain class="el-icon-circle-plus-outline" style="float:right;" :disabled="$route.query.workitemName !== '表单录入' || $route.query.roleType === 'done'" @click="addInvolveArea"></el-button>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </td>
              </tr>
              <tr>
                <td height="70" colspan="6" style="textAlign:left;border-right-color:#303133;background:#ccc;">可疑交易活动事实描述及初步分析意见</td>
              </tr>
              <tr>
                <td height="100" colspan="6" style="border-right-color:#303133;">
                  <el-input type="textarea" v-model="formDataVal.descAnalyse" :disabled="$route.query.workitemName !== '表单录入' || $route.query.roleType === 'done'" maxlength="255"></el-input>
                </td>
              </tr>
              <tr>
                <td height="70" colspan="6" style="textAlign:left;border-right-color:#303133;background:#ccc;">申请跨辖区调查的理由和要求</td>
              </tr>
              <tr>
                <td height="100" colspan="6" style="border-right-color:#303133;">
                  <el-input type="textarea" v-model="formDataVal.reasonRequire" :disabled="$route.query.workitemName !== '表单录入' || $route.query.roleType === 'done'" maxlength="255"></el-input>
                </td>
              </tr>
              <tr>
                <td height="120">处长审批意见：</td>
                <td colspan="6">
                  <!-- <p v-if="state === '2'">哈哈哈哈哈</p> -->
                  <p style="text-align:left;word-wrap:break-word;">{{optionObj1.opinion ? optionObj1.opinion : ''}}</p>
                  <p style="margin-top: 20px;text-align:right;">{{optionObj1.time ? optionObj1.time.slice(0, 11) : ''}}</p>
                </td>
              </tr>
              <tr>
                <td height="120">反洗钱局负责人意见：</td>
                <td colspan="6">
                  <p style="text-align:left;word-wrap:break-word;">{{optionObj2.opinion ? optionObj2.opinion : ''}}</p>
                  <p style="margin-top: 20px;text-align:right;">{{optionObj2.time ? optionObj2.time.slice(0, 11) : ''}}</p>
                </td>
              </tr>
              <tr>
                <td height="120">反洗钱中心负责人意见：</td>
                <td colspan="6">
                  <p style="text-align:left;word-wrap:break-word;">{{optionObj3.opinion ? optionObj3.opinion : ''}}</p>
                  <p style="margin-top: 20px;text-align:right;">{{optionObj3.time ? optionObj3.time.slice(0, 11) : ''}}</p>
                </td>
              </tr>
            </table>
            <table v-if="$route.query.workitemName === '表单录入' && $route.query.roleType !== 'done'">
              <tr>
                <td width="830" height="100" colspan="2" style="text-align:left;">
                  <el-upload ref="uploadName" :action="uploadUrl" :headers="headers" :file-list="newFileList" :on-change="changeUpload" :on-success="successUpload" :data="idData" :auto-upload="false" :limit="5">
                  相关附件：<el-button size="small" type="primary">上传附件</el-button>
                  <el-button type="text" style="color:red;">最多上传5个附件</el-button>
                  </el-upload>
                </td>
              </tr>
            </table>
            <table>
              <tr>
                <td width="830" height="100" colspan="2" style="text-align:left;">
                  <el-table
                    :data="downUpload"
                    style="width: 100%">
                    <el-table-column
                      prop="attachName"
                      label="附件名称">
                    </el-table-column>
                    <el-table-column
                      width="180"
                      label="操作">
                      <template slot-scope="scope">
                        <i class="el-icon-download" @click="downloadFiles(scope.row)" style="font-size: 12px;color: #409EFF;cursor: pointer;">下载</i>
                      </template>
                    </el-table-column>
                  </el-table>
                </td>
              </tr>
            </table>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="行政调查反馈结果" name="feedbackResults" v-if="$route.query.workitemName === '分支机构反馈' || $route.query.workitemName === '局领导审批反馈' || $route.query.workitemName === '中心领导审批反馈' || formDataVal.status === '7'">
          <div>
            <div class="result">
            <el-row>
              <el-col :span="24">反馈信息：</el-col>
            </el-row>
            <el-row class="list">
              <el-col :span="4" class="border bg">
                <span><i style="color:red;">* </i>反馈人：</span>
              </el-col>
              <el-col :span="4" class="border">
                <span>
                  <el-form-item prop="feedbackPerson" :rules="[{required: true, message: '请输入反馈人', trigger: 'blur'}, { validator: characterSpaceChecking, trigger: 'blur' }]">
                    <el-input v-model="formDataVal.feedbackPerson" maxlength="10" :disabled="$route.query.workitemName !== '分支机构反馈' || $route.query.roleType === 'done'"></el-input>
                  </el-form-item>
                </span>
              </el-col>
              <el-col :span="4" class="border bg">
                <span>反馈人所在机构：</span>
              </el-col>
              <el-col :span="4" class="border">
                <span>
                  <el-form-item prop="reportName" :rules="[{required: true, message: '请输入反馈人所在机构', trigger: 'blur'}, { validator: characterSpaceChecking, trigger: 'blur' }]">
                    <el-input v-model="formDataVal.reportName" :disabled="true" maxlength="255"></el-input>
                  </el-form-item>
                </span>
              </el-col>
              <el-col :span="4" class="border bg">
                <span>反馈时间：</span>
              </el-col>
              <el-col :span="4">
                <span>
                  <el-form-item prop="feedbackTime" :rules="[{required: true, message: '请输入反馈时间', trigger: 'blur'}]">
                    <el-input v-model="formDataVal.feedbackTime" :disabled="true" maxlength="32"></el-input>
                  </el-form-item>
                </span>
              </el-col>
            </el-row>
          </div>
          <div class="divider divider-dashed"></div>
          <div class="result2">
            <el-row>
              <el-col :span="24"><i style="color:red;">* </i>反馈结果：</el-col>
            </el-row>
            <el-row style="margin-top:15px">
              <el-col :span="24">
                <el-form-item prop="feedbackResult" :rules="[{required: true, message: '请输入反馈结果', trigger: 'blur'}]">
                  <el-input type="textarea" v-model="formDataVal.feedbackResult" maxlength="650" :disabled="$route.query.workitemName !== '分支机构反馈' || $route.query.roleType === 'done'"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <el-form-item v-if="$route.query.workitemName === '分支机构反馈' && $route.query.roleType !== 'done'">
            <el-upload ref="feedBackUploadName" :action="fdbkUploadUrl" :headers="headers" :file-list="fdbkFileList" :on-change="fdbkChangeUpload" :on-success="fdbkSuccessUpload" :auto-upload="false" :limit="5">
            相关附件：<el-button size="small" type="primary">上传附件</el-button>
            <el-button type="text" style="color:red;">最多上传5个附件</el-button>
            </el-upload>
          </el-form-item>
          <el-table
            :data="feedbackDownUpload"
            style="width: 100%">
            <el-table-column
              prop="attachName"
              label="附件名称">
            </el-table-column>
            <el-table-column
              width="180"
              label="操作">
              <template slot-scope="scope">
                <i class="el-icon-download" @click="downloadFiles(scope.row)" style="font-size: 12px;color: #409EFF;cursor: pointer;">下载</i>
              </template>
            </el-table-column>
          </el-table>
          </div>
          </el-tab-pane>
          <div ref="myPrintForm" v-show="printType">
            <h3 style="margin: 10px auto;text-align: center;">中国人民银行({{formDataVal.title}})</h3>
            <p style="margin-top: 20px auto;text-align: center;font-size: 18px;">反洗钱跨辖区协助调查申请表</p>
            <p style="margin-top: 20px auto;text-align: right;">编号：{{formDataVal.applyNum}}</p>
            <table border="1" style="border-collapse: collapse;text-align: center;margin: 0 auto;">
            <tr>
              <td min-width="230" height="70;" align="center" style="width: 230px;">拟调查义务机构</td>
              <td width="600" colspan="6" style="text-align:left;padding:10px;word-wrap:break-word;max-width: 600px;">
                <div v-if="formDataVal.reportBody !== ''">
                  {{newReporBody}}
                </div>
                <div v-else>

                </div>
              </td>
            </tr>
            <tr>
              <td min-width="230" height="70" style="width: 230px;">拟调查可疑交易<br>活动主体或账号</td>
              <td width="600" colspan="6" style="text-align:left;padding:10px;word-wrap:break-word;max-width: 600px;">
                <div v-if="formDataVal.subjectAccount !== ''">
                  {{formDataVal.subjectAccount}}
                </div>
                <div v-else>

                </div>
              </td>
            </tr>
            <tr>
              <td min-width="230" height="70" style="max-width: 230px;">涉及区域</td>
              <td colspan="6" style="word-wrap:break-word;max-width: 600px;text-align:left;padding:10px;">
                <el-col :span="24" v-for="(item, index) in formDataVal.regionalContainer" :key="index">
                  <div v-if="item.involveArea !== '' && item.involveArea2 !== '' && item.involveArea3.length > 1">
                    {{involveAreaChat(item)}}-{{involveArea2Chat(item)}}-{{involveArea3Chat(item).join()}}
                  </div>
                  <div v-if="item.involveArea !== '' && item.involveArea2 !== '' && item.involveArea3.length === 1">
                    {{involveAreaChat(item)}}-{{involveArea2Chat(item)}}-{{involveArea3Chat(item)[0]}}
                  </div>
                  <div v-if="item.involveArea !== '' && item.involveArea2 !== '' && item.involveArea3.length === 0">
                    {{involveAreaChat(item)}}-{{involveArea2Chat(item)}}
                  </div>
                  <div v-if="item.involveArea !== '' && item.involveArea2 === '' && item.involveArea3.length === 0">
                    {{involveAreaChat(item)}}
                  </div>
                  <div v-if="item.involveArea === '' && item.involveArea2 === '' && item.involveArea3.length === 0">
                  </div>
                </el-col>
              </td>
            </tr>
            <tr>
              <td height="70" colspan="6" style="textAlign:left;text-indent: 10px;border-right-color:#303133;">可疑交易活动事实描述及初步分析意见</td>
            </tr>
            <tr>
              <td height="100" colspan="6" style="text-align:left;padding:10px;max-width: 830px;border-right-color:#303133;word-wrap:break-word;">
                <div v-if="formDataVal.descAnalyse !== ''">
                  {{formDataVal.descAnalyse}}
                </div>
                <div v-else>

                </div>
              </td>
            </tr>
            <tr>
              <td height="70" colspan="6" style="textAlign:left;border-right-color:#303133;text-indent: 10px;">申请跨辖区调查的理由和要求</td>
            </tr>
            <tr>
              <td height="100" colspan="6" style="text-align:left;padding:10px;max-width: 830px;border-right-color:#303133;word-wrap:break-word;">
                <div v-if="formDataVal.reasonRequire !== ''">
                  {{formDataVal.reasonRequire}}
                </div>
                <div v-else>

                </div>
              </td>
            </tr>
            <tr>
              <td min-width="230" height="120" style="max-width: 230px;">处长审批意见：</td>
              <td colspan="6" style="text-align:left;padding:10px;max-width: 600px;word-wrap:break-word;">
                <!-- <p v-if="state === '2'">哈哈哈哈哈</p> -->
                <p style="text-align:left;">{{optionObj1.opinion ? optionObj1.opinion : ''}}</p>
                <p style="margin-top: 20px;text-align:right;padding-right:10px;">{{optionObj1.time ? optionObj1.time.slice(0, 11) : ''}}</p>
              </td>
            </tr>
            <tr>
              <td min-width="230" height="120" style="max-width: 230px;">反洗钱局负责人意见：</td>
              <td colspan="6" style="text-align:left;padding:10px;max-width: 600px;word-wrap:break-word;">
                <p style="text-align:left;">{{optionObj2.opinion ? optionObj2.opinion : ''}}</p>
                <p style="margin-top: 20px;text-align:right;padding-right:10px;">{{optionObj2.time ? optionObj2.time.slice(0, 11) : ''}}</p>
              </td>
            </tr>
            <tr>
              <td height="120" style="max-width: 230px;">反洗钱中心负责人意见：</td>
              <td colspan="6" style="text-align:left;padding:10px;max-width: 600px;word-wrap:break-word;">
                <p style="text-align:left;">{{optionObj3.opinion ? optionObj3.opinion : ''}}</p>
                <p style="margin-top: 20px;text-align:right;padding-right:10px;">{{optionObj3.time ? optionObj3.time.slice(0, 11) : ''}}</p>
              </td>
            </tr>
          </table>
          <table v-if="downUpload !== null && downUpload.length > 0">
            <tr>
              <td width="830" height="100" colspan="2" style="text-align:left;">
                <div style="margin-bottom: 10px;">附件列表：</div>
                <div v-for="(item, index) in downUpload" :key="index" style="text-align:left;max-width: 830px;border-right-color:#303133;word-wrap:break-word;">
                  {{item.attachName}}
                </div>
              </td>
            </tr>
          </table>
          </div>
        
      </el-tabs>
      
      
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import { updateAdm } from '@/api/sys-monitoringAnalysis/dataGovernance/dataClean/task.js'
import { getOpinion } from '@/api/sys-monitoringAnalysis/workFlow/index.js'
import { updateExam } from '@/api/administration.js'
import { getRinmList } from '@/api/sys-monitoringAnalysis/statisticForm/large'
import { tree, fileFeedback } from '@/api/sys-monitoringAnalysis/administrative/investigation.js'
import { getToken } from '@/utils/auth'
import { fileApply } from '@/api/administration.js'
export default {
  data() {
    return {
      fileLen: 0,
      fileNum: 0,
      fileLen2: 0,
      fileNum2: 0,
      activeName: 'applicationForm',
      fdbkFileList: [],
      feedbackDownUpload: [],
      updateType: false,
      printType: false,
      feedbackNoteId: '',
      enclosure: '',
      fdbkEnclosure: '',
      displayFlagType: false,
      // shunType: false,
      twoType: false,
      reportingBodyName: [],
      loading: false,
      isDisabled: true,
      uploadDisabled: true,
      state: '',
      formDataVal: {
        applyNum: '',
        title: '',
        reportBody: '',
        subjectAccount: '',
        status: '',
        // involveArea: '',
        // involveArea2: '',
        // involveArea3: [],
        descAnalyse: '',
        reasonRequire: '',
        feedbackPerson: '',
        reportName: '',
        feedbackTime: '',
        feedbackResult: '',
        feedbackId: '',
        workflow: {},
        regionalContainer: [
          {
            involveArea: '',
            involveArea2: '',
            involveArea3: [],
            options2: [],
            options3: []
          }
        ]
      },
      newReporBody: '',
      downUpload: [],
      idData: {
        noteId: ''
      },
      newRicd: '',
      options: [],
      options2: [],
      options3: [],
      fileList: [],
      newFileList: [],
      map: {},
      applyId: '',
      opinionData: [],
      optionObj1: {},
      optionObj2: {},
      optionObj3: {},
      value: '',
      headers: {
        Authorization: getToken()
      },
      specialEnglish: /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im, // 校验英文特殊符号
      sprcialChina: /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im, // 校验中文特殊符号
      blankSpace: /[ ]/im // 校验空格
    }
  },
  computed: {
    ...mapGetters(['businessFlag', 'workFlow2business', 'formContent', 'roles', 'name']),
    proInstId() {
      return this.$route.query.proInstId
    },
    uploadUrl() {
      return '/monitor/thread/adm/uploadApply'
    },
    fdbkUploadUrl() {
      return '/monitor/thread/adm/uploadFeedback'
    }
  },
  watch: {
    businessFlag(val) {
      if (val) {
        this.updateForm()
        this.$store.dispatch('changeFlag', false)
      }
    },
    formContent: {
      handler(newVal, oldVal) {
        if (newVal.workflow.nodeAttributes) {
          if (newVal.workflow.nodeAttributes.length > 0) {
            for (var o = 0; o < newVal.workflow.nodeAttributes.length; o++) {
              if (newVal.workflow.nodeAttributes[o].extendKey === 'editFlag' && newVal.workflow.nodeAttributes[o].extendValue === 'Y') {
                this.isDisabled = false
              }
              if (newVal.workflow.nodeAttributes[o].extendKey === 'uploadFlag' && newVal.workflow.nodeAttributes[o].extendValue === 'Y') {
                this.uploadDisabled = false
              }
              if (newVal.workflow.nodeAttributes[o].extendKey === 'displayFlag' && newVal.workflow.nodeAttributes[o].extendValue === 'Y') {
                this.displayFlagType = true
              }
            }
          }
        }
        this.tradeId = newVal.workflow.pkId
        // let newStr
        // let newAr
        // if (newVal.involveArea !== '') {
        //   newStr = newVal.involveArea.split(',')
        //   newAr = newStr.splice(2)
        // }
        this.formDataVal = {
          applyNum: newVal.applyNum,
          title: newVal.title,
          reportBody: newVal.reportBody,
          subjectAccount: newVal.subjectAccount,
          status: newVal.status,
          // involveArea: newStr[0],
          // involveArea2: newStr[1] !== undefined ? newStr[1] : '',
          // involveArea3: newAr !== undefined ? newAr : [],
          descAnalyse: newVal.descAnalyse,
          reasonRequire: newVal.reasonRequire,
          feedbackId: newVal.feedback.feedbackId,
          feedbackPerson: newVal.feedback.feedbackPerson,
          reportName: newVal.feedback.reportName,
          feedbackTime: newVal.feedback.feedbackTime,
          feedbackResult: newVal.feedback.feedbackResult,
          workflow: newVal.workflow,
          regionalContainer: [
            {
              involveArea: '',
              involveArea2: '',
              involveArea3: [],
              options2: [],
              options3: []
            }
          ]
        }
        this.applyId = newVal.applyId
        this.feedbackId = newVal.feedback.feedbackId
        if (this.roles === 'branch') {
          this.formDataVal.reportName = this.name
          const t = new Date()
          this.formDataVal.feedbackTime = t.toLocaleDateString()
        }

        getRinmList({ ricd: this.formDataVal.reportBody }).then(res => {
          if (res.code === 200) {
            this.loading = false
            this.reportingBodyName = res.data
            this.newRicd = this.formDataVal.reportBody
            this.reportingBodyName.forEach(el => {
              if (el.ricd === this.formDataVal.reportBody) {
                this.newReporBody = el.rinm
              }
            })
            // const myobj = Object.assign({}, this.workFlow2business)
            // myobj.configCode = 'adm'
            // myobj.configCode = 'adm'
            // this.$store.dispatch('workFlow', myobj)
            // this.$store.dispatch('workFlow', { configCode: 'adm', ricd: this.newRicd })
          }
        })
        // 行政调查申请单中的文件列表
        fileApply(this.applyId).then(res => {
          if (res.code === 200) {
            this.downUpload = res.data
          }
        })
        // 行政调查反馈单中的文件列表
        fileFeedback(this.feedbackId).then(res => {
          if (res.code === 200) {
            if (res.data !== null) {
              this.feedbackDownUpload = res.data
            }
          }
        })
        setTimeout(() => {
          this.areaInvolved(newVal)
        }, 0)
        // stateApi(newVal.applyId).then(res => {
        //   if (res.code === 200) {
        //     this.state = res.data
        //     console.log(this.state)
        //   }
        // })
      },
      deep: true
    }
    // shunType(nl, ol) {
    //   if (nl !== ol) {
    //     if (this.formDataVal.involveArea !== '') {
    //       for (var i = 0; i < this.options.length; i++) {
    //         const subStr = this.formDataVal.involveArea.slice(0, 3)
    //         if (this.options[i].children[0].id.indexOf(subStr) !== -1) {
    //           this.options2 = this.options[i].children
    //           for (var k = 0; k < this.options2.length; k++) {
    //             const subStr = this.formDataVal.involveArea2.slice(0, 4)
    //             if (this.options2[k].children[0].id.indexOf(subStr) !== -1) {
    //               this.options3 = this.options2[k].children
    //               return false
    //             }
    //           }
    //           return false
    //         }
    //       }
    //     }
    //   }
    // }
  },
  mounted() {
    this.getOpinionList()
    if (this.roles === 'branch' && this.$route.query.readType === 'todo') {
      this.activeName = 'feedbackResults'
    }
  },
  methods: {
    // 添加地区
    addInvolveArea() {
      if (this.formDataVal.regionalContainer.length === 10) {
        this.$message({
          type: 'warning',
          message: '最多添加10个涉及区域'
        })
      } else {
        this.formDataVal.regionalContainer.push({
          involveArea: '',
          involveArea2: '',
          involveArea3: [],
          options2: [],
          options3: []
        })
      }
    },
    removeInvolveArea(index) {
      this.formDataVal.regionalContainer.splice(index, 1)
    },
    bodyFocus() {
      // this.reportingBodyName.forEach(el => {
      //   if (el.rinm === this.formDataVal.reportBody) {
      //     this.newRicd = el.ricd
      //   }
      // })
      this.newRicd = this.formDataVal.reportBody
    },
    downloadFiles(val) {
      location.href = 'file-service-release/upload/download/' + val.attachId
    },
    // 校验空格特殊字符
    characterSpaceChecking(rule, value, callback) {
      if (this.blankSpace.test(value)) {
        callback(new Error('禁止输入空格'))
      } else if (this.specialEnglish.test(value) || this.sprcialChina.test(value)) {
        callback(new Error('禁止输入特殊字符'))
      } else {
        callback()
      }
    },
    formPrinting() {
      this.printType = true
      document.body.innerHTML = this.$refs.myPrintForm.innerHTML
      window.print()
      window.location.reload()
    },
    involveAreaChat(item) {
      let str = ''
      this.options.forEach(el => {
        if (el.value === item.involveArea) {
          str = el.label
        }
      })
      return str
    },
    involveArea2Chat(item) {
      let str = ''
      item.options2.forEach(el => {
        if (el.value === item.involveArea2) {
          str = el.label
        }
      })
      return str
    },
    involveArea3Chat(item) {
      const arr = []
      for (var i = 0; i < item.involveArea3.length; i++) {
        item.options3.forEach(el => {
          if (el.value === item.involveArea3[i]) {
            arr.push(el.label)
            return false
          }
        })
      }
      return arr
    },
    successUpload(response, file, fileList) {
      if (response.code === 200) {
        this.fileNum++
        if (this.idData.noteId === '') {
          this.idData.noteId += response.data.noteId
        } else {
          this.idData.noteId += ',' + response.data.noteId
        }
        if (this.fileLen === this.fileNum) {
          this.paramsFn()
        }
      }
    },
    changeUpload(file, fileList) {
      const isLt2k = file.size / 1024 / 1024 > 100
      if (isLt2k) {
        this.$message({
          message: '上传文件大小不能超过100M!',
          type: 'warning'
        })
        fileList.pop()
      } else {
        this.fileLen = fileList.length
        this.enclosure = file
      }
    },
    fdbkChangeUpload(file, fileList) {
      const isLt2k = file.size / 1024 / 1024 > 100
      if (isLt2k) {
        this.$message({
          message: '上传文件大小不能超过100M!',
          type: 'warning'
        })
        fileList.pop()
      } else {
        this.fileLen2 = fileList.length
        this.fdbkEnclosure = file
      }
    },
    fdbkSuccessUpload(response, file, fileList) {
      if (response.code === 200) {
        this.fileNum2++
        if (this.feedbackNoteId === '') {
          this.feedbackNoteId += response.data.noteId
        } else {
          this.feedbackNoteId += ',' + response.data.noteId
        }
        if (this.fileLen2 === this.fileNum2) {
          this.paramsFn()
        }
      }
    },
    areaInvolved(newVal) {
      tree().then(res => {
        if (res.code === 200) {
          this.options = res.data
          // this.shunType = true
          const involveAreaArr = []
          newVal.involveAreas.map((element, index) => {
            involveAreaArr.push({
              involveArea: element.split(',')[0] !== undefined ? element.split(',').splice(0, 1).join() : '',
              involveArea2: element.split(',')[1] !== undefined ? element.split(',').splice(1, 1).join() : '',
              involveArea3: element.split(',')[2] !== undefined ? element.split(',').splice(2) : [],
              options2: [],
              options3: []
            })
            if (involveAreaArr[index].involveArea2 !== '') {
              this.involveArea2Focus(involveAreaArr[index])
              if (involveAreaArr[index].involveArea3.length > 0) {
                this.involveArea3Focus(involveAreaArr[index])
              }
            }
          })
          this.formDataVal.regionalContainer = involveAreaArr
        }
      })
    },
    involveArea3Focus(el) {
      if (el.involveArea2 !== '') {
        for (var i = 0; i < el.options2.length; i++) {
          const subStr = el.involveArea2.slice(0, 4)
          if (el.options2[i].children[0].value.indexOf(subStr) !== -1) {
            el.options3 = el.options2[i].children
            return false
          }
        }
      } else {
        el.options3 = []
        this.$message({
          message: '请选择城市',
          type: 'info'
        })
      }
    },
    involveArea2Focus(el) {
      if (el.involveArea !== '') {
        for (var i = 0; i < this.options.length; i++) {
          const subStr = el.involveArea.slice(0, 3)
          if (this.options[i].children[0].value.indexOf(subStr) !== -1) {
            el.options2 = this.options[i].children
            console.log(el)
            return false
          }
        }
      } else {
        el.options2 = []
        this.$message({
          message: '请选择省份',
          type: 'info'
        })
      }
    },
    involveArea2Change(el) {
      el.options3 = []
      el.involveArea3 = []
    },
    involveAreaChange(el) {
      el.options2 = []
      el.options3 = []
      el.involveArea2 = ''
      el.involveArea3 = []
    },
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true
        setTimeout(() => {
          getRinmList({ rinm: query }).then(res => {
            if (res.code === 200) {
              this.loading = false
              this.reportingBodyName = res.data
              this.reportingBodyName.forEach(el => {
                if (el.ricd === this.formDataVal.reportBody) {
                  this.newReporBody = el.rinm
                }
              })
            }
          })
        }, 200)
      } else {
        this.reportingBodyName = []
      }
    },
    getOpinionList() {
      getOpinion({ proInstId: this.proInstId }).then(res => {
        if (res.code === 200) {
          this.opinionData = res.data
          const arr1 = [] // 处长意见
          const arr2 = [] // 局领导意见
          const arr3 = [] // 中心意见
          if (res.data && res.data.length) {
            res.data.forEach(item => {
              if (item.actName === '处长审批') {
                arr1.push(item)
              } else if (item.actName === '局领导审批') {
                arr2.push(item)
              } else if (item.actName === '中心领导审批') {
                arr3.push(item)
              }
            })
          }
          if (arr1.length) {
            this.optionObj1 = arr1[arr1.length - 1]
          }
          if (arr2.length) {
            this.optionObj2 = arr2[arr2.length - 1]
          }
          if (arr3.length) {
            this.optionObj3 = arr3[arr3.length - 1]
          }
          // optionObj1
        }
      }).catch()
    },
    paramsFn() {
      const involveAreasArr = []
      this.formDataVal.regionalContainer.forEach(ele => {
        if (ele.involveArea2 !== '' && ele.involveArea3.length === 0) {
          involveAreasArr.push(ele.involveArea + ',' + ele.involveArea2)
        } else if (ele.involveArea2 === '' && ele.involveArea3.length === 0) {
          involveAreasArr.push(ele.involveArea)
        } else {
          involveAreasArr.push(ele.involveArea + ',' + ele.involveArea2 + ',' + ele.involveArea3.join())
        }
      })
      this.workFlow2business.name = this.$route.query.workitemName
      if (this.$route.query.workitemName === '分支机构反馈' || this.$route.query.workitemName === '局领导审批反馈' || this.$route.query.workitemName === '中心领导审批反馈') {
        const obj = Object.assign({}, this.formDataVal)
        this.map = {
          workflow: this.workFlow2business,
          title: obj.title,
          reportBody: obj.reportBody,
          subjectAccount: obj.subjectAccount,
          involveArea: involveAreasArr,
          descAnalyse: obj.descAnalyse,
          reasonRequire: obj.reasonRequire,
          feedback: {
            feedbackId: obj.feedbackId,
            feedbackPerson: obj.feedbackPerson,
            reportName: obj.reportName,
            feedbackTime: obj.feedbackTime,
            feedbackResult: obj.feedbackResult,
            noteId: this.feedbackNoteId
          },
          noteId: this.idData.noteId
        }
      } else {
        const obj = Object.assign({}, this.formDataVal)
        this.map = {
          workflow: this.workFlow2business,
          title: obj.title,
          reportBody: obj.reportBody,
          subjectAccount: obj.subjectAccount,
          involveArea: involveAreasArr,
          descAnalyse: obj.descAnalyse,
          reasonRequire: obj.reasonRequire,
          noteId: this.idData.noteId
        }
      }
      updateExam(this.applyId, this.map).then(res => {
        if (res.code === 200) {
          if (res.code === 200) {
            this.$emit('subLoadingFn', false)
            this.$message({
              message: '提交成功',
              type: 'success'
            })
            this.$store.dispatch('changeFlag', false)
            setTimeout(() => {
              this.$router.push({ name: 'home' })
            }, 1000)
          } else {
            this.$emit('subLoadingFn', false)
          }
        }
      }).catch(() => {
        this.$emit('subLoadingFn', false)
      })
    },
    updateForm() {
      this.$refs.formDataVal.validate((valid) => {
        if (valid) {
          this.$emit('subLoadingFn', true)
          if (this.enclosure !== '') {
            // 申请表但上传
            if (this.downUpload !== null) {
              if (this.downUpload.length > 0) {
                const arr = []
                this.downUpload.forEach(el => {
                  arr.push(el.noteId)
                })
                this.idData.noteId = arr.join()
              }
            }
            this.$refs.uploadName.submit()
          } else if (this.fdbkEnclosure !== '') {
            // 反馈表单上传
            if (this.feedbackDownUpload !== null) {
              if (this.feedbackDownUpload.length > 0) {
                const arr = []
                this.feedbackDownUpload.forEach(el => {
                  arr.push(el.noteId)
                })
                this.feedbackNoteId = arr.join()
              }
            }
            this.$refs.feedBackUploadName.submit()
          } else {
            this.paramsFn()
          }
        } else {
          this.$message({
            message: '请输入正确的表单内容',
            type: 'warning'
          })
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
.item_title {
    height: 50px;
    line-height: 25px;
    font-size: 20px;
    font-weight: bold;
  }
  .list-block {
  margin-bottom: 30px;
}
.result {
  .list {
    height: 30px;
    line-height: 30px;
    border: 1px solid #ebeef5;
    text-align: center;
    margin-top: 15px;
    .border {
      border-right: 1px solid #ebeef5;
    }
    .border.bg {
      background: #f5f7fa;
    }
  }
  .listContent {
    height: 40px;
    line-height: 40px;
    border: 1px solid #ebeef5;
    border-top: none;
  }
}
.result2 {
  margin-top: 15px;
  .file {
    margin-bottom: 10px;
  }
  .el-textarea__inner {
    min-height: 140px !important;
  }
}
.table {
  p,
  h3 {
    margin: 10px auto;
    text-align: center;
  }
  table {
    border-collapse: collapse;
    text-align: center;
    margin: 0 auto;
  }
  table p {
    max-width: 500px;
    // margin-top: 20px;
    text-align: center;
  }
  #time span {
    width: 30px;
  }
}
.table_span {
  display: inline-block;
  width: 100px;
  text-align: right;
}
.dialog-block{
    .el-radio{
      width: 100%;
      margin-left:30px;
    }
  }
@media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
/* IE10+ CSS styles go here */
.el-select--small{
   height: auto;
 }
 .el-select__tags{
   display: inline-block;
 }
}
</style>