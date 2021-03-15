<template>
  <el-card>
    <div slot="header"> 
       <span>流程执行信息：</span>
    </div> 
    <el-table :data="list.slice((currentPage-1)*pagesize,currentPage*pagesize)">
        <el-table-column type="selection" min-width="55"></el-table-column>
        <!-- <el-table-column type="index" label="序号" width="80"></el-table-column> -->
        <el-table-column type="index" label="执行ID" width="100" fixed></el-table-column>
        <el-table-column prop="processName" label="流程名称" min-width="170"></el-table-column>
        <el-table-column prop="projectName" label="项目名称" min-width="160"></el-table-column>
        <el-table-column prop="dispatchUser" label="调度用户" min-width="120"></el-table-column>
        <el-table-column prop="dispatchDate" label="第一次被调度的时间" min-width="150"></el-table-column>
        <el-table-column prop="nextDispatchdate" label="下一次被调度的时间" min-width="150"></el-table-column>
        <el-table-column prop="allTime" label="总耗时" min-width="120"></el-table-column>
        <el-table-column prop="resultState" label="结果状态" min-width="100"></el-table-column>
        <el-table-column prop="option" fixed="right" label="操作" min-width="120">
          <template slot-scope="scope">
              <el-select v-model="value" placeholder="请选择">
                <el-option label="启动" value="shanghai"></el-option>
                <el-option label="暂停" value="beijing"></el-option>
                <el-option label="中止" value="beijing"></el-option>
                <el-option label="继续执行" value="beijing"></el-option>
              </el-select>
             <!--v-if="scope.row.fkqk==='待反馈'"-->
          </template>
        </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]"
        :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400" background></el-pagination>
    <div class="btnalign"><router-link to="/dataQuery/dataType"><el-button type="primary"><i class="el-icon-back"></i>返回</el-button></router-link></div>
  </el-card>
</template>

<script>
import { getExecute } from '@/api/process'

export default {
  data() {
    return {
      list: [],
      // 默认开始页码
      currentPage: 1,
      // 每页显示条数
      pagesize: 10,
      value: '' // 下拉框
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
      getExecute(this.listQuery).then(response => {
        this.list = response.data.projects
        this.listLoading = false
      })
    },
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.btnalign {
    text-align: center;
    margin-top: 10px;
}
</style>
