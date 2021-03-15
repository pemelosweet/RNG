<template>
  <div class="auditDetailTable">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>提交审核</span>
      </div>
      <div class="content">
        <div class="block">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item><el-button type="text" @click="showMayPro">我的项目</el-button></el-breadcrumb-item>
            <template v-if="!ifProject">
            <el-breadcrumb-item v-for="(item,index) in this.tableDataArr" :key="index"><el-button type="text" @click="showTable(index)">{{item.name}}</el-button></el-breadcrumb-item>
            </template>
          </el-breadcrumb>
        </div>
        <div v-show="ifProject">
          <el-table :data="ProjectTableData" style="width: 100%" v-loading="loadingEstableSubmit"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.1)">
            <el-table-column type="index" label="序号" width="90"></el-table-column>
            <el-table-column prop="name" label="名称" min-width="280" show-overflow-tooltip></el-table-column>
            <el-table-column prop="createTime" label="创建时间" min-width="180" show-overflow-tooltip>
              <template slot-scope="scope">
                  {{scope.row.createTime | formatDate}}
              </template>
            </el-table-column>
            <el-table-column prop="description" label="描述" min-width="180" show-overflow-tooltip></el-table-column>
            <el-table-column label="操作" lable-width="50" width="100">
              <template slot-scope="scope">
                <el-button type="text" @click="showProject(scope)">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination background @size-change="handleSizeChangePro" @current-change="handleCurrentChangePro" :current-page="ProjectPageInfo.PageNum" :page-sizes="[5,10, 20, 30, 40,50]" :page-size="ProjectPageInfo.PageSize" layout="total, sizes, prev, pager, next, jumper" :total="ProjectPageInfo.total">
          </el-pagination>
        </div>
        <div v-show="!ifProject"  v-loading="loadingEstableSubmitTwo"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.1)">
          <el-table :data="tableData" style="width: 100%" @sort-change="sortChange">
            <el-table-column type="index" label="序号" min-width="80"></el-table-column>
            <el-table-column prop="name" label="名称" min-width="120" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-button type="text" v-if="scope.row.folder" @click="intoFolder(scope)">{{scope.row.name}}</el-button>
                <span v-else>{{scope.row.name}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="modifyTimestamp" show-overflow-tooltip v-if="tableDataArr.length===1" :key="1" label="修改时间" min-width="120" sortable="custom"></el-table-column>
            <el-table-column prop="modifyTimestamp" show-overflow-tooltip v-else label="修改时间" :key="2" min-width="120" sortable></el-table-column>
            <el-table-column prop="description" show-overflow-tooltip label="描述" min-width="100"></el-table-column>
            <el-table-column label="审核状态" show-overflow-tooltip lable-width="50">
                <template slot-scope="scope">
                    <span v-if="!scope.row.folder">{{scope.row.status==='1'?'已提交':'未提交'}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" lable-width="50">
                <template slot-scope="scope">
                    <!-- <router-link :to="{ name: 'modelPlatform_submitExperiments', params:{tableInfo:scope,name:projectName,id:projectId}}"> -->
                        <el-button type="text" size="medium" @click="stopJumpIndex(scope)" :disabled="scope.row.folder||scope.row.status==='1'" >提交审核</el-button>
                    <!-- </router-link> -->
                    <router-link :to='{name: "modelPlatform_lookDataCollection",query:{aId:encodeURI(scope.row.path)}}'>
                      <el-button type="text" size="medium" v-if="scope.row.status==='1'">查看</el-button>
                    </router-link>
                </template>
            </el-table-column>
          </el-table>
          <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageInfo.PageNum" :page-sizes="[5,10, 20, 30, 40,50]" :page-size="pageInfo.PageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
import {
  fuzzyQuery,
  getProductList
} from '@/api/sys-monitoringAnalysis/modelInfoData/modelSubmitAudit'
export default {
  data() {
    return {
      pageInfo: {
        pageNum: 1,
        pageSize: 10
      },
      ProjectPageInfo: {
        pageNum: 1,
        pageSize: 10,
        total: null
      },
      loadingEstableSubmit: false,
      total: null,
      tableData: [],
      ProjectTableData: [],
      tableDataArr: [{ name: '我的实验', data: '' }],
      sortVal: '',
      sortName: '',
      customType: 'custom',
      ifProject: true,
      projectId: '',
      projectName: ''
    }
  },
  filters: {
    // js时间戳转换成日期 xtf
    formatDate(value) {
      const date = new Date(value)
      const y = date.getFullYear()
      let MM = date.getMonth() + 1
      MM = MM < 10 ? ('0' + MM) : MM
      let d = date.getDate()
      d = d < 10 ? ('0' + d) : d
      let h = date.getHours()
      h = h < 10 ? ('0' + h) : h
      let m = date.getMinutes()
      m = m < 10 ? ('0' + m) : m
      let s = date.getSeconds()
      s = s < 10 ? ('0' + s) : s
      return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s
    }
  },
  computed: {
    paramsObj: function() {
      return {
        recursive: true,
        // pid: '96cd91ff-0956-45c0-a85d-2743397b8665',
        pid: this.projectId ? this.projectId : null,
        pageSize: this.pageInfo.pageSize,
        pageNum: this.pageInfo.pageNum,
        sortVal: this.sortVal ? this.sortVal : null,
        sortName: this.sortName ? this.sortName : null,
        productName: this.projectName ? encodeURI(this.projectName) : null
      }
    },
    proParamsObj: function() {
      return {
        pageSize: this.ProjectPageInfo.pageSize,
        pageNum: this.ProjectPageInfo.pageNum
      }
    }
  },
  mounted() {
    if (this.ifProject) {
      this.loadingEstableSubmit = true
    } else {
      this.loadingEstableSubmitTwo = true
    }
    this.getDataProjectList()
  },
  methods: {
    // 我的实验数据点击修改时间时，由后端排序，否则由前端排序
    sortChange({ column, prop, order }) {
      if (this.tableDataArr.length === 1) {
        if (prop !== null) {
          this.sortVal = order === 'ascending' ? 'asc' : 'desc'
          this.sortName = prop
        } else {
          this.sortVal = null
          this.sortName = null
        }
        this.getDataList()
      }
    },
    // 获取列表
    getDataList() {
      fuzzyQuery(this.paramsObj).then(res => {
        if (res.code === 200) {
          this.loadingEstableSubmitTwo = false
          if (res.data.length > 0) {
            const data = res.data[0].list
            let index
            for (index in data) {
              if (data[index].modifyTimestamp) {
                var unixTimestamp = new Date(data[index].modifyTimestamp)
                data[index].modifyTimestamp = unixTimestamp.toLocaleString()
              }
            }
            this.tableData = data
            this.total = res.data[0].total
            if (this.tableDataArr[0].data === '') {
              this.tableDataArr[0].data = JSON.stringify(this.tableData)
            }
          } else {
            this.tableData = []
            this.total = 0
          }
        } else {
          this.loadingEstableSubmitTwo = false
          this.$message({
            type: 'error',
            message: res.message,
            duration: 6000,
            showClose: true
          })
        }
      })
        .catch(() => {
          this.loadingEstableSubmitTwo = false
        })
    },
    getDataProjectList() {
      getProductList(this.proParamsObj).then(res => {
        if (res.code === 200) {
          this.loadingEstableSubmit = false
          this.ProjectTableData = res.data[0].list
          this.ProjectPageInfo.total = res.data[0].total
        }
      })
        .catch(() => {
          this.loadingEstableSubmit = false
        })
    },
    showProject(scope) {
      this.projectId = scope.row.id
      this.projectName = scope.row.name
      this.ifProject = false
      this.getDataList()
    },
    showMayPro() {
      this.ifProject = true
    },
    // 分页
    handleSizeChange(val) {
      this.pageInfo.pageSize = val
      this.loadingEstableSubmitTwo = true
      this.getDataList()
    },
    handleCurrentChange(val) {
      this.pageInfo.pageNum = val
      this.loadingEstableSubmitTwo = true
      this.getDataList()
    },
    handleCurrentChangePro(val) {
      this.ProjectPageInfo.pageNum = val
      this.loadingEstableSubmit = true
      this.getDataProjectList()
    },
    handleSizeChangePro(val) {
      this.ProjectPageInfo.pageSize = val
      this.loadingEstableSubmit = true
      this.getDataProjectList()
    },
    addDomain() {
      this.domains.unshift({
        value: '',
        key: Date.now()
      })
    },
    routerBack() {
      this.$router.go(-1)
    },
    intoFolder(scope) {
      if (scope.row.children) {
        this.tableDataArr.push({ name: scope.row.name, data: JSON.stringify(scope.row.children) })
      }
      this.tableData = scope.row.children
      this.total = scope.row.children.length
    },
    showTable(index) {
      if (this.tableDataArr[index]) {
        this.tableData = JSON.parse(this.tableDataArr[index].data)
        if (this.tableDataArr[index + 1]) {
          this.tableDataArr.splice(index + 1)
        }
      }
    },
    stopJumpIndex(scope) {
      console.log(scope)
      this.$router.push({
        name: 'modelPlatform_submitExperiments',
        params: {
          tableInfo: scope,
          name: this.projectName,
          id: this.projectId
        }
      })
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
.auditDetailTable {
  .card-center {
    text-align: center;
  }
  .card-header {
    .el-card__header {
      padding: 0px 20px;
    }
  }
  .dataVisible {
    height: 20vh;
    overflow-y: auto;
  }
  .addFont {
    display: inline-block;
    font-size: 26px;
    vertical-align: bottom;
    margin-left: 5px;
  }
  .block{
    padding:0 0 15px;
  }
}
</style>
