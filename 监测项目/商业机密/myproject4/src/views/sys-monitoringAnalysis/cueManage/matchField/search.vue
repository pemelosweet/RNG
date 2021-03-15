<template>
  <div>
    <el-form :rules="rules" :model="ruleForm" ref="ruleForm">
      <div>
        <h4>请选择查询类型</h4>
        <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item label="查询类型："  label-width="100px" prop="type">
              <el-select v-model="ruleForm.type" prop='type' @change='colseSubject' placeholder="请选择" clearable style="width:100%;">
                <el-option label="公民身份证件信息" value="own"></el-option>
                <el-option label="公民出入境证件信息" value="other"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="查询方式：" label-width="100px" prop="mode">
              <el-select v-model="ruleForm.mode" prop='mode' @change='colseSubject' placeholder="请选择" clearable style="width:100%;">
                <el-option label="单个查询" value="single"></el-option>
                <el-option label="批量查询" value="batch"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <div>
        <h4>请输入查询条件</h4>
        <el-row :gutter="20" v-if="ruleForm.type === 'own' && ruleForm.mode==='single'">
          <el-col :span="10">
            <el-form-item label="姓 名：" prop="name" label-width="100px" :rules="[{ required: true, message: '请输入姓名', trigger: 'blur' },{validator:isValidInput, trigger: 'blur'}]">
              <el-input v-model="ruleForm.name" maxlength="50"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="证件号码：" prop="credNo" label-width="100px" :rules="[{ required: true, message: '请输入证件号码', trigger: 'blur' },{ pattern: /^[a-zA-Z0-9]{15}$|^[a-zA-Z0-9]{18}$/, message: '请输入正确的身份证号码,15或18位', trigger: 'blur' }]">
              <el-input v-model="ruleForm.credNo" maxlength="128"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" v-if="ruleForm.type === 'other' && ruleForm.mode==='single'" :rules="[{validator:isValidInput, trigger: 'blur'}]">
          <el-col :span="10">
            <el-form-item label="姓 名：" prop="name" label-width="100px">
              <el-input v-model="ruleForm.name" maxlength="50"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="护照号码：" prop="credNo" label-width="100px" :rules="[{ required: true, message: '请输入护照号码', trigger: 'blur' },{validator:isValidInput, trigger: 'blur'}]">
               <el-input v-model="ruleForm.credNo" maxlength="128"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" v-if="ruleForm.mode==='batch' && ruleForm.type !==''">
          <el-col :span="16" >
          <el-upload class="upload-container" ref="upload" :headers="headers" :accepts="['xls','xlsx']" drag :file-list="fileList"  :on-success="onSuccess" :on-error="onError" :before-upload="beforeUpload"  :action="uploadURL" multiple :auto-upload="autoUpload">
           <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或
              <em>点击上传</em>
            </div>
          </el-upload>
          </el-col>
          <el-col :span="8">
            <el-form-item label="模板下载：" label-width="100px">
              <el-button type="text" @click="templateDownload"><i class="el-icon-download"></i>下载模板</el-button>
              <!-- <router-link to="">公民身份证信息上传模板.xls</router-link> -->
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <div style="padding:30px; textAlign:center">
        <!-- <el-button type="primary" @click="dialogVisible = true">查 询</el-button> -->
        <el-button type="primary"  @click="submitForm('ruleForm')" v-if="ruleForm.mode!=='batch'">查 询</el-button>
         <el-button @click="resetForm('ruleForm')">清 空</el-button>
      </div>


    </el-form>

    <el-dialog title="系统提示" :visible.sync="dialogVisible">
      <p style="textAlign:center">中心数据库内暂无您提交的部分数据，是否向外部单位发起查询请求？</p>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="activeFn">确 定</el-button>
      </div>
    </el-dialog>


  </div>
</template>

