<template>
  <el-card>
    <div slot="header" class="clearfix">
      <span>系统更新日志</span>
    </div>
    <el-table :data="tableData" tooltip-effect="dark">
      <el-table-column prop="version" label="版本号" min-width="120" show-overflow-tooltip ></el-table-column>
      <el-table-column prop="startDate" label="更新日期" min-width="120" show-overflow-tooltip ></el-table-column>
      <el-table-column prop="updateContent" label="更新概要" min-width="120" show-overflow-tooltip ></el-table-column>
      <el-table-column label="操作" width="80">
        <template slot-scope="scope">
          <el-button @click="lookOne(scope.row)" type="text">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total" background></el-pagination>
  </el-card>
</template>

<script>
// import { getList } from '@/api/sys-reportingAgency/systemManage/upDateLog'
export default {
  data() {
    return {
      id: '',
      form: {
        name: ''
      },
      tableData: [],
      // 分页数据
      pageSize: 10,
      currentPage: 1,
      total: null
    }
  },
  // computed: {

  // },
  created() {
    this.getData()
  },
  methods: {
    // 分页
    handleSizeChange(val) {
      this.pageSize = val
      this.getData()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getData()
    },
    getData() {
      // 获取列表
      // const pageInfo = {
      //   pageSize: this.pageSize,
      //   pageNum: this.currentPage
      // }
      // getList(pageInfo).then(res => {
      //   this.tableData = res.data.page
      //   this.total = res.data.total
      // })
    },
    lookOne(rowList) {
      // 查看
      this.$router.push({
        name: 'updateLog_detail',
        query: {
          id: rowList.logId
        }
      })
    }
  }
}
</script>
