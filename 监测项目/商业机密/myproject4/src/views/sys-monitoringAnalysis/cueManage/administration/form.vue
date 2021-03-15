<template>
  <div class="cueManage_administration_form" v-loading="subLoading" element-loading-text="提交中，请稍侯..."
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)">
    <el-card>
      <div slot="header">
        行政调查管理表单
      </div>
      <div style="marginBottom:18px">
        <el-row v-if="!$route.query.id">
          <el-col :span="24">
            <span style="marginRight:20px">流程操作：</span>
            <el-button type="primary" v-if="activeName === 'applicationForm' && !$route.query.type || activeName === 'applicationForm' && $route.query.type === 'edit'" plain @click="preservation"> 保 存</el-button>
            <el-button type="primary" v-if="activeName === 'applicationForm' && !$route.query.type || activeName === 'applicationForm' && $route.query.type === 'edit'" plain @click="submission"> 提 交</el-button>
            <el-button type="primary" plain @click="returnBtn"> 关 闭</el-button>
            <el-button type="primary" v-if="activeName === 'applicationForm'" plain @click="formPrinting"> 打 印</el-button>
          </el-col>

        </el-row>
      </div>

      <div>
        <el-form :model="form" ref="form" :disabled="isDisType">
        <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="行政调查申请单" name="applicationForm">
              <el-row class="table">
                <div style="width:830px;height:auto;margin:0 auto;">
                  <el-col :span="24">
                    <el-col :span="10" class="item_title" style="text-align:right;padding-right:10px;">
                      中国人民银行（
                    </el-col>
                    <el-col :span="8">
                      <el-form-item prop="title" :rules="[{ required: false, validator: characterSpaceChecking, trigger: 'blur' }]">
                        <el-input v-model="form.title" maxlength="20" placeholder="最多输入20位"></el-input>
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
                <el-col :span="24">
                  <!-- <div v-if="form.applyNum === ''" style="text-align:right;width: 830px;margin:10px auto;margin-left: -20px;">编号：</div> -->
                  <div style="text-align:right;width: 830px;margin:10px auto;">编号：{{ form.applyNum }}</div>
                </el-col>
                <table border="1" style="width: 830px;">
                  <tr>
                    <td width="230" height="70;" align="center" style="background:#ccc;">拟调查义务机构</td>
                    <td width="600" colspan="6">
                      <el-form-item prop="reportBody" :rules="[{required: true, message: '请选择拟调查义务机构', trigger: 'change'}]">
                          <el-select v-model="form.reportBody" filterable remote clearable reserve-keyword placeholder="请输入关键词" :remote-method="remoteMethod" :loading="loading" style="width:100%;">
                          <el-option v-for="(item, index) in reportingBodyName" :key="index" :label="item.rinm" :value="item.ricd">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td height="70" style="background:#ccc;">拟调查可疑交易<br>活动主体或账号</td>
                    <td colspan="6" style="text-align:left;">
                      <el-form-item prop="subjectAccount" :rules="[{required: true, message: '请输入拟调查可疑交易活动主体或账号', trigger: 'blur'}]">
                        <el-input v-model="form.subjectAccount" maxlength="80"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td height="70" style="background:#ccc;">涉及区域</td>
                    <td colspan="6">
                      <el-row v-for="(el, index) in form.regionalContainer" :key="index">
                        <el-col :span="6">
                          <el-form-item :prop="`regionalContainer.${index}.involveArea`" :rules="[{required: true, message: '请选择省份', trigger: 'change'}]">
                          <el-select v-model="el.involveArea" clearable @change="involveAreaChange(el)" placeholder="请选择省份">
                            <el-option
                              v-for="(item, index) in options"
                              :key="index"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                          </el-select>
                          </el-form-item>
                        </el-col>
                        <el-col :span="6">
                          <el-form-item>
                          <el-select v-model="el.involveArea2" clearable @change="involveArea2Change(el)" @focus="involveArea2Focus(el, index)" placeholder="请选择城市">
                            <el-option
                              v-for="(item, index) in el.options2"
                              :key="index"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                          </el-select>
                          </el-form-item>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item>
                          <el-select v-model="el.involveArea3" multiple @focus="involveArea3Focus(el)" placeholder="请选择地区">
                            <el-option
                              v-for="(item, index) in el.options3"
                              :key="index"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                          </el-select>
                          </el-form-item>
                        </el-col>
                        <el-col :span="4">
                          <el-form-item>
                            <el-button v-if="form.regionalContainer.length > 1" type="danger" plain class="el-icon-remove-outline" style="float:right;" @click="removeInvolveArea(index)"></el-button>
                            <el-button v-if="index === form.regionalContainer.length - 1" type="primary" plain class="el-icon-circle-plus-outline" style="float:right;" @click="addInvolveArea"></el-button>
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
                      <el-input type="textarea" v-model="form.descAnalyse" maxlength="255"></el-input>
                    </td>
                  </tr>
                  <tr>
                    <td height="70" colspan="6" style="textAlign:left;border-right-color:#303133;background:#ccc;">申请跨辖区调查的理由和要求</td>
                  </tr>
                  <tr>
                    <td height="100" colspan="6" style="border-right-color:#303133;">
                      <el-input type="textarea" v-model="form.reasonRequire" maxlength="255"></el-input>
                    </td>
                  </tr>
                  <tr>
                    <td height="120">处长审批意见：</td>
                    <td colspan="6">
                      <el-input type="textarea" :disabled="true" v-model="director"></el-input>
                      <p style="float: right;margin-top:10px;padding-right:10px;">
                        {{directorTime.slice(0, 11)}}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td height="120">中心领导审批意见：</td>
                    <td colspan="6">
                      <el-input type="textarea" :disabled="true" v-model="center"></el-input>
                      <p style="float: right;margin-top:10px;padding-right:10px;">
                        {{centerTime.slice(0, 11)}}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td height="120">反洗钱局领导审批意见：</td>
                    <td colspan="6">
                      <el-input type="textarea" :disabled="true" v-model="bureau"></el-input>
                      <p style="float: right;margin-top:10px;padding-right:10px;">
                        {{bureauTime.slice(0, 11)}}
                      </p>
                    </td>
                  </tr>
                </table>
                <table v-if="this.$route.query.type !== 'read-only'">
                  <tr>
                    <td width="830" height="100" colspan="2" style="text-align:left;">
                      <el-upload ref="uploadName" :action="uploadUrl" :headers="headers" show-file-list :file-list="fileList" :on-change="changeUpload" :on-success="successUpload" :data="idData" multiple :auto-upload="false" :limit="5">
                      相关附件：<el-button size="small" type="primary">上传附件</el-button>
                      <el-button type="text" style="color:red;">最多上传5个附件</el-button>
                      </el-upload>
                    </td>
                  </tr>
                </table>
                <table v-if="$route.query.table !== 'N'">
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
                            <!-- <span @click="delFiles(scope.row)" style="font-size: 12px;color: #409EFF;cursor: pointer;">删除</span> -->
                          </template>
                        </el-table-column>
                      </el-table>
                    </td>
                  </tr>
                </table>
              </el-row>
          </el-tab-pane>
          <el-tab-pane v-if="$route.query.type === 'read-only' && isBranchType || $route.query.id && isBranchType" label="行政调查反馈结果" name="feedbackResults">
            <div class="result">
              <el-row>
                <el-col :span="24">反馈信息：</el-col>
              </el-row>
              <el-row class="list">
                <el-col :span="4" class="border bg">
                  <span>反馈人：</span>
                </el-col>
                <el-col :span="4" class="border">
                  <span>
                    <el-input v-model="form.feedbackPerson" maxlength="10"></el-input>
                  </span>
                </el-col>
                <el-col :span="4" class="border bg">
                  <span>反馈人所在机构：</span>
                </el-col>
                <el-col :span="4" class="border">
                  <span>
                    <el-input v-model="form.reportName" maxlength="255"></el-input>
                  </span>
                </el-col>
                <el-col :span="4" class="border bg">
                  <span>反馈时间：</span>
                </el-col>
                <el-col :span="4">
                  <span>
                    <el-input v-model="form.feedbackTime" maxlength="32"></el-input>
                  </span>
                </el-col>
              </el-row>
              <!-- <el-row class="listContent">
                <el-col :span="8">
                  <span style="margin-left:20px">反洗钱局领导：</span>
                </el-col>
                <el-col :span="8" style="textAlign:center">同意。</el-col>
                <el-col :span="8">
                  <span style="margin-left:40px">领导姓名</span>
                  <span style="margin-left:60px">2017-11-18</span>
                </el-col>
              </el-row>
              <el-row class="listContent">
                <el-col :span="8">
                  <span style="margin-left:5px">反洗钱中心领导：</span>
                </el-col>
                <el-col :span="8" style="textAlign:center">同意。</el-col>
                <el-col :span="8">
                  <span style="margin-left:40px">领导姓名</span>
                  <span style="margin-left:60px">2017-11-18</span>
                </el-col>
              </el-row> -->
            </div>
            <div class="divider divider-dashed"></div>
            <div class="result2">
              <el-row>
                <el-col :span="24">反馈结果：</el-col>
              </el-row>
              <el-row style="margin-top:15px">
                <el-col :span="24">
                  <el-input type="textarea" v-model="form.feedbackResult" maxlength="2000"></el-input>
                </el-col>
              </el-row>
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
                    <!-- <span @click="delFiles(scope.row)" style="font-size: 12px;color: #409EFF;cursor: pointer;">删除</span> -->
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <!-- <div class="divider divider-dashed"></div> -->
            <!-- <el-upload ref="uploadFeedbackName" :action="uploadFeedbackUrl" :headers="headers" :file-list="fileFeedbackList" :on-change="changeFeedbackUpload" :on-success="successFeedbackUpload" :auto-upload="false">
            相关附件：<el-button size="small" type="primary">上传附件</el-button>
            </el-upload> -->
          </el-tab-pane>
          
          <!-- <el-tab-pane label="相关附件" name="relatedAccessories">
            <relatedFile :applyID="applyID"></relatedFile>
          </el-tab-pane> -->
          <el-tab-pane v-if="false" label="办理信息" name="handlingInformation">
            <div class="information" style="margin-top:20px">
              <div class="list-block">
                <el-row>
                  <el-col :span="12" style="margin-bottom:10px">
                    <span>流程信息：</span>
                  </el-col>
                </el-row>
                <el-table :data="tableData">
                  <el-table-column label="序号" type="index"></el-table-column>
                  <el-table-column label="节点名称" prop="actName"></el-table-column>
                  <el-table-column label="执行用户" prop="approverName"></el-table-column>
                  <el-table-column label="办理时间" prop="time"></el-table-column>
                  <el-table-column label="办理意见" prop="opinion"></el-table-column>
                </el-table>
                <el-form :disabled="false">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" background :current-page="pageNum" :page-size="pageSize" :page-sizes="[10, 20, 30, 40]" layout="total, sizes, prev, pager, next, jumper" :total="tabTotal">
                </el-pagination>
                </el-form>
              </div>
              <div class="map-block">
                <el-row style="marginBottom:20px">
                  <el-col :span="12">
                    <span>流程监控图 ：</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-steps :active="tableData === null ? 1 : tableData.length + 1" align-center finish-status="success">
                      <el-step title="起草"></el-step>
                      <el-step v-for="(item, index) in tableData" :key="index" :title="item.actName"></el-step>
                    </el-steps>
                  </el-col>
                </el-row>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
        </el-form>
        <div ref="myPrintForm" v-show="printType">
          <h3 style="margin: 10px auto;text-align: center;">中国人民银行({{form.title}})</h3>
          <p style="margin: 10px auto;text-align: center;font-size: 18px;">反洗钱跨辖区协助调查申请表</p>
          <p style="margin: 10px auto;text-align: right;width: 830px;">编号：{{ form.applyNum }}</p>
          <table border="1" style="border-collapse: collapse;text-align: center;margin: 0 auto;">
          <tr>
            <td width="230" height="70;" align="center">拟调查义务机构</td>
            <td width="600" colspan="6" style="text-align:left;padding:10px;word-wrap:break-word;max-width: 600px;">
              <div v-if="form.reportBody !== ''">
                {{newReporBody}}
              </div>
              <div v-else>

              </div>
            </td>
          </tr>
          <tr>
            <td height="70">拟调查可疑交易<br>活动主体或账号</td>
            <td width="600" colspan="6" style="text-align:left;padding:10px;word-wrap:break-word;max-width: 600px;">
              <div v-if="form.subjectAccount !== ''">
                {{form.subjectAccount}}
              </div>
              <div v-else>

              </div>
            </td>
          </tr>
          <tr>
            <td height="70">涉及区域</td>
            <td colspan="6" style="text-align:left;padding:10px;word-wrap:break-word;max-width: 600px;">
              <el-col :span="24" v-for="(item, index) in form.regionalContainer" :key="index">
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
              <div v-if="form.descAnalyse !== ''">
                {{form.descAnalyse}}
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
              <div v-if="form.reasonRequire !== ''">
                {{form.reasonRequire}}
              </div>
              <div v-else>

              </div>
            </td>
          </tr>
          <tr>
            <td height="120">处长审批意见：</td>
            <td colspan="6" style="text-align:left;padding:10px;max-width: 600px;border-right-color:#303133;word-wrap:break-word;">
              {{director}}
              <p style="float: right;margin-top:10px;padding-right:10px;">
                {{directorTime.slice(0, 11)}}
              </p>
            </td>
          </tr>
          <tr>
            <td height="120">中心领导审批意见：</td>
            <td colspan="6" style="text-align:left;padding:10px;max-width: 600px;border-right-color:#303133;word-wrap:break-word;">
              {{center}}
              <p style="float: right;margin-top:10px;padding-right:10px;">
                {{centerTime.slice(0, 11)}}
              </p>
            </td>
          </tr>
          <tr>
            <td height="120">反洗钱局领导审批意见：</td>
            <td colspan="6" style="text-align:left;padding:10px;max-width: 600px;border-right-color:#303133;word-wrap:break-word;">
              {{bureau}}
              <p style="float: right;margin-top:10px;padding-right:10px;">
                {{bureauTime.slice(0, 11)}}
              </p>
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
        
      </div>
      <monitor-workflow></monitor-workflow>
      <el-dialog title="选择节点" :visible.sync="adviceVisible">
        <el-input type="textarea"></el-input>
        <span slot="footer" class="dialog-footer">
          <el-button @click="adviceVisible = false">取 消</el-button>
          <el-button type="primary" @click="adviceVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>

