<template>
  <el-card class="box-card rosterManage-batchImport">
     <a @click="routerBack" class="back" :style="backImg"></a>
    <div slot="header" class="clearfix">
      <span>批量导入</span>
      <div style="float: right;margin-right:28px">
        <el-button type="text" icon="el-icon-download" @click="downloadFn">模板下载</el-button>
      </div>
    </div>
    <div class="content">
      <fileUpload ref="file" :tokenURL="tokenURL"  :uploadURL="uploadURL">
          </fileUpload>
      <!-- <el-upload class="upload-container" accept=".csv" drag :file-list="fileList" :before-upload="beforeUpload" :on-preview="onPreview" :on-progress="handleProgress" :on-success="onSuccess" :on-error="onError" :action="uploadURL" multiple :auto-upload="autoUpload">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或
          <em>点击上传</em>
        </div>
        <div class="el-upload__tip" slot="tip">只能上传大于20M的csv文件</div>
      </el-upload> -->

      <h4 v-if="historyHide">导入历史</h4>
      <el-form :inline="true"  v-if="historyHide" :rules="rules" :model="form" ref="ruleForm">
        <el-form-item label="文件名称：" prop="fileName">
          <el-input v-model="form.fileName" placeholder="文件名称" maxlength="128" ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="historyFileList('ruleForm')">查 询</el-button>
          <el-button type="primary" @click="clear('ruleForm')">清 空</el-button>
        </el-form-item>

      </el-form>

      <el-table style="width: 100%" :data="tableData" tooltip-effect="dark"  v-if="historyHide">
        <el-table-column label='序号' type="index">
          
        </el-table-column>
        <el-table-column prop="impName" label="导入文件名称" show-overflow-tooltip >
          
        </el-table-column>
        <el-table-column prop="recordNum" label="当前记录数" show-overflow-tooltip>
        
        </el-table-column>
        <el-table-column prop="firstUpdDate" label="首次导入时间" show-overflow-tooltip>
         
        </el-table-column>
        <el-table-column prop="lastUpdDate" label="末次更新时间" show-overflow-tooltip>
         
        </el-table-column>
        <el-table-column prop="info" label="描述">
          <template slot-scope="scope">
            <el-button type="text" @click="infoBtn(scope.row.info)">{{scope.row.info !== null && scope.row.info.length > 10 ? scope.row.info.slice(0,10) + '...' : scope.row.info}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="执行状态" show-overflow-tooltip>
          <template slot-scope="scope">
            {{ scope.row.status === 0 ? '未执行' : scope.row.status === 1 ? '执行中' : scope.row.status === 2 ? '执行完成' : '' }}
          </template>
        </el-table-column>
        <el-table-column prop="operationStatus" label="文件状态" show-overflow-tooltip>
         <template slot-scope="scope">
           {{scope.row.operationStatus === 0 ? '新增' : scope.row.operationStatus === 1 ? '修改' : ''}}
         </template>
        </el-table-column>
      </el-table>

      <el-pagination  v-if="historyHide" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"  :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="pageTotal" background></el-pagination>
    </div>
    <div style="textAlign:center; paddingTop:40px">
        <el-button type="primary" @click="routerBack"> 返 回</el-button>
    </div>
    <el-dialog title="校验错误" :visible.sync="errorDialog" class="error-dialog">
      <el-table :data="errorData" :show-header="false" max-height="350">
        <el-table-column label="" type="index"></el-table-column>
        <el-table-column label="" align="left">
          <template slot-scope="scope">
            {{scope.row}}
          </template>
        </el-table-column>
      </el-table>

    </el-dialog>
    <el-dialog title="描述" :visible.sync="infoDialog">
      <div v-html="infoText"></div>
    </el-dialog>
  </el-card>
</template>

<script>
// import upload from '@/components/FileUpload/index.vue'
import { mapGetters } from 'vuex'
// import { getbatchImport } from '@/api/listManagement'
import { getToken } from '@/utils/auth'
import {
  bigannex
} from '@/api/sys-monitoringAnalysis/roster-warning/roster-manage.js'
import { adminisValidInput } from '@/utils/formValidate'
import fileUpload from './uploader.vue'
export default {
  data() {
    var _this = this
    return {
      noteFileID: '',
      isTime: false,
      timer: null,
      infoDialog: false,
      infoText: '',
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
      params: {
        fileName: '',
        pageNum: 1,
        pageSize: 10
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
          _this.$message({
            message: '文件上传成功',
            type: 'success',
            duration: 6000
          })
          _this.historyFileList('ruleForm')
        } else if (response.code === 205) {
          _this.$message({
            message: response.message,
            type: 'warning',
            duration: 6000
          })
          fileList.splice(fileList.indexOf(file), 1)
        }
      },
      onError(errors, file, fileList) {
        _this.$message({
          type: 'error',
          message: '上传失败'
        })
        _this.loading.close()
        _this.historyFileList('ruleForm')
      },
      token: getToken()
    }
  },
  components: {
    fileUpload
  },
  computed: {
    listParams() {
      return {
        pageSize: this.pagesize,
        pageNum: this.currentPage,
        fileName: this.form.fileName
      }
    },
    ...mapGetters(['user_name']),
    ...mapGetters(['permissions_routers']),
    // uploadURL() {
    //   return `/zuul/monitor/listwarn/center/import/bigannex?username=${this.user_name}&token=${this.token}`
    // },
    tokenURL() {
      // /file-service
      // return 'http://192.168.200.65:9088/file-service/upload/token'
      return '/file-service/upload/token'
    },
    uploadURL() {
      // return 'http://192.168.200.65:9088/file-service/upload/upload'
      return '/file-service/upload/upload'
    }
  },
  // watch: {
  //   isTime(val) {
  //     if (val) {
  //       this.timer = setInterval(() => {
  //         this.getData(this.params)
  //       }, 5000)
  //     }
  //   }
  // },
  beforeDestroy() {
    clearInterval(this.timer)
    this.timer = null
  },
  mounted() {
    this.getData(this.params)
    // this.timer = setInterval(() => {
    // }, 5000)
  },
  watch: {
    isTime(val) {
      if (val) {
        this.timer = setInterval(() => {
          bigannex(this.params).then(res => {
            if (res.code === 200) {
              this.tableData = res.data.list
              this.pageTotal = Number(res.data.total)
            }
          })
        }, 20000)
      } else {
        clearInterval(this.timer)
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
    infoBtn(val) {
      this.infoText = val
      this.infoDialog = true
    },
    clear(formName) {
      this.$refs[formName].resetFields()
      this.getData(this.params)
    },
    // 文件上传之前钩子函数
    beforeUpload(file) {
      this.isTime = false
      var testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
      const extension = testmsg === 'csv'
      const isLt20M = file.size / 1024 / 1024 < 20
      if (isLt20M) {
        this.$message({
          message: '请上传大于20M的文件!',
          type: 'error',
          duration: 6000
        })
        return !isLt20M
      }
      if (!extension) {
        this.$message({
          message: '上传文件只能是csv格式!',
          type: 'error',
          duration: 6000
        })
        return extension
      }
      // resolve()
      // var _this = this
      // return new Promise(function(resolve, reject) {
      //   verifyFileName({ impName: file.name })
      //     .then(res => {
      //       if (res.code === 200) {
      //         if (res.data === 'false') {
      //           _this
      //             .$confirm(res.message, '提示', {
      //               confirmButtonText: '确定',
      //               cancelButtonText: '取消',
      //               type: 'warning'
      //             })
      //             .then(() => {
      //               resolve()
      //             })
      //             .catch(() => {
      //               reject()
      //             })
      //         } else if (res.data === 'success') {
      //           resolve()
      //         }
      //       }
      //     })
      //     .catch(err => {
      //       console.log(err, 'error')
      //     })
      // })
    },
    // 模板下载
    downloadFn() {
      location.href = '/monitor/listwarn/center/download?token=' + this.token
    },
    // 查询历史文件
    historyFileList(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.isTime = false
          this.params = Object.assign({}, this.listParams)
          this.getData(this.params)
        } else {
          return false
        }
      })
    },
    getData(params) {
      bigannex(params).then(res => {
        if (res.code === 200) {
          this.tableData = res.data.list
          this.pageTotal = Number(res.data.total)
          // if (this.timer) { // 定时刷新页面
          //   clearInterval(this.timer)
          // } else {
          //   this.timer = setInterval(() => {
          //     this.getData(this.params)
          //   }, 5000)
          // }
          this.isTime = true
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
      this.$router.go(-1)
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
