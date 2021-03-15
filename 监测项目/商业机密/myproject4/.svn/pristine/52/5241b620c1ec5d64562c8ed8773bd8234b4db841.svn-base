<template>
  <div>
    <el-card>
      <el-table :data="tableData">
        <el-table-column label="主体/账号名称" prop="ctnm"></el-table-column>
        <el-table-column label="交易总金额" prop="crat"></el-table-column>
        <el-table-column label="交易总数" prop="tcount"></el-table-column>
        <el-table-column label="交易对手数" prop="tcnm"></el-table-column>
        <el-table-column label="涉及可疑交易报告数" prop="scount"></el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageInfo.pageNum" :page-size="pageInfo.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pageInfo.total" background>
      </el-pagination>
      <div style="text-align:center;margin-top:28px">
        <el-button type="primary" @click="go2Back">返 回</el-button>
      </div>
    </el-card>
  </div>

</template>
<script>
import { getData } from '@/api/sys-monitoringAnalysis/roster-warning/warning-result.js'
export default {
  data() {
    return {
      tableData: [],
      pageInfo: {
        pageNum: 1,
        pageSize: 10,
        total: 10
      }
    }
  },
  computed: {
    paramsObj() {
      const obj = Object.assign({}, this.$route.query, this.pageInfo)
      delete obj.total
      return obj
    }
  },
  mounted() {
    this.summarizeInfo()
  },
  methods: {
    // 获取主体信息
    summarizeInfo() {
      getData(this.paramsObj).then(res => {
        if (res.code === 200) {
          this.tableData = res.data.list
          this.pageInfo.total = res.data.total
        }
      })
    },
    // 切换分页条数
    handleSizeChange(size) {
      this.pageInfo.pageSize = size
      this.summarizeInfo()
    },
    // 点击切换分页
    handleCurrentChange(pageNum) {
      this.pageInfo.pageNum = pageNum
      this.summarizeInfo()
    },
    go2Back() {
      this.$router.go(-1)
    }
  }
}
</script>
<style>
</style>
