<template>
  <div class="macroAnalysis_add">
    <el-card>
      <el-form :model="form" label-width="140px" :rules="rules" ref="form">
        <el-row>
          <el-col :span="20">
            <el-form-item label="分析报告类型：">
              <el-select v-model="form.type" placeholder="请选择" style="width:100%;" :disabled="isDisabled" clearable >
                <el-option label="灰皮书" value="0"></el-option>
                <el-option label="红皮书" value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="标题：" prop="title">
              <el-input v-model="form.title" placeholder="请输入标题最长50字符数" :disabled="isDisabled"  maxlength="50"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="内容：" prop="content">
              <el-input v-model="form.content" type="textarea" :rows="10" placeholder="请输入内容最长500字符数" :disabled="isDisabled"  maxlength="500"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20" v-if="!isDisabled">
            <el-form-item label="附件：" required>
              <el-upload
                class="upload-container"
                drag
                :limit="1"
                :action="formUrl"
                :file-list="fileList"
                :headers="headers"
                :onSuccess="uploadSuccess"
                :on-progress="handleProgress"
                :on-exceed="exceedProgress"
                :on-remove="removeProgress"
                :beforeUpload="beforeAvatarUpload"
              >
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">
                  将文件拖到此处，或
                  <em>点击上传</em>
                </div>
                <div class="el-upload__text">
                  最大不能超过500M
                </div>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="24" v-if="form.upLoadData.annexName !== ''">
            <el-form-item label="附件下载：">
             <el-button type="text" @click="getAttach(form.upLoadData.annexId)">{{form.upLoadData.annexName}}</el-button>
             <!-- <el-button v-if="!isDisabled" type="primary" plain style="margin-left: 100px" @click="isUpload">附件更换</el-button> -->
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="发布对象：">
          <el-checkbox-group v-model="form.publishName" :disabled="isDisabled">
            <el-checkbox label="0">中心用户</el-checkbox>
            <el-checkbox label="1">分支机构用户</el-checkbox>
            <el-checkbox label="2">反洗钱局</el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <!-- <div style="text-align:center;" v-if="!isDisabled">
          <el-button type="primary" plain @click="goTopFn" style="width:100px;">返 回</el-button>
          <el-button type="primary" plain @click="callWorkFlow" style="width:100px;margin-left:20px;" :disabled="false">提交审核</el-button>
        </div> -->
      </el-form>
      <monitor-workflow></monitor-workflow>
    </el-card>
  </div>
</template>

