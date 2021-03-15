<template>
  <div
    class="analysisSpecial-clueSave"
    v-loading="loading"
    element-loading-text="请稍等......"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.3)"
  >
    <el-card>
      <div slot="header" class="clearfix">
        <span>跨区域数据申请</span>
        <div style="float:left"></div>
      </div>
      <el-form
        ref="form"
        :disabled="disabled"
        :model="form"
        label-width="200px"
        class="formBlock"
        :rules="rules"
      >
        <el-row>
          <el-col :span="20">
            <el-form-item
              label="线索名称："
              prop="clueName"
              :rules="[
                { required: true, message: '请输入线索名称', trigger: 'blur' },
                { validator: validateAgentName, trigger: 'blur' }
              ]"
            >
              <el-input
                v-model="form.clueName"
                maxlength="50"
                placeholder="请输入线索名称, 最多可输入50位"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="20">
            <el-form-item
              label="线索来源："
              prop="clueSource"
              :rules="[
                { required: true, message: '请输入线索来源', trigger: 'blur' },
                { validator: validateAgentName, trigger: 'blur' }
              ]"
            >
              <el-input
                v-model="form.clueSource"
                maxlength="50"
                placeholder="请输入线索来源, 最多可输入50位"
              ></el-input>
            </el-form-item>
          </el-col>

          <!--
            <el-col :span="20">
              <el-form-item
                label="专项类别："
                prop="applyType"
                :rules="[{ required:true, message: '请选择专项类别',trigger: 'change'}]"
              >
                <el-select
                  style="width:100% !important;"
                  clearable
                  v-model="form.applyType"
                  placeholder="请选择"
                  @change="getValue"
                >
                  <el-option
                    v-for="(item,index) in special"
                    :key="index"
                    :label="item.codeName"
                    :value="item.codeId"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          -->
          <el-col :span="20">
            <el-form-item
              label="专项类别："
              prop="text"
              :rules="[
                { validator: validateAgentName, trigger: 'blur' },
                { required: true, message: '请输入专项类别', trigger: 'blur' }
              ]"
            >
              <el-input
                v-model="form.text"
                maxlength="50"
                placeholder="请输入内容, 最多可输入50位"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="20">
            <el-form-item
              label="线索描述："
              prop="clueDes"
              :rules="[{ required: true, message: '请输入线索描述', trigger: 'blur' }]"
            >
              <el-input
                type="textarea"
                v-model="form.clueDes"
                maxlength="500"
                placeholder="请输入线索描述, 最多可输入500位"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="20">
            <el-form-item
              label="部门负责人审批意见："
              prop="deptOpinion"
              :rules="[{ required: true, message: '请输入部门负责人审批意见', trigger: 'blur' }]"
            >
              <el-input
                type="textarea"
                v-model="form.deptOpinion"
                maxlength="500"
                :rows="3"
                placeholder="请输入部门负责人审批意见, 最多可输入500位"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="20">
            <el-form-item label="附件：">
              <el-upload
                :beforeUpload="beforeAvatarUpload3"
                class="upload-demo"
                :on-remove="handleRemove"
                :file-list="fileList"
                :action="updataUrl1"
                :on-success="upSuccess"
                :on-preview="downloadResult"
                :disabled="$route.query.type === '已提交' || isOver"
              >
                <el-button type="primary" plain :disabled="$route.query.type === '已提交' || isOver"
                  >点击上传</el-button
                >
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <div style="margin-bottom:30px">
          <div style="margin-bottom:10px">
            <el-form-item label="批量导入主体或账户信息：">
              <div style="margin-left:0;">
                <el-upload
                  :action="updataUrl2"
                  :limit="1"
                  :file-list="mainFileList"
                  :on-exceed="handleExceed"
                  :beforeUpload="beforeAvatarUpload"
                  :on-success="handleSuccess"
                  style="display: inline-block;"
                  :disabled="$route.query.type === '已提交' || isOver"
                >
                  <!--
                    <el-button slot="trigger" type="primary" plain>选取文件</el-button>
                    <el-button type="text" style="marginLeft:10px" icon="el-icon-download" @click="download">模板下载</el-button>
                  -->
                  <el-button
                    slot="trigger"
                    type="primary"
                    plain
                    :disabled="$route.query.type === '已提交' || isOver"
                    >选取文件</el-button
                  >
                  <!--
                    <el-button style="margin-left: 10px;" type="success" plain>导入</el-button>
                  -->
                  <el-button
                    type="primary"
                    icon="el-icon-download"
                    plain
                    @click="download"
                    :disabled="$route.query.type === '已提交' || isOver"
                    >模版下载</el-button
                  >
                  <el-button
                    style="margin-left:0;"
                    type="primary"
                    plain
                    :disabled="$route.query.type === '已提交' || isOver"
                    @click="addSingle"
                    >添加一行</el-button
                  >
                </el-upload>
              </div>
            </el-form-item>
          </div>

          <el-row>
            <el-col :span="22" :offset="1">
              <el-table :data="form.tableData" max-height="500px" border>
                <el-table-column type="index" label="序号" width="80"></el-table-column>
                <el-table-column label="主体名称" min-width="150" prop="name"></el-table-column>
                <el-table-column
                  label="证件类型"
                  min-width="150"
                  prop="certificateTypeName"
                ></el-table-column>
                <el-table-column
                  label="证件号码"
                  min-width="150"
                  prop="certificateNum"
                ></el-table-column>
                <el-table-column label="账号" min-width="150" prop="accountNum"></el-table-column>
                <el-table-column label="开户行" min-width="150" prop="openBank"></el-table-column>
                <!--
                  <el-table-column label="负责分析的分支行" min-width="150"  prop="branchBankName"></el-table-column>
                -->
                <el-table-column label="操作" min-width="200">
                  <template slot-scope="scope">
                    <el-button
                      type="text"
                      :disabled="$route.query.type === '已提交' || isOver"
                      @click="editItem(scope.$index, scope.row)"
                      >编辑</el-button
                    >
                    <el-button
                      type="text"
                      :disabled="$route.query.type === '已提交' || isOver"
                      @click="delItem(scope.$index, scope.row)"
                      >删除</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>
        </div>
        <el-dialog title="主体账户信息" :visible.sync="editVisible" width="60%">
          <el-form ref="formMain" :model="formMain">
            <el-form-item
              label="主体名称："
              label-width="200px"
              prop="name"
              :rules="[{ validator: delDataValidInput, trigger: 'blur' }]"
            >
              <el-input
                v-model="formMain.name"
                maxlength="50"
                placeholder="请输入主体名称,最多输入50字符"
              ></el-input>
            </el-form-item>
            <el-form-item label="证件类型：" label-width="200px">
              <el-select
                clearable
                filterable
                v-model="formMain.certificateType"
                placeholder="请选择"
              >
                <el-option
                  v-for="(item, index) in typeId"
                  :key="index"
                  :label="item.codeName"
                  :value="item.codeId"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="证件号码："
              label-width="200px"
              prop="certificateNum"
              :rules="[{ validator: validateAgentNum, trigger: 'blur' }]"
            >
              <el-input
                v-model="formMain.certificateNum"
                maxlength="128"
                placeholder="请输入证件号码,最多输入128字符"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="账号："
              label-width="200px"
              prop="accountNum"
              :rules="[{ validator: onlyNumberValidate, trigger: 'blur' }]"
            >
              <el-input
                v-model="formMain.accountNum"
                maxlength="30"
                placeholder="请输入账号,最多输入30字符"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="开户行："
              label-width="200px"
              prop="openBank"
              :rules="[{ validator: isValidInput, trigger: 'blur' }]"
            >
              <el-input
                v-model="formMain.openBank"
                maxlength="50"
                placeholder="请输入开户行,最多输入50字符"
              ></el-input>
            </el-form-item>
            <!--
              <el-form-item label="负责分析的分支行：" label-width="200px" prop="branchBank" :rules="[{required: true, message: '分支行不能为空', trigger: 'change'}]">
                  <el-select
                    filterable
                    v-model="formMain.branchBank"
                    clearable
                    placeholder="请选择"
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
            -->
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="editVisible = false">取 消</el-button>
            <el-button type="primary" @click="saveEdit('formMain')">确 定</el-button>
          </span>
        </el-dialog>
        <!--
          <el-form-item label="分析结果：">
            <el-upload
              :beforeUpload="beforeAvatarUpload3"
              disabled
              :action="updataUrl3"
              :file-list="fileListResult"
              :on-success="upSuccess"
              :on-preview="downloadResult"
            >
              <el-button disabled type="primary" plain>选择文件</el-button>
            </el-upload>
          </el-form-item>
        -->
      </el-form>
      <el-button v-if="allshow" plain type="primary" @click="downAccount"
        >主体账户信息下载</el-button
      >
      <div v-if="isPublish" style="overflow:hidden;margin-top:10px;">
        <span style="display:block;float:left;padding-top: 8px;margin-right:10px;">分析结果：</span>
        <el-upload
          style="float:left;"
          :beforeUpload="beforeAvatarUpload3"
          disabled
          :action="updataUrl3"
          :file-list="fileListResult"
          :on-success="upSuccess"
          :on-preview="downloadResult"
        >
          <el-button disabled type="primary" plain>选择文件</el-button>
        </el-upload>
      </div>

      <!-- <span @click="downloadResult">xiiisiisi</span> -->
      <div style="textAlign:center">
        <!-- <el-button type="primary" plain>重新发布</el-button> -->

        <!-- <el-button type="primary" @click="dialog.dialogVisible=true">提交审核</el-button> -->
        <el-button type="primary" v-if="isDisplay" @click="preserve">保存</el-button>
        <el-button type="primary" v-if="isHide" @click="callWorkFlow">提交审核</el-button>
        <el-button style="margin-left:20px;" type="primary" @click="goback">返回</el-button>
      </div>
      <monitor-workflow></monitor-workflow>
      <!-- 弹窗 -->
      <el-dialog
        title="任务提交"
        :visible.sync="dialog.dialogVisible"
        width="600px"
        class="dialog-block"
        @close="closeFn"
      >
        <div class="task">
          <div class="title">
            <span style="margin-right:20px">任务流向：</span>
            <el-radio v-model="dialog.radio" label="1">送中心业务管理员审核</el-radio>
          </div>
        </div>
        <el-row style="marginBottom:20px">
          <el-col :span="23" :offset="1">
            <el-transfer
              v-model="dialog.value"
              :data="dialog.transferData"
              :titles="['待选用户', '已选用户']"
            ></el-transfer>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div class="title">意见：</div>
            <el-input v-model="dialog.advice" type="textarea" placeholder></el-input>
          </el-col>
        </el-row>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialog.dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialog.dialogVisible = false">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getToken } from '@/utils/auth'
