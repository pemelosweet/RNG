<template>
  <div class="macroAnalysis_add">
    <el-card>
      <el-form :model="form" label-width="140px" :rules="rules" ref="form">
        <el-row>
          <el-col :span="20">
            <el-form-item label="分析报告类型：">
              <el-select v-model="form.type" placeholder="请选择" style="width:100%;" clearable>
                <el-option label="灰皮书" value="0"></el-option>
                <el-option label="红皮书" value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="标题：" prop="title">
              <el-input v-model="form.title" placeholder="请输入标题最长50字符数" maxlength="50" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="内容：" prop="content">
              <el-input v-model="form.content" type="textarea" :rows="10" placeholder="请输入内容最长500字符数" maxlength="500"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="附件：" required>
              <el-upload
                class="upload-container"
                drag
                :limit="1"
                :action="formUrl"
                :file-list="fileList"
                :headers="headers"
                :onSuccess="uploadSuccess"
                :beforeUpload="beforeAvatarUpload"
              >
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">
                  将文件拖到此处，或
                  <em>点击上传</em>
                </div>
              </el-upload>
            </el-form-item>
          </el-col>
           <el-col :span="24" v-if="form.upLoadData.annexName !== ''">
            <el-form-item label="附件下载：">
             <el-button type="text" @click="getAttach(form.upLoadData.annexId)">{{form.upLoadData.annexName}}</el-button>
             <!-- <el-button type="primary" plain style="margin-left: 100px" @click="isUpload">附件更换</el-button> -->
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="发布对象：">
          <el-checkbox-group v-model="form.publishName">
            <el-checkbox label="0">中心用户</el-checkbox>
            <el-checkbox label="1">分支机构用户</el-checkbox>
            <el-checkbox label="2">反洗钱局</el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <div style="text-align:center;">
          <el-button type="primary" plain @click="goTopFn" style="width:100px;">返 回</el-button>
          <el-button type="primary" plain @click="submit('form')" style="width:100px;margin-left:20px;" :loading="isTrue">提交修改</el-button>
        </div>
      </el-form>
      <monitor-workflow></monitor-workflow>
    </el-card>
  </div>
</template>

