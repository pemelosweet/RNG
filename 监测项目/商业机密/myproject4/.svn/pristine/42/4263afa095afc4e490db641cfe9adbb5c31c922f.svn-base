<template>
  <div class="conjointAnalysis-creator">
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="160px"
      class="formBlock"
      :disabled="isDisabled"
    >
      <el-row>
        <el-col :span="20">
          <el-form-item label="联合分析名称：" prop="jointAnalysisName">
            <el-input maxlength="100" v-model="form.jointAnalysisName"></el-input>
          </el-form-item>
        </el-col>
        <div class="start-end">
          <el-form-item
            label="起止日期："
            class="start"
            prop="startTime"
          >
            <el-date-picker
              v-model="form.startTime"
              type="date"
              placeholder="开始日期"
            ></el-date-picker>
          </el-form-item>
          <span>至</span>
          <el-form-item
            class="end"
            label-width="10px"
          >
            <el-date-picker
              v-model="form.endTime"
              type="date"
              placeholder="结束日期"
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
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col >
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
              :file-list="fileList"
              :action="updataUrl2"
              :on-success='upSuccess'
              :beforeUpload="beforeAvatarUpload3"
              :on-preview="downFile"
            >
              <el-button
                size="small"
                type="primary"
                plain
              >点击上传</el-button>
            </el-upload>
          </el-form-item>
        </el-col>

        <el-col :span="20">
          <el-form-item label="联系人：" prop="contact">
            <el-input
             maxlength="30"
              v-model="form.contact"
              placeholder=""
            ></el-input>
          </el-form-item>
        </el-col>

      </el-row>
      <el-form-item label="批量导入主体或账户信息：">
          <div>
          <el-upload 
            :limit="1" 
            :on-exceed="handleExceed" 
            :beforeUpload="beforeAvatarUpload3"
            style="display: inline-block;"
            class="upload-demo"
            ref="upload"
            :action="updataUrl3"
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
            <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
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
              <el-form-item label="主体名称：" label-width="200px" prop="name" :rules="[{validator: isValidInput, trigger: 'blur'}]">
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

    <div v-if="isRelease">
      <strong>联合分析成果</strong>
      <el-table
        :data="analysisResult"
        style="width: 100%"
      >
        <el-table-column
          label="联系人"
          min-width="100"
        >
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.extend1 }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="分析成果"
          min-width="180"
        >
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.attachName }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column> -->
      </el-table>
      <el-form label-width="160px">
        <el-row>
          <el-col
            :span="10"
            :offset="1"
          >
            <el-form-item label="联系人：">
              <el-input v-model="upContact"></el-input>
            </el-form-item>
          </el-col>
          <el-col
            :span="10"
            :offset="1"
          >
            <el-form-item label="汇总联合分析结果：">
              <el-upload
                class="upload-demo"
                :action="updataUrl1"
                :before-upload="beforeAvatarUpload3"
              >
                <el-button
                  size="small"
                  type="primary"
                  plain
                >点击上传</el-button>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>        
      </el-form>
    </div>
    <el-button :disabled="allShow" plain type="primary"  @click="downAccount">主体账户信息下载</el-button>
    <div style="text-align: center">
          <el-button
          v-if="isSave"
            type="primary"
            @click="submitChange()"
            :loading="loading"
          >保存</el-button>          
        </div>
    </div>
    
</template>
<script>
import { mapGetters } from 'vuex'
import { getToken } from '@/utils/auth'
import { newBranch } from '@/api/sys-monitoringAnalysis/conjointAnalysis/index.js'

