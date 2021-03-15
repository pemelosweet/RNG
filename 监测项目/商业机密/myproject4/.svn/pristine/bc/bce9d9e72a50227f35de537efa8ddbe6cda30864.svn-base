<template>
  <div class="scantaskdetail">
    <el-card>
      <div slot="header" class="clearfix">
        <span>扫描结果统计详情列表：</span>
        <router-link :to="{name:'dataGovernance_scanningTask'}"><el-button type="text" style="float:right;">返回</el-button></router-link>
      </div>
      <el-table style="width: 100%" :data="list.slice((currentPage-1)*pagesize,currentPage*pagesize)">
        <el-table-column type="selection" width="55" fixed></el-table-column>
        <el-table-column type="index" label="序号" min-width="55" fixed></el-table-column>
        <el-table-column prop="tradeId" label="交易ID" min-width="110"></el-table-column>
        <el-table-column prop="name" label="主体名称" min-width="110"></el-table-column>
        <el-table-column prop="tradedate" label="交易发生日期" min-width="110"></el-table-column>
        <el-table-column prop="mark" label="业务标识号" min-width="100"></el-table-column>
        <el-table-column prop="message" label="报告机构" min-width="100"></el-table-column>
        <el-table-column prop="rule" label="扫描规则" min-width="160"></el-table-column>
        <el-table-column prop="time" label="扫描时间" min-width="100"></el-table-column>
        <el-table-column prop="time" label="统计时间段" min-width="100"></el-table-column>
        <el-table-column prop="option" fixed="right" label="操作" min-width="80">
            <template slot-scope="scope">
                <router-link :to="{name:'dataType_detail_suspicious'}">
                  <el-button type="text">交易详情</el-button>
                </router-link>
            </template>
        </el-table-column>
      </el-table>
       <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]"
      :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400" background></el-pagination>
    </el-card>
  </div>
</template>

<script>
import { getScanningindex } from '@/api/dataGovernance'
export default {
  data() {
    return {
      list: [],
      // 每页显示条数
      currentPage: 1, // 分页当前页面
      pagesize: 10
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  created() {
    var listQuery = { currentPage: this.currentPage, pageSize: this.pageSize }
    this.fetchData(listQuery)
  },
  methods: {
    fetchData(listQuery) {
      // this.listLoading = true
      getScanningindex(this.listQuery).then(response => {
        this.list = response.data.projects
        // this.listLoading = false
      })
    },
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    }
    // cleanWay(e) {
    //   var t = e.currentTarget.innerText
    //   var obj = document.getElementById('clean')
    //   obj.innerHTML = t
    //   // this.cleandialogVisible = true
    //   console.log(obj.innerHTML)
    // }
  }
}
</script>

<style lang="scss">
.scantaskdetail {

}
</style>