<script>
import { getToken } from '@/utils/auth'
import { mapGetters } from 'vuex'
import { common_Validate } from '@/utils/formValidate'
import { updateForm } from '@/api/sys-monitoringAnalysis/reportManage/add.js'
export default {
  data() {
    return {
      isDisabled: true,
      loading: null,
      fileList: [],
      fileData: [],
      fileName: '',
      fileArry: [],
      form: {
        type: '',
        id: '',
        title: '',
        content: '',
        status: '',
        upLoadData: {
          annexId: '',
          annexName: ''
        },
        publishName: []
      },
      updateID: '0', // 工作流正常审批，退回在提交是1
      token: getToken(),
      headers: {
        Authorization: getToken()
      },
      // formUrl: 'http://10.10.121.98:8010/hbase'
      rules: {
        title: [
          { validator: common_Validate, trigger: 'blur' },
          { required: true, message: '内容不能为空且不能超过50个字符', trigger: 'blur' }
        ],
        content: [
          // { validator: common_Validate, trigger: 'blur' },
          { required: true, message: '内容不能为空且不能超过500个字符', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['businessFlag', 'workFlow2business', 'formContent']),
    formUrl() {
      return `/monitor/macrographyReport/import`
    },
    paramsObj() {
      const obj = Object.assign({}, this.form)
      const newObj = {
        type: obj.type,
        status: obj.status,
        title: obj.title,
        id: obj.id,
        content: obj.content,
        annexName: obj.upLoadData.annexName,
        annexId: obj.upLoadData.annexId,
        updateID: sessionStorage.getItem('actDefName') === '结束' ? '0' : '1',
        publishName: obj.publishName.join(','),
        workflow: this.workFlow2business
      }
      newObj.workflow.name = sessionStorage.getItem('actDefName')
      return newObj
    }
  },
  watch: {
    businessFlag(val) {
      if (val) this.updateForm()
      this.$store.dispatch('changeFlag', false)
    },
    formContent: {
      handler(newVal, oldVal) {
        if (newVal.workflow.nodeAttributes) {
          if (newVal.workflow.nodeAttributes.length > 0) {
            if (newVal.workflow.nodeAttributes[0].extendKey === 'editFlag' && newVal.workflow.nodeAttributes[0].extendValue === 'Y') {
              this.isDisabled = false
            } else {
              this.isDisabled = true
            }
          }
        }
        this.form.type = newVal.type
        this.form.status = newVal.status
        this.form.id = newVal.id
        this.form.title = newVal.title
        this.form.content = newVal.content
        this.form.upLoadData.annexName = newVal.annexName
        this.form.upLoadData.annexId = newVal.annexId
        if (newVal.annexName !== '') {
          this.fileArry.push(newVal.annexName)
        }
        if (newVal.publishName !== '') {
          this.form.publishName = newVal.publishName.split(',')
        } else {
          this.form.publishName = []
        }
        sessionStorage.setItem('formId', newVal.workflow.formId)
      }
    }
  },
  methods: {
    handleProgress(file, fileList) {
      this.loading = this.$loading({
        lock: true,
        text: '文件正在上传，请耐心等待',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.8)'
      })
    },
    // 是否更换文件
    isUpload() {
      this.form.upLoadData.annexName = ''
      this.fileArry = []
    },
    // 文件下载
    getAttach(id) {
      location.href = `/file-service/upload/download-file/${id}?token=${getToken()}&moduleName=${encodeURI('宏观分析')}`
    },
    // 调取工作流
    callWorkFlow() {
      this.$refs['form'].validate(valid => {
        if (this.fileArry.length === 0) {
          this.$message({
            message: '请上传附件',
            type: 'error',
            duration: 6000
          })
          return
        } else {
          this.$store.dispatch('workFlow', { configCode: 'mpReportManagement' })
          this.$store.dispatch('openWorkFlow', true)
        }
      })
    },
    goTopFn() {
      this.$router.go(-1)
    },
    updateForm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.fileArry.length === 0) {
            this.$message({
              message: '请上传附件',
              type: 'error',
              duration: 6000
            })
          } else {
            const loadingA = this.$loading({
              lock: true,
              text: '提交中...',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)'
            })
            updateForm(this.paramsObj).then(res => {
              if (res.code === 200) {
                this.$message({
                  message: '提交成功',
                  type: 'success',
                  duration: 6000
                })
                loadingA.close()
                this.$store.dispatch('changeFlag', false)
                setTimeout(() => {
                  this.$router.push({ name: 'home' })
                }, 1000)
              }
            }).catch(() => {
              loadingA.close()
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
    exceedProgress(file, fileList) {
      this.$message({
        message: '当前限制选择 1 个文件，本次选择了 1 个文件，共选择了 2 个文件，如要更换上传文件，请先删除已上传的文件。',
        type: 'warning',
        duration: 6000
      })
    },
    removeProgress(file, fileList) {
      this.fileArry = fileList
      // this.$refs.form.clearValidate('upload')
      this.form.upLoadData.annexName = ''
      this.form.upLoadData.annexId = ''
    },
    // 上传成功后的回调
    uploadSuccess(response, file, fileList) {
      if (response.code === 200) {
        this.fileArry = fileList
        this.form.upLoadData.annexName = file.name
        this.form.upLoadData.annexId = response.data
        this.fileData = response.data
        this.fileName = file.name
        this.$message({
          message: '上传成功',
          type: 'success',
          duration: 6000
        })
        this.loading.close()
      } else {
        this.$message({
          message: response.message,
          type: 'error',
          duration: 6000
        })
        this.loading.close()
        fileList.splice(fileList.indexOf(file), 1)
      }
    },
    // 上传前对文件的大小的判断
    beforeAvatarUpload(file) {
      // const extension = file.name.split('.')[1] === 'xls'
      // const extension2 = file.name.split('.')[1] === 'xlsx'
      // const extension3 = file.name.split('.')[1] === 'doc'
      // const extension4 = file.name.split('.')[1] === 'docx'
      const isLt2M = file.size / 1024 / 1024 < 500
      // if (!extension && !extension2 && !extension3 && !extension4) {
      //   this.$message.error('上传模板只能是 xls、xlsx、doc、docx 格式!')
      // }
      if (!isLt2M) {
        this.$message({
          message: '上传文件大小不能超过 500MB!',
          type: 'error',
          duration: 6000
        })
      }
      return isLt2M
      // return extension || extension2 || extension3 || (extension4 && isLt2M)
    }
  }
}
</script>

<style lang="scss" scoped>
.upload-container {
    .el-upload {
      width: 100%;
      .el-upload-dragger {
        width: 100%;
      }
    }
}
</style>