<script>
import { getToken } from '@/utils/auth'
import { mapGetters } from 'vuex'
import { common_Validate } from '@/utils/formValidate'
// import { onSubmit } from '@/api/sys-monitoringAnalysis/reportManage/add.js' //如果走工作流就用这个
import { modification } from '@/api/sys-monitoringAnalysis/reportManage/add.js'
import { viewRoster } from '@/api/sys-monitoringAnalysis/reportManage/index.js'
export default {
  data() {
    return {
      fileList: [],
      fileArry: [],
      isTrue: false,
      form: {
        type: '',
        title: '',
        content: '',
        upLoadData: {
          annexId: '',
          annexName: ''
        },
        publishName: []
      },
      token: getToken(),
      headers: {
        Authorization: getToken()
      },
      // formUrl: 'http://10.10.121.98:8010/hbase'
      rules: {
        title: [
          { validator: common_Validate, trigger: 'blur' },
          { required: true, message: '内容不能为空且不能超过100个字符', trigger: 'blur' }
        ],
        content: [
          // { validator: common_Validate, trigger: 'blur' },
          { required: true, message: '内容不能为空且不能超过500个字符', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    formUrl() {
      // return process.env.BASE_API + '/caml-hbase/hbase'
      return `/monitor/macrographyReport/import`
    },
    paramsObj() {
      const obj = Object.assign({}, this.form)
      const newObj = {
        id: this.$route.query.id,
        type: obj.type,
        title: obj.title,
        content: obj.content,
        annexName: obj.upLoadData.annexName,
        annexId: obj.upLoadData.annexId,
        publishName: obj.publishName.join(',')
        // workflow: this.workFlow2business
      }
      return newObj
    },
    ...mapGetters(['businessFlag', 'workFlow2business', 'userInfo'])

  },
  created() {
    const queryId = this.$route.query.id
    viewRoster(queryId).then(res => {
      if (res.code === 200) {
        this.form.type = res.data.type
        this.form.title = res.data.title
        this.form.content = res.data.content
        this.form.upLoadData.annexName = res.data.annexName
        this.form.upLoadData.annexId = res.data.annexId
        if (res.data.annexName !== '') {
          this.fileArry.push(res.data.annexName)
        }
        if (res.data.publishName !== '') {
          this.form.publishName = res.data.publishName.split(',')
        } else {
          this.form.publishName = []
        }
      }
    })
  },
  // watch: {
  //   businessFlag(val) {
  //     if (val) this.nextStep()
  //     this.$store.dispatch('changeFlag', false)
  //   }
  // },
  methods: {
    // 调取工作流
    // callWorkFlow() {
    //   this.$refs['form'].validate(valid => {
    //     if (valid) {
    //       if (this.fileArry.length === 0) {
    //         this.$message.error('请上传附件')
    //         return
    //       } else {
    //         this.$store.dispatch('workFlow', { configCode: 'mpReportManagement' })
    //         this.$store.dispatch('openWorkFlow', true)
    //       }
    //     } else {
    //       return false
    //     }
    //   })
    // },
    // 是否更换文件
    isUpload() {
      this.form.upLoadData.annexName = ''
      this.fileArry = []
    },
    // 文件下载
    getAttach(id) {
      location.href = `/file-service/upload/download-file/${id}?token=${getToken()}&moduleName=${encodeURI('宏观分析')}`
    },
    goTopFn() {
      if (JSON.parse(sessionStorage.getItem('searchData'))) {
        const obj = JSON.parse(sessionStorage.getItem('searchData'))
        obj.ifReview = true
        sessionStorage.setItem('searchData', JSON.stringify(obj))
      }
      this.$router.go(-1)
    },
    // nextStep() {
    //   onSubmit(this.paramsObj)
    //     .then(res => {
    //       if (res.code === 200) {
    //         this.$message({
    //           message: '添加成功',
    //           type: 'success'
    //         })
    //         this.$router.push({ name: 'macroAnalysis_reportManage' })
    //         // this.$router.go(-1)
    //       }
    //     }).catch(() => {})
    // },
    submit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.fileArry.length === 0) {
            this.$message({
              message: '请上传附件',
              type: 'error',
              duration: 6000
            })
            return false
          }
          this.isTrue = true
          modification(this.paramsObj).then(res => {
            if (res.code === 200) {
              this.$message({
                message: '提交成功',
                type: 'success',
                duration: 6000
              })
            } else {
              this.isTrue = false
            }
          })
            .then(() => {
              this.$router.go(-1)
            })
            .catch(() => {
              this.isTrue = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 上传成功后的回调
    uploadSuccess(response, file, fileList) {
      if (response.code === 200) {
        this.fileArry = fileList
        // this.$refs.form.clearValidate('upload')
        this.form.upLoadData.annexName = file.name
        this.form.upLoadData.annexId = response.data
        this.$message({
          message: '上传成功',
          type: 'success',
          duration: 6000
        })
      } else {
        this.$message({
          message: response.message,
          type: 'error',
          duration: 6000
        })
        fileList.splice(fileList.indexOf(file), 1)
      }
    },
    // 上传前对文件的大小的判断
    beforeAvatarUpload(file) {
      // const extension = file.name.split('.')[1] === 'xls'
      // const extension2 = file.name.split('.')[1] === 'xlsx'
      // const extension3 = file.name.split('.')[1] === 'doc'
      // const extension4 = file.name.split('.')[1] === 'docx'
      const isLt2M = file.size / 1024 / 1024 < 10
      // if (!extension && !extension2 && !extension3 && !extension4) {
      //   this.$message.error('上传模板只能是 xls、xlsx、doc、docx 格式!')
      // }
      if (!isLt2M) {
        this.$message({
          message: '上传文件大小不能超过 10MB!',
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