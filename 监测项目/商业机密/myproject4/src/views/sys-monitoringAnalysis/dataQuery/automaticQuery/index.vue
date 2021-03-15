<template>
  <div class="automaticQuery">
    <el-card>
      <div slot="header" class="clearfix">
        <span style="lineHeight:32px">批量自动查询</span>
        <div v-if="subjectFlag" style="float:right">
          <span class="tip"> * 请先下载文件模板</span>
          <el-button type="text" icon="el-icon-download" @click="handleDownloadModel">模板下载</el-button>
        </div>
      </div>
      <el-form
        :model="form"
        ref="form"
        :rules="rules">
        <div class="titleContainer">
          <!-- 文件上传 -->
          <el-row v-if="subjectFlag" class="fileUpload">
            <el-col :span="20" :offset="2" style="position: relative;">
              <el-form-item prop="attachList" :rules="{required:true,type:'array',message:'请选择文件',trigger:'change'}">
                <el-upload class="upload-demo" ref="upload" accept=".xlsx,.xls" action="#" drag :on-change="onChange" :auto-upload="false" :file-list="form.attachList">
                  <i class="el-icon-upload"></i>
                  <div class="el-upload__text">
                    <em>将要读取查询文件拖到此处</em>，或点击上传
                  </div>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-row>
           <el-row v-if="subjectParams">
            <el-form :model="subParamsForm" ref="subParams" label-width="160px">
              <el-row>
                <el-col :span="8">
                  <el-form-item label="主体类型：" prop="subType" :rules="[{required:true, message: '此项不能为空', trigger: 'change' }]">
                    <el-input style="width:100%" v-if="!subParamsForm.subName || !subParamsForm.subNumber" v-model="subParamsForm.subType" disabled placeholder maxlength="128"></el-input>
                    <el-select v-else v-model="subParamsForm.subType" style="width:100%" clearable placeholder="请选择">
                      <el-option label="个人" value="个人"></el-option>
                      <el-option label="机构" value="机构"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="主体名称：" prop="subName">
                    <el-input v-model="subParamsForm.subName" disabled maxlength="128"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="证件号码：" prop="subNumber">
                    <el-input v-model="subParamsForm.subNumber" disabled placeholder maxlength="128"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="账户号码：" prop="accountNumber">
                    <el-input v-model="subParamsForm.accountNumber" disabled placeholder maxlength="64"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-row>
          <div v-if="subjectArrForm" style="width:100%;">     
            <span style="margin-right:40px">交易主体列表</span>
            <el-form :model="subjectArrForm" ref="subTable" label-width="160px">
              <el-table :data="subjectArrForm.subjectArrParams" style="width:100%;">
                <el-table-column label="主体类型" min-width="300">
                  <template slot-scope="scope">
                    <el-form-item :prop="'subjectArrParams.'+scope.$index+'.subType'" :rules="[{required:true, message: '此项不能为空', trigger: 'change' }]">
                      <el-input v-if="!scope.row.subName || !scope.row.subNumber" v-model="scope.row.subType" disabled placeholder maxlength="128"></el-input>
                      <el-select v-else v-model="scope.row.subType" clearable placeholder="请选择" filterable>
                        <el-option label="个人" value="个人"></el-option>
                        <el-option label="机构" value="机构"></el-option>
                      </el-select>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column label="主体名称" prop='subName' min-width="300"></el-table-column>
                <el-table-column label="证件号码" prop='subNumber' min-width="300"></el-table-column>
                <el-table-column label="账户号码" prop='accountNumber' min-width="300"></el-table-column>
              </el-table>
            </el-form>
          </div>
          <div style="margin-bottom: 10px;">高级查询:<span style="color: #f56c6c; font-size: 12px; margin-left: 10px;">提示：只查询银行大额、可疑表</span></div>
          <el-row :gutter="22">
            <el-col :span="8">
              <el-form-item  label="选择查询模板：" label-width="140px" prop="maxUlimit">
                <el-select v-model="form.maxUlimit" placeholder="请选择" @change="handleTemplate" clearable @clear="handleClear">
                  <el-option v-for="item in tplOptions" :label="item.qttName" :value="item.pkQtt" :key="item.pkQtt"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="限定查询主体最大交易笔数： "
                label-width="200px"
                prop="maxNum">
                <el-input
                  v-model="form.maxNum"
                  placeholder="最大长度为20位" maxLength="20"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="交易时间段："
                prop="tradeTime"
                label-width="110px"
              >
                <el-date-picker
                  v-model="form.tradeTime"
                  class="itme-block"
                  type="daterange"
                  placeholder="开始日期"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>

          <!-- 查询条件 -->
          <el-row>
            <el-col :span="7">
              <el-form-item label="附加查询选项：" label-width="140px" prop="autCounterparty" inline>
                <el-checkbox label="是否生成交易对手" v-model="form.autCounterparty"></el-checkbox>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="" label-width="0px" prop="accountList" inline>  
                <el-checkbox label="是否生成账户信息" v-model="form.accountList"></el-checkbox>
              </el-form-item> 
            </el-col>
                <!-- <el-checkbox label="是否进行扩展分析" v-model="form.autExtension"></el-checkbox> -->
                <!--二期上此功能-->
            <el-col :span="4">
              <el-form-item label="" label-width="0px" prop="autStatistical" inline>
                <el-checkbox label="是否生成统计信息" v-model="form.autStatistical"></el-checkbox>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="" label-width="0px" prop="autIdentity" inline>
                <el-checkbox label="是否生成身份信息" v-model="form.autIdentity"></el-checkbox>
              </el-form-item>
            </el-col>
          </el-row>
          <el-collapse v-if="isTemplateShow" style="margin-bottom: 10px;">
            <el-collapse-item
              :title="tplName + '查询模板:'"
              name="1">
              <temp :tplId="tplId"></temp>
            </el-collapse-item>
          </el-collapse>

          <!-- 查询按钮 -->
          <el-row class="btnContainer">
            <el-col :span="24" style="textAlign:right">
              <el-button v-if="subjectFlag" type="primary" @click="handleSave('form')" :loading="loading">保存</el-button>
               <el-button v-if="!subjectFlag" type="primary" @click="handleQueryBySubject()" :loading="loading">保 存</el-button>
              <el-button type="primary" plain @click="resetForm">清 空</el-button>
            </el-col>
          </el-row>
        </div>
        <!-- 任务列表 -->
        <div class="taskList">
          <el-row style="marginBottom:10px">
            <span>任务列表</span> 
            <el-button type="primary" plain @click="delAll" style="margin-left: 10px;">批量删除</el-button>
          </el-row>
          <div>
            <el-table :data="list" @selection-change="handleSelectionChange" v-loading="listLoading" element-loading-text="正在保存任务，请稍候……" element-loading-background="rgba(0, 0, 0, 0.1)">
              <!-- v-loading.body="listLoading" element-loading-text="加载中...." element-loading-spinner="el-icon-loading" -->
              <el-table-column label="全选" type="selection" width="60" fixed :selectable="checkSelectable"></el-table-column>
              <el-table-column label="序号" type="index" width="60" fixed></el-table-column>
              <el-table-column label="任务提交人" prop="autCreUserName" min-width="100"> </el-table-column>
              <el-table-column label="任务提交时间" prop="autCreDate" min-width="140"> </el-table-column>
              <el-table-column label="文件名称" prop="autName" min-width="160">
                <template slot-scope="scope">
                  <el-tooltip class="item" effect="dark" placement="top-start">
                    <div slot="content">{{ scope.row.autName}}</div>
                    <span>{{ scope.row.autName }}</span>
                  </el-tooltip>
                </template>
              </el-table-column>
              <el-table-column label="任务完成时间" prop="autComTime" min-width="160"> </el-table-column>
              <el-table-column label="任务状态" prop="autStatus" min-width="100"></el-table-column>
              <el-table-column label="任务进度" min-width="100">
                <template slot-scope="scope">
                  <el-progress :percentage="parseInt(scope.row.speedOfProgress * 100)"></el-progress>
                </template>
              </el-table-column>
              <el-table-column label="操作" min-width="280" fixed="right"> 
                <template slot-scope="scope">
                  <el-button type="text" @click="handleQuery(scope)" :disabled="getDisabled(scope)" :loading="scope.row.loading">查询</el-button>
                  <el-button type="text" @click="handleDownloadFile(scope)" v-if="scope.row.autStatus === '已完成'" :disabled="scope.row.delFlag === 1">下载结果</el-button>
                  <el-button type="text" @click="handleView(scope)" v-if="scope.row.siThereAny" :disabled="scope.row.autApproval !== 0">查看敏感信息</el-button>
                  <el-button type="text" @click="handleSendFtp(scope)" v-if="Boolean(scope.row.bidentity)">发送FTP</el-button>
                  <el-button type="text" @click="handleDownloadInfo(scope)" v-if="Boolean(scope.row.carryOut)">下载身份信息</el-button>
                  <el-button type="text" @click="delRow(scope)" :disabled="(scope.row.speedOfProgress !== 1 && !scope.row.trigger) || scope.row.delFlag === 1 || scope.row.siThereAny || scope.row.autStatus === '未开始' || scope.row.autStatus === '进行中'">删除</el-button> 
                  <!-- <el-button type="text" @click="handlePause(scope)" v-if="scope.row.runStatus"
                    :disabled="Boolean(scope.row.autStatus === '已完成')">暂停</el-button> -->
                  <!-- <el-button type="text" @click="handleStart(scope)" v-if="!scope.row.runStatus"
                    :disabled="scope.row.autStatus === '已完成'">继续</el-button> -->
                </template>
              </el-table-column>
            </el-table>
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
              background :current-page="pageInfo.pageNum" :page-size="pageInfo.pageSize"
              :page-sizes="[10, 20, 30, 40,50]" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
          </div>
        </div>
      </el-form>

      <el-dialog title="敏感信息" :visible.sync="infoDialogvisible">
        <div>
          <div>
            <span>敏感任务列表</span>
            <el-button
              type="primary"
              v-if="isShow"
              plain
              style="marginLeft:30px"
              @click="addPersonData"
            >添 加</el-button>
          </div>
          <el-table :data="personList">
            <el-table-column
              label="序号"
              type="index"
              width="60px"
            ></el-table-column>
            <el-table-column
              label="主体名称"
              prop="subName"
            >
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.subName"
                  v-if="scope.row.isView"
                ></el-input>
                <span v-if="!scope.row.isView">{{scope.row.subName}}</span>
              </template>
            </el-table-column>
            <el-table-column label="证件类型" prop="subType">
              <template slot-scope="scope">
                <el-select v-model="scope.row.subType" v-if="scope.row.isView">
                  <el-option label="机构" value="机构"></el-option>
                  <el-option label="个人" value="个人"></el-option>
                </el-select>
                <el-select v-model="scope.row.subType" v-if="!scope.row.isView" disabled>
                  <el-option label="机构" value="机构"></el-option>
                  <el-option label="个人" value="个人"></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column
              label="证件号码"
              prop="subNumber"
            >
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.subNumber"
                  v-if="scope.row.isView"
                ></el-input>
                <span v-if="!scope.row.isView">{{scope.row.subNumber}}</span>
              </template>
            </el-table-column>
            <el-table-column label="原因" prop="subDetailed">
              <template slot-scope="scope">
                <el-input v-model="scope.row.subDetailed" v-if="scope.row.isView"></el-input>
                <span v-if="!scope.row.isView">{{scope.row.subDetailed}}</span>
              </template>
            </el-table-column>
            <el-table-column label="审批状态" prop="subApproval">
              <template slot-scope="scope">
                <span>{{scope.row.subApproval}}</span>
                <!-- <el-select v-model="scope.row.subType" v-if="!scope.row.isView" disabled>
                  <el-option label="机构" value="机构"></el-option>
                  <el-option label="个人" value="个人"></el-option>
                </el-select> -->
              </template>
              
            </el-table-column>
            <el-table-column label="操作" v-if="isShow" prop="delProp">
              <template slot-scope="scope">
                <el-button type="text" v-if="scope.row.pkSub" disabled>删除</el-button>
                <el-button type="text" @click="delPersonRow(scope)" v-if="!scope.row.pkSub" :disabled="Boolean(false)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            background
            :current-page="sPageInfo.pageNum"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="sPageInfo.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="sTotal"
          ></el-pagination>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="infoDialogvisible = false">取消</el-button>
          <el-button type="primary" @click="callWorkFlow" v-if="isShow || isSubmitBtn === 0 || scope.row.subApproval !== 2">提交审批</el-button>
        </span>
      </el-dialog>

      <monitor-workflow></monitor-workflow>
    </el-card>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getToken } from '@/utils/auth'