// import { centerInsert } from '@/api/sys-monitoringAnalysis/conjointAnalysis/index.js'
import {
  branch,
  delAttach,
  updateForm,
  modification
} from '@/api/sys-monitoringAnalysis/conjointAnalysis/list.js'
import preliminaryJudgment from '@/views/sys-monitoringAnalysis/monitoringWarning/rosterWarning/components/preliminaryJudgment.vue'
import { dictionary } from '@/api/sys-monitoringAnalysis/roster-warning/common.js'
import { common_Validate, commonPattern } from '@/utils/formValidate'
export default {
  components: {
    preliminaryJudgment
  },
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
      editVisible: false,
      isEdit: false,
      idx: -1,
      num: 0,
      isMore: false,
      temporaryData: [],
      loading: false,
      isSave: false,
      idFiles: '',
      allShow: false,
      dialogJudgmentData: [],
      isReplenishOne: false,
      isReplenishTwo: false,
      isDisabled: true,
      token: getToken(),
      isShow: true,
      isRelease: false,
      analysisResult: [],
      fileList: [],
      reportCluePreJudgment: [], // 回显的数据
      delUrl: '',
      judgmentInp1: '', // 初步判断1401 input
      judgmentInp2: '', // 初步判断1402 input
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
        preliminaryJudgmentInp1: '',
        preliminaryJudgmentInp2: '',
        contact: '',
        desc: '',
        preliminaryJudgmeStr: '',
        tableData: [],
        state: ''
      },
      sjjg: [],
      rules: {
        jointAnalysisName: [{ required: true, validator: common_Validate, trigger: 'blur' }],
        supplementOne: [{ required: true, validator: common_Validate, trigger: 'blur' }],
        supplementTwo: [{ required: true, validator: common_Validate, trigger: 'blur' }],
        startTime: [{ required: true, message: '开始日期不能为空', trigger: 'blur' }],
        organDoList: [
          { type: 'array', required: true, message: '至少选择一个涉及分支机构', trigger: 'change' }
        ],
        contact: [{ required: true, validator: common_Validate, trigger: 'blur' }],
        tableData: {
          name: [{ required: true, message: '主体名称不能为空', trigger: 'blur' }]
        }
      },
      upContact: '',
      urldata: '',
      index: 0,
      check: null,
      checkIndex: 0,
      organDoListData: [],
      url: '',
      typeId: [],
      ref: {
        joinId: ''
      },
      dialog: {
        dialogVisible: false,
        radio: '1',
        advice: ''
      }
    }
  },
  computed: {
    preliminaryJudgmeStr1() {
      return this.$refs.judgment.searchParams
    },
    ...mapGetters(['businessFlag', 'workFlow2business', 'formContent']),
    updataUrl2() {
      return `/monitor/joint-analysis/upAttach?token=${this.token}&jointId=${
        this.idFiles
      }`
    },
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
    updataUrl3() {
      return `/monitor/joint-analysis/upFile?token=${this.token}`
    }
  },
  watch: {
    businessFlag(val) {
      if (this.checkTrue) {
        if (val) this.updateForm()
        this.$store.dispatch('changeFlag', false)
      } else {
        this.$message({
          message: '主体账户所在的分支机构需在涉及分支机构内',
          type: 'error'
        })
      }
    },
    workFlow: {
      www(newVal, oldVal) {
        console.log(newVal, 333)
      }
    },
    formContent: {
      handler(newVal, oldVal) {
        if (newVal.workflow.nodeAttributes) {
          if (newVal.workflow.nodeAttributes.length > 0) {
            if (newVal.workflow.nodeAttributes[0].extendKey === 'editFlag' && newVal.workflow.nodeAttributes[0].extendValue === 'Y') {
              this.isDisabled = false
              this.isSave = true
            } else {
              this.isDisabled = true
              this.isSave = false
            }
          }
        }
        this.idFiles = newVal.jointId
        this.taskId = newVal.workflow.pkId
        this.form.jointAnalysisName = newVal.jointAnalysisName
        this.form.startTime = newVal.startTime
        this.form.endTime = newVal.endTime
        this.form.desc = newVal.desc
        this.form.jointId = newVal.jointId
        this.form.contact = newVal.contact
        this.form.state = newVal.state
        this.form.workflow = newVal.workflow
        newVal.organDoList.forEach(el => {
          this.form.organDoList.push(el.organId)
        })
        this.form.organDoList.forEach(el => {
          this.organDoListData.forEach(item => {
            if (el === item.codeId) {
              this.sjjg.push(item)
            }
          })
        })
        if (newVal.attachDoList != null) {
          newVal.attachDoList.forEach(el => {
            var obj = {}
            obj.name = el.attachName
            obj.id = el.attachId
            this.fileList.push(obj)
          })
        }
        // newVal.preJudmentDoList.forEach(item => {
        //   if (item.preliminaryJudgme.indexOf('1401') !== -1) {
        //     const tempArr = item.preliminaryJudgme.split('-')
        //     this.judgmentInp1 = tempArr[1]
        //     this.reportCluePreJudgment.push('1401')
        //   } else if (item.preliminaryJudgme.indexOf('1402') !== -1) {
        //     const tempArr = item.preliminaryJudgme.split('-')
        //     this.judgmentInp2 = tempArr[1]
        //     this.reportCluePreJudgment.push('1402')
        //   } else {
        //     this.reportCluePreJudgment.push(item.preliminaryJudgme)
        //   }
        // })
        const Judment = []
        // newVal.preJudmentDoList.forEach(item => {
        //   if (item.preliminaryJudgme.indexOf('1401') !== -1) {
        //     const tempArr = item.preliminaryJudgme.split('-')
        //     this.form.supplementOne = tempArr[1]
        //     Judment.push('1401')
        //   }
        //   if (item.preliminaryJudgme.indexOf('1402') !== -1) {
        //     const tempArr = item.preliminaryJudgme.split('-')
        //     this.form.supplementTwo = tempArr[1]
        //     Judment.push('1402')
        //   } else {
        //     Judment.push(item.preliminaryJudgme)
        //   }
        // })
        newVal.preJudmentDoList.forEach(item => {
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
        this.form.tableData = newVal.mainDoList
      }
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
    // 下载附件
    downFile(file) {
      // window.location.href = '/file-service/joint-analysis/download?token=' + this.token + '&fileId=' + file.id
      // window.location.href = '/file-service/upload/download?fileId=' + file.id + '&token=' + this.token
      location.href = '/file-service/upload/download/' + file.id + '?moduleName=' + encodeURI('联合分析')
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
      this.index = 0
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
    // 下载模板
    download() {
      window.location.href = '/monitor/joint-analysis/download?token=' + this.token
    },
    // 上传文件提示
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件，如要更换上传文件，请先删除已上传的文件。`)
    },
    isValidInput(rule, value, callback) {
      if (commonPattern.headerAndFooter.test(value)) {
        callback(new Error('首尾不能有空格'))
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
    downAccount() {
      window.location.href = '/monitor/joint-analysis/output?token=' + this.token + '&jointId=' + this.form.jointId
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
          message: res.msg,
          type: 'error'
        })
      }
    },
    // 加载更多
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
          message: res.msg,
          type: 'error'
        })
      }
    },
    // 删除附件
    handleRemove(file, fileList) {
      if (file && file.status === 'success') {
        if (file.response) {
          this.delUrl = 'file-service/upload/delete-attach/' + file.response.data.attachId
        } else if (file.id) {
          this.delUrl = 'file-service/upload/delete-attach/' + file.id
        }
        // this.delUrl = 'monitor/joint-analysis/delAttach/' + file.id
        delAttach('', this.delUrl).then(res => {
          this.$message({
            message: '删除附件成功',
            type: 'success'
          })
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
    submitChange() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.checkTrue !== false) {
            this.loading = true
            this.getPreliminaryJudgmeStr()
            const array = []
            this.form.organDoList.forEach(el => {
              const obj = {}
              obj.organId = el
              array.push(obj)
            })
            this.form.organDoList = array
            this.form.mainDoList = this.form.tableData
            const obj = Object.assign({}, this.form)
            obj.organDoList = array
            modification(this.form).then(res => {
              if (res.code === 200) {
                this.loading = false
                this.$router.push({ name: 'home' })
                this.$message({
                  message: '修改成功',
                  type: 'success'
                })
              } else {
                this.loading = false
                this.$message({
                  message: res.message,
                  type: 'warning'
                })
              }
            })
          } else {
            this.$message({
              message: '主体账户所在的分支机构需在涉及分支机构内',
              type: 'error'
            })
          }
        } else {
          this.$message({
            message: '请输入正确的表单内容',
            type: 'warning'
          })
          return false
        }
      })
    },
    updateForm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.getPreliminaryJudgmeStr()
          this.form.mainDoList = this.form.tableData
          const array = []
          this.form.organDoList.forEach(el => {
            const obj = {}
            obj.organId = el
            array.push(obj)
          })
          const obj = Object.assign({}, this.form)
          obj.organDoList = array
          updateForm(this.workFlow2business, obj).then(res => {
            if (res.code === 200) {
              this.$message({
                message: '提交成功',
                type: 'success'
              })
              this.$store.dispatch('changeFlag', false)
              setTimeout(() => {
                this.$router.push({ name: 'home' })
              }, 1000)
            }
          })
        } else {
          this.$message({
            message: '请输入正确的表单内容',
            type: 'warning'
          })
          return false
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
    }
  },
  created() {
    console.log(this.showBottom)
    this.getTypeId()
  },
  mounted() {
    this.getDictionary('TOSC')
    this.getBranch()
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