<script>
import { singleper, singlecuru } from '@/api/sys-monitoringAnalysis/cueManage/matchField/search.js'
import FileUpload from '@/components/FileUpload/index'
import { commonPattern } from '@/utils/formValidate'
import { getToken } from '@/utils/auth'
export default {
  components: {
    FileUpload
  },
  props: {
    inputName: Boolean
  },

  data() {
    return {
      md5Id: '',
      total: 0,
      inputNames: '',
      ruleForm: {
        source: '',
        type: '',
        credNo: '',
        mode: '',
        name: ''
      },
      listData: [],
      status: '',
      searchObj: '',
      accepts: ['xls', 'xlsx'],
      rules: {
        type: [{ required: true, message: '请选择查询类型', trigger: 'blur' }],
        source: [{ required: true, message: '请选择查询类型', trigger: 'blur' }],
        mode: [{ required: true, message: '请选择查询类型', trigger: 'blur' }]
      },
      dialogVisible: false,
      fileList: [],
      fileName: '',
      autoUpload: true,
      partData: [],
      token: getToken(),
      headers: {
        Authorization: getToken()
      }
    }
  },
  computed: {
    searchParams() {
      const obj = Object.assign({}, this.ruleForm)
      return obj
    },
    getParamter() {
      const obj = Object.assign({}, this.ruleForm)
      const newObj = {
        source: 'center',
        type: obj.type,
        mode: obj.mode,
        name: obj.name,
        credNo: obj.credNo
      }
      return newObj
    },
    uploadURL() {
      console.log(this.ruleForm.type)
      if (this.ruleForm.type === 'own') {
        return `monitor/information/match-batchper?mode=batch&type=${this.ruleForm.type}&token=${this.token}`
      } else {
        return `monitor/information/match-batchcuru?mode=batch&type=${this.ruleForm.type}&token=${this.token}`
      }
    }
  },
  watch: {
    // // 通过点击tabs进行清空
    // inputName() {
    //   this.resetForm('ruleForm')
    // },
    // // 通过上传文件后进行清空
    // inputNames() {
    //   this.resetForms('ruleForm')
    // }
  },
  created() {
    // console.log(this.inputName)
    // this.inputNames = this.inputName
  },
  methods: {
    // 下载模板
    templateDownload() {
      location.href = `monitor/information/download-exceltemplate?token=${this.token}`
    },
    resetForm(formName) {
      // alert(11)
      this.$refs[formName].resetFields()
      this.ruleForm = {
        source: '',
        type: '',
        credNo: '',
        mode: '',
        name: ''
      }
    },
    resetForms(formName) {
      // alert(22)
      this.$refs[formName].resetFields()
      this.ruleForm = {
        source: '',
        type: '',
        credNo: '',
        mode: '',
        name: ''
      }
    },
    activeFn() {
      sessionStorage.setItem('searchFlag', 'true')
      const obj = {
        activeName: '2',
        mode: this.ruleForm.mode,
        source: this.ruleForm.source,
        type: this.ruleForm.type,
        credNo: this.ruleForm.credNo,
        name: this.ruleForm.name,
        data: this.listData,
        total: this.total,
        md5Id: this.md5Id,
        status: this.status,
        message: this.message,
        searchObj: this.searchObj
      }
      this.$emit('activeName', obj)
      // this.dialogVisible = false
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit('loading', true)
          const obj = {}
          for (var key in this.getParamter) {
            if (this.getParamter[key] === '') {
              delete this.getParamter[key]
            }
            obj[key] = this.getParamter[key]
          }
          this.searchObj = obj
          // 身份证单个查询
          if (this.getParamter.type === 'own') {
            singleper(obj).then(res => {
              if (res.code === 200) {
                if (res.data.list) {
                  this.listData = res.data.list
                  this.total = res.data.total
                } else {
                  this.listData = []
                  this.total = 0
                }
                this.message = res.message
                this.status = res.data.status
                this.$emit('loading', false)
                this.activeFn()
              }
            }).catch(res => {
              this.$emit('loading', false)
            })
          } else {
            // 出入境单个查询
            singlecuru(obj).then(res => {
              if (res.code === 200) {
                if (res.data.list) {
                  this.listData = res.data.list
                  this.total = res.data.total
                }
                this.message = res.message
                this.status = res.data.status
                this.$emit('loading', false)
                this.activeFn()
              }
            }).catch(res => {
              this.$emit('loading', false)
            })
          }

          // this.dialogVisible = true
        } else {
          return false
        }
      })
    },
    beforeUpload() {
      this.$emit('loading', true)
    },
    onSuccess(response, file, fileList) {
      if (response.code === 200) {
        this.md5Id = response.data.md5FromExcel
        this.status = response.data.status
        if (response.data.list) {
          this.listData = response.data.list
          this.total = response.data.total
        }
        this.message = response.message
        // const fd2 = new FormData()
        // fd2.append('file', file.raw)
        // for (var key in this.getParamter) {
        //   if (this.getParamter[key] !== '') {
        //     fd2.append(key, this.getParamter[key])
        //   }
        // }
        // this.searchObj = fd2
        const obj = {}
        obj.file = file.raw
        for (var key in this.getParamter) {
          if (this.getParamter[key] === '') {
            delete this.getParamter[key]
          }
          obj[key] = this.getParamter[key]
        }
        this.searchObj = obj
        console.log(this.searchObj)
        this.$emit('loading', false)
        this.activeFn()
        this.$refs.upload.clearFiles()
      } else {
        this.fileList.pop()
        this.$emit('loading', false)
        this.$refs.upload.clearFiles()
        this.$message({
          message: response.message,
          type: 'warning',
          duration: 6000
        })
      }
    },
    onError(errors, file, fileList) {
      console.log(arguments, 'onError')
      this.$message.error('文件上传失败')
    },
    isValidInput(rule, value, callback) {
      if (!commonPattern.spaceBar.test(value)) {
        callback(new Error('内容不能含有空格'))
      } else if (commonPattern.specialCharInQuery.test(value)) {
        callback(new Error('内容不能填写特殊字符'))
      } else {
        callback()
      }
    },
    colseSubject() {
      this.ruleForm.credNo = ''
      this.ruleForm.name = ''
      this.$refs.ruleForm.clearValidate()
    }
  }

}
</script>

<style scoped>

</style>