import Temp from '@/views/sys-monitoringAnalysis/dataQuery/templateManage/components/temp'
import { getTplList, downLoadResult } from '@/api/sys-monitoringAnalysis/dataQuery/dataType'
import {
  maximumData,
  getList,
  getListFor,
  delData,
  getTask,
  getAddData,
  getPersonList,
  delPersonInfo,
  startProgress,
  pauseProgress,
  getProgress,
  approvalStaus,
  updatePersonList,
  sendFtp,
  addQuery
} from '@/api/sys-monitoringAnalysis/dataQuery/automaticQuery'
import { onlyNumberValidate } from '@/utils/formValidate.js'

export default {
  components: {
    Temp
  },
  data() {
    const isValidNumTwe = (rule, value, callback) => {
      if (value > 99999999999999999999) {
        callback(new Error('最多输入20位'))
        return
      } else {
        callback()
      }
    }
    return {
      loading: false,
      listLoading: false,
      timer: null,
      tplName: '', // 模板名称
      tplId: '',
      excelData: [],
      isDel: '',
      subjects: {
        subName: '',
        subNumber: '',
        accountNumber: '',
        subType: '',
        subTagging: '',
        type: '',
        subDetailed: ''
      },
      tplOptions: [],
      isTemplateShow: false, // 是否显示模板
      infoDialogvisible: false, // 弹框
      customResultvisible: false, // 定制结果弹窗
      multipleSelection: [],
      // isView: false, // 判断table
      form: {
        maxUlimit: '',
        maxNum: 1000000,
        autCounterparty: true, // 是否生成交易对手
        // autExtension: false, // 是否进行扩展分析
        accountList: true,
        tradeTime: [],
        autStatistical: true, // 是否生成统计信息
        // isExceedNumberOfPens: false,
        autIdentity: false,
        generate: false,
        attachList: [] // 上传的附件列表
      },
      rules: {
        maxNum: [
          { validator: onlyNumberValidate, trigger: 'blur' },
          { validator: isValidNumTwe, trigger: 'blur' }
        ],
        maxUlimit: [
          {
            required: true,
            message: '内容不能为空',
            trigger: 'change'
          }
        ]
      },
      // pageLoading: false,
      list: [],
      total: 0,
      pageInfo: {
        pageNum: 1,
        pageSize: 10
      },
      personList: [],
      sPageInfo: {
        pageSize: 10,
        pageNum: 1
      },
      sTotal: 1,
      personId: '',
      percent: '',
      autoMaticJson: {},
      isShow: false,
      isSuccess: false,
      isRun: true,
      disabled: true,
      pressId: [],
      timeOut: null, // 定时器
      isSubmitBtn: 0, // 判断是否显示提交审批按钮。
      firstTime: true, // 是否是第一次调用
      timeFlag: false, // 时间是否到10s
      token: getToken(),
      subjectFlag: true,
      subParamsForm: {},
      subjectTemplate: '交易主体模板'
    }
  },
  computed: {
    ...mapGetters(['roles', 'businessFlag', 'workFlow2business']),
    subjectParams() {
      if (this.$route.query.subject) {
        this.subjectFlag = false
        this.subParamsForm = this.$route.query.subject[0]
      }
      return this.$route.query.subject
    },
    subjectArrForm() {
      var obj = {}
      if (this.$route.query.subjectArr) {
        this.subjectFlag = false
        obj.subjectArrParams = this.$route.query.subjectArr
        return obj
      }
    }
  },
  watch: {
    businessFlag(val) {
      if (val) {
        this.nextStep()
      } else {
        this.getList()
      }
    }
  },
  mounted() {
    this.getData()
    this.getList()
  },
  methods: {
    checkSelectable(row) {
      return row.delFlag === 0
    },
    getDisabled(scope) {
      if (scope.row) {
        if (scope.row.autStatus === '已完成' || scope.row.autStatus === '未开始') {
          return false
        } else if (!(scope.row.autStatus === '已完成' || scope.row.autStatus === '未开始')) {
          return true
        } else if (scope.row.siThereAny && scope.row.autApproval === 2) {
          return false
        } else if (!(scope.row.siThereAny && scope.row.autApproval === 2)) {
          return true
        }
      }
    },
    callWorkFlow() {
      if (this.personList.length !== 0) {
        this.infoDialogvisible = false
        setTimeout(() => {
          this.$store.dispatch('workFlow', { configCode: 'sensitivePersons' })
          this.$store.dispatch('openWorkFlow', true)
        }, 500)
      } else {
        // updatalist为空，addList为空
        this.$confirm('请添加敏感人物信息', '提示', { showCancelButton: false, type: 'warning' })
          .then(() => {
            // 向请求服务端删除
          })
          .catch(() => {})
      }
    },
    getData() {
      getTplList()
        .then(res => {
          // 获取模板下拉列表
          if (res.code === 200) {
            this.tplOptions = res.data.list
          }
        })
        .catch()
    },
    getList() {
      getList(this.pageInfo)
        .then(res => {
          // 批量自动任务列表
          if (res.code === 200) {
            this.list = res.data.list
            this.total = res.data.total
            res.data.list.forEach((item, index) => {
              if (item.autStatus !== null) {
                const autStatus = item.autStatus
                switch (autStatus) {
                  case 0:
                    item.autStatus = '未开始'
                    break
                  case 1:
                    item.autStatus = '进行中'
                    break
                  case 2:
                    item.autStatus = '已完成'
                    break
                  case 3:
                    item.autStatus = '等待中'
                    break
                }
              }
            })
          }
        })
        .catch(() => {
        })
    },
    getSendList(scope) { // 获取是否显示下载的轮训
      getListFor(this.pageInfo)
        .then(res => {
          // 批量自动任务列表
          if (res.code === 200) {
            this.list = res.data.list
            this.total = res.data.total
            res.data.list.forEach((item, index) => {
              if (item.autStatus !== null) {
                const autStatus = item.autStatus
                switch (autStatus) {
                  case 0:
                    item.autStatus = '未开始'
                    break
                  case 1:
                    item.autStatus = '进行中'
                    break
                  case 2:
                    item.autStatus = '已完成'
                    break
                  case 3:
                    item.autStatus = '等待中'
                    break
                }
              }
            })
            if (!scope.row.carryOut) {
              const _this = this
              this.timer = setTimeout(() => {
                _this.getSendList(scope)
              }, 5000)
            } else {
              this.timer = ''
              this.clearTimeout(this.timer)
            }
          }
        })
        .catch(() => {
        })
    },
    getRollList(autoMaticId, scope) { // 轮询进度条列表
      getList(this.pageInfo)
        .then(res => {
          // 批量自动任务列表
          if (res.code === 200) {
            this.list = res.data.list
            this.total = res.data.total
            res.data.list.forEach((item, index) => {
              if (item.autStatus !== null) {
                const autStatus = item.autStatus
                switch (autStatus) {
                  case 0:
                    item.autStatus = '未开始'
                    break
                  case 1:
                    item.autStatus = '进行中'
                    break
                  case 2:
                    item.autStatus = '已完成'
                    break
                  case 3:
                    item.autStatus = '等待中'
                    break
                }
              }
            })

            const ids = autoMaticId
            if (this.timeOut) {
              this.list[scope.$index].loading = false
              this.list[scope.$index + 1].loading = false
              clearTimeout(this.timeOut)
            }
            this.getProgressPercent(ids, scope)
          } else {
            this.list[scope.$index].loading = false
            this.list[scope.$index + 1].loading = false
          }
        })
        .catch(() => {
          this.list[scope.$index].loading = false
          this.list[scope.$index + 1].loading = false
        })
    },
    handleSave(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          this.form.attachList.forEach((item, index) => {
            this.elBeforeUpload(index) // 上传文件
          })
          this.pageInfo.pageNum = 1
          this.loading = true
          this.listLoading = true
          this.getList()
        } else {
          return false
        }
      })
    },
    onChange(file, fileList) {
      this.form.attachList = fileList
      // const isName = this.isFileNameSame(this.form.attachList)
      // if (isName) {
      //   this.$confirm('上传的文件名称不能重复', '提示', {
      //     confirmButtonText: '确 定',
      //     showCancelButton: false,
      //     type: 'warning'
      //   })
      //     .then(() => {
      //       this.form.attachList.splice(this.form.attachList.length - 1, 1)
      //     })
      //     .catch()
      // }
      if (fileList.length > 1) {
        this.$message({
          message: '最多可添加一个文件',
          type: 'warning'
        })
        setTimeout(() => {
          this.form.attachList.splice(this.form.attachList.length - 1, 1)
        }, 500)
      }
    },
    handleQuery(scope) {
      var obj = Object.assign([], this.list)
      obj[scope.$index].loading = true
      this.list = obj
      let autoMaticId = ''
      if (scope.row.trigger) {
        autoMaticId = scope.row.pkAut
        this.getTaskData(scope.row.generate, autoMaticId, scope)
      } else {
        autoMaticId = scope.row.pkAut
        maximumData(autoMaticId).then(res => {
          if (res.code === 200) {
            this.loading = false
            this.listLoading = false
            if (res.data !== null) {
              if (Boolean(res.data.result) === false) {
                // '超出'
                this.$confirm(res.message, '提示', {
                  confirmButtonText: '是',
                  cancelButtonText: '否',
                  type: 'warning'
                })
                  .then(() => {
                    this.form.generate = true
                    const generate = true
                    // const autoMaticId = scope.row.pkAut
                    this.getTaskData(generate, autoMaticId, scope)
                    this.$message({
                      showClose: true,
                      duration: 6000,
                      message: '继续查询!',
                      type: 'success'
                    })
                  })
                  .catch(() => {
                    this.form.generate = false
                    const generate = false
                    // const autoMaticId = scope.row.pkAut
                    this.getTaskData(generate, autoMaticId, scope)
                  })
              } else {
                this.form.generate = true
                const generate = true
                // const autoMaticId = scope.row.pkAut
                this.getTaskData(generate, autoMaticId, scope)
              }
            } else {
              obj[scope.$index].loading = false
              this.$set(this.list, [], obj)
              this.$confirm(res.message, '提示', {
                showCancelButton: false,
                type: 'error'
              }).then()
                .catch()
            }
          } else {
            obj[scope.$index].loading = false
            this.$set(this.list, [], obj)
          }
        }).catch(() => {
          obj[scope.$index].loading = false
          this.$set(this.list, [], obj)
        })
      }
    },
    getTaskData(generate, autoMaticId, scope) {
      this.timeOut = null
      // this.pageLoading = true
      getTask(generate, autoMaticId).then(res => {
        if (res.code === 200) {
          if (scope.row.trigger) {
            const id = res.data.pkAut
            this.getRollList(id, scope)
          } else {
            this.getRollList(autoMaticId, scope)
          }
        } else {
          // this.list[scope.$index].loading = false
          this.list[scope.$index].loading = false
        }
      }).catch(() => {
        // this.list[scope.$index].loading = false
        this.list[scope.$index].loading = false
      })
    },
    isFileNameSame(arr) {
      const hash = {}
      for (const i in arr) {
        if (hash[arr[i].name]) {
          return true
        }
        hash[arr[i].name] = true
      }
      return false
    },

    elBeforeUpload(index, file) {
      this.getAutoMaticJson(index, file)
    },
    getAutoMaticJson(index, file) {
      this.autoMaticJson = {
        transTemplateId: this.form.maxUlimit,
        autCounterparty: this.form.autCounterparty,
        // autExtension: this.form.autExtension,
        accountList: this.form.accountList,
        autStatistical: this.form.autStatistical,
        // isExceedNumberOfPens: this.form.isExceedNumberOfPens,
        autIdentity: this.form.autIdentity,
        // generate: this.form.generate,
        maximum: this.form.maxNum,
        tradeDateStart: (this.form.tradeTime !== null && this.form.tradeTime.length > 0) ? this.form.tradeTime[0] : '',
        tradeDateEnd: (this.form.tradeTime !== null && this.form.tradeTime.length > 0) ? this.form.tradeTime[1] : ''
      }
      const fd = new FormData()
      // if (this.form.tradeTime !== null && this.form.tradeTime.length > 0) {
      //   fd.append('tradeDateStart', this.form.tradeTime[0])
      //   fd.append('tradeDateEnd', this.form.tradeTime[1])
      // } else {
      //   fd.append('tradeDateStart', null)
      //   fd.append('tradeDateEnd', null)
      // }
      // fd.append('file', file)
      // this.attachList.forEach((item, index) => {
      fd.append('file', this.form.attachList[index].raw)
      // })
      fd.append('autoMaticJson', JSON.stringify(this.autoMaticJson))
      getAddData(fd).then(res => {
        if (res.code === 200) {
          // this.$confirm('查询出有敏感人物，请查看！', '提示', {
          //   showCancelButton: false,
          //   type: 'info'
          // }).then()
          //   .catch()
          this.loading = false
          this.listLoading = false
          this.$message({
            type: 'success',
            message: '保存成功！',
            duration: 6000,
            showClose: true
          })
          setTimeout(() => {
            this.getList()
          }, 10)
        } else {
          this.loading = false
          this.listLoading = false
        }
        // if (res.code === 200) {
        //   this.getRollList() // lunxun
        // }
      }).catch(() => {
        this.loading = false
        this.listLoading = false
      })
    },
    nextStep() {
      this.getList()
      this.getUpdataPersonData()
    },
    getApprovalData() {
      // 审批
      const arr = []
      this.personList.map(item => {
        if (!item.pkSub) {
          arr.push(item)
        }
      })
      const paramsObj = {
        id: this.personId,
        workflow: this.workFlow2business,
        subjects: arr
      }
      approvalStaus(paramsObj)
        .then(res => {
          // 敏感人物新增接口
          if (res.code === 200) {
            this.$message({
              showClose: true,
              duration: 6000,
              message: '提交成功!',
              type: 'success'
            })
            this.$store.dispatch('changeFlag', false)
          } else {
            this.$confirm('提交失败！', '提示', {
              showCancelButton: false,
              type: 'error'
            }).then()
              .catch()
          }
        })
        .catch(() => {
        })
    },
    getUpdataPersonData() {
      // 更新敏感人物接口
      const list = []
      this.personList.map(item => {
        switch (item.subApproval) {
          case '未审批':
            item.subApproval = 0
            break
          case '审批中':
            item.subApproval = 1
            break
          case '审批通过':
            item.subApproval = 2
            break
          default:
            break
        }
        const obj = {
          pkSub: item.pkSub ? item.pkSub : '', // 主键
          subDetailed: item.subDetailed, // 原因
          fkAut01: item.subNumber, // 证件号码
          subName: item.subName, // 主体名称
          subType: item.subType, // 身份证件类型
          subApproval: item.subApproval
        }
        list.push(obj)
      })

      updatePersonList(list)
        .then(res => {
          // 敏感人物更新列表接口
          if (res.code === 200) {
            this.getApprovalData()
          }
        })
        .catch()
    },
    handleSizeChange(val) {
      this.pageInfo.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.pageInfo.pageNum = val
      this.getList()
    },
    getProgressPercent(ids, scope) {
      // 进度条
      if (ids) {
        getProgress(ids)
          .then(res => {
            if (res.code === 200) {
              this.percent = res.data
              this.isRun = true
              this.pressId = []

              for (var key in this.percent) {
                const val = this.percent[key]
                this.list.map(item2 => {
                  if (key === item2.pkAut) {
                    if (item2.speedOfProgress < 1) {
                      item2.speedOfProgress = val
                      this.pressId.push(key)
                      this.isRun = false
                    } else {
                      if (this.list.length > 0) {
                        if (this.list[0].bidentity) {
                          this.$confirm('有主体在本地未查询到身份信息，若需要继续查询，可以点击发送ftp，向外部委专线进行查询！', '提示', {
                            showCancelButton: false,
                            type: 'warning'
                          }).then()
                            .catch()
                        }
                      }
                    }
                  }
                })
              }
              this.getList()

              if (this.isRun === false) {
                const _this = this
                this.timeOut = setTimeout(() => {
                  this.pressId = this.pressId.toString()
                  _this.getProgressPercent(this.pressId, scope)
                }, 3000)
              } else {
                this.timeOut = ''
                // this.list[scope.$index].loading = false
                this.list[scope.$index].loading = false
                // this.pageLoading = false
                // if (this.list.length > 0) {
                //   if (this.list[0].bidentity) {
                //     this.$confirm('有主体在本地未查询到身份信息，若需要继续查询，可以点击发送ftp，向外部委专线进行查询！', '提示', {
                //       showCancelButton: false,
                //       type: 'warning'
                //     }).then()
                //       .catch()
                //   }
                // }
              }
            } else {
              this.list[scope.$index].loading = false
              // this.list[scope.$index].loading = false
            }
          })
          .catch(() => {
            this.list[scope.$index].loading = false
            // this.list[scope.$index + 1].loading = false
          })
      }
    },
    delRow(scope) {
      this.$confirm('此操作将删除该任务中已保存在服务器上的查询结果，确定操作吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const ids = scope.row.pkAut
          delData(ids)
            .then(res => {
              if (res.code === 200) {
                this.isDel = res.data
                this.getList()
                this.$message({
                  showClose: true,
                  duration: 6000,
                  message: '删除成功!',
                  type: 'success'
                })
              } else {
                this.$confirm('删除失败！', '提示', {
                  showCancelButton: false,
                  type: 'error'
                }).then()
                  .catch()
              }
            })
            .catch(() => {
            })
        })
        .catch(() => {})
    },
    handleStart(scope) {
      // 继续任务接口因后台进程稍微比较慢点，所以调完接口给后台预留几秒时间
      this.startProgress(scope)
      this.timeFlag = false
      setTimeout(() => {
        this.timeFlag = true
      }, 10000)
    },
    startProgress(scope) { // 继续接口
      const autoMaticId = scope.row.pkAut
      startProgress(autoMaticId)
        .then(res => {
          if (res.code === 200) {
            scope.row.runStatus = true
            this.getRollList()
            this.$message({
              showClose: true,
              duration: 6000,
              message: res.message,
              type: 'success'
            })
          } else {
            this.$confirm(res.message, '提示', {
              showCancelButton: false,
              type: 'error'
            }).then()
              .catch()
          }
        })
        .catch(() => {
        })
    },
    handlePause(scope) {
      // 暂停任务接口因后台进程稍微比较慢点，所以调完接口给后台预留几秒时间
      if (this.firstTime) {
        setTimeout(() => {
          this.timeFlag = true
        }, 10000)
        this.stopProgress(scope)
        this.firstTime = false
        return
      }
      if (this.timeFlag) {
        this.stopProgress(scope)
        this.timeFlag = false
        setTimeout(() => {
          this.timeFlag = true
        }, 10000)
      }
    },
    stopProgress(scope) {
      const autoMaticId = scope.row.pkAut
      pauseProgress(autoMaticId)
        .then(res => {
          if (res.code === 200) {
            scope.row.runStatus = false
            this.getRollList()
            this.$message({
              showClose: true,
              duration: 6000,
              message: res.message,
              type: 'success'
            })
          } else {
            this.$confirm(res.message, '提示', {
              showCancelButton: false,
              type: 'error'
            }).then()
              .catch()
          }
        })
        .catch(() => {
        })
    },
    delPersonRow(scope) {
      this.$confirm('确定要删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const pkSub = scope.row.pkSub
          delPersonInfo(pkSub)
            .then(res => {
              if (res.code === 200) {
                getPersonList(this.personId, this.sPageInfo)
                  .then(res => {
                    if (res.code === 200) {
                      this.personList = res.data.list
                      this.tempPersonList = res.data.list // 暂存后台返现的list
                      this.sTotal = res.data.total
                      this.personList.map(v => {
                        // 整行
                        this.$set(v, 'isView', false)
                      })
                    }
                  })
                  .catch(() => {})

                this.$message({
                  showClose: true,
                  duration: 6000,
                  message: '删除成功!',
                  type: 'success'
                })
              }
            })
            .catch(() => {})
        })
        .catch(() => {})
    },
    delAll() {
      // 批量删除
      const length = this.multipleSelection.length
      if (length === 0) {
        this.$confirm('请至少选择一条数据', '提示', { showCancelButton: false, type: 'warning' })
          .then(() => {
            // 向请求服务端删除
          })
          .catch(() => {})
      } else {
        this.$confirm('此操作将会删除选中任务中已保存在服务器上的查询结果，确定操作吗？', '提示', { type: 'warning' })
          .then(() => {
            // 向请求服务端删除
            const arr = []
            this.multipleSelection
              .map(function(item) {
                arr.push(item.pkAut)
              })
            console.log('arr', arr)
            // const ids = arr.join('&ids=')
            delData(arr)
              .then(res => {
                if (res.code === 200) {
                  this.isDel = res.data
                  console.log('this.isDel', this.isDel)
                  this.getList()
                  this.$message({
                    showClose: true,
                    duration: 6000,
                    message: '删除成功!',
                    type: 'success'
                  })
                } else {
                  this.$confirm('删除失败！', '提示', {
                    showCancelButton: false,
                    type: 'error'
                  }).then()
                    .catch()
                }
              })
              .catch(() => {
              })
          })
          .catch(() => {})
      }
    },
    handleDownloadFile(scope) {
      // 下载
      const autoMaticId = scope.row.pkAut
      if (!autoMaticId) {
        this.$confirm('下载失败！', '提示', {
          showCancelButton: false,
          type: 'error'
        }).then()
          .catch()
      } else {
        downLoadResult(autoMaticId).then(res => {
          console.log(res)
          if (res.code === 200 && res.data === true) {
            this.$message({
              showClose: true,
              duration: 6000,
              message: res.message,
              type: 'error'
            })
          } else {
            location.href = '/monitor/automatic/download/file?autoMaticId=' +
              autoMaticId +
              '&token=' +
              this.token
          }
          // if (autoMaticId) {
          //   location.href = '/monitor/automatic/download/file?autoMaticId=' +
          //     autoMaticId +
          //     '&token=' +
          //     this.token
          // } else {
          //   this.$confirm('下载失败！', '提示', {
          //     showCancelButton: false,
          //     type: 'error'
          //   }).then()
          //     .catch()
          // }
        })
      }
    },
    handleDownloadInfo(scope) {
      // 下载身份信息
      const autoMaticId = scope.row.pkAut
      if (autoMaticId) {
        location.href = '/monitor/automatic/identity/download/file?autoMaticId=' +
          autoMaticId +
          '&token=' +
          this.token
      } else {
        this.$confirm('下载失败！', '提示', {
          showCancelButton: false,
          type: 'error'
        }).then()
          .catch()
      }
    },
    handleSendFtp(scope) {
      const autId = scope.row.pkAut
      sendFtp(autId)
        .then(res => {
          if (res.code === 200) {
            this.$message({
              showClose: true,
              duration: 6000,
              message: '发送FTP成功！',
              type: 'success'
            })
            this.getSendList(scope)
          } else {
            this.$confirm(res.message, '提示', {
              showCancelButton: false,
              type: 'error'
            }).then()
              .catch()
          }
        })
        .catch(() => {
        })
    },
    allDownloadFile() {
      const arr = []
      this.multipleSelection
        .map(function(item) {
          arr.push(item.pkAut)
        })
        .toString()
      const autoMaticId = arr.join('&autoMaticId=')
      location.href = '/monitor/automatic/download/file?autoMaticId=' + autoMaticId
    },
    handleView(scope) {
      // 查看敏感人物信息
      this.personId = scope.row.pkAut
      this.isSubmitBtn = Number(scope.row.autApproval)
      getPersonList(this.personId, this.sPageInfo)
        .then(res => {
          if (res.code === 200) {
            this.personList = res.data.list
            this.sTotal = res.data.total
            this.infoDialogvisible = true
            res.data.list.forEach(item => {
              switch (item.subApproval) {
                case 0:
                  item.subApproval = '未审批'
                  break
                case 1:
                  item.subApproval = '审批中'
                  break
                case 2:
                  item.subApproval = '审批通过'
                  break
                default:
                  break
              }
            })
          } else {
            this.$confirm(res.message, '提示', {
              showCancelButton: false,
              type: 'error'
            }).then()
              .catch()
          }
        })
        .catch(() => {
        })

      if (scope.row.speedOfProgress != null) {
        if (scope.row.speedOfProgress === 0) {
          this.isShow = true
        } else {
          this.isShow = false
        }
      }
    },
    addPersonData() {
      // 单条添加敏感人物表格
      const pList = {
        subName: '',
        subType: '',
        subNumber: '',
        isView: true,
        delProp: '删除'
      }
      this.personList.push(pList)
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    resetForm() {
      // 重置清空操作
      this.$refs.form.resetFields()
      this.form.attachList = []
      this.isTemplateShow = false
    },
    handleTemplate(val) {
      this.tplOptions.find(item => {
        if (item.pkQtt === val) {
          this.tplName = item.qttName
          if (this.tplName) {
            this.tplId = val
            this.isTemplateShow = true
          }
        }
      })
    },
    handleClear() {
      this.tplId = ''
    },
    handleDownloadModel() {
      // 下载模板
      location.href = '/monitor/automatic/downloadFile?token=' + this.token
    },
    handleQueryBySubject(form) {
      var paramsType = false
      var tableType = false
      if (this.$refs.subParams) {
        this.$refs.subParams.validate(valid => {
          if (valid) {
            paramsType = true
          }
        })
      }
      if (this.$refs.subTable) {
        this.$refs.subTable.validate(valid => {
          if (valid) {
            tableType = true
          }
        })
      }
      if (paramsType || tableType) {
        this.$refs.form.validate(valid => {
          if (valid) {
            const obj = {}
            obj.autoMaticJson = JSON.stringify({
              maximum: this.form.maxNum,
              autCounterparty: this.form.autCounterparty,
              accountList: this.form.accountList,
              autStatistical: this.form.autStatistical,
              // isExceedNumberOfPens: this.form.isExceedNumberOfPens,
              autIdentity: this.form.autIdentity,
              transTemplateId: this.form.maxUlimit
            })
            obj.subjectsWarn = JSON.parse(JSON.stringify(this.subjectParams || this.subjectArrForm.subjectArrParams))
            obj.subjectsWarn.forEach((res, index) => {
              if (res.accountNumber && res.accountNumber.indexOf(',') !== -1) {
                var accountArr = res.accountNumber.split(',')
                accountArr.forEach(item => {
                  obj.subjectsWarn.push({
                    accountNumber: item,
                    subName: res.subName,
                    subNumber: res.subNumber,
                    subType: res.subType
                  })
                })
                obj.subjectsWarn.splice(index, 1)
              }
            })
            obj.subjectsWarn = JSON.stringify(obj.subjectsWarn)
            addQuery(obj).then(res => {
              if (res.code === 200) {
                this.loading = false
                this.listLoading = false
                this.$message({
                  type: 'success',
                  message: '保存成功！',
                  duration: 6000,
                  showClose: true
                })
                setTimeout(() => {
                  this.getList()
                }, 10)
              } else {
                this.loading = false
                this.listLoading = false
              }
            }).catch(() => {
              this.loading = false
              this.listLoading = false
            })
          }
        })
      }
    }
  },
  beforeDestroy() {
    clearTimeout(this.timeOut)
    clearTimeout(this.timer)
  }
}
</script>

<style lang="scss">
@mixin margin($m: 20px) {
  margin-bottom: $m;
}
.automaticQuery {
  .item { // 表格加省略号
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .el-upload {
    width: 100%;
    .el-upload-dragger {
      width: 100%;
    }
    
  }
  .tip {
    font-size: 12px;
      color: red;
  }
  .titleContainer {
    @include margin();
    .fileUpload {
      @include margin();
    }
  }
  .personList {
    @include margin(30px);
  }
  .taskList {
    .el-table {
      .el-input__inner {
        width: 88px;
      }
    }
  }
  .btnmargin {
    margin-top: 10px;
  }
  // .btnhandle {
  //   margin-bottom: 10px;
  //   .el-button--small, .el-button--small.is-round {
  //     padding: 6px 8px;
  //   }
  // }
  .other {
    .el-checkbox {
      width: 130px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    & .el-checkbox:nth-child(6n + 1) {
      margin-left: 0;
    }
  }
}
</style>
