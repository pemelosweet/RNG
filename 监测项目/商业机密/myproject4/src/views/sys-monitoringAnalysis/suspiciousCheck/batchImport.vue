<template>
  <el-card class="box-card suspiciousCheck-batchImport">

    <div slot="header" class="clearfix" style="">
      <a @click="routerBack" class="back" :style="backImg"></a>
      <span>批量导入</span>
      <div style="float: right;margin-right:28px">
        <el-button type="text" icon="el-icon-download" @click="fileTemplate">模板下载</el-button>
      </div>
    </div>
    <div class="content">
      <el-upload class="upload-container"  accept=".xls"  :before-upload="beforeUpload"  drag :on-success="onSuccess" :on-error="onError" :on-progress="onProgress" :action="uploadURL" multiple :auto-upload="autoUpload">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或
          <em>点击上传</em>
        </div>
        <div class="el-upload__tip" slot="tip">请上传xls格式的文件</div>
      </el-upload>
    </div>
    <el-dialog :visible.sync="diloagVisible">
      <strong slot="title">错误信息</strong>
      <div style="color:#F56C6C">{{fileError}}</div>
      <div slot="footer">
        <el-button type="primary" @click="diloagVisible = false">确定</el-button>
      </div>
    </el-dialog>

  </el-card>
</template>

<script>
import { mapGetters } from 'vuex'
import { getToken } from '@/utils/auth'
// import { fileRepeat } from '@/api/sys-monitoringAnalysis/roster-warning/roster-analyze.js'
// import { fileRepeat } from '@/api/sys-monitoringAnalysis/suspiciousCheck/batchImport.js'
export default {
  data() {
    return {
      backImg: {
        backgroundImage: 'url(' + require('@/assets/back/back.png') + ')',
        backgroundRepeat: 'no-repeat'
      },
      autoUpload: true,

      fileError: '',
      diloagVisible: false,
      token: getToken()
    }
  },
  computed: {
    ...mapGetters(['user_name']),
    uploadURL() {
      return `monitor/keySusReport/upFile?token=${this.token}`
      // location.href = '/monitor/keySusReport/upFile?token=' + this.token
      // return `/monitor/keySusReport/upFile?username=${
      //   this.user_name
      // }&token=${this.token}`
    }
  },
  methods: {
    fileTemplate() {
      location.href = '/monitor/keySusReport/download?token=' + this.token
    },
    // 文件上传之前钩子函数
    beforeUpload(file) {
      // const isLt500M = file.size / 1024 / 1024 < 500
      // if (!isLt500M) {
      //   this.$message({
      //     message: '上传文件大小不能超过500MB',
      //     type: 'error',
      //     duration: 6000
      //   })
      // }
      const types = file.name.substr(-3, 3) === 'xls'
      console.log(file.name, '222222222222222')

      // const types = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      if (!types) {
        this.$message({
          message: '请上传xls格式的文件',
          type: 'error',
          duration: 6000
        })
      }
      return types
    },
    onSuccess(response, file, fileList) {
      if (response.code === 200) {
        if (response.data) {
          this.$message({
            showClose: true,
            message: response.message,
            type: 'success',
            duration: 6000
          })
          this.$router.go(-1)
        }
      } else {
        if (response.data) {
          this.$message({
            message: response.data.join(','),
            type: 'warning',
            duration: 6000
          })
        } else {
          this.$message({
            message: '上传失败',
            type: 'warning',
            duration: 6000
          })
        }
        fileList.splice(fileList.indexOf(file), 1)
        // this.diloagVisible = true
        // this.fileError = response.message
      }
    },
    onError(errors, file, fileList) {},
    onProgress(event, file, fileList) {},
    routerBack() {
      this.$router.go(-1)
    }
  },
  mounted: function() {
    // fileRepeat()
  }
}
</script>

<style lang="scss">
.suspiciousCheck-batchImport {
  position: relative;
  .upload-container {
    .el-upload {
      width: 100%;
      .el-upload-dragger {
        width: 100%;
      }
    }
  }
}
</style>