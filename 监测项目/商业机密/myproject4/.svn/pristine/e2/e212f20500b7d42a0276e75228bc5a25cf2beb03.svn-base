<template>
  <div class="apporderwrap" v-loading="sLoading" element-loading-text="提交中，请稍侯..." element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.2)">
    <el-card>
      <!-- <div slot="header">
        <span>数据录入审批单</span>
      </div> -->
      <monitor-workflow></monitor-workflow>
      <el-tabs
        v-model="activeName"
        @tab-click="handleClick"
      >
        <div style="text-align:center">
          <h3>录入数据审批单</h3>
        </div>
        <el-tab-pane
          label="数据录入审批单"
          name="first"
        >
          <div class="styleFist">
            <el-form
              :model="inputForm"
              ref="refForm"
              :rules="inputFormRules"
              label-width="110px"
            >
              <el-row>
                <el-col
                  :span="12"
                  style="border-right:0"
                >
                  <el-form-item
                    label="录入方式"
                    prop="appInputmode"
                  >
                    <el-select
                      :disabled="isDisabled"
                      style="width:100%"
                      v-model="inputForm.appInputmode"
                      placeholder="请选择"
                      @change="modeTadiaChange"
                    >
                      <el-option
                        v-for="(item, index) in optionsmode"
                        :key="index"
                        :label="item.label"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item
                    label="录入类型"
                    prop="appInputtype"
                  >
                    <el-select
                      :disabled="isDisabled"
                      @change="clearTypes"
                      style="width:100%"
                      v-model="inputForm.appInputtype"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="(item, index) in options"
                        :key="index"
                        :label="item.label"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col
                  :span="24"
                  v-if="inputForm.appInputtype==='3'"
                >
                  <el-form-item
                    label="文件类型"
                    prop="filetype"
                  >
                    <el-select
                      clearable
                      style="width:100%"
                      :disabled="isDisabled"
                      v-model="inputForm.filetype"
                      placeholder="请选择"
                    >
                      <el-option
                        label="协查"
                        value="协查"
                      ></el-option>
                      <el-option
                        label="通报"
                        value="通报"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col
                  :span="24"
                  v-else
                >
                  <el-form-item
                    label="文件类型"
                    prop="filetype"
                  >
                    <el-input
                      :disabled="isDisabled"
                      v-model="inputForm.filetype"
                      maxlength="20"
                      placeholder="请输入文件类型，最长为20字符"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item
                    label="信息来源"
                    prop="inforsource"
                  >
                    <el-input
                      :disabled="isDisabled"
                      v-model="inputForm.inforsource"
                      maxlength="20"
                      placeholder="请输入信息来源，最长为20字符"
                    ></el-input>
                  </el-form-item>
                </el-col>

              </el-row>
              <el-row>
                <el-col
                  :span="12"
                  style="border-right:0"
                >
                  <el-form-item
                    label="申请人"
                    prop=""
                  >
                    <el-input
                      disabled
                      v-model="inputForm.proposer"
                      maxlength="20"
                      placeholder="请输入申请人,最长为20字符"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item
                    label="申请处室"
                    prop=""
                  >
                    <el-input
                      :disabled="isDisabled"
                      v-model="inputForm.applyOffice"
                      maxlength="20"
                      placeholder="请输入申请处室，最长为20字符"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col
                  :span="12"
                  style="border-right:0"
                >
                  <el-form-item
                    label="申请时间"
                    prop=""
                  >
                    <el-date-picker
                      :disabled="isDisabled"
                      style="max-width:100%;min-width:100%;"
                      v-model="inputForm.applyTime"
                      type="date"
                      :picker-options="pickerOptions"
                      value-format="yyyy-MM-dd"
                      placeholder="选择日期"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item
                    label="录入时间"
                    prop="inputTime"
                  >
                    <el-date-picker
                      disabled
                      style="max-width:100%;min-width:100%;"
                      v-model="inputForm.inputTime"
                      type="date"
                      :picker-options="pickerOptions"
                      value-format="yyyy-MM-dd"
                      placeholder="选择日期"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24" >
                  <el-form-item
                    label="录入内容"
                    prop="inputContent"
                  >
                    <el-input
                      :disabled="isDisabled"
                      maxlength="200"
                      type="textarea"
                      v-model="inputForm.inputContent"
                      placeholder="请输入录入内容，最长为200字符"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item
                    label="内容描述"
                    prop=""
                  >
                    <el-input
                    type="textarea"
                      :disabled="isDisabled"
                      v-model="inputForm.contentDesc"
                      maxlength="200"
                      placeholder="请输入内容描述，最长为200字符"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item
                    label="备注"
                    prop=""
                  >
                    <el-input
                    type="textarea"
                      :disabled="isDisabled"
                      v-model="inputForm.remark"
                      maxlength="200"
                      placeholder="请输入备注，最长为200字符"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item
                    label="处领导审批"
                    prop=""
                  >
                    <el-input
                      disabled
                      v-model="inputForm.chuApproval"
                      maxlength="50"
                      placeholder="请输入处领导审批，最长为50字符"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item
                    label="中心领导审批"
                    prop=""
                  >
                    <el-input
                      disabled
                      v-model="inputForm.centreApproval"
                      maxlength="50"
                      placeholder="请输入中心领导审批，最长为50字符"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item
                    label="附件"
                    prop=""
                  >
                    <el-upload
                      v-if="this.$route.query.pageFlag !== 'look'"
                      class="upload-demo"
                      :auto-upload="false"
                      ref="refUpload"
                      :action="actionUrl"
                      :on-change="changeUpload"
                      :on-success="handleSuccess"
                    >
                      <el-button
                        size="small"
                        type="primary"
                       v-if="!isDisabled"
                      >选择文件</el-button>
                    </el-upload>

                    <div>
                      <div
                        v-for="(item,idx) in fileList"
                        :key="idx"
                      >
                        <el-button
                          @click="hanldDownload(item.attachId)"
                          type="text"
                          style="float:left;line-height:24px;padding-top:7px;margin-left:15px"
                        >{{item.attachName}} 
                        </el-button>
                        <el-button
                          type="text"
                          style="float:left;line-height:24px;padding-top:7px;margin-left:15px"
                        >
                          <span
                            v-if="!isDisabled"
                            class="el-icon-close"
                            @click="DelDownload(item.attachId)"
                          ></span>
                          <span
                            class="el-icon-download"
                            @click="hanldDownload(item.attachId)"
                          ></span>
                        </el-button>
                        <div style="clear:both"></div>
                      </div>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <div
              style="text-align:center;margin-top:10px;"
              v-if="this.inputForm.inputStuts==='退回'||this.inputForm.inputStuts==='录入审核单'"
            >
              <el-button
                type="primary"
                plain
                @click="handleSave"
                :loading="subLoading"
              >保存</el-button>
            </div>
          </div>

        </el-tab-pane>
      </el-tabs>

    </el-card>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { noSpaceAndTs } from '@/utils/formValidate.js'
