<template>
  <div class="conjointAnalysisAdd">
    <el-card class="box-card">
      <div
        slot="header"
        class="clearfix"
      >
        <span>{{publicName}}</span>
      </div>
      <el-form
        style="width: 90%; margin: 0 auto"
        ref="form"
        :rules="rules"
        :disabled="disForm"
        :model="form"
        label-width="200px"
      >
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item
            label="协查名称："
            prop="assistName"
            class="itme-block"
          >
            <el-input
              validate-event
              maxlength="100"
              :disabled="isUpdate"
              v-model="form.assistName"
              placeholder="请输入协查名称，最多输入100字符"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="来函单位："
            prop="receDept"
            class="itme-block"
          >
            <el-input
              validate-event
              maxlength="100"
              :disabled="isUpdate"
              v-model="form.receDept"
              placeholder="请输入来函单位，最多输入100字符"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item
            label="文号："
            prop="assistNum"
            class="itme-block"
          >
            <el-input
              validate-event
              maxlength="100"
              :disabled="isUpdate"
              v-model="form.assistNum"
              placeholder="请输入文号，最多输入100字符"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="接收时间："
            prop="receDate"
          >
            <el-date-picker
              v-model="form.receDate"
              class="itme-block"
              type="date"
              :disabled="isUpdate"
              placeholder="开始日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="涉罪类型：" prop="jubType" >
            <el-select style="width:100%" v-model="form.jubType" clearable placeholder="请选择" multiple >
              <el-option  v-for="item in sheZui" :key="item.codeId" :label="item.codeName" :value="item.codeId"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item
            label="查询依据："
            prop="queryDepend"
            class="itme-block"
          >
            <el-input
              validate-event
              maxlength="200"
              :disabled="isUpdate"
              type="textarea"
              v-model="form.queryDepend"
              placeholder="请输入查询依据，最多输入200字符"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item
            label="基本案情："
            prop="baseCase"
            class="itme-block"
          >
            <el-input
              validate-event
              maxlength="200"
              :disabled="isUpdate"
              type="textarea"
              v-model="form.baseCase"
              placeholder="请输入基本案情，最多输入200字符"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item
            label="交易时间段："
            prop="tradeTime"
          >
            <el-date-picker
              v-model="form.tradeTime"
              class="itme-block"
              type="daterange"
              :disabled="isUpdate"
              placeholder="开始日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item
            label="分支行经办人1："
            prop="handlerOne"
            class="itme-block"
          >
            <el-input
              validate-event
              maxlength="100"
              :disabled="isUpdate"
              v-model="form.handlerOne"
              placeholder="请输入分支行经办人1，最多输入100字符"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="分支行经办人2："
            prop="handlerTwo"
            class="itme-block"
          >
            <el-input
              validate-event
              maxlength="100"
              :disabled="isUpdate"
              v-model="form.handlerTwo"
              placeholder="请输入分支行经办人2，最多输入100字符"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col>
          <el-form-item
            label="部门负责人审批意见："
            prop="deptOpinion"
            class="itme-block"
          >
            <el-input
              validate-event
              type="textarea"
              :rows="3"
              maxlength="500"
              :disabled="isUpdate"
              v-model="form.deptOpinion"
              placeholder="请输入部门负责人审批意见，最多输入500字符"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item required label="附件(查询主体信息或账号)">
          <div>
            <el-upload
              :limit="1"
              :on-exceed="handleExceed"
              :beforeUpload="beforeAvatarUpload"
              style="display: inline-block;"
              class="upload-demo"
              ref="upload"
              :on-preview="downFile"
              :disabled="isUpdate"
              :on-progress="showLoading"
              :action="updataUrl2"
              :file-list="mainFileList"
              :on-success='handleSuccess'
            >
              <el-button
              :disabled="isUpdate"
                slot="trigger"
                type="primary"
                plain
              >选取文件</el-button>
              <!-- <el-button style="margin-left: 10px;" type="success" plain>导入</el-button> -->
              <el-button
                type="primary"
                icon="el-icon-download"
                :disabled="isUpdate"
                plain
                @click="download"
              >下载查询模板</el-button>
            </el-upload>
          </div>
        </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="24">
          <el-form-item
            required
            label="协查函扫描件及其他审批文件："
            class="itme-block"
          >

            <el-upload
              class="upload-demo"
              ref="Newupload"
              :limit="5"
              :disabled="isUpdate"
              :on-exceed="handleExceed2"
              :action="updataUrl1"
              :on-success='upSuccess'
              :on-progress="showLoading"
              :before-upload="beforeAvatarUpload"
              :file-list="fileList1"
              :on-preview="downFile"
              :on-remove="handleRemove"
            >
              <el-button
              :disabled="isUpdate"
                type="primary"
                plain
              >点击上传</el-button>
              <div slot="tip" class="el-upload__tip"><span>说明：每个附件上传最大限制50M</span></div>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
      <div style="text-align: center">
          <el-button
            v-if="publicName==='发起协查'"
            :disabled="disForm"
            type="primary"
            @click="publish('form')"
            :loading="loading"
          >保存</el-button>
          <el-button
          v-if="publicName==='编辑协查结果' && !isUpdate"
          :disabled="disForm"
            type="primary"
            @click="update('form')"
            :loading="loading"
          >保存</el-button>
          <el-button
            type="primary"
            v-if="publicName==='发起协查'"
            :disabled="disForm"
            @click="newSubmit('form')"
            :loading="loading"
          >提交</el-button>
          <el-button
            type="primary"
            v-if="publicName==='编辑协查结果'"
            :disabled="disForm"
            @click="updateSubmit('form')"
            :loading="loading"
          >提交</el-button>
          <el-button
            type="primary"
            @click="$router.back(-1)"
          >返回</el-button>
        </div>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getToken } from '@/utils/auth'
