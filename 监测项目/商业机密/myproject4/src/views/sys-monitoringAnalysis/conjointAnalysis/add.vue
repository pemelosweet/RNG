<template>
  <div class="conjointAnalysisAdd"
   v-loading="loading"
    element-loading-text="请耐心等待"
    element-loading-spinner="el-icon-loading"

    element-loading-background="rgba(0, 0, 0, 0.2)">
    <el-card class="box-card">
      <div
        slot="header"
        class="clearfix"
      >
        <span>创建联合分析</span>
      </div>
      <el-form
        ref="form"
        :rules="rules"
        :model="form"
        label-width="200px"
      >

        <el-form-item
          label="联合分析名称："
          prop="jointAnalysisName"
          class="itme-block"
        >
          <el-input
            validate-event
            maxlength="100"
            v-model="form.jointAnalysisName"
            placeholder="请输入联合分析名称，最多输入100字符"
          ></el-input>
        </el-form-item>
        <div class="start-end">
          <el-form-item
            label="起止日期："
            class="start"
            prop="startTime"
            :rules="[{ required: true, message: '开始时间不能为空', trigger: 'change' },
          { validator: timeCheckStart, trigger: 'change' },]"
          >
            <el-date-picker
              v-model="form.startTime"
              type="date"
              :picker-options="pickerOptions"
              placeholder="开始日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
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
              v-model="form.endTime"
              type="date"
              :picker-options="pickerOptions"
              placeholder="结束日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
        </div>

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
            >
            </el-option>
          </el-select>
        </el-form-item>
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
            >
            </el-option>
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
        <!-- <preliminary-judgment :lableWidth="200" :labelName="'涉罪类型：'" ref="judgment" judgmentOther="judgmentOther" ></preliminary-judgment>         -->
        <el-form-item
          label="简介："
          class="itme-block"
        >
          <el-input
            maxlength="200"
            type="textarea"
            v-model="form.desc"
          ></el-input>
        </el-form-item>

        <el-form-item
          label="附件："
          class="itme-block"
        >

          <el-upload
            class="upload-demo"
            ref="Newupload"
            :action="updataUrl1"
            :on-success='upSuccess'
            :before-upload="beforeAvatarUpload"
            :file-list="fileList1"
            :on-remove="handleRemove"
          >
            <el-button
              type="primary"
              plain
            >点击上传</el-button>
          </el-upload>
        </el-form-item>

        <el-form-item
          label="联系人："
          class="itme-block"
          prop="contact"
        >
          <el-input
            maxlength="30"
            v-model="form.contact"
            placeholder=""
          ></el-input>
        </el-form-item>
        <el-form-item label="批量导入主体或账户信息：">
          <div>
            <el-upload
              :limit="1"
              :on-exceed="handleExceed"
              :beforeUpload="beforeAvatarUpload"
              style="display: inline-block;"
              class="upload-demo"
              ref="upload"
              :action="updataUrl2"
              :file-list="mainFileList"
              :on-success='handleSuccess'
            >
              <el-button
                slot="trigger"
                type="primary"
                plain
              >选取文件</el-button>
              <!-- <el-button style="margin-left: 10px;" type="success" plain>导入</el-button> -->
              <el-button
                type="primary"
                icon="el-icon-download"
                plain
                @click="download"
              >模版下载</el-button>
              <el-button
                style="margin-left:0;"
                type="primary"
                plain
                @click="addSingle"
              >添加一行</el-button>   
            </el-upload>
          </div>
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
                  @click="editItem(scope.$index,scope.row)"
                >编辑</el-button>
                <el-button
                  type="text"
                  @click="delItem(scope.$index,scope.row)"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- <el-button v-if="isMore" type="primary" @click="more">查看更多</el-button>  -->
        </el-form-item>
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
        <div style="text-align: center">
          <el-button
            v-if="isBlock"
            type="primary"
            @click="publish('form')"
            :loading="loading"
          >保存</el-button>
          <el-button
            v-if="isName"
            type="primary"
            @click="judge"
            :loading="loading"
          >发布联合分析</el-button>
          <el-button
            v-if="!isName"
            type="primary"
            @click="judge"
            :loading="loading"
          >提交审核</el-button>
          <el-button
            type="primary"
            @click="$router.back(-1)"
          >返回</el-button>
        </div>
      </el-form>
      <monitor-workflow></monitor-workflow>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getToken } from '@/utils/auth'
