<template>
  <div class="conjointAnalysis-creator"
   v-loading="loading"
    element-loading-text="请耐心等待"
    element-loading-spinner="el-icon-loading"

    element-loading-background="rgba(0, 0, 0, 0.2)">
    <el-form
      ref="form"
      :rules="rules"
      :model="form"
      label-width="160px"
      class="formBlock"
    >
      <el-row>
        <el-col :span="20">
          <el-form-item
            label="联合分析名称："
            prop="jointAnalysisName"
          >
            <el-input
              maxlength="100"
              placeholder="请输入联合分析名称，最多输入100字符"
              v-model="form.jointAnalysisName"
            ></el-input>
          </el-form-item>
        </el-col>

        <!-- <el-col :span="20">
          <el-form-item label="起止日期：">
            <el-date-picker type="daterange" placeholder="选择日期" v-model="form.date" range-separator="至" start-placeholder="2017-12-16" end-placeholder="2018-2-26" unlink-panels></el-date-picker>
          </el-form-item>
        </el-col>-->
        <div class="start-end">
          <el-form-item
            label="起止日期："
            class="start"
            prop="startTime"
            :rules="[{ required: true, message: '开始时间不能为空', trigger: 'change' },
          { validator: timeCheckStart, trigger: 'change' },]"
          >
            <el-date-picker
              value-format="yyyy-MM-dd"
              format="yyyy 年 MM 月 dd 日"
              v-model="form.startTime"
              type="date"
            ></el-date-picker>
          </el-form-item>
          <span>至</span>
          <el-form-item
            class="end"
            label-width="10px"
            prop="endTime"
            :rules="[{validator: timeCheck, trigger: 'change'}]"
          >
            <el-date-picker
              value-format="yyyy-MM-dd"
              format="yyyy 年 MM 月 dd 日"
              v-model="form.endTime"
              type="date"
            ></el-date-picker>
          </el-form-item>
        </div>
        <el-col :span="20">
          <el-form-item
            label="涉及分支机构："
            class="itme-block"
            prop="organDoList"
          >
            <el-select
              filterable
              v-model="form.organDoList"
              multiple
              placeholder="请选择"
              @change="jgChange"
            >
              <el-option
                v-for="(item,index) in organDoListData"
                :key="index"
                :label="item.codeName"
                :value="item.codeId"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <!-- <el-col :span="20">
          <preliminary-judgment :lableWidth="160" :labelName="'涉罪类型：'" ref="judgment" :propVal="'initJudge'" :judgmentInp1="judgmentInp1" :judgmentInp2="judgmentInp2" @judgment="getJudgment" :echoJudgment="reportCluePreJudgment" @judgmentOther="getJudgmentOther"></preliminary-judgment>
        </el-col>-->
        <!-- {{form.supplementOne}} -->
        <el-col>
          <el-form-item
            label="涉罪类型："
            class="itme-block"
            prop="preJudmentDoList"
            :rules="[{ required: true, message: '涉罪类型不能为空', trigger: 'change'}]"
          >
            <el-select
              filterable
              v-model="form.preJudmentDoList"
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
            label=" "
            class="itme-block"
            v-if="isReplenishOne"
            prop="supplementOne"
          >
            <el-input
              
              maxlength="100"
              v-model="form.supplementOne"
              placeholder="请填写关于司法机构或行政调查已介入的可疑交易行为的补充"
            ></el-input>
          </el-form-item>
          <el-form-item
            label=" "
            class="itme-block"
            v-if="isReplenishTwo"
            prop="supplementTwo"
          >
            <el-input
              
              maxlength="100"
              v-model="form.supplementTwo"
              placeholder="请填写关于涉嫌其他犯罪的可疑交易行为的补充"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="20">
          <el-form-item label="简介：">
            <el-input
              maxlength="200"
              type="textarea"
              v-model="form.desc"
            ></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="20">
          <el-form-item label="附件：">
            <el-upload
              class="upload-demo"
              :on-remove="handleRemove"
              :action="updataUrl2"
              :on-success="upSuccess"
              :file-list="fileList"
              :beforeUpload="beforeAvatarUpload3"
              :on-preview="downFile"
              :disabled="!upFile||($route.query.type === '已结束')"
            >
              <el-button
                size="small"
                type="primary"
                plain
                :disabled="!upFile||($route.query.type === '已结束')"
              >点击上传</el-button>
            </el-upload>
          </el-form-item>
        </el-col>

        <el-col :span="20">
          <el-form-item
            label="联系人："
            prop="contact"
          >
            <el-input
              maxlength="20"
              v-model="form.contact"
              placeholder="请填写联系人"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <div style="margin-bottom:30px">
        <div style="margin-bottom:10px">
          <strong>批量导入主体或账户信息</strong>
          <el-upload
            style="display: inline-block;"
            :action="updataUrl3"
            :on-success="handleSuccess"
            :limit="1"
            :on-exceed="handleExceed"
            :file-list="mainFileList"
            :beforeUpload="beforeAvatarUpload2"
            :disabled="!upFile||($route.query.type === '已结束')"
          >
            <!-- <el-button slot="trigger" size="small" type="primary" plain>选取文件</el-button> -->
            <el-button
              slot="trigger"
              type="primary"
              plain
              :disabled="!upFile||($route.query.type === '已结束')"
            >选取文件</el-button>
            <el-button
              type="primary"
              icon="el-icon-download"
              plain
              @click="download"
              :disabled="!upFile||($route.query.type === '已结束')"
            >模版下载</el-button>
            <el-button
              style="margin-left:0;"
              type="primary"
              plain
              @click="addSingle"
              :disabled="!upFile||($route.query.type === '已结束')"
            >添加一行</el-button>             
          </el-upload>
        </div>

        <el-row>
          <el-col
            :span="22"
            :offset="1"
          >
            <el-table :data="form.tableData" max-height="500px" border>
            <el-table-column type="index" label="序号" width="80" ></el-table-column>
            <el-table-column label="主体名称" min-width="150" prop="name"></el-table-column>
            <el-table-column label="证件类型" min-width="150"  prop="certificateTypeName"></el-table-column>
            <el-table-column label="证件号码" min-width="150"  prop="certificateNum"></el-table-column>
            <el-table-column label="账号" min-width="150"  prop="accountNum"></el-table-column>
            <el-table-column label="开户行" min-width="150"  prop="openBank"></el-table-column>
            <el-table-column label="负责分析的分支行" min-width="150"  prop="branchBankName"></el-table-column>                           
            <el-table-column
              label="操作"
              min-width="200"
            >
              <template slot-scope="scope">
                <el-button
                  type="text"
                  :disabled="!upFile||($route.query.type === '已结束')"
                  @click="editItem(scope.$index,scope.row)"
                >编辑</el-button>
                <el-button
                :disabled="!upFile||($route.query.type === '已结束')"
                  type="text"
                  @click="delItem(scope.$index,scope.row)"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          </el-col>
        </el-row>
        
      </div>
      <el-button plain type="primary"  @click="downAccount">主体账户信息下载</el-button>
        
      <el-dialog title="主体账户信息" :visible.sync="editVisible" width="60%">
            <el-form ref="formMain" :model="formMain">
              <el-form-item label="主体名称：" label-width="200px" prop="name" :rules="[{validator: delDataValidInput, trigger: 'blur'}]">
                  <el-input v-model="formMain.name" maxlength="50"  placeholder="请输入主体名称,最多输入50字符"></el-input>
              </el-form-item>
              <el-form-item label="证件类型：" label-width="200px">
                  <el-select
                    clearable
                    filterable
                    v-model="formMain.certificateType"
                    placeholder="请选择"
                    @change="replenish"
                  >
                    <el-option
                      v-for="(item,index) in typeId"
                      :key="index"
                      :label="item.codeName"
                      :value="item.codeId"
                    >
                    </el-option>
                  </el-select>
              </el-form-item>
              <el-form-item label="证件号码：" label-width="200px" prop="certificateNum" :rules="[{validator: onlyNumberValidate1, trigger: 'blur'}]">
                  <el-input v-model="formMain.certificateNum" maxlength="128"  placeholder="请输入证件号码,最多输入128字符"></el-input>
              </el-form-item>
              <el-form-item label="账号：" label-width="200px" prop="accountNum" :rules="[{validator: onlyNumberValidate, trigger: 'blur'}]">
                  <el-input v-model="formMain.accountNum" maxlength="30"  placeholder="请输入账号,最多输入30字符"></el-input>
              </el-form-item>
              <el-form-item label="开户行：" label-width="200px" prop="openBank" :rules="[{validator: isValidInput, trigger: 'blur'}]">
                  <el-input v-model="formMain.openBank" maxlength="50"  placeholder="请输入开户行,最多输入50字符"></el-input>
              </el-form-item>
                 <el-form-item label="负责分析的分支行：" label-width="200px" prop="branchBank" :rules="[{required: true, message: '分支行不能为空', trigger: 'change'}]">
                  <el-select
                    filterable
                    v-model="formMain.branchBank"
                    clearable
                    placeholder="请选择"
                    @change="replenish"
                  >
                    <el-option
                      v-for="(item,index) in sjjg"
                      :key="index"
                      :label="item.codeName"
                      :value="item.codeId"
                    >
                    </el-option>
                  </el-select>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit('formMain')">确 定</el-button>
            </span>
        </el-dialog>
    </el-form>
    
    <div
      v-if="isRelease"
      style="width:100%;"
    >
      <strong>联合分析结果</strong>
      <el-row>
        <el-col :span="24">
          <el-table
            :data="analysisResult"
            style="width: 100%"
          >
            <el-table-column
              label="上传机构"
              min-width="260"
            >
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.extend2 }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="分析结果"
              min-width="260"
            >
              <template slot-scope="scope">
                <span
                  @click="downResult(scope)"
                  style="margin-left: 10px;color:blue;cursor:pointer;"
                >{{ scope.row.attachName }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="联系人"
              min-width="260"
            >
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.extend1 }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              min-width="260"
              v-if="isState"
            >
              <template slot-scope="scope">
                <!-- <span @click="downResult(scope)" style="margin-left: 10px;color:blue;cursor:pointer;">{{ scope.row.attachName }}</span> -->
                <el-button
                :disabled="($route.query.type === '已结束')"
                  @click="deleteFile(scope)"
                  type="text"
                >删除</el-button>
              </template>
            </el-table-column>
            <!-- <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>-->
          </el-table>             
        </el-col>
      </el-row>
      <el-form
        label-width="160px"
        style="margin-top:20px;"
        v-if="isState"
      >
        <el-row>
          <el-col
            :span="6"
            v-if="isHidden"
          >
            <el-form-item label="上传机构：">
              <el-input
                disabled
                maxlength="20"
                v-model="name"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="联系人："
              prop="upContact"
              :rules="[{validator: isValidInput, trigger: 'blur'}]"
            >
              <el-input
                maxlength="20"
                v-model="form.upContact"
                placeholder="请先填写联系人,最多输入20字符"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="上传分析结果：">
              <el-upload
                :disabled="jszt"
                class="upload-demo"
                :file-list="fielAll"
                :action="updataUrl1"
                :before-upload="beforeAvatarUpload"
                :on-success="upSuccess1"
                :on-remove="handleRemove"
              >
                <el-button
                :disabled="jszt"
                  size="small"
                  type="primary"
                  plain
                >点击上传</el-button>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-table
        :data="analysisResultAll"
        style="width: 100%"
        v-if="isResultList"
      >
        <el-table-column
          label="汇总机构"
          min-width="260"
        >
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.extend2 }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="汇总结果"
          min-width="260"
        >
          <template slot-scope="scope">
            <span
              @click="downResult(scope)"
              style="margin-left: 10px;color:blue;cursor:pointer;"
            >{{ scope.row.attachName }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="联系人"
          min-width="260"
        >
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.extend1 }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          min-width="260"
          v-if="isState"
        >
          <template slot-scope="scope">
            <!-- <span @click="downResult(scope)" style="margin-left: 10px;color:blue;cursor:pointer;">{{ scope.row.attachName }}</span> -->
            <el-button
            :disabled="($route.query.type === '已结束')"
              @click="deleteFile1(scope)"
              type="text"
            >删除</el-button>
          </template>
        </el-table-column>
        <!-- <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>-->
      </el-table>
      <el-form
        label-width="160px"
        style="margin-top:20px;"
        v-if="isResult"
      >
        <el-row>
          <el-col
            :span="8"
            v-if="isHidden"
          >
            <el-form-item label="汇总机构：">
              <el-input
                disabled
                maxlength="20"
                v-model="name"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="联系人："
              prop="upContact1"
              :rules="[{validator: isValidInput, trigger: 'blur'}]"
            >
              <el-input
                maxlength="20"
                v-model="form.upContact1"
                placeholder="请先填写联系人,最多输入20字符"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="上传分析结果：">
              <el-upload
              
                class="upload-demo"
                :action="updataUrl4"
                :before-upload="beforeAvatarUpload1"
                :on-success="upSuccessAll"
                :file-list="fielAll1"
                :on-remove="handleRemove"
                :disabled="!isState||jszt"
              >
                <el-button
                  size="small"
                  type="primary"
                  plain
                  :disabled="!isState||jszt"
                >点击上传</el-button>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <div
      v-if="showBottom"
      style="textAlign:center;margin-top:20px;"
    >
      <!-- <el-button type="primary" plain>重新发布</el-button> -->
      <!-- <router-link :to="{name:'conjointAnalysis_list'}">
        <el-button type="primary" plain @click="submitChange">结束分析</el-button>
      </router-link>-->
      <el-button
        type="primary"
        plain
        v-if="isDisplay"
        @click="submitChange"
        :loading="loading"
      >保存</el-button>
      <el-button
        type="primary"
        plain
        @click="finished1()"
        v-if="isShow"
      >结束分析</el-button>
      <el-button
        type="primary"
        plain
        v-if="isHide"
        @click="judgeSubmit()"
        :loading="loading"
      >提交审核</el-button>
      <!-- <el-button
        type="primary"
        plain
        v-if="isHide"
        v-show="!isName"
        @click="judgeSubmit()"
        :loading="loading"
      >提交审核</el-button> -->
      
        <el-button style="margin-left:20px;" type="primary" @click="goback">返回</el-button>
    </div>

    <div
      v-if="!showBottom"
      style="textAlign:center"
    >
      <el-button
        type="primary"
        @click="dialog.dialogVisible=true"
      >操 作</el-button>
      <router-link
        :to="{name:'conjointAnalysis_list'}"
        style="margin-left:20px"
      >
        <el-button>返 回</el-button>
      </router-link>
    </div>

    <!-- 弹窗 -->
    <el-dialog
      title="任务提交"
      :visible.sync="dialog.dialogVisible"
      width="600px"
      class="dialog-block"
      @close="publishFn"
    >
      <el-form label-width="100px">
        <el-form-item label="任务流向：">
          <el-radio
            v-model="dialog.radio"
            label="1"
          >发 布</el-radio>
          <el-radio
            v-model="dialog.radio"
            label="2"
          >退 回</el-radio>
        </el-form-item>
        <el-form-item label="意见：">
          <el-input
            v-model="dialog.advice"
            type="textarea"
            placeholder
          ></el-input>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialog.dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="dialog.dialogVisible = false"
        >确 定</el-button>
      </div>
    </el-dialog>
    <monitor-workflow></monitor-workflow>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { getToken } from '@/utils/auth'
