<template>
  <el-card class="box-card rosterManage-batchImport">
     <a @click="routerBack" class="back" :style="backImg"></a>
    <div slot="header" class="clearfix">
      <span>{{this.ids === 'first'?'来文单位':this.ids === 'second'?'紧急程度':this.ids === 'three'?'发送单位':'触发来源'}}批量导入</span>
      <div style="float: right;margin-right:28px">
        <el-button type="text" icon="el-icon-download" @click="downloadFn">模板下载</el-button>
      </div>
    </div>
    <div class="content">
      <el-upload class="upload-container" accept=".xls" :show-file-list="false" drag :file-list="fileList" :before-upload="beforeUpload"  :on-progress="handleProgress" :on-preview="onPreview" :on-success="onSuccess" :on-error="onError" :action="uploadURL" multiple :auto-upload="autoUpload">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或
          <em>点击上传</em>
        </div>
        <div class="el-upload__tip" slot="tip">文件大小不能超过20MB且只能上传xls文件</div>
      </el-upload>

      <!-- <h4 v-if="historyHide">导入历史</h4>
      <el-form :inline="true"  v-if="historyHide" :rules="rules" :model="form" ref="ruleForm">
        <el-form-item label="文件名称：" prop="fileName">
          <el-input v-model="form.fileName" placeholder="文件名称" maxlength="128" ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="historyFileList('ruleForm')">查 询</el-button>
          <el-button type="primary" @click="clear('ruleForm')">清 空</el-button>
        </el-form-item>

      </el-form> -->

      <!-- <el-table style="width: 100%" :data="tableData" tooltip-effect="dark"  v-if="historyHide">
        <el-table-column label='序号' type="index">
          
        </el-table-column>
        <el-table-column prop="impName" min-width="250" label="导入文件名称" show-overflow-tooltip >
          
        </el-table-column>
        <el-table-column prop="recordNum" label="当前记录数">
        
        </el-table-column>
        <el-table-column prop="firstUpdDate" min-width="220" label="首次导入时间">
         
        </el-table-column>
        <el-table-column prop="lastUpdDate" min-width="220" label="末次更新时间">
         
        </el-table-column>
      </el-table> -->

      <!-- <el-pagination  v-if="historyHide" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"  :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="pageTotal" background></el-pagination> -->
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
// import upload from '@/components/FileUpload/index.vue'
import { mapGetters } from 'vuex'
// import { getbatchImport } from '@/api/listManagement'
import { getToken } from '@/utils/auth'
import {
  verifyFileName,
  searchFileList
} from '@/api/sys-monitoringAnalysis/roster-warning/roster-manage.js'
import { adminisValidInput } from '@/utils/formValidate'
export default {
  data() {
    var _this = this
    return {
      ids: '',
      backImg: {
        backgroundImage: 'url(' + require('@/assets/back/back.png') + ')',
        backgroundRepeat: 'no-repeat'
      },
      autoUpload: true,
      historyHide: true,
      loading: null,
      fileList: [],
      errorData: [],
      tableData: [],
      currentPage: 1,
      pagesize: 10,
      pageTotal: 0,
      form: {
        fileName: ''
      },
      errorDialog: false,
      rules: {
        fileName: [{ max: 128, validator: adminisValidInput, trigger: 'blur' }]
      },
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
          // _this.historyFileList('ruleForm')
          _this.routerBack()
        } else if (response.code === -1) {
          _this.errorDialog = true
          _this.errorData = response.data
          fileList.splice(fileList.indexOf(file), 1)
        } else if (response.code === 205 || response.code === 9999) {
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
        console.log(arguments, 'onError')
      },
      token: getToken()
    }
  },
  computed: {
    listParams() {
      return {
        pageSize: this.pagesize,
        pageNum: this.currentPage,
        impName: this.form.fileName
      }
    },
    ...mapGetters(['user_name']),
    ...mapGetters(['permissions_routers']),
    uploadURL() {
      var id2
      if (this.ids === 'first') {
        id2 = 0
      } else if (this.ids === 'second') {
        id2 = 1
      } else if (this.ids === 'three') {
        id2 = 2
      } else {
        id2 = 3
      }
      return `/monitor/clueManage/codeDispose/upFile/${id2}?token=${this.token}`
    }
  },
  mounted() {
    console.log(this.$route.query.id, '0000')
    this.ids = this.$route.query.id
    this.historyFileList('ruleForm')
  },
  methods: {
    clear(formName) {
      this.$refs[formName].resetFields()
      this.historyFileList('ruleForm')
    },
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
      const extension = testmsg === 'xls'
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
          message: '上传文件只能是xls格式!',
          type: 'error',
          duration: 6000
        })
        return extension
      }
      var _this = this
      return new Promise(function(resolve, reject) {
        verifyFileName({ impName: file.name })
          .then(res => {
            if (res.code === 200) {
              if (res.data === 'false') {
                _this
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
      var id
      if (this.ids === 'first') {
        id = 0
      } else if (this.ids === 'second') {
        id = 1
      } else if (this.ids === 'three') {
        id = 2
      } else {
        id = 3
      }
      location.href = `/monitor/clueManage/codeDispose/download/${id}?token=` + this.token
    },
    // 查询历史文件
    historyFileList(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          searchFileList(this.listParams).then(res => {
            if (res.code === 200) {
              this.tableData = res.data.list
              this.pageTotal = Number(res.data.total)
            }
          })
        } else {
          return false
        }
      })
    },
    // 分页
    handleSizeChange(val) {
      this.pagesize = val
      this.historyFileList('ruleForm')
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.historyFileList('ruleForm')
    },
    // 返回
    routerBack() {
      // this.$router.go(-1)
      this.$router.push(({ name: 'cueManage_levelConfiguration', query: { type: this.ids }}))
    }
  }
}
</script>

<style lang="scss">
.rosterManage-batchImport {
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
