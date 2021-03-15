<template>
  <el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>名单比对</span>
    <div style="float: right">
      <el-button type="text" icon="el-icon-download" @click="downloadFn">模板下载</el-button>
    </div>
  </div>
  <div class="content">
    <h4>批量导入查询主体：</h4>
    <div class="upload-border">
        <!-- <fileUpload ref="file"
        :autoUpload=false :fileNum=10 :multiple=false :accepts="['xls','xlsx']" ></fileUpload> -->
    </div>
    <div>
         <el-upload class="upload-container" ref="upload"  :on-change="handleChange"  :auto-upload="false"  accept=".xls,.xlsx" drag :file-list="fileList" :before-upload="beforeAvatarUpload" :on-progress="handleProgress" :on-success="onSuccess" :on-error="onError" :action="uploadURL" multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或
          <em>点击上传</em>
        </div>
        <div class="el-upload__tip" slot="tip">只能上传xls,xlsx文件，且不超过500kb</div>
      </el-upload>
    </div>
    <div class="divider divider-horizontal"></div>
    <div style="textAlign:right">
      <el-button type="primary"   @click="query">查  询</el-button>
    </div>
    <br>
    <div v-if="showTable">
      <el-table :data="tableData" tooltip-effect="dark">
        <el-table-column label="序号" type="index"></el-table-column>
        <el-table-column label="主体名称" prop="name" min-width="120px" show-overflow-tooltip></el-table-column>
        <el-table-column label="主体证件类型" prop="type" min-width="120px" :formatter="type" show-overflow-tooltip></el-table-column>
        <el-table-column label="主体证件号" prop="document" min-width="120px" show-overflow-tooltip></el-table-column>
        <el-table-column label="分析员关注名单" prop="attention" min-width="120px" show-overflow-tooltip></el-table-column>
        <el-table-column label="外部委监控名单" prop="publicMonitoring" min-width="120px" show-overflow-tooltip>
          <template slot-scope="scope">
           {{Number(scope.row.publicMonitoring)+Number(scope.row.commissionMonitoring)}}
          </template>
        </el-table-column>
        <el-table-column label="其他国家（地区）监控名单" prop="otherPublicMonitoring" min-width="190px" show-overflow-tooltip></el-table-column>
        <el-table-column label="国际组织监控名单" prop="opublicMonitoring" min-width="140px" show-overflow-tooltip></el-table-column>
        <el-table-column label="协查名单" prop="consultation" min-width="100px" show-overflow-tooltip></el-table-column>
        <el-table-column label="中心通报名单" prop="bulletin" min-width="100px" show-overflow-tooltip></el-table-column>
        <el-table-column label="中心移送名单" prop="transfer" min-width="120px" show-overflow-tooltip></el-table-column>
        <el-table-column label="分支行移送名单" prop="branchTransfer" min-width="120px" show-overflow-tooltip></el-table-column>
        <el-table-column label="境外情报名单" prop="overseas" min-width="120px" show-overflow-tooltip></el-table-column>
        <el-table-column label="专报名单" prop="specialReport" min-width="100px" show-overflow-tooltip></el-table-column>
        <el-table-column label="其它名单" prop="other" min-width="100px" show-overflow-tooltip></el-table-column>
        <el-table-column label="合计" prop="num" min-width="100px" show-overflow-tooltip>
          <template slot-scope="scope">
            {{Number(scope.row.attention)+Number(scope.row.publicMonitoring)+Number(scope.row.commissionMonitoring)+Number(scope.row.otherPublicMonitoring)+Number(scope.row.opublicMonitoring)+Number(scope.row.consultation)+Number(scope.row.bulletin)+Number(scope.row.transfer)+Number(scope.row.branchTransfer)+Number(scope.row.overseas)+Number(scope.row.specialReport)}}
          </template>
        </el-table-column>
      </el-table>
        <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageInfo.pageNum"
        :page-size="pageInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageInfo.total"
        background
      ></el-pagination>
    </div>

  </div>
  <div style="textAlign:center; paddingTop:40px">
    <router-link :to="{name:this.queryUrl}">
      <el-button type="primary" > 返 回</el-button>
    </router-link>
  </div>
</el-card>
</template>

<script>
import { mapGetters } from 'vuex'
import { getToken } from '@/utils/auth'
import { dictionary, fetchData } from '@/api/sys-monitoringAnalysis/roster-warning/common.js'
export default {
  data() {
    return {
      fileList: [],
      certificateTypeArr: [], // 证件类型
      autoUpload: false,
      loading: null,
      pageInfo: {
        lid: '',
        pageNum: 1,
        pageSize: 10,
        total: 0
      },
      tableData: [],
      currentPage: 1,
      showTable: false,
      queryUrl: '',
      token: getToken()
    }
  },
  created() {
    this.queryUrl = this.$route.query.name
    this.getDictionary('SFZJ')
  },
  computed: {
    ...mapGetters(['user_name']),
    ...mapGetters(['permissions_routers']),
    uploadURL() {
      // return `${process.env.BASE_API}/monitor/listwarn/center/impOrderInfo?username=${
      //   this.user_name
      // }&token=${this.token}`
      return `/monitor/listwarn/center/impOrderInfo`
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
    // 获取数据字典
    getDictionary(params) {
      dictionary(params).then(res => {
        if (res.code === 200) {
          switch (params) {
            case 'SFZJ':
              this.certificateTypeArr = res.data
              break
            default:
              break
          }
        }
      })
    },
    // 证件类型
    type(row, column, cellValue) {
      const data = this.certificateTypeArr
      const arr = {}
      for (let i = 0; i < data.length; i++) {
        arr[data[i].codeId] = data[i].codeName
      }
      return arr[cellValue]
    },
    // 模板下载
    downloadFn() {
      location.href = '/monitor/listwarn/center/downloads?token=' + this.token
    },
    // 查询
    query() {
      this.$refs.upload.submit()
    },
    search(pageInfo) {
      fetchData(pageInfo).then(res => {
        this.showTable = true
        this.pageInfo.total = res.data.total
        this.tableData = res.data.list
      })
    },
    // 切换分页条数
    handleSizeChange(size) {
      this.pageInfo.pageSize = size
      this.search(this.pageInfo)
    },
    // 点击切换分页
    handleCurrentChange(pageNum) {
      this.pageInfo.pageNum = pageNum
      this.search(this.pageInfo)
    },
    beforeAvatarUpload(file, fileList) {
      const isLt2M = file.size / 1024 < 500
      if (!isLt2M) {
        this.$message({
          message: '上传文件大小不能超过500kb!',
          type: 'error',
          duration: 6000
        })
      }
      return isLt2M
    },
    handleChange(file, fileList) {
      if (fileList.length > 1) {
        this.$message({
          message: '当前限制选择 1 个文件，本次选择了 1 个文件，共选择了 2 个文件，如要更换上传文件，请先删除已上传的文件。',
          type: 'warning',
          duration: 6000
        })
        fileList.splice(fileList.indexOf(file), 1)
      }
    },
    onSuccess(response, file, fileList) {
      this.loading.close()
      if (response.code === 200) {
        this.pageInfo.lid = response.data
        this.$message({
          message: '文件上传成功',
          type: 'success',
          duration: 6000
        })
        this.search(this.pageInfo)
      } else if (response.code === -1) {
        this.errorDialog = true
        this.errorData = response.data
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
      console.log(arguments, 'onError')
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