import {
  centerInsert,
  approvalStaus,
  judgmentResultDisplay,
  canEdit,
  canEdit1
} from '@/api/sys-monitoringAnalysis/conjointAnalysis/index.js'
import {
  branch,
  getDetail,
  delAttach,
  delAttachRseout,
  modification,
  finish
} from '@/api/sys-monitoringAnalysis/conjointAnalysis/list.js'
import { newBranch, canEdit4 } from '@/api/sys-monitoringAnalysis/conjointAnalysis/index.js'
import { common_Validate, commonPattern, spaceBarAndSpecial } from '@/utils/formValidate'
import { dictionary } from '@/api/sys-monitoringAnalysis/roster-warning/common.js'
export default {
  props: {
    showBottom: Boolean
  },
  data() {
    return {
      formMain: {
        accountNum: '',
        branchBank: '',
        branchBankName: '',
        certificateNum: '',
        certificateType: '',
        certificateTypeName: '',
        name: '',
        openBank: ''
      },
      sjjg: [],
      check: null,
      checkIndex: 0,
      allShow: false,
      editVisible: false,
      isEdit3: false,
      jszt: false,
      idx: -1,
      num: 0,
      isMore: false,
      temporaryData: [],
      isEdit: true,
      isEdit1: true,
      upFile: true,
      isResult: false,
      isResultList: false,
      isHidden: false,
      loading: false,
      dialogJudgmentData: [],
      isReplenishOne: false,
      isReplenishTwo: false,
      bc: 'jointAnalysis:query:save',
      fb: 'jointAnalysis:query:release',
      jsfx: 'jointAnalysis:query:finishAnalysis',
      js: 'jointAnalysis:query:operatorrelease',
      isDisplay: false,
      isHide: false,
      token: getToken(),
      isShow: true,
      isRelease: false,
      analysisResult: [],
      analysisResultAll: [],
      fielAll: [],
      fielAll1: [],
      mainFileList: [],
      fileList: [],
      delUrl: '',
      form: {
        supplementOne: '',
        supplementTwo: '',
        initJudge: [],
        jointAnalysisName: '', // 联合分析名称：
        startTime: '',
        region: '',
        endTime: '',
        jointId: '',
        riid: '',
        accountDoList: [], // 主体信息
        mainDoList: [], // 账户信息
        organDoList: [],
        preJudmentDoList: [],
        contact: '',
        desc: '',
        preliminaryJudgmeStr: '',
        tableData: [],
        upContact: '',
        upContact1: ''
      },
      rules: {
        // jointAnalysisName: [{ required: true, validator: isValidInput, trigger: 'blur' }],
        jointAnalysisName: [{ required: true, validator: common_Validate, trigger: 'blur' }],
        supplementOne: [{ required: true, validator: common_Validate, trigger: 'blur' }],
        supplementTwo: [{ required: true, validator: common_Validate, trigger: 'blur' }],
        // startTime: [{ required: true, message: '开始日期不能为空', trigger: 'blur' }],
        organDoList: [
          { type: 'array', required: true, message: '至少选择一个涉及分支机构', trigger: 'change' }
        ],
        // preJudmentDoList: [
        //   { type: 'array', required: true, message: '至少选择一个犯罪类型', trigger: 'change' }
        // ],
        contact: [{ required: true, validator: spaceBarAndSpecial, trigger: 'blur' }],
        tableData: {
          name: [{ required: true, message: '主体名称不能为空', trigger: 'blur' }]
        }
      },
      state: '',
      isState: true,
      urldata: '',
      organDoListData: [],
      url: '',
      typeId: [],
      index: 0,
      ref: {
        jointId: '',
        createUserId: ''
      },
      dialog: {
        dialogVisible: false,
        radio: '1',
        advice: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'businessFlag',
      'workFlow2business',
      'userInfo',
      'institution',
      'permissions_routers',
      'user_name',
      'name'
    ]),
    checkTrue() {
      this.check = true
      this.checkIndex = 0
      const arr = []
      if (this.form.tableData.length > 0 && this.sjjg.length > 0) {
        this.sjjg.forEach(el => {
          arr.push(el.codeName)
        })
        this.form.tableData.forEach(el => {
          if (arr.indexOf(el.branchBankName) === -1) {
            this.check = false
          }
        })
      }

      return this.check
    },
    isCenter() {
      return this.institution === this.GLOBAL.INSTITUTION_CENTER
    },
    isBranch() {
      return this.institution === this.GLOBAL.INSTITUTION_BRANCH
    },
    updataUrl1() {
      return `monitor/joint-analysis/upAttachResult?jointId=${this.urldata}&token=${
        this.token
      }&contact=${this.form.upContact}&uploadOrg=${this.user_name}`
    },
    updataUrl4() {
      return `monitor/joint-analysis/upAttachSummaryResult?jointId=${this.urldata}&token=${
        this.token
      }&contact=${this.form.upContact1}&uploadOrg=${this.user_name}`
    },
    updataUrl2() {
      return `monitor/joint-analysis/upAttach?token=${this.token}&jointId=${this.urldata}`
    },
    updataUrl3() {
      return `monitor/joint-analysis/upFile?token=${this.token}`
    },
    newForm() {
      this.getPreliminaryJudgmeStr()
      const arr = []
      const arry = this.form.organDoList
      arry.forEach(item => {
        const object = {}
        object.organId = item
        arr.push(object)
      })
      // this.form.organDoList = arr
      const obj = Object.assign({}, this.form)
      obj.organDoList = arr
      obj.mainDoList = this.form.tableData // 获取的数据
      return obj
    }
  },
  methods: {
    // 分支行只能选择所选涉及机构
    jgChange() {
      this.sjjg = []
      this.form.organDoList.forEach(el => {
        this.organDoListData.forEach(item => {
          if (el === item.codeId) {
            this.sjjg.push(item)
          }
        })
      })
    },
    goback() {
      if (JSON.parse(sessionStorage.getItem('conjointAnalysis'))) {
        const obj = JSON.parse(sessionStorage.getItem('conjointAnalysis'))
        obj.ifReview = true
        sessionStorage.setItem('conjointAnalysis', JSON.stringify(obj))
      }
      this.$router.go(-1)
    },
    downAccount() {
      window.location.href = 'monitor/joint-analysis/output?token=' + this.token + '&jointId=' + this.form.jointId
    },
    timeCheck(rule, value, callback) {
      if (this.form.startTime && value) {
        const time1 = new Date(this.form.startTime)
        const time2 = new Date(value)
        if (time1 > time2) {
          callback(new Error('结束时间必须大于开始时间'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    },
    timeCheckStart(rule, value, callback) {
      if (this.form.endTime) {
        const time1 = new Date(this.form.endTime)
        const time2 = new Date(value)
        if (time1 < time2) {
          callback(new Error('结束时间必须大于开始时间'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    },
    delItem(index) {
      this.$confirm('确定要删除选中的数据 ?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.form.tableData.splice(index, 1)
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        })
        .catch(() => {})
    },
    // 删除分析结果
    deleteFile(scope) {
      const index = scope.$index
      const url = 'monitor/joint-analysis/delAttach/' + scope.row.attachId
      delAttachRseout('', url).then(res => {
        this.analysisResult.splice(index, 1)
        this.$message({
          message: '删除分析结果成功',
          type: 'success'
        })
      })
    },
    // 删除汇总结果
    deleteFile1(scope) {
      const index = scope.$index
      const url = 'monitor/joint-analysis/delAttach/' + scope.row.attachId
      delAttachRseout('', url).then(res => {
        this.analysisResultAll.splice(index, 1)
        this.$message({
          message: '删除汇总结果成功',
          type: 'success'
        })
      })
    },
    downResult(file) {
      location.href = '/file-service/upload/download/' + file.row.attachId + '?moduleName=' + encodeURI('联合分析')
    },
    // 下载模板
    download() {
      window.location.href = 'monitor/joint-analysis/download?token=' + this.token
    },
    // 下载附件
    downFile(file) {
      // window.location.href = '/file-service/joint-analysis/download?token=' + this.token + '&fileId=' + file.id
      // window.location.href = '/file-service/upload/download?fileId=' + file.id + '&token=' + this.token
      location.href = '/file-service/upload/download/' + file.id + '?moduleName=' + encodeURI('联合分析')
    },
    // 判断涉罪类型是否显示补充
    replenish() {
      if (this.form.preJudmentDoList.indexOf('1402') !== -1) {
        this.isReplenishTwo = true
      } else {
        this.isReplenishTwo = false
      }
      if (this.form.preJudmentDoList.indexOf('1401') !== -1) {
        this.isReplenishOne = true
      } else {
        this.isReplenishOne = false
      }
    },
    // 获取涉罪类型
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
    // 数字检查
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
    // 证件
    onlyNumberValidate1(rule, value, callback) {
      if (value !== null && value !== '' && value !== undefined) {
        if (
          this.formMain.certificateType ===
            '110003' ||
          this.formMain.certificateType ===
            '110001'
        ) {
          if (commonPattern.headerAndFooter.test(value)) {
            callback(new Error('首尾不能有空格'))
          } else if (value.length !== 15 && value.length !== 18) {
            callback(new Error('身份证件格式标准为15及18位'))
          } else if (commonPattern.specialChar.test(value) || commonPattern.specialEng.test(value)) {
            callback(new Error('内容不能填写特殊字符'))
          } else {
            callback()
          }
        } else {
          if (value.length <= 5 || value.length >= 129) {
            callback(new Error('内容应在6-128位之间'))
          } else if (commonPattern.headerAndFooter.test(value)) {
            callback(new Error('首尾不能有空格'))
          } else {
            callback()
          }
        }
      } else {
        callback()
      }
    },
    // 涉罪类型数据类型转换拼接
    getPreliminaryJudgmeStr() {
      const arr = []
      this.form.preJudmentDoList.forEach(el => {
        const obj = {}
        if (el === '1401') {
          el = '1401-' + this.form.supplementOne
          obj.preliminaryJudgme = el
          arr.push(obj)
        } else if (el === '1402') {
          el = '1402-' + this.form.supplementTwo
          obj.preliminaryJudgme = el
          arr.push(obj)
        } else {
          obj.preliminaryJudgme = el
          arr.push(obj)
        }
      })
      this.form.preJudmentDoList = arr
    },
    isValidInput(rule, value, callback) {
      if (!commonPattern.spaceBar.test(value)) {
        callback(new Error('内容不能含有空格'))
      } else if (commonPattern.specialChar.test(value)) {
        callback(new Error('内容不能填写特殊字符'))
      } else {
        callback()
      }
    },
    delDataValidInput(rule, value, callback) {
      if (commonPattern.headerAndFooter.test(value)) {
        callback(new Error('首尾不能有空格'))
      } else {
        callback()
      }
    },
    // 上传文件提示
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length +
          fileList.length} 个文件，如要更换上传文件，请先删除已上传的文件。`
      )
    },
    beforeAvatarUpload3(file) {
      const isLt2M = file.size / 1024 / 1024 < 100
      if (!isLt2M) {
        this.$message({
          message: '上传文件大小不能超过 100MB!',
          type: 'warning'
        })
      }
      return isLt2M
    },
    beforeAvatarUpload2(file) {
      var testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
      const extension = testmsg === 'xls'
      const extension2 = testmsg === 'xlsx'
      const isLt2M = file.size / 1024 / 1024 < 10
      if (!extension && !extension2) {
        this.$message({
          message: '上传文件只能是 xls、xlsx格式!',
          type: 'warning'
        })
      }
      if (!isLt2M) {
        this.$message({
          message: '上传文件大小不能超过 10MB!',
          type: 'warning'
        })
      }
      return isLt2M
    },
    // 新增保存
    saveEdit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const object = this.typeId.find(item => item.codeId === this.formMain.certificateType)
          this.formMain.certificateTypeName = object ? object.codeName : ''
          this.organDoListData.forEach(el => {
            if (el.codeId === this.formMain.branchBank) {
              this.formMain.branchBankName = el.codeName
              return
            }
          })
          const obj = Object.assign({}, this.formMain)
          if (this.isEdit3) {
            this.$set(this.form.tableData, this.idx, obj)
            this.$message.success(`编辑主体账户信息第 ${this.idx + 1} 行成功`)
            this.isEdit3 = false
          } else {
            this.form.tableData.unshift(obj)
          }
          this.editVisible = false
        } else {
          return false
        }
      })
    },
    // 添加一条主体账户信息
    addSingle() {
      this.editVisible = true
      this.$refs.formMain.clearValidate()
      this.$refs.formMain.resetFields()
      this.formMain = {
        accountNum: '',
        branchBank: '',
        branchBankName: '',
        certificateNum: '',
        certificateType: '',
        certificateTypeName: '',
        name: '',
        openBank: ''
      }
    },

    // 修改一条主体账户信息
    editItem(index, item) {
      this.index = 0
      this.editVisible = true
      this.isEdit3 = true
      this.idx = index
      this.formMain = {
        accountNum: item.accountNum,
        branchBank: item.branchBank,
        branchBankName: item.branchBankName,
        certificateNum: item.certificateNum,
        certificateType: item.certificateType,
        certificateTypeName: item.certificateTypeName,
        name: item.name,
        openBank: item.openBank
      }
      this.sjjg.forEach(el => {
        if (this.formMain.branchBank === el.codeId) {
          this.index++
        }
      })
      if (this.index > 0) {
        return
      } else {
        this.formMain.branchBank = ''
      }
    },
    // // 判断是中心用户还是分支机构用户
    // judge() {
    //   if (this.isCenter) {
    //     this.isShow = true
    //   } else {
    //     this.isShow = false
    //   }
    // },
    judgeSubmit() {
      if (this.checkTrue) {
        if (this.isCenter) {
          if (this.permissions_routers.indexOf(this.js) !== -1) {
            this.centerInsert()
          } else {
            this.callWorkFlow()
          }
        } else {
          this.callWorkFlow()
        }
      } else {
        this.$message({
          message: '主体账户所在的分支机构需在涉及分支机构内',
          type: 'error'
        })
      }
    },
    // 调取工作流
    callWorkFlow() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.$store.dispatch('workFlow', { configCode: 'jointAnalysis' })
          this.$store.dispatch('openWorkFlow', true)
        } else {
          return false
        }
      })
    },
    nextStep() {
      // this.getPreliminaryJudgmeStr()
      // const arry = this.form.organDoList
      // if (arry.length > 0) {
      //   arry.forEach(item => {
      //     const obj = { organId: item.organId }
      //     arr.push(obj)
      //   })
      // }
      // this.form.organDoList = arr
      this.loading = true
      approvalStaus(this.newForm, this.workFlow2business)
        .then(res => {
          if (res.code === 200) {
            this.loading = false
            this.$message({
              type: 'success',
              message: res.message
            })
            this.$router.push({ name: 'conjointAnalysis_list' })
          } else {
            this.loading = false
            this.$confirm(res.message, '提示', {
              confirmButtonText: '确定',
              showCancelButton: false,
              type: 'warning'
            })
          }
        })
        .catch(() => {
          this.loading = false
        })
    },
    publishFn() {
      this.$router.push({ name: 'conjointAnalysis_list' })
    },
    // 中心机构直接发布
    centerInsert() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.loading = true
          centerInsert(this.newForm)
            .then(res => {
              this.loading = false
              // alert(res.code)
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          return false
        }
      })
    },
    // 选择文件
    handleSuccess(res, file) {
      if (res.code === 200) {
        this.form.tableData = this.form.tableData.concat(res.data.mainDoList)
        this.$forceUpdate()
        this.$message({
          message: '上传成功！',
          type: 'success'
        })
      } else {
        this.$message({
          message: res.message,
          type: 'error'
        })
        this.mainFileList.splice(this.fileList1.length - 1, 1)
      }
    },

    // 上传文件
    upSuccess(res, file) {
      if (res.code === 200) {
        this.form.jointId = res.data.noteId
        this.urldata = this.form.jointId
        this.$message({
          message: '上传成功！',
          type: 'success'
        })
      } else {
        this.$message({
          message: res.message,
          type: 'error'
        })
        this.fileList = []
        // this.form.upContact1 = ''
      }
    },
    // 上传文件
    upSuccess1(res, file) {
      if (res.code === 200) {
        // this.form.jointId = res.data.noteId
        this.urldata = this.form.jointId
        this.analysisResultAll = []
        this.analysisResult = []
        res.data.forEach(el => {
          if (el.extend3 === '3') {
            this.analysisResultAll.push(el)
          }
          if (el.extend3 === '2') {
            this.analysisResult.push(el)
          }
        })
        this.$message({
          message: '上传成功！',
          type: 'success'
        })
      } else {
        this.$message({
          message: res.message,
          type: 'error'
        })
      }
      this.fielAll = []
      this.form.upContact = ''
    },
    // 上传文件
    upSuccessAll(res, file) {
      if (res.code === 200) {
        // this.form.jointId = res.data.noteId
        this.urldata = this.form.jointId
        this.analysisResultAll = []
        this.analysisResult = []
        res.data.forEach(el => {
          if (el.extend3 === '3') {
            this.analysisResultAll.push(el)
          }
          if (el.extend3 === '2') {
            this.analysisResult.push(el)
          }
        })
        this.$message({
          message: '上传成功！',
          type: 'success'
        })
      } else {
        this.$message({
          message: res.message,
          type: 'error'
        })
      }
      this.form.upContact1 = ''
      this.fielAll1 = []
    },
    finished1() {
      this.finished('', this.form.jointId)
    },
    // 结束分析
    finished(params, jointId) {
      finish(params, jointId).then(res => {
        if (res.code === 200) {
          this.$router.push({ name: 'conjointAnalysis_list' })
        }
      })
    },
    // 修改联合分析
    submitChange() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.checkTrue !== false) {
            this.loading = true
            modification(this.newForm)
              .then(res => {
                if (res.code === 200) {
                  this.loading = false
                  this.$router.push({ name: 'conjointAnalysis_list' })
                } else {
                  this.loading = false
                }
              })
              .catch(() => {
                this.loading = false
              })
          } else {
            this.$message({
              message: '主体账户所在的分支机构需在涉及分支机构内',
              type: 'error'
            })
          }
        } else {
          return false
        }
      })
    },
    // 删除附件
    handleRemove(file, fileList) {
      if (file && file.status === 'success') {
        if (file.response) {
          this.delUrl = 'file-service/upload/delete-attach/' + file.response.data.attachId
        } else if (file.id) {
          this.delUrl = 'file-service/upload/delete-attach/' + file.id
        }
        delAttach('', this.delUrl).then(res => {
          this.$message({
            message: '删除附件成功',
            type: 'success'
          })
        })
      }
      // this.delUrl = 'file-service/upload/delete-attach/' + file.id
    },
    // 上传之前
    beforeAvatarUpload(file) {
      if (!this.form.upContact) {
        this.$message({
          message: '请先填写联系人',
          type: 'warning'
        })
        return false
      }
      const isLt2M = file.size / 1024 / 1024 < 500
      if (!isLt2M) {
        this.$message({
          message: '上传文件大小不能超过 500MB!',
          type: 'warning'
        })
      }
      return isLt2M
    },
    beforeAvatarUpload1(file) {
      if (!this.form.upContact1) {
        this.$message({
          message: '请先填写联系人',
          type: 'warning'
        })
        return false
      }
      const isLt2M = file.size / 1024 / 1024 < 500
      if (!isLt2M) {
        this.$message({
          message: '上传文件大小不能超过 500MB!',
          type: 'warning'
        })
      }
      return isLt2M
    },
    // 获取分支机构
    getBranch() {
      branch({ typeId: 'FZJGD' }).then(res => {
        if (res.code === 200) {
          this.organDoListData = res.data.list
        }
      })
    },
    // 获取证件类型
    getTypeId() {
      newBranch('SFZJ').then(res => {
        if (res.code === 200) {
          this.typeId = res.data
        }
      })
    },
    getRef() {
      this.ref.jointId = this.$route.query.id
      this.ref.createUserId = this.$route.query.createUserId
      this.url = 'joint-analysis/' + this.ref.jointId
    },
    // 表单回显
    initDetail(params, url) {
      this.loading = true
      getDetail(params, url).then(res => {
        if (res.code === 200) {
          for (var key in res.data) {
            this.form[key] = res.data[key]
          }
          if (this.permissions_routers.indexOf(this.bc) !== -1) {
            this.isDisplay = true
          } else {
            this.isDisplay = false
          }
          if (this.permissions_routers.indexOf(this.jsfx) !== -1) {
            this.isShow = true
          } else {
            this.isShow = false
          }
          if (this.permissions_routers.indexOf(this.fb) !== -1) {
            this.isHide = true
          } else {
            this.isHide = false
          }
          this.state = res.data.state
          if (this.state === '2') {
            this.allShow = true
            judgmentResultDisplay(this.ref).then(response => {
              console.log(response)
            // if (response.code === 200) {
            // }
            })
            canEdit(this.ref).then(response => {
              if (response.code === 200) {
                this.isEdit = response.data
                this.isResultList = response.data
                this.isResult = response.data
                this.isShow = response.data
              }
            })
            canEdit1().then(response => {
              if (response.code === 200) {
                this.upFile = response.data
                this.isDisplay = response.data
              }
            })
            this.isRelease = true
            this.isHide = false
          } else if (this.state === '0') {
            this.upFile = true
            this.isEdit = false
            this.isEdit1 = false
            this.isShow = false
            this.isDisplay = true
            this.isHide = true
          } else if (this.state === '1') {
            this.upFile = false
            this.isShow = false
            this.isDisplay = false
            this.isHide = false
          } else if (this.state === '3') {
            this.isShow = false
            this.isDisplay = false
            this.isHide = false
          } else if (this.state === '5') {
            this.jszt = true
            canEdit(this.ref).then(response => {
              if (response.code === 200) {
                this.isResult = response.data
                this.isState = response.data
              }
            })
            this.upFile = false
            this.isResultList = true
            this.isRelease = true
            this.isShow = false
            this.isDisplay = false
            this.isHide = false
          } else {
            this.isShow = false
            this.isDisplay = false
            this.isHide = false
          }
          canEdit4().then(res => {
            if (res.code === 200) {
              if (res.data === true) {
                this.isResult = false
                this.upFile = false
                this.isResultList = true
                this.isRelease = true
                this.isShow = false
                this.isDisplay = false
                this.isHide = false
                this.isState = false
              }
            }
          })
          this.form.startTime = res.data.startTime
          // this.analysisResult = res.data.attachDoListResult
          res.data.attachDoListResult.forEach(el => {
            if (el.extend3 === '3') {
              this.analysisResultAll.push(el)
            }
            if (el.extend3 === '2') {
              this.analysisResult.push(el)
            }
          })
          this.form.tableData = res.data.mainDoList
          this.urldata = this.form.jointId
          if (res.data.attachDoList != null) {
            res.data.attachDoList.forEach(el => {
              var obj = {}
              obj.name = el.attachName
              obj.id = el.attachId
              this.fileList.push(obj)
            })
          }
          const Judment = []
          res.data.preJudmentDoList.forEach(item => {
            if (item.preliminaryJudgme.indexOf('1401') !== -1) {
              const tempArr = item.preliminaryJudgme.split('-')
              this.form.supplementOne = tempArr[1]
              Judment.push('1401')
              this.isReplenishOne = true
            } else if (item.preliminaryJudgme.indexOf('1402') !== -1) {
              const tempArr = item.preliminaryJudgme.split('-')
              this.form.supplementTwo = tempArr[1]
              Judment.push('1402')
              this.isReplenishTwo = true
            } else {
              Judment.push(item.preliminaryJudgme)
            }
          })
          this.form.preJudmentDoList = Judment
          const arr = []
          const arry = res.data.organDoList

          if (arry.length > 0) {
            arry.forEach(item => {
              arr.push(item.organId)
            })
          }
          this.form.organDoList = arr
          this.form.organDoList.forEach(el => {
            this.organDoListData.forEach(item => {
              if (el === item.codeId) {
                this.sjjg.push(item)
              }
            })
          })
          this.$nextTick(function() {
            this.loading = false
          })
        } else {
          this.loading = false
        }
      }).catch(() => {
        this.loading = false
      })
    }
  },
  created() {
    this.getRef()
    this.getBranch()
    this.initDetail('', this.url)
    this.getTypeId()
  },

  watch: {
    businessFlag(val) {
      if (val) this.nextStep()
      this.$store.dispatch('changeFlag', false)
    }
  },
  // form: {
  //   handler(newValue, oldValue) {},
  //   deep: true
  // }

  mounted() {
    this.getDictionary('TOSC')
    // this.initDetail('', this.url)
  }
}
</script>

<style lang="scss">
.conjointAnalysis-creator {
  .formBlock {
    margin-bottom: 20px;
    .el-select {
      width: 100%;
    }
  }
}
.el-table thead tr th {
  padding: 8px 0;
}
.el-table .el-table__row td {
  height: 62px;
  padding: 14px 0 0 0;
  .cell {
    height: 100%;
    .el-form-item {
      margin-bottom: 0;
    }
  }
}
.start-end {
  .start {
    width: 400px;
    display: inline-block;
  }
  .end {
    display: inline-block;
    width: 400px;
  }
}
</style>
