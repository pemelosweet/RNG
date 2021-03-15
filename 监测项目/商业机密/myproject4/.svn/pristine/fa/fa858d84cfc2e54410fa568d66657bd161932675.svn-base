<template>
  <div class="matchField_result">
    <el-form ref="searchForm" :model="form">

      <div class="singleBlock">
        <div>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="查询类型：" label-width="110px">
                <el-select v-model="form.type" clearable placeholder="请选择">
                  <el-option label="全部" value=""></el-option>
                  <el-option label="公民身份证件信息" value="own"></el-option>
                  <el-option label="公民出入境证件信息" value="other"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="查询方式：" label-width="110px">
                <el-select v-model="form.moreType" clearable placeholder="请选择">
                  <el-option label="全部" value=""></el-option>
                  <el-option label="单个" value="1"></el-option>
                  <el-option label="批量" value="0"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <!-- <el-col :span="6">
              <el-form-item label="匹配信息项：" label-width="100px">
                <el-select v-model="match" placeholder="请选择">
                  <el-option label="性别" value="1"></el-option>
                  <el-option label="年龄" value="2"></el-option>
                </el-select>
              </el-form-item>
            </el-col> -->
            <el-button type="primary" style="marginLeft:20px" @click="query">查 询</el-button>
          </el-row>
        </div>
      </div>
      <div class="listBlock">
        <el-table
          v-loading="loading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.1)" 
          @selection-change="handleSelectionChange" 
          :data="historyList">
          <el-table-column type="selection" fixed="left"></el-table-column>
          <el-table-column label="序号" type="index" width="60" fixed="left"></el-table-column>
          <el-table-column label="操作人" prop="operatorUser" min-width="100"></el-table-column>
          <el-table-column label="操作时间" prop="operaDate" min-width="100"></el-table-column>
          <el-table-column label="查询类型" prop="discretion" min-width="100">
            <template slot-scope="scope">
              <span>{{scope.row.discretion==1?'公民身份证件信息':'公民出入境证件信息'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="查询方式" prop="moreType" min-width="100">
            <template slot-scope="scope">
              <span>{{scope.row.moreType==0?'批量':'单个'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="查询内容" min-width="100">
            <template slot-scope="scope">
              <div v-if="scope.row.moreType==='0'">
                <el-button size="small" type="text" @click="fileDownload(scope.row.historyId)">{{scope.row.fileName}}</el-button>
              </div>
              <div v-else>
                {{scope.row.idNum}}
              </div>
            </template>
          </el-table-column>
          <!-- <el-table-column label="证件号" prop="idNumber" min-width="100"></el-table-column> -->
          <el-table-column label="操作" width="110" fixed="right">
            <template slot-scope="scope">
              <el-button type="text" @click="delRow(scope)">删除</el-button>
              <el-button type="text" @click="Initiate(scope)">导出 </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-row>
          <el-col :span="8" style="paddingTop:10px">
            <el-button type="primary" @click="exportStatistics">批量导出</el-button>
          </el-col>
          <el-col :span="16">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageInfo.pageNumber" :page-sizes="[10, 20, 30, 40]" :page-size="pageInfo.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total" background></el-pagination>

          </el-col>
        </el-row>

      </div>

    </el-form>

  </div>
</template>

<script>
import { getList } from '@/api/sys-monitoringAnalysis/cueManage/matchField/history.js'
export default {
  props: {
    inputName: {
      type: Boolean
    },
    getData: {
      type: Boolean
    }
  },
  data() {
    return {
      match: '',
      IDCARD: '',
      historyList: [],
      total: 0,
      pageInfo: {
        pageNumber: 1,
        pageSize: 10
      },
      form: {
        type: '',
        moreType: ''
      },
      params: {},
      loading: false,
      multipleSelection: []
    }
  },
  computed: {
    searchParams() {
      const obj = Object.assign({}, this.form)
      return obj
    }
  },
  methods: {
    handleSizeChange(size) {
      this.pageInfo.pageSize = size
      this.getList()
    },
    handleCurrentChange(num) {
      this.pageInfo.pageNumber = num
      this.getList()
    },
    delRow(scope) {
      const index = scope.$index
      this.$confirm('确定删除此信息吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const obj = {
          historyId: scope.row.historyId
        }
        getList(obj).then(res => {
          if (res.code === 200) {
            this.historyList.splice(index, 1)
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.getList()
          }
        })
      }).catch(() => {})
    },
    query() {
      this.pageInfo.pageNumber = 1
      this.params = Object.assign({}, this.searchParams, this.pageInfo)
      this.getList()
    },
    getList() {
      this.loading = true
      this.params = Object.assign({}, this.params, this.pageInfo)
      getList(this.params).then(res => {
        if (res.code === 200) {
          this.historyList = res.data.list
          this.total = res.data.total
          this.loading = false
        } else {
          this.laoding = false
        }
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    exportStatistics() {
      const length = this.multipleSelection.length
      if (length === 0) {
        this.$message({
          type: 'info',
          message: '请选择至少一条导出数据'
        })
      } else {
        const arr = []
        this.multipleSelection.forEach(res => {
          arr.push(res.historyId)
        })
        location.href = 'monitor/information/history-export?idNumbers=' + arr.join(',')
      }
    },
    Initiate(scope) {
      const arr = []
      arr.push(scope.row.historyId)
      location.href = 'monitor/information/history-export?idNumbers=' + arr.join(',')
    },
    resetForm(formName) {
      // alert(22)
      this.$refs[formName].resetFields()
      this.form = {
        type: '',
        moreType: ''
      }
    },
    fileDownload(attachId) {
      location.href = `/file-service/upload/download/${attachId}?moduleName=${encodeURI('匹配信息查询')}`
    }
  },
  watch: {
    // // 通过点击tabs进行清空
    // inputName() {
    //   this.pageInfo = {
    //     pageNumber: 1,
    //     pageSize: 10
    //   }
    //   this.params = {}
    //   this.resetForm('searchForm')
    // },
    // getData() {
    //   this.getList()
    // }
  },
  mounted() {
    this.getList()
  }

}
</script>

<style lang="scss">
.matchField_result {
  .el-select {
    width: 100%;
  }
}
</style>