import {
  branch,
  clue,
  getDetail,
  save,
  approvalStaus,
  delAttach
} from '@/api/sys-monitoringAnalysis/analysisSpecial/index.js'

import { newBranch } from '@/api/sys-monitoringAnalysis/conjointAnalysis/index.js'
import { commonPattern } from '@/utils/formValidate'
export default {
  data() {
    const generateData = _ => {
      const data = []
      for (let i = 1; i <= 8; i++) {
        data.push({
          key: i,
          label: `分析${i}处 `
        })
      }
      return data
    }
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
      allshow: false,
      editVisible: false,
      isEdit: false,
      idx: -1,
      chinaNull: /[\u4e00-\u9fa5]/, // 校验中文
      specialEnglish: /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im, // 校验英文特殊符号
      sprcialChina: /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im, // 校验中文特殊符号
      englishNull: /[abcdefghijklmnopqrstuvwxyz]/im, // 校验英文
      numberNull: /[1234567890]/im, // 校验数字
      blankSpace: /[ ]/im, // 校验空格
      loading: false,
      isPublish: false,
      isDisplay: true,
      disabled: false,
      isHide: true,
      isOver: false,
      bc: 'monitor:clueAnalysisSpecial:save',
      fb: 'monitor:clueAnalysisSpecial:release',
      token: getToken(),
      textInp: false,
      fileList: [],
      mainFileList: [],
      fileListResult: [],
      form: {
        clueName: '',
        clueSource: '',
        applyType: '6',
        text: '',
        clueDes: '',
        deptOpinion: '',
        result: '',
        accountDoList: [], // 主体信息
        mainDoList: [], // 账户信息
        tableData: [],
        applyId: ''
      },
      ref: {
        applyId: ''
      },
      organDoListData: [],
      url: '',
      urldata: '',
      typeId: [],
      special: [],
      dialog: {
        dialogVisible: false,
        radio: '1',
        transferData: generateData(),
        value: [1, 4],
        advice: ''
      },
      rules: {}
    }
  },
  computed: {
    updataUrl1() {
      return `/monitor/special-apply/upAttach?applyId=${this.urldata}&token=${this.token}`
    },
    updataUrl2() {
      return `/monitor/special-apply/upFile?token=${this.token}`
    },
    updataUrl3() {
      return `/monitor/special-apply/upAttachResult?applyId=${this.urldata}&token=${this.token}`
    },
    ...mapGetters([
      'businessFlag',
      'workFlow2business',
      'userInfo',
      'institution',
      'permissions_routers'
    ])
  },
  watch: {
    businessFlag(val) {
      if (val) this.nextStep()
      this.$store.dispatch('changeFlag', false)
    }
  },
  methods: {
    downAccount() {
      window.location.href =
        '/monitor/special-apply/output?token=' + this.token + '&applyId=' + this.form.applyId
    },
    goback() {
      if (JSON.parse(sessionStorage.getItem('analysisSpecial'))) {
        const obj = JSON.parse(sessionStorage.getItem('analysisSpecial'))
        obj.ifReview = true
        sessionStorage.setItem('analysisSpecial', JSON.stringify(obj))
      }
      this.$router.go(-1)
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
    // 下载附件
    downloadResult(file) {
      location.href =
        '/file-service/upload/download/' + file.id + '?moduleName=' + encodeURI('跨区域数据申请')
      // window.location.href = '/monitor/special-apply/downloadAttach?token=' + this.token + '&noteId=58b1f35c70dc4f16926cd3a1d116c035'
      // window.location.href = '/monitor/special-apply/downloadAttach?token=' + this.token + '&fileId=' + file.id
    },
    validateAgentName(rule, value, callback) {
      if (this.blankSpace.test(value)) {
        callback(new Error('禁止输入空格'))
      } else if (this.specialEnglish.test(value) || this.sprcialChina.test(value)) {
        callback(new Error('禁止输入特殊字符'))
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
    // 校验身份证号位数及特殊字符空格中英文
    validateAgentNum(rule, value, callback) {
      if (value !== null && value !== '' && value !== undefined) {
        if (
          this.formMain.certificateType === '110001' ||
          this.formMain.certificateType === '110003'
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
    isValidInput(rule, value, callback) {
      if (value !== null && value !== '' && value !== undefined) {
        if (!commonPattern.spaceBar.test(value)) {
          callback(new Error('内容不能含有空格'))
        } else if (commonPattern.specialChar.test(value) || commonPattern.specialEng.test(value)) {
          callback(new Error('内容不能填写特殊字符'))
        } else {
          callback()
        }
      } else {
        callback()
      }
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
    // 获取分支机构
    getBranch() {
      branch({ typeId: 'FZJG' }).then(res => {
        if (res.code === 200) {
          this.organDoListData = res.data.list
        }
      })
    },
    // 上传文件提示
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length +
          fileList.length} 个文件，如要更换上传文件，请先删除已上传的文件。`
      )
    },

    beforeAvatarUpload(file) {
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
      return extension || (extension2 && isLt2M)
    },
    // 调取工作流
    callWorkFlow() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$store.dispatch('workFlow', { configCode: 'specialApply' })
          this.$store.dispatch('openWorkFlow', true)
        } else {
          return false
        }
      })
    },
    nextStep() {
      if (this.form.applyType.indexOf('6') === 0) {
        this.form.applyType = this.form.applyType + '-' + this.form.text
      }
      // const arry1 = this.tableData // 获取的数据
      // arry1.forEach(el => {
      //   const obj = {} // 新对象存我想要的字段
      //   const obj1 = {}
      //   obj.accountNum = el.accountNum
      //   obj.branchBank = el.branchBank
      //   obj.openBank = el.openBank
      //   obj1.name = el.name
      //   obj1.certificateNum = el.certificateNum
      //   obj1.certificateType = el.certificateType
      //   arrNew.push(obj)
      //   arrNew1.push(obj1)
      // })
      // this.form.accountDoList = arrNew
      this.form.mainDoList = this.form.tableData
      this.loading = true
      approvalStaus(this.form, this.workFlow2business)
        .then(res => {
          if (res.code === 200) {
            this.$message({
              type: 'success',
              message: res.message
            })
            this.loading = false
            this.$router.push({ name: 'analysisSpecial_query' })
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
    closeFn() {
      this.$router.push({ name: 'analysisSpecial_query' })
    },
    // 下拉框选中触发

    getValue(value) {
      this.form.text = ''
      if (this.form.applyType.indexOf('6') === 0) {
        this.textInp = true
      } else {
        this.textInp = false
      }
    },

    // 获取数字字典：专项类别
    getSpecial() {
      newBranch('ZXLB').then(res => {
        if (res.code === 200) {
          this.special = res.data
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
    },
    // 上传文件
    upSuccess(res, file) {
      if (res.code === 200) {
        this.form.applyId = res.data.noteId
        if (this.urldata === '') {
          this.urldata = res.data.noteId
        }
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
    // 下载模板
    // download() {
    //   window.location.href = 'http://192.168.50.77:8084/special-apply/download'
    // },
    // 下载模板
    download() {
      window.location.href = '/monitor/special-apply/download?token=' + this.token
    },
    // 选择文件
    handleSuccess(res, file) {
      if (res.code === 200) {
        // console.log(res.data)
        // this.form.accountDoList = res.data.accountDoList
        // this.form.mainDoList = res.data.mainDoList
        // var arr = []
        // this.form.accountDoList.forEach((item, index) => {
        //   const newObj = Object.assign(item, this.form.mainDoList[index])
        //   arr.push(newObj)
        // })
        res.data.mainDoList.forEach(buz => {
          // var obj = {}
          // for (var name in buz) {
          //   var obj = {}
          //   if (buz.hasOwnProperty(name)) {
          //     if (buz[name] === null) {
          //       obj[name] === ''
          //     } else {
          //       obj[name] === buz[name]
          //     }
          //   }
          //   alert(obj)
          // }
          this.form.tableData.push(buz)
        })
        // this.$forceUpdate()
        this.$message({
          message: '上传成功！',
          type: 'success'
        })
      } else {
        this.$message({
          message: res.message,
          type: 'error'
        })
        this.mainFileList.splice(1, 1)
      }
    },
    // 获取地址栏ID
    getRef() {
      this.ref.applyId = this.$route.query.id
      this.url = 'monitor/special-apply/' + this.ref.applyId
    },
    // 初始化页面回显
    initDetail(params, url) {
      this.loading = true
      if (this.ref.applyId) {
        getDetail(params, url)
          .then(res => {
            if (res.code === 200) {
              for (var key in res.data) {
                this.form[key] = res.data[key]
              }
              if (this.permissions_routers.indexOf(this.bc) !== -1) {
                this.isDisplay = true
              } else {
                this.isDisplay = false
              }
              if (this.permissions_routers.indexOf(this.fb) !== -1) {
                this.isHide = true
              } else {
                this.isHide = false
              }
              if (res.data.clueState === '6') {
                this.disabled = true
                this.disable
                this.isPublish = true
                this.isDisplay = false
                this.isHide = false
                this.isOver = true
              } else if (res.data.clueState === '2') {
                this.disabled = true
                this.isDisplay = false
                this.isHide = false
              } else if (res.data.clueState === '5') {
                this.disabled = true
                this.isDisplay = false
                this.isHide = false
              } else if (res.data.clueState === '3') {
                this.disabled = true
                this.isDisplay = false
                this.isHide = false
              } else if (res.data.clueState === '4') {
                this.isPublish = true
                this.disabled = true
                this.isDisplay = false
                this.isHide = false
              }
              if (res.data.attachDoList != null) {
                res.data.attachDoList.forEach(el => {
                  var obj = {}
                  obj.name = el.attachName
                  obj.id = el.attachId
                  this.fileList.push(obj)
                })
              }
              if (
                res.data.attachDoListResult !== null &&
                res.data.attachDoListResult.length !== 0
              ) {
                this.isPublish = true
                res.data.attachDoListResult.forEach(el => {
                  var obj = {}
                  obj.name = el.attachName
                  obj.id = el.attachId
                  // obj.noteId = el.noteId
                  this.fileListResult.push(obj)
                })
              }
              this.form.tableData = res.data.mainDoList
              this.allshow = true
              this.urldata = this.form.applyId
              // this.geturl()
              if (this.form.applyType.indexOf('6') === 0) {
                this.textInp = true
                const arr = this.form.applyType.split('-')
                this.form.applyType = arr[0]
                this.form.text = arr[1]
              }
              this.$nextTick(function() {
                this.loading = false
              })
            } else {
              this.loading = false
            }
          })
          .catch(() => {
            this.loading = false
          })
      } else {
        this.loading = false
      }
    },
    // 获取上传url

    // 提交线索
    publish() {
      if (this.form.applyType.indexOf('6') === 0) {
        this.form.applyType = this.form.applyType + '-' + this.form.text
      }
      // const arry1 = this.tableData // 获取的数据
      // arry1.forEach(el => {
      //   const obj = {} // 新对象存我想要的四个字段
      //   const obj1 = {}
      //   obj.accountNum = el.accountNum
      //   obj.branchBank = el.branchBank
      //   obj.openBank = el.openBank
      //   obj1.name = el.name
      //   obj1.certificateNum = el.certificateNum
      //   obj1.certificateType = el.certificateType
      //   arrNew.push(obj)
      //   arrNew1.push(obj1)
      // })
      // this.form.accountDoList = arrNew
      this.form.mainDoList = this.form.tableData
      clue(this.form).then(res => {
        this.$router.push({ name: 'analysisSpecial_query' })
      })
      // this.$refs['form'].validate(valid => {
      //   if (valid) {
      //     //
      //     analyst(this.form).then(res => {

      //     })
      //   } else {
      //     return false
      //   }
      // })
    },
    // 保存
    preserve() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = true
          if (this.form.applyType.indexOf('6') === 0) {
            this.form.applyType = this.form.applyType + '-' + this.form.text
          }
          this.form.mainDoList = this.form.tableData
          save(this.form)
            .then(res => {
              if (res.code === 200) {
                this.loading = false
                this.$message({
                  message: '保存成功！',
                  type: 'success'
                })
                this.$router.push({ name: 'analysisSpecial_query' })
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
      // const arry1 = this.tableData // 获取的数据
      // arry1.forEach(el => {
      //   const obj = {} // 新对象存我想要的四个字段
      //   const obj1 = {}
      //   obj.accountNum = el.accountNum
      //   obj.branchBank = el.branchBank
      //   obj.openBank = el.openBank
      //   obj1.name = el.name
      //   obj1.certificateNum = el.certificateNum
      //   obj1.certificateType = el.certificateType
      //   arrNew.push(obj)
      //   arrNew1.push(obj1)
      // })
      // this.form.accountDoList = arrNew
    }
  },
  created() {
    this.getRef()
    this.initDetail('', this.url)
  },

  mounted() {
    this.getBranch()
    this.getSpecial()
    this.getTypeId()
    this.getUrl()
  }
}
</script>

<style lang="scss">
.analysisSpecial-clueSave {
  .formBlock {
    margin-bottom: 20px;
    .el-select {
      width: 100%;
    }
  }
  .dialog-block {
    .title {
      // font-size: 16px;
      // color: #333;
      margin-bottom: 10px;
    }
    .task {
      margin-bottom: 30px;
      // .title {
      //   font-size: 16px;
      //   color: #333;
      //   margin-bottom: 10px;
      // }
    }
    // .el-transfer__button.el-button--primary {
    //   min-width: 32px;
    //   min-height: 32px;
    // }
  }
}
</style>