import preliminaryJudgment from '@/views/sys-monitoringAnalysis/monitoringWarning/rosterWarning/components/preliminaryJudgment.vue'
import { dictionary } from '@/api/sys-monitoringAnalysis/roster-warning/common.js'
import {
  newBranch,
  branch,
  analyst,
  approvalStaus,
  centerInsert
} from '@/api/sys-monitoringAnalysis/conjointAnalysis/index.js'
import { delAttach } from '@/api/sys-monitoringAnalysis/conjointAnalysis/list.js'
import { common_Validate, commonPattern } from '@/utils/formValidate'
export default {
  components: {
    preliminaryJudgment
  },
  data() {
    return {
      pickerMinDate: '',
      pickerOptions: {

        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7 // 禁用以前的日期，今天不禁用
          // return date.getTime() <= Date.now();    //禁用今天以及以前的日期
        }

      },
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
        supplementOne: '',
        supplementTwo: '',
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
        tableData: []
      },
      index: 0,
      checkIndex: 0,
      preliminaryJudgmeStr2: [],
      urldata: '',
      organDoListData: [],
      typeId: [],
      token: getToken(),
      rules: {
        jointAnalysisName: [{ required: true, validator: common_Validate, trigger: 'blur' }],
        supplementOne: [{ required: true, validator: common_Validate, trigger: 'blur' }],
        supplementTwo: [{ required: true, validator: common_Validate, trigger: 'blur' }],
        // startTime: [{ required: true, message: '开始日期不能为空', trigger: 'blur' }],
        organDoList: [
          { type: 'array', required: true, message: '至少选择一个涉及分支机构', trigger: 'change' }
        ],
        contact: [{ required: true, validator: common_Validate, trigger: 'blur' }],
        tableData: {
          name: [{ required: true, message: '主体名称不能为空', trigger: 'blur' }]
        }
      }
    }
  },
  mounted() {
    this.isCenter1()
    this.getBranch()
    this.getTypeId()
    this.getDictionary('TOSC')
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
      delete obj.preJudmentDoList
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
      return `monitor/joint-analysis/upAttach?jointId=${this.urldata}&token=${this.token}`
    },
    updataUrl2() {
      return `monitor/joint-analysis/upFile?token=${this.token}`
    }
  },
  watch: {
    businessFlag(val) {
      if (val) this.nextStep()
      this.$store.dispatch('changeFlag', false)
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
    // 设置文件大小和格式
    beforeAvatarUpload(file) {
      // var testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
      // const extension = testmsg === 'xls'
      // const extension2 = testmsg === 'xlsx'
      const isLt2M = file.size / 1024 / 1024 < 100
      // if (!extension && !extension2) {
      //   this.$message({
      //     message: '上传文件只能是 xls、xlsx格式!',
      //     type: 'warning'
      //   })
      // }
      if (!isLt2M) {
        this.$message({
          message: '上传文件大小不能超过 100MB!',
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
    // 涉罪类型数据类型转换拼接
    getPreliminaryJudgmeStr() {
      const arr = []
      this.form.preJudmentDoList.forEach(el => {
        if (el === '1401') {
          el = '1401-' + this.form.supplementOne
          arr.push(el)
        } else if (el === '1402') {
          el = '1402-' + this.form.supplementTwo
          arr.push(el)
        } else {
          arr.push(el)
        }
      })
      this.form.preliminaryJudgmeStr = arr.join()
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
      this.getPreliminaryJudgmeStr()
      this.form.mainDoList = this.form.tableData // 获取的数据
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
    // 初步判断为1401 1402 的时候  返回的数据
    judgmentOther(inp1, inp2) {
      this.form.preliminaryJudgmentInp1 = inp1
      this.form.preliminaryJudgmentInp2 = inp2
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
    // 下载模板
    download() {
      window.location.href = 'monitor/joint-analysis/download?token=' + this.token
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
      }
    },
    // 选择文件
    handleSuccess(res, file) {
      if (res.code === 200) {
        this.form.tableData = this.form.tableData.concat(res.data.mainDoList)
        // const arrLength = res.data.mainDoList.length // 获取返回的数组的长度
        // const arr = res.data.mainDoList
        // if (arrLength < 10) {
        //   this.form.tableData = this.form.tableData.concat(res.data.mainDoList)
        // } else {
        //   this.isMore = true
        //   this.form.tableData = this.form.tableData.concat(res.data.mainDoList.slice(0, 10))
        //   this.temporaryData = arr.slice(10, arrLength) // 数据暂存起来
        //   this.num = this.temporaryData.length
        // }
        this.$message({
          message: '上传成功！',
          type: 'success'
        })
      } else {
        this.mainFileList.splice(this.fileList1.length - 1, 1)
        this.$message({
          message: res.message,
          type: 'error'
        })
      }
    },
    more() {
      const arrLength = this.temporaryData.length
      if (arrLength < 10) {
        this.form.tableData = this.form.tableData.concat(this.temporaryData)
        this.temporaryData = []
        this.isMore = false
      } else {
        this.form.tableData = this.form.tableData.concat(this.temporaryData.slice(0, 10))
        this.temporaryData = this.temporaryData.slice(10, arrLength)
        this.num = this.temporaryData.length
      }
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
          if (this.isEdit) {
            this.$set(this.form.tableData, this.idx, obj)
            this.$message.success(`编辑主体账户信息第 ${this.idx + 1} 行成功`)
            this.isEdit = false
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
      this.editVisible = true
      this.isEdit = true
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
      this.index = 0
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
    // 中心机构直接发布
    centerInsert(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loading = true
          this.getPreliminaryJudgmeStr()
          this.form.mainDoList = this.form.tableData // 获取的数据
          centerInsert(this.newForm)
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
          return false
        }
      })
    },
    // 发布联合分析
    publish(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.checkTrue !== false) {
            this.loading = true
            this.getPreliminaryJudgmeStr()
            this.form.mainDoList = this.form.tableData
            analyst(this.newForm)
              .then(res => {
                if (res.code === 200) {
                  this.$router.push({ name: 'conjointAnalysis_list' })
                  this.loading = false
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
      // this.$refs[formName].validate((valid) => {
      //   if (valid) {
      //     this.getPreliminaryJudgmeStr()
      //     const arr = []
      //     const arry = this.form.organDoList
      //     const obj = {}
      //     arry.forEach(item => {
      //       obj.organId = item
      //       arr.push(obj)
      //     })
      //     this.form.organDoList = arr
      //     this.form.mainDoList = this.form.tableData
      //     analyst(this.newForm).then(res => {
      //       // alert(res.code)
      //       this.$router.push({ name: 'conjointAnalysis_list' })
      //     })
      //   } else {
      //     return false
      //   }
      // })
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
    width: 84%;
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