import { delloadapi, sendSaveapi } from '@/api/sys-monitoringAnalysis/cueManage/dataEntry/add.js'
import {
  getfileListapi,
  updateFlowapi
} from '@/api/sys-monitoringAnalysis/cueManage/dataEntry/add.js'
export default {
  name: 'approvalOrder',
  props: {
    formData: {
      type: Object
    }
  },
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7
        }
      },
      Hid: '',
      fileTypes: '',
      enclosure: '',
      sLoading: false,
      subLoading: false,
      isDisabled: true,
      fileList: [],
      activeName: 'first',
      fileNum: 0,
      inputForm: {
        appInputtype: '',
        appInputmode: '',
        filetype: '',
        inforsource: '',
        proposer: '',
        applyOffice: '',
        applyTime: '',
        inputTime: '',
        inputContent: '',
        accessory: '',
        contentDesc: '',
        remark: '',
        chuApproval: '',
        centreApproval: ''
      },
      tableData: [],
      options: [
        {
          value: '1',
          label: '国际协查请求信息'
        },
        {
          value: '2',
          label: '反馈信息'
        },
        {
          value: '3',
          label: '境内协查类文件管理'
        },
        {
          value: '4',
          label: '公文函件 '
        },
        {
          value: '5',
          label: '其他'
        }
      ],
      optionsmode: [
        {
          value: '1',
          label: '手工录入'
        },
        {
          value: '2',
          label: '介质传输'
        }
      ],
      // rules
      inputFormRules: {
        appInputtype: [{ required: true, message: '内容不能为空', trigger: 'change' }],
        appInputmode: [{ required: true, message: '内容不能为空', trigger: 'change' }],
        filetype: [
          { required: true, message: '内容不能为空', trigger: 'blur' },
          { validator: noSpaceAndTs, trigger: 'blur' }
        ],
        // inforsource: [{ validator: noSpaceAndTs, trigger: 'blur' }],
        proposer: [{ validator: noSpaceAndTs, trigger: 'blur' }],
        applyOffice: [{ validator: noSpaceAndTs, trigger: 'blur' }],
        inputTime: [{ required: true, message: '内容不能为空', trigger: 'change' }],
        inputContent: [
          { required: true, message: '内容不能为空', trigger: 'blur' }
          // { validator: noSpaceAndTs, trigger: 'blur' }
        ],
        accessory: [{ validator: noSpaceAndTs, trigger: 'blur' }],
        contentDesc: [{ validator: noSpaceAndTs, trigger: 'blur' }],
        remark: [{ validator: noSpaceAndTs, trigger: 'blur' }],
        chuApproval: [{ validator: noSpaceAndTs, trigger: 'blur' }],
        centreApproval: [{ validator: noSpaceAndTs, trigger: 'blur' }]
      }
    }
  },
  computed: {
    ...mapGetters(['businessFlag', 'workFlow2business', 'formContent']),
    actionUrl() {
      return `/monitor/inputafter/upload-allAfterInput?aId=${this.Hid}&fileType=0`
    },
    inputForms() {
      const obj = Object.assign({}, this.inputForm)
      obj.proposer = this.name
      return obj
    }
  },

  mounted() {},
  watch: {
    businessFlag(val) {
      console.log(val, '21122')
      if (val) {
        this.handleSubmit()
        // this.$store.dispatch('changeFlag', false)
      }
    },
    formContent: {
      handler(newVal, oldVal) {
        if (newVal.workflow) {
          if (newVal.workflow.nodeAttributes) {
            if (newVal.workflow.nodeAttributes.length > 0) {
              if (
                newVal.workflow.nodeAttributes[0].extendKey === 'editFlag' &&
              newVal.workflow.nodeAttributes[0].extendValue === 'Y'
              ) {
                this.isDisabled = false
              } else {
                this.isDisabled = true
              }
            }
          }
        }
        this.inputForm = newVal.approvalData
        this.Hid = newVal.approvalData.aId
        getfileListapi(this.Hid).then(res => {
          if (res.code === 200) {
            this.fileList = res.data
          }
        })
      },
      deep: true
    }
  },
  methods: {
    // 获取数据
    getData(res) {
      this.inputForm = res.approvalData
    },
    baoParamter() {
      var paramsObj = {
        ApprovalData: this.inputForms, // 数据录入审批单
        aId: this.Hid
      }
      sendSaveapi(paramsObj)
        .then(res => {
          if (res.code === 200) {
            this.$message({
              message: '保存成功',
              type: 'success',
              duration: 6000
            })
            this.$router.go(-1)
          } else {
            this.subLoading = false
          }
        })
        .catch(() => {
          this.subLoading = false
        })
    },
    changeUpload(file, fileList) {
      if (file.status === 'ready') {
        const fileArr = []
        fileList.forEach(el => {
          fileArr.push(el.name)
        })
        fileArr.pop()
        if (fileArr.indexOf(file.name) === -1) {
          // console.log(a);
        } else {
          this.$message({
            message: '上传文件名不能相同',
            type: 'warning',
            duration: 6000
          })
          fileList.pop()
        }
        if (fileList.length > 1) {
          var step = 0
          for (let i = 0; i < fileList.length; i++) {
            step++
            fileList.pop()
          }
          if (step === fileList.length) {
            this.$message({
              message: '最多只可以上传一个附件',
              type: 'warning',
              duration: 6000
            })
          }
        }
        const isLt2k = file.size / 1024 / 1024 > 500
        if (isLt2k) {
          this.$message({
            message: '上传文件大小不能超过500M!',
            type: 'warning',
            duration: 6000
          })
          fileList.pop()
        } else {
          this.filelength = fileList.length
          this.enclosure = file
        }
      }
    },
    handleSuccess(file, fileList) {
      this.fileNum++
      if (this.fileNum === this.filelength && this.fileTypes === 'baocun') {
        this.baoParamter()
      } else if (this.fileNum === this.filelength && this.fileTypes !== 'baocun') {
        this.realSub()
      }
    },
    //  删除附件
    DelDownload(id) {
      delloadapi(id)
        .then(res => {
          if (res.code === 200) {
            this.$message({
              message: '删除成功',
              type: 'success',
              duration: 6000
            })
          }
        })
        .then(() => {
          this.fileList.filter((item, index) => {
            if (item.attachId.indexOf(id) !== -1) {
              this.fileList.splice(index, 1)
            }
          })
        })
    },
    // 下载附件
    hanldDownload(id) {
      location.href = `/file-service/upload/download/${id}?moduleName=` + encodeURI('线索管理')
    },
    clearTypes() {
      this.inputForm.filetype = ''
    },
    // 成功或失败
    successOrError(msg, type, time) {
      this.$message({
        message: msg || '操作成功',
        type: type || 'info',
        duration: time || 6000
      })
    },
    // tabs
    handleClick(tab, event) {},
    handleSave() {
      this.$refs.refForm.validate(valid => {
        if (valid) {
          this.subLoading = true
          if (this.enclosure !== '') {
            this.fileTypes = 'baocun'
            this.$refs.refUpload.submit()
          } else {
            this.baoParamter()
          }
        }
      })
    },
    // 录入方式
    modeTadiaChange(val) {
      const internRadiosMo = [
        {
          value: '1',
          label: '国际协查文件管理'
        },
        {
          value: '2',
          label: '反馈信息'
        },
        {
          value: '3',
          label: '境内协查类文件管理'
        },
        {
          value: '4',
          label: '公文函件 '
        },
        {
          value: '5',
          label: '其他'
        }
      ]
      const handRadios = [
        {
          value: '1',
          label: '国际协查文件管理'
        },
        {
          value: '2',
          label: '反馈信息'
        },
        {
          value: '3',
          label: '境内协查类文件管理'
        }
      ]
      if (val === '2') {
        this.options = internRadiosMo
      } else {
        this.options = handRadios
      }
      this.inputForm.appInputtype = ''
      setTimeout(() => {
        this.$refs.refForm.clearValidate()
      }, 10)
    },

    // 提交 - 走流程
    handleSubmit() {
      this.sLoading = true
      if (this.enclosure !== '') {
        this.fileTypes = 'tijiao'
        this.$refs.refUpload.submit()
      } else {
        this.realSub()
      }
    },
    realSub() {
      var paramsObj = {
        ApprovalData: this.inputForm, // 数据录入审批单
        workflow: this.workFlow2business,
        aId: this.inputForm.aId
      }
      updateFlowapi(paramsObj).then(res => {
        if (res.code === 200) {
          this.sLoading = false
          this.$message({
            message: '提交成功',
            type: 'success'
          })
        } else {
          this.sLoading = true
        }
        this.$router.push({
          name: 'monitor_workPlatform'
        })
        this.$store.dispatch('changeFlag', false)
      }).catch(() => {
        this.sLoading = true
      })
    }
  }
}
</script>

<style lang="scss">
.apporderwrap {
  .styleFist {
    .el-col {
      border: 1px solid #727475;
      border-bottom: 10px;
    }
    .el-row:last-of-type .el-col {
      border: 1px solid #727475;
    }
    .el-form-item {
      margin-bottom: 0px;
      //   padding: 5px;
    }
    .el-form-item__label {
      padding: 12px;
      border-right: 1px solid #727475;
      //   background: #ebeff1;
    }
    .el-form-item__content {
      padding: 12px;
      padding-bottom: 0;
    }
    .el-form-item__content::before {
      //   border: 1px solid #303133;
      content: '';
    }
      .el-textarea__inner{
        margin-top: -8px;

  }
    .el-upload {
      float: left;
    }
    .el-upload-list {
      float: left;
    }
    .el-upload-list__item {
      float: left;
      width: 200px;
    }
    .el-form-item__error{
         z-index: 1;
    }
  }
}
</style>
