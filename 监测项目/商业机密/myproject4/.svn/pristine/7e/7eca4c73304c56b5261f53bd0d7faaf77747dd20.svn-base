<template>
  <el-card class="box-card rosterManageanalyst-batchImport">

    <div slot="header" class="clearfix" style="">
      <a @click="routerBack" class="back" :style="backImg"></a>
      <span>批量导入</span>
      <div style="float: right;margin-right:28px">
        <el-button type="text" icon="el-icon-download" @click="fileTemplate">模板下载</el-button>
      </div>
    </div>
    <div class="content">
      <el-upload class="upload-container" accept=".xls,.xlsx"  drag :on-success="onSuccess" :on-progress="handleProgress" :before-upload="beforeAvatarUpload" :on-error="onError"  :action="uploadURL" multiple :auto-upload="autoUpload">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或
          <em>点击上传</em>
        </div>
        <div class="el-upload__tip" slot="tip">文件大小不能超过2MB且只能上传xlsx.xls文件</div>
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
import { fileRepeat } from '@/api/sys-monitoringAnalysis/roster-warning/roster-analyze.js'

export default {
  data() {
    return {
      backImg: {
        backgroundImage: 'url(' + require('@/assets/back/back.png') + ')',
        backgroundRepeat: 'no-repeat'
      },
      loading: null,
      autoUpload: true,
      fileError: '',
      diloagVisible: false,
      token: getToken()
    }
  },
  computed: {
    ...mapGetters(['user_name']),
    uploadURL() {
      return `/monitor/listwarn/analyst/importvalidation?token=${this.token}&username=${encodeURI(this.user_name)}`
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
    fileTemplate() {
      location.href = '/monitor/listwarn/analyst/download?token=' + this.token
    },
    onSuccess(response, file, fileList) {
      this.loading.close()
      if (response.code === 200) {
        this.$message({
          message: '文件上传成功',
          type: 'success',
          duration: 6000
        })
        if (response.data) {
          this.$confirm(response.message, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
            .then(() => {
              fileRepeat(response.data).then(res => {
                if (res.code === 200) {
                  this.$message({
                    message: '文件上传成功',
                    type: 'success',
                    duration: 6000
                  })
                }
              })
            })
            .catch(() => {
              this.$message({
                message: '已取消',
                type: 'info',
                duration: 6000
              })
            })
        }
      } else if (response.code === 10086) {
        this.$router.go(0)
      } else {
        this.diloagVisible = true
        this.fileError = response.message
        // this.code = response.code
        fileList.splice(fileList.indexOf(file), 1)
      }
    },
    beforeAvatarUpload(file, fileList) {
      var testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
      const extension = testmsg === 'xls'
      const extension2 = testmsg === 'xlsx'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!extension && !extension2) {
        this.$message({
          message: '上传文件只能是 xls、xlsx格式!',
          type: 'error',
          duration: 6000
        })
        return extension && extension2
      }
      if (!isLt2M) {
        this.$message({
          message: '上传文件大小不能超过2MB!',
          type: 'error',
          duration: 6000
        })
        return isLt2M
      }
    },
    onError(errors, file, fileList) {
      this.loading.close()
    },
    routerBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss">
.rosterManageanalyst-batchImport {
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