import { newApplicationForm, submissionApi, save } from '@/api/administration'
import { getApply } from '@/api/sys-monitoringAnalysis/statisticForm/large'
import { circulationRecord } from '@/api/administration.js'
import { mapGetters } from 'vuex'
import { fileApply } from '@/api/administration.js'
import { getRinmList } from '@/api/sys-monitoringAnalysis/statisticForm/large'
import { tree, deleteAttach, fileFeedback } from '@/api/sys-monitoringAnalysis/administrative/investigation.js'
import { getToken } from '@/utils/auth'
export default {
  data() {
    const generateData = _ => {
      const selectionData = []
      for (let i = 1; i <= 15; i++) {
        selectionData.push({
          key: i,
          label: `备选项 ${i}`,
          disabled: i % 4 === 0
        })
      }
      return selectionData
    }
    return {
      director: '',
      directorTime: '',
      center: '',
      centerTime: '',
      bureau: '',
      bureauTime: '',
      isBranchType: false,
      fileNum: 0,
      filelength: 0,
      subLoading: false,
      printType: false,
      uploadType: false,
      fileApplyId: '',
      downUpload: [],
      feedbackDownUpload: [],
      isDisType: false,
      feedbackEnclosure: '',
      fileFeedbackList: [],
      enclosure: '',
      fileList: [],
      idData: {
        noteId: ''
      },
      newRicd: '',
      applyId: '',
      options: [],
      options2: [],
      options3: [],
      reportingBodyName: [],
      loading: false,
      selectionData: generateData(),
      usersToBeSelected: [],
      pageNum: 1,
      pageSize: 10,
      tabTotal: 0,
      adviceVisible: false,
      form: {
        applyNum: '',
        title: '',
        reportBody: '',
        subjectAccount: '',
        involveArea: '',
        involveArea2: '',
        involveArea3: [],
        descAnalyse: '',
        reasonRequire: '',
        feedbackPerson: '',
        reportName: '',
        feedbackTime: '',
        feedbackResult: '',
        regionalContainer: [
          {
            involveArea: '',
            involveArea2: '',
            involveArea3: [],
            option2: [],
            option3: []
          }
        ]
      },
      activeName: 'applicationForm',
      value:
        '反馈信息XXXXXXXXXXXXX描述，反馈信息XXXXXXXXXXXXX描述，反馈信息XXXXXXXXXXXXX描述，反馈信息XXXXXXXXXXXXX描述，反馈信息XXXXXXXXXXXXX描述，反馈信息XXXXXXXXXXXXX描述，反馈信息XXXXXXXXXXXXX描述，反馈信息XXXXXXXXXXXXX描述，反馈信息XXXXXXXXXXXXX描述，反馈信息XXXXXXXXXXXXX描述，反馈信息XXXXXXXXXXXXX描述，反馈信息XXXXXXXXXXXXX描述，反馈信息XXXXXXXXXXXXX描述，反馈信息XXXXXXXXXXXXX描述，反馈信息XXXXXXXXXXXXX描述，反馈信息XXXXXXXXXXXXX描述，反馈信息XXXXXXXXXXXXX描述，反馈信息XXXXXXXXXXXXX描述，反馈信息XXXXXXXXXXXXX描述，反馈信息XXXXXXXXXXXXX描述，反馈信息XXXXXXXXXXXXX描述，反馈信息XXXXXXXXXXXXX描述。',
      tableData: [],
      headers: {
        Authorization: getToken()
      },
      specialEnglish: /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im, // 校验英文特殊符号
      sprcialChina: /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im, // 校验中文特殊符号
      blankSpace: /[ ]/im // 校验空格
    }
  },
  mounted() {
    this.areaInvolved()
    if (this.$route.query.activeName && this.$route.query.apply) {
      // this.activeName = this.$route.query.activeName
      this.applyId = this.$route.query.apply
      if (this.$route.query.type === 'read-only') {
        this.isDisType = true
      } else {
        this.uploadType = true
      }
    } else if (this.$route.query.id) {
      this.applyId = this.$route.query.id
      this.isDisType = true
    }
  },
  // components: {
  //   relatedFile
  // },
  // mounted() {
  // },
  computed: {
    ...mapGetters(['roles', 'businessFlag', 'workFlow2business', 'name']),
    uploadUrl() {
      return '/monitor/thread/adm/uploadApply'
    },
    uploadFeedbackUrl() {
      return '/monitor/thread/adm/uploadFeedback'
    },
    newReporBody() {
      let str = ''
      this.reportingBodyName.map(item => {
        if (item.ricd === this.form.reportBody) {
          str = item.rinm
        }
      })
      return str
    }
  },
  destroyed() {
    if (sessionStorage.getItem('printSession')) {
      sessionStorage.removeItem('printSession')
    }
  },
  methods: {
    // 添加地区
    addInvolveArea() {
      if (this.form.regionalContainer.length === 10) {
        this.$message({
          type: 'warning',
          message: '最多添加10个涉及区域'
        })
      } else {
        this.form.regionalContainer.push({
          involveArea: '',
          involveArea2: '',
          involveArea3: [],
          option2: [],
          option3: []
        })
      }
    },
    removeInvolveArea(index) {
      this.form.regionalContainer.splice(index, 1)
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
    formPrinting() {
      const obj = Object.assign({}, this.form)
      sessionStorage.setItem('printSession', JSON.stringify(obj))
      this.printType = true
      document.body.innerHTML = this.$refs.myPrintForm.innerHTML
      window.print()
      window.location.reload()
      // if (this.$route.query.proposer === this.name || this.$route.query.proposer === undefined) {
      // } else {
      //   this.$message.warning('非申请人不可打印')
      // }
    },
    delFiles(item) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteAttach(item.attachId).then(res => {
          if (res.code === 200) {
            if (this.activeName === 'applicationForm') {
              fileApply(this.applyId).then(res => {
                if (res.code === 200) {
                  this.downUpload = res.data
                  this.$message({
                    type: 'success',
                    message: '删除成功!'
                  })
                }
              })
            } else {
              fileFeedback(this.$route.query.feedbackId).then(res => {
                if (res.code === 200) {
                  this.feedbackDownUpload = res.data
                  this.$message({
                    type: 'success',
                    message: '删除成功!'
                  })
                }
              })
            }
          }
        })
      }).catch(() => {})
    },
    downloadFiles(val) {
      location.href = 'file-service/upload/download/' + val.attachId + '?moduleName=' + encodeURI('线索管理')
    },
    initApi() {
      // 行政调查申请单反显的数据
      getApply(this.applyId).then(res => {
        if (res.code === 200) {
          const involveAreaArr = []
          res.data.involveAreas.map((element, index) => {
            involveAreaArr.push({
              involveArea: element.split(',')[0] !== undefined ? element.split(',').splice(0, 1).join() : '',
              involveArea2: element.split(',')[1] !== undefined ? element.split(',').splice(1, 1).join() : '',
              involveArea3: element.split(',')[2] !== undefined ? element.split(',').splice(2) : [],
              option2: [],
              option3: []
            })
            if (involveAreaArr[index].involveArea2 !== '') {
              this.involveArea2Focus(involveAreaArr[index], index)
              if (involveAreaArr[index].involveArea3.length > 0) {
                this.involveArea3Focus(involveAreaArr[index], index)
              }
            }
          })
          console.log(involveAreaArr)
          this.form = {
            applyNum: res.data.applyNum,
            title: res.data.title,
            reportBody: res.data.reportBody,
            subjectAccount: res.data.subjectAccount,
            descAnalyse: res.data.descAnalyse,
            reasonRequire: res.data.reasonRequire,
            feedbackPerson: res.data.feedback.feedbackPerson,
            reportName: res.data.feedback.reportName,
            feedbackTime: res.data.feedback.feedbackTime,
            feedbackResult: res.data.feedback.feedbackResult,
            feedbackId: res.data.feedback.feedbackId,
            regionalContainer: involveAreaArr
          }
          getRinmList({ ricd: this.form.reportBody }).then(res => {
            if (res.code === 200) {
              this.loading = false
              this.reportingBodyName = res.data
            }
          })
          // 行政调查反馈单中的文件列表
          fileFeedback(this.form.feedbackId).then(res => {
            if (res.code === 200) {
              this.feedbackDownUpload = res.data
            }
          })
        }
      })
      // 办理信息-流程信息列表
      // 办理信息只有在查看流程的情况下展示
      // if (this.$route.query.type === 'read-only') {
      this.circulationRecordFn()
      // }
      // if (this.$route.query.noteId) {
      // 行政调查申请单中的文件列表
      fileApply(this.applyId).then(res => {
        if (res.code === 200) {
          this.downUpload = res.data
        }
      })
      // }
    },
    circulationRecordFn() {
      circulationRecord(this.applyId, this.pageNum, this.pageSize).then(res => {
        if (res.code === 200) {
          this.tabTotal = res.data.total
          this.tableData = res.data.list
          if (this.tableData !== null && this.tableData.length > 0) {
            this.tableData.forEach(el => {
              if (el.actName === '分支机构反馈') {
                this.isBranchType = true
              }
              if (el.actName === '处长审批') {
                this.director = el.opinion
                this.directorTime = el.time
              }
              if (el.actName === '中心领导审批') {
                this.center = el.opinion
                this.centerTime = el.time
              }
              if (el.actName === '局领导审批') {
                this.bureau = el.opinion
                this.bureauTime = el.time
              }
            })
          }
        }
      })
    },
    successFeedbackUpload(response, file, fileList) {},
    changeFeedbackUpload(file, fileList) {
      this.feedbackEnclosure = file
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
        this.filelength = fileList.length
        this.enclosure = file
      }
    },
    successUpload(response, file, fileList) {
      if (response.code === 200) {
        this.fileNum++
        if (this.idData.noteId === '') {
          this.idData.noteId += response.data.noteId
        } else {
          this.idData.noteId += ',' + response.data.noteId
        }
        if (this.fileNum === this.filelength && this.fileType === 'tijiao') {
          this.submiInterface()
        } else if (this.fileNum === this.filelength && this.fileType === 'baocun') {
          this.baoParamter()
        }
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
    involveArea2Focus(el, index) {
      if (el.involveArea !== '') {
        for (var i = 0; i < this.options.length; i++) {
          const subStr = el.involveArea.slice(0, 3)
          if (this.options[i].children.length > 0) {
            if (this.options[i].children[0].value.indexOf(subStr) !== -1) {
              el.options2 = this.options[i].children
              const arr = Object.assign([], this.form.regionalContainer)
              this.form.regionalContainer = arr
              return false
            }
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
    involveArea3Focus(el) {
      if (el.involveArea2 !== '') {
        for (var i = 0; i < el.options2.length; i++) {
          const subStr = el.involveArea2.slice(0, 4)
          if (el.options2[i].children.length > 0) {
            if (el.options2[i].children[0].value.indexOf(subStr) !== -1) {
              el.options3 = el.options2[i].children
              const arr = Object.assign([], this.form.regionalContainer)
              this.form.regionalContainer = arr
              return false
            }
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
    areaInvolved() {
      tree().then(res => {
        if (res.code === 200) {
          this.options = res.data
          if (this.$route.query.activeName && this.$route.query.apply || this.$route.query.id) {
            if (sessionStorage.getItem('printSession')) {
              sessionStorage.removeItem('printSession')
            }
            this.initApi()
          } else {
            if (sessionStorage.getItem('printSession')) {
              const obj = sessionStorage.getItem('printSession')
              this.form = JSON.parse(obj)
              sessionStorage.removeItem('printSession')
            }
          }
        }
      })
    },
    bodyChange() {
      // this.reportingBodyName.forEach(el => {
      //   if (el.rinm === this.form.reportBody) {
      //     }
      // })
      this.newRicd = this.form.reportBody
    },
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true
        setTimeout(() => {
          getRinmList({ rinm: query }).then(res => {
            if (res.code === 200) {
              this.loading = false
              this.reportingBodyName = res.data
            }
          })
        }, 200)
      } else {
        this.reportingBodyName = []
      }
    },
    returnBtn() {
      this.$router.go(-1)
    },
    submission() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.bodyChange()
          if (this.activeName === 'applicationForm') {
            this.$store.dispatch('workFlow', { configCode: 'adm', ricd: this.newRicd })
            this.$store.dispatch('openWorkFlow', true)
          }
        } else {
          return false
        }
      })
    },
    nextStep() {
      this.subLoading = true
      if (this.downUpload !== null) {
        if (this.downUpload.length > 0) {
          const arr = []
          this.downUpload.forEach(el => {
            arr.push(el.noteId)
          })
          this.idData.noteId = arr.join()
        }
      }
      if (this.enclosure !== '') {
        this.fileType = 'tijiao'
        this.$refs.uploadName.submit()
      } else {
        this.submiInterface()
      }
    },
    // 提交 工作流
    submiInterface() {
      const involveAreasArr = []
      this.form.regionalContainer.forEach(ele => {
        if (ele.involveArea2 !== '' && ele.involveArea3.length === 0) {
          involveAreasArr.push(ele.involveArea + ',' + ele.involveArea2)
        } else if (ele.involveArea2 === '' && ele.involveArea3.length === 0) {
          involveAreasArr.push(ele.involveArea)
        } else {
          involveAreasArr.push(ele.involveArea + ',' + ele.involveArea2 + ',' + ele.involveArea3.join())
        }
      })
      if (this.$route.query.type === 'edit') {
        const obj = Object.assign({}, this.form)
        const apply = {
          workflow: this.workFlow2business,
          title: obj.title,
          reportBody: obj.reportBody,
          subjectAccount: obj.subjectAccount,
          involveAreas: involveAreasArr,
          // involveArea: obj.involveArea3.length > 0 ? obj.involveArea + ',' + obj.involveArea2 + ',' + obj.involveArea3.join() : obj.involveArea2 !== '' ? obj.involveArea + ',' + obj.involveArea2 : obj.involveArea,
          descAnalyse: obj.descAnalyse,
          reasonRequire: obj.reasonRequire,
          feedback: {
            feedbackPerson: obj.feedbackPerson,
            reportName: obj.reportName,
            feedbackTime: obj.feedbackTime,
            feedbackResult: obj.feedbackResult
          },
          noteId: this.idData.noteId,
          applyId: this.applyId,
          updateFlag: '1'
        }
        save(apply).then(res => {
          if (res.code === 200) {
            this.subLoading = false
            this.$message({
              message: '提交成功',
              type: 'success'
            })
            this.$router.go(-1)
          } else {
            this.subLoading = false
          }
        }).catch(() => {
          this.subLoading = false
        })
      } else {
        const obj = Object.assign({}, this.form)
        const apply = {
          workflow: this.workFlow2business,
          title: obj.title,
          reportBody: obj.reportBody,
          subjectAccount: obj.subjectAccount,
          involveAreas: involveAreasArr,
          // involveArea: obj.involveArea3.length > 0 ? obj.involveArea + ',' + obj.involveArea2 + ',' + obj.involveArea3.join() : obj.involveArea2 !== '' ? obj.involveArea + ',' + obj.involveArea2 : obj.involveArea,
          descAnalyse: obj.descAnalyse,
          reasonRequire: obj.reasonRequire,
          feedback: {
            feedbackPerson: obj.feedbackPerson,
            reportName: obj.reportName,
            feedbackTime: obj.feedbackTime,
            feedbackResult: obj.feedbackResult
          },
          noteId: this.idData.noteId
        }
        submissionApi(apply).then(res => {
          if (res.code === 200) {
            this.subLoading = false
            this.$message({
              message: '提交成功',
              type: 'success'
            })
            this.$router.go(-1)
          } else {
            this.subLoading = false
            this.$message({
              message: '提交失败',
              type: 'error'
            })
          }
        }).catch(() => {
          this.subLoading = false
        })
      }
    },
    baoParamter() {
      const involveAreasArr = []
      this.form.regionalContainer.forEach(ele => {
        if (ele.involveArea2 !== '' && ele.involveArea3.length === 0) {
          involveAreasArr.push(ele.involveArea + ',' + ele.involveArea2)
        } else if (ele.involveArea2 === '' && ele.involveArea3.length === 0) {
          involveAreasArr.push(ele.involveArea)
        } else {
          involveAreasArr.push(ele.involveArea + ',' + ele.involveArea2 + ',' + ele.involveArea3.join())
        }
      })
      if (this.$route.query.type === 'edit') {
        const obj = Object.assign({}, this.form)
        const apply = {
          title: obj.title,
          reportBody: obj.reportBody,
          subjectAccount: obj.subjectAccount,
          involveAreas: involveAreasArr,
          // involveArea: obj.involveArea3.length > 0 ? obj.involveArea + ',' + obj.involveArea2 + ',' + obj.involveArea3.join() : obj.involveArea2 !== '' ? obj.involveArea + ',' + obj.involveArea2 : obj.involveArea,
          descAnalyse: obj.descAnalyse,
          reasonRequire: obj.reasonRequire,
          feedback: {
            feedbackPerson: obj.feedbackPerson,
            reportName: obj.reportName,
            feedbackTime: obj.feedbackTime,
            feedbackResult: obj.feedbackResult
          },
          applyId: this.applyId,
          updateFlag: '0',
          noteId: this.idData.noteId
        }
        save(apply).then(res => {
          if (res.code === 200) {
            this.subLoading = false
            this.$message({
              message: '保存成功',
              type: 'success'
            })
            this.$router.go(-1)
          } else {
            this.subLoading = false
          }
        }).catch(() => {
          this.subLoading = false
        })
      } else {
        newApplicationForm(this.parameter()).then(res => {
          if (res.code === 200) {
            this.subLoading = false
            this.$message({
              message: '保存成功',
              type: 'success'
            })
            this.$router.go(-1)
          } else {
            this.subLoading = false
            this.$message({
              message: res.message,
              type: 'error'
            })
          }
        }).catch(() => {
          this.subLoading = false
        })
      }
    },
    preservation() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.downUpload !== null) {
            if (this.downUpload.length > 0) {
              const arr = []
              this.downUpload.forEach(el => {
                arr.push(el.noteId)
              })
              this.idData.noteId = arr.join()
            }
          }
          this.subLoading = true
          if (this.enclosure !== '') {
            this.fileType = 'baocun'
            this.$refs.uploadName.submit()
          } else {
            this.baoParamter()
          }
        } else {
          return false
        }
      })
    },
    parameter() {
      const involveAreasArr = []
      this.form.regionalContainer.forEach(ele => {
        if (ele.involveArea2 !== '' && ele.involveArea3.length === 0) {
          involveAreasArr.push(ele.involveArea + ',' + ele.involveArea2)
        } else if (ele.involveArea2 === '' && ele.involveArea3.length === 0) {
          involveAreasArr.push(ele.involveArea)
        } else {
          involveAreasArr.push(ele.involveArea + ',' + ele.involveArea2 + ',' + ele.involveArea3.join())
        }
      })
      const obj = Object.assign({}, this.form)
      const apply = {
        title: obj.title,
        reportBody: obj.reportBody,
        subjectAccount: obj.subjectAccount,
        // involveArea: obj.involveArea3.length > 0 ? obj.involveArea + ',' + obj.involveArea2 + ',' + obj.involveArea3.join() : obj.involveArea2 !== '' ? obj.involveArea + ',' + obj.involveArea2 : obj.involveArea,
        involveAreas: involveAreasArr,
        descAnalyse: obj.descAnalyse,
        reasonRequire: obj.reasonRequire,
        feedback: {
          feedbackPerson: obj.feedbackPerson,
          reportName: obj.reportName,
          feedbackTime: obj.feedbackTime,
          feedbackResult: obj.feedbackResult
        },
        noteId: this.idData.noteId
      }
      return apply
    },
    // 分页
    handleSizeChange(val) {
      this.pageSize = val
      this.circulationRecordFn()
    },
    handleCurrentChange(val) {
      this.pageNum = val
      this.circulationRecordFn()
    },
    handleClick(tab, event) {
      console.log(tab, event, 11111111111111111111111)
    }
  },
  watch: {
    businessFlag(val) {
      if (val) this.nextStep()
      this.$store.dispatch('changeFlag', false)
    }
  }
}
</script>

<style lang="scss">
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
  .item_title {
    height: 50px;
    line-height: 25px;
    font-size: 20px;
    font-weight: bold;
  }
  table {
    border-collapse: collapse;
    text-align: center;
    margin: 0 auto;
  }
  table p {
    margin-top: 20px;
    text-align: right;
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
