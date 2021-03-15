<template>
  <el-card class="box-card rosterManageBranch-batchImport">
     <a @click="routerBack" class="back" :style="backImg"></a>
    <div slot="header" class="clearfix">
      <span>批量导入</span>
      <div style="float: right;margin-right:28px">
        <el-button type="text" icon="el-icon-download" @click="downloadXlsFn">xlsx模板下载</el-button>
        <el-button type="text" icon="el-icon-download" @click="downloadFn">csv模板下载</el-button>
      </div>
    </div>
    <div class="content">
      <el-upload class="upload-container" accept=".csv,.xls,.xlsx" drag :show-file-list="false" :file-list="fileList" :before-upload="beforeUpload" :on-preview="onPreview" :on-progress="handleProgress" :on-success="onSuccess" :on-error="onError" :action="uploadURL" multiple :auto-upload="autoUpload">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或
          <em>点击上传</em>
        </div>
        <div class="el-upload__tip" slot="tip">
          <p>1、文件大小不超过20M且建议使用xls或xlsx格式的模板进行上传（使用csv格式的模板时，“证件号码”会形成科学计数法，需要用txt文本打开编辑才可正常使用）</p>
          <p>2、若填写的是名单主体类型时，此时必填主体名称、主体类型、主体证件号码，非必填账户号码、开户机构名称（或简称），</p>
          <p style=" text-indent:19px">
            若填写的名单是账号类型时，此时必填账户号码、开户机构名称（或简称），非必填主体名称、主体类型、主体证件号码。
          </p>        
        </div>
      </el-upload>
    </div>
    <div style="textAlign:center; paddingTop:40px">
        <el-button type="primary" @click="routerBack"> 返 回</el-button>
    </div>
    <el-dialog title="校验错误" :visible.sync="errorDialog" class="error-dialog">
      <el-table :data="errorData" :show-header="false" max-height="350">
        <el-table-column label="" type="index"></el-table-column>
        <el-table-column label="">
          <template slot-scope="scope">
            {{scope.row}}
          </template>
        </el-table-column>
      </el-table>

    </el-dialog>
  </el-card>
</template>

<script>
import { mapGetters } from 'vuex'
import { getToken } from '@/utils/auth'
import {
  BranchverifyFileName
} from '@/api/sys-monitoringAnalysis/roster-warning/roster-branch.js'
export default {
  data() {
    var _this = this
    return {
      backImg: {
        backgroundImage: 'url(' + require('@/assets/back/back.png') + ')',
        backgroundRepeat: 'no-repeat'
      },
      jurisdiction: 'monitor:branchManage:branchManage',
      autoUpload: true,
      historyHide: true,
      loading: null,
      fileList: [],
      errorData: [],
      tableData: [],
      currentPage: 1,
      pagesize: 10,
      pageTotal: 0,
      fileName: '',
      errorDialog: false,
      onPreview(file) {
        console.log(arguments, 'onPreview')
      },
      onSuccess(response, file, fileList) {
        _this.loading.close()
        if (response.code === 200) {
          this.$message({
            message: '文件上传成功',
            type: 'success',
            duration: 6000
          })
        } else if (response.code === -1) {
          _this.errorDialog = true
          _this.errorData = response.data
          fileList.splice(fileList.indexOf(file), 1)
        } else if (response.code === 205) {
          this.$message({
            message: response.message,
            type: 'warning',
            duration: 6000
          })
          fileList.splice(fileList.indexOf(file), 1)
        }
      },
      onError(errors, file, fileList) {
        this.loading.close()
      },
      token: getToken()
    }
  },
  computed: {
    listParams() {
      return {
        pageSize: this.pagesize,
        pageNum: this.currentPage,
        impName: this.fileName
      }
    },
    ...mapGetters(['user_name']),
    ...mapGetters(['permissions_routers']),
    uploadURL() {
      return `/monitor/listwarn/analysis/import?username=${this.user_name}&token=${this.token}`
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
    // 文件上传之前钩子函数
    beforeUpload(file) {
      var testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
      const extension = testmsg === 'csv' || testmsg === 'xls' || testmsg === 'xlsx'
      const isLt20M = file.size / 1024 / 1024 < 20
      if (!isLt20M) {
        this.$message({
          message: '上传文件大小不能超过20MB!',
          type: 'error',
          duration: 6000
        })
        return isLt20M
      }
      if (!extension) {
        this.$message({
          message: '上传文件只能是csv,xls,xlsx格式!',
          type: 'error',
          duration: 6000
        })
        return extension
      }
      var _that = this
      return new Promise(function(resolve, reject) {
        BranchverifyFileName({ impName: encodeURI(file.name) })
          .then(res => {
            if (res.code === 200) {
              if (res.data === 'false') {
                _that
                  .$confirm(res.message, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                  })
                  .then(() => {
                    resolve()
                  })
                  .catch(() => {
                    reject()
                  })
              } else if (res.data === 'success') {
                resolve()
              }
            }
          })
          .catch(err => {
            console.log(err, 'error')
          })
      })
    },
    // 模板下载
    downloadFn() {
      location.href = '/monitor/listwarn/analysis/download?token=' + this.token
    },
    downloadXlsFn() {
      location.href = '/monitor/listwarn/analysis/downloadXls?token=' + this.token
    },
    // 分页
    handleSizeChange(val) {
      this.pagesize = val
    },
    handleCurrentChange(val) {
      this.currentPage = val
    },
    // 返回
    routerBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss">
.rosterManageBranch-batchImport {
  position: relative;
  .error-dialog {
    .el-table--small td,
    .el-table--small th {
      padding: 0;
      color: #f56c6c;
    }
  }
  .el-table tbody tr td {
  text-align: left;
  }
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