import {
  branch
} from '@/api/sys-monitoringAnalysis/sendTaskInfo/index.js'
import { getSheZui, delAttach, newSave, getInfoById, updateSave, newSubmit, updateSubmit } from '@/api/sys-monitoringAnalysis/placeResultExport/index'
import { common_Validate, commonPattern, spaceBarAndSpecial } from '@/utils/formValidate'
export default {
  data() {
    return {
      pickerMinDate: '',
      pickerOptions: {

        disabledDate(time) {
          return time.receDate() < Date.now() - 8.64e7 // 禁用以前的日期，今天不禁用
          // return date.receDate() <= Date.now();    //禁用今天以及以前的日期
        }

      },
      publicName: '发起协查',
      sheZui: [], // 涉罪类型
      formMain: {
        taskName: '', // 报文名称
        orgKey: '', // 涉及分支机构
        distributesTime: '', // 分发时间
        startAnalyseTime: '', // 开始分析时间
        endAnalyseTime: '', // 结束分析时间
        taskStatus: '', // 状态
        isReport: '' // 是否需上报研判
      },
      stopTaskInfo: true,
      disForm: false,
      isUpdate: false,
      options: [{
        value: '0',
        label: '否'
      }, {
        value: '1',
        label: '是'
      }],
      sjjg: [],
      fenZHiCN: [],
      editVisible: false,
      isEdit: false,
      idx: -1,
      num: 0,
      isMore: false,
      temporaryData: [],
      check: null,
      isName: true,
      bc: 'jointAnalysis:query:operatorrelease',
      loading: false,
      isBlock: true, // 是否显示保存按钮
      permissive: true,
      fileList1: [],
      mainFileList: [],
      isReplenishOne: false,
      isReplenishTwo: false,
      dialogJudgmentData: [],
      form: {
        id: '', // 主键
        fileMainId: '', // 主体附件id
        fileExtraId: '', // 额外附件id
        assistName: '', // 协查名称：
        receDept: '', // 来函单位
        assistNum: '', // 文号
        receDate: '', // 接收时间
        jubType: '', // 涉罪类型
        queryDepend: '', // 查询依据
        baseCase: '', // 基本案情
        tradeTime: '', // 交易时间段
        handlerOne: '', // 分支行经办人1
        handlerTwo: '', // 分支行经办人2
        deptOpinion: ''
      },
      analyseIdMe: '',
      index: 0,
      checkIndex: 0,
      preliminaryJudgmeStr2: [],
      urldata: '',
      organDoListData: [],
      typeId: [],
      token: getToken(),
      rules: {
        assistName: [{ required: true, validator: common_Validate, trigger: 'blur' }],
        receDept: [{ required: true, validator: common_Validate, trigger: 'blur' }],
        handlerOne: [{ required: true, message: '内容不能为空', trigger: 'blur' }, { validator: spaceBarAndSpecial, trigger: 'blur' }],
        handlerTwo: [{ required: true, message: '内容不能为空', trigger: 'blur' }, { validator: spaceBarAndSpecial, trigger: 'blur' }],
        deptOpinion: [{ required: true, message: '内容不能为空', trigger: 'blur' }, { validator: spaceBarAndSpecial, trigger: 'blur' }],
        // startTime: [{ required: true, message: '开始日期不能为空', trigger: 'blur' }],
        organDoList: [
          { type: 'array', required: true, message: '至少选择一个涉及分支机构', trigger: 'change' }
        ],
        contact: [{ required: true, validator: common_Validate, trigger: 'blur' }],
        tableData: {
          name: [{ required: true, message: '主体名称不能为空', trigger: 'blur' }]
        }
      },
      mainRules: {
        taskName: [{ required: true, message: '报文名称不能为空', trigger: 'blur' }],
        isReport: [{ required: true, message: '请选择', trigger: 'change' }]
      }
    }
  },
  mounted() {
    this.form.id = this.getUUID()

    if (this.$route.query.status === '0') {
      // 判断这条数据的状态是不是已分发
      this.isUpdate = false
      this.disForm = false
      this.publicName = '编辑协查结果'
      this.getInfo(this.$route.query.id)
    } else if (this.$route.query.status === '1' || this.$route.query.status === '2' || this.$route.query.status === '3') {
      this.disForm = true
      this.publicName = '查看协查结果'
      this.getInfo(this.$route.query.id)
    }
    this.getSheZuiLX()
    this.isCenter1()
    this.getBranch()
  },
  computed: {
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
    newForm() {
      // this.form.organDoList = arr
      const obj = Object.assign({}, this.form)
      obj.tradeDateStart = this.form.tradeTime[0]
      obj.tradeDateEnd = this.form.tradeTime[1]
      obj.jubType = obj.jubType.join(',')
      delete obj.tradeTime
      return obj
    },
    // preliminaryJudgmeStr1() {
    //   return this.$refs.judgment.searchParams.join()
    // },
    ...mapGetters([
      'businessFlag',
      'permissions_routers',
      'workFlow2business',
      'userInfo',
      'institution'
    ]),
    isCenter() {
      return this.institution === this.GLOBAL.INSTITUTION_CENTER
    },
    isBranch() {
      return this.institution === this.GLOBAL.INSTITUTION_BRANCH
    },
    updataUrl1() {
      return `/monitor/areaAssist/upAttach?isMain=1&id=${this.form.id}&token=${this.token}`
    },
    updataUrl2() {
      return `/monitor/areaAssist/upAttach?isMain=0&id=${this.form.id}&token=${this.token}`
    }
  },
  methods: {
    // 回显
    getInfo(id) {
      getInfoById(id).then(res => {
        this.form = res.data
        this.form.jubType = this.form.jubType.split(',')
        this.form.tradeTime = []
        this.form.tradeTime.push(this.form.tradeDateStart, this.form.tradeDateEnd)
        if (res.data.mainFileInfo.length > 0) {
          res.data.mainFileInfo.forEach(el => {
            var obj = {}
            obj.name = el.attachName
            obj.id = el.attachId
            this.mainFileList.push(obj)
          })
        }
        if (res.data.extraFileInfo.length > 0) {
          res.data.extraFileInfo.forEach(el => {
            var obj = {}
            obj.name = el.attachName
            obj.id = el.attachId
            this.fileList1.push(obj)
          })
        }
      })
    },
    // 新增
    publish(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.$refs['upload'].uploadFiles.length === 0 || this.form.fileMainId === '') {
            this.$message({
              message: '附件(查询主体信息或账号)不能为空',
              showClose: true,
              duration: 6000,
              type: 'error'
            })
            return false
          }
          if (this.$refs['Newupload'].uploadFiles.length === 0) {
            this.$message({
              message: '协查函扫描件及其他审批文件不能为空',
              showClose: true,
              duration: 6000,
              type: 'error'
            })
            return false
          }
          const fileIds = []
          this.$refs['Newupload'].uploadFiles.forEach(file => {
            if (file.response !== undefined) {
              fileIds.push(file.response.data.attachId)
            } else {
              fileIds.push(file.id)
            }
          })
          this.form.fileExtraId = fileIds.join(',')
          this.loading = true
          newSave(this.newForm)
            .then(res => {
              if (res.code === 200) {
                this.$message({
                  message: '新建协查任务成功',
                  showClose: true,
                  duration: 6000,
                  type: 'success'
                })
                this.$router.push({ path: '/fenResultExport/fenResultExport' })
                this.loading = false
              } else {
                this.loading = false
              }
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          return false
        }
      })
    },
    // 新增提交
    newSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.$refs['upload'].uploadFiles.length === 0 || this.form.fileMainId === '') {
            this.$message({
              message: '附件(查询主体信息或账号)不能为空',
              showClose: true,
              duration: 6000,
              type: 'error'
            })
            return false
          }
          if (this.$refs['Newupload'].uploadFiles.length === 0) {
            this.$message({
              message: '协查函扫描件及其他审批文件不能为空',
              showClose: true,
              duration: 6000,
              type: 'error'
            })
            return false
          }
          const fileIds = []
          this.$refs['Newupload'].uploadFiles.forEach(file => {
            if (file.response !== undefined) {
              fileIds.push(file.response.data.attachId)
            } else {
              fileIds.push(file.id)
            }
          })
          this.form.fileExtraId = fileIds.join(',')
          this.loading = true
          newSubmit(this.newForm)
            .then(res => {
              if (res.code === 200) {
                this.$message({
                  message: '提交任务成功',
                  showClose: true,
                  duration: 6000,
                  type: 'success'
                })
                this.$router.push({ path: '/fenResultExport/fenResultExport' })
                this.loading = false
              } else {
                this.loading = false
              }
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          return false
        }
      })
    },
    // 编辑
    update(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.$refs['upload'].uploadFiles.length === 0 || this.form.fileMainId === '') {
            this.$message({
              message: '附件(查询主体信息或账号)不能为空',
              showClose: true,
              duration: 6000,
              type: 'error'
            })
            return false
          }
          if (this.$refs['Newupload'].uploadFiles.length === 0) {
            this.$message({
              message: '协查函扫描件及其他审批文件不能为空',
              showClose: true,
              duration: 6000,
              type: 'error'
            })
            return false
          }
          const fileIds = []
          this.$refs['Newupload'].uploadFiles.forEach(file => {
            if (file.response !== undefined) {
              fileIds.push(file.response.data.attachId)
            } else {
              fileIds.push(file.id)
            }
          })
          this.form.fileExtraId = fileIds.join(',')

          this.loading = true
          updateSave(this.newForm)
            .then(res => {
              if (res.code === 200) {
                this.$message({
                  message: '编辑协查成功',
                  showClose: true,
                  duration: 6000,
                  type: 'success'
                })
                this.$router.push({ path: '/fenResultExport/fenResultExport' })
                this.loading = false
              } else {
                this.loading = false
              }
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          return false
        }
      })
    },
    // 编辑提交
    updateSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.$refs['upload'].uploadFiles.length === 0 || this.form.fileMainId === '') {
            this.$message({
              message: '附件(查询主体信息或账号)不能为空',
              showClose: true,
              duration: 6000,
              type: 'error'
            })
            return false
          }
          if (this.$refs['Newupload'].uploadFiles.length === 0) {
            this.$message({
              message: '协查函扫描件及其他审批文件不能为空',
              showClose: true,
              duration: 6000,
              type: 'error'
            })
            return false
          }
          const fileIds = []
          this.$refs['Newupload'].uploadFiles.forEach(file => {
            if (file.response !== undefined) {
              fileIds.push(file.response.data.attachId)
            } else {
              fileIds.push(file.id)
            }
          })
          this.form.fileExtraId = fileIds.join(',')

          this.loading = true
          updateSubmit(this.newForm)
            .then(res => {
              if (res.code === 200) {
                this.$message({
                  message: '提交协查任务成功',
                  showClose: true,
                  duration: 6000,
                  type: 'success'
                })
                this.$router.push({ path: '/fenResultExport/fenResultExport' })
                this.loading = false
              } else {
                this.loading = false
              }
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          return false
        }
      })
    },
    // 获取uuid作为数据的主键
    // 获取uuid作为数据的主键
    getUUID() {
      return 'xxxxxxxxxxxx6xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, c => {
        return (c === 'x' ? (Math.random() * 16) | 0 : 'r&0x3' | '0x8').toString(16)
      })
    },
    // 获取涉罪类型
    getSheZuiLX() {
      getSheZui('TOSC').then(res => {
        this.sheZui = res.data
      })
    },
    // 分支行只能选择所选涉及机构
    jgChange() {
      this.sjjg = []
      this.fenZHiCN = []
      this.form.organDoList.forEach(el => {
        this.organDoListData.forEach(item => {
          if (el === item.codeId) {
            this.sjjg.push(item)
            this.fenZHiCN.push(item.codeName)
          }
        })
      })
    },
    // 判断保存按钮是否显示
    isCenter1() {
      if (this.isCenter) {
        if (this.permissions_routers.indexOf(this.bc) !== -1) {
          this.isName = true
          this.isBlock = false
        } else {
          this.isName = false
          this.isBlock = true
        }
      } else {
        this.isName = false
      }
    },
    isValidInput(rule, value, callback) {
      if (commonPattern.headerAndFooter.test(value)) {
        callback(new Error('首尾不能有空格'))
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
    // 数字检查
    onlyNumberValidate(rule, value, callback) {
      if (value !== null && value !== '' && value !== undefined) {
        if (value.length > 30) {
          callback(new Error('内容应在30字符以内'))
        } else if (commonPattern.headerAndFooter.test(value)) {
          callback(new Error('首尾不能有空格'))
        } else {
          callback()
        }
      } else {
        callback()
      }
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
    // 证件
    onlyNumberValidate1(rule, value, callback) {
      if (value !== '' && value !== null) {
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
    // 上传文件提示
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length +
          fileList.length} 个文件，如要更换上传文件，请先删除已上传的文件。`
      )
    },
    // 上传文件提示
    handleExceed2(files, fileList) {
      this.$message.warning(
        `当前限制选择 5 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length +
          fileList.length} 个文件，如要更换上传文件，请先删除已上传的文件。`
      )
    },
    // 设置文件大小和格式
    beforeAvatarUpload(file) {
      // if (this.form.organDoList.length === 0) {
      //   this.$message({
      //     type: 'error',
      //     message: '请先选择涉及分支机构',
      //     showClose: true,
      //     duration: 6000
      //   })
      //   this.mainFileList.splice(this.mainFileList.length - 1, 1)
      //   return false
      // }
      // var testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
      // const extension = testmsg === 'xls'
      // const extension2 = testmsg === 'xlsx'
      const isLt2M = file.size / 1024 / 1024 < 50
      // if (!extension && !extension2) {
      //   this.$message({
      //     message: '上传文件只能是 xls、xlsx格式!',
      //     type: 'warning'
      //   })
      // }
      if (!isLt2M) {
        this.$message({
          message: '上传文件大小不能超过 50MB!',
          type: 'warning'
        })
      }
      return isLt2M
    },
    // 判断上传附件不能名字相同
    beforeAvatarUpload1(file) {
      this.fileList1.push(file)
      const isName = this.isFileNameSame(this.fileList1)
      const w = !isName
      if (isName) {
        this.$message({
          message: '上传的文件名称不能重复',
          type: 'warning'
        })
        this.fileList.splice(this.fileList.length - 1, 1)
        return w
      }
      var testmsg = file.name.substring(file.name.lastIndexOf('.') + 1).toLowerCase()
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
      if ((!extension && !extension2) || !isLt2M) {
        this.fileList1.splice(this.fileList1.length - 1, 1)
      }
      return extension || (extension2 && isLt2M && w)
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
    // 删除附件
    handleRemove(file, fileList) {
      if (file && file.status === 'success') {
        this.delUrl = 'file-service/upload/delete-attach/' + file.response.data.attachId + '?moduleName=' + '联合分析'
        delAttach('', this.delUrl).then(res => {
          this.$message({
            message: '删除附件成功',
            type: 'success'
          })
        })
      }
    },
    // 判断是中心用户还是分支机构用户
    judge() {
      if (this.checkTrue) {
        if (this.isCenter) {
          if (this.permissions_routers.indexOf(this.bc) !== -1) {
            this.centerInsert('form')
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
    // 获取分支机构
    getBranch() {
      branch({ typeId: 'FZJGD' }).then(res => {
        if (res.code === 200) {
          this.organDoListData = res.data.list
        }
      })
    },
    // 下载模板
    download() {
      window.location.href = '/monitor/areaAssist/downloadXlsx?token=' + this.token
    },
    // 下载附件
    downFile(file) {
      // window.location.href = '/file-service/joint-analysis/download?token=' + this.token + '&fileId=' + file.id
      // window.location.href = '/file-service/upload/download?fileId=' + file.id + '&token=' + this.token
      location.href = '/file-service/upload/download/' + file.id
    },
    // 附件(必要流程文件)
    upSuccess(res, file) {
      if (res.code === 200) {
        this.$message({
          message: '上传成功！',
          type: 'success'
        })
        this.loading = false
      } else {
        this.$message({
          message: res.message,
          type: 'error'
        })
        this.loading = false
      }
    },
    // 附件(查询主体信息或账号)
    handleSuccess(res, file) {
      if (res.code === 200) {
        this.form.fileMainId = res.data.attachId
        this.$message({
          message: '上传成功！',
          type: 'success'
        })
        this.loading = false
      } else {
        this.mainFileList.splice(this.fileList1.length - 1, 1)
        this.$message({
          message: res.message,
          type: 'error'
        })
        this.loading = false
      }
    },
    showLoading() {
      this.loading = true
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
.conjointAnalysisAdd {
  .el-select {
    display: block;
  }
  .line {
    text-align: center;
  }
  // .el-checkbox-group label:first-child {
  //   margin-left: 30px;
  // }
  .itme-block {
    width: 100% !important;
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
  .upload-demo {
    margin-bottom: 5px;
  }
  .inline-input {
    margin-left: 30px;
  }
}
</style>
