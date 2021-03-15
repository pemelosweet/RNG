<template>
  <div class="cueManage_investigation_transfer">
    <div class="list-block">
      <el-row>
        <el-col :span="12">
          <span>流转信息</span>
        </el-col>
      </el-row>
      <el-table :data="tableData">
        <el-table-column label="序号" type="index"></el-table-column>
        <el-table-column label="姓名" prop="name"></el-table-column>
        <el-table-column label="办理部门" prop="department" min-width="130"></el-table-column>
        <el-table-column label="操作名称" prop="handle"></el-table-column>
        <el-table-column label="操作时间" prop="time"></el-table-column>
        <el-table-column label="意见" prop="idea"></el-table-column>
        <el-table-column label="备注" prop="remark"></el-table-column>
      </el-table>
      <el-pagination 
        @size-change="handleSizeChange" 
        @current-change="handleCurrentChange" background
        :current-page="currentPage"
        :page-size="pagesize" 
        :page-sizes="[10, 20, 30, 40,50]" layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.length">
      </el-pagination>
      
    </div>
    <div class="map-block">
      <el-row style="marginBottom:20px">
        <el-col :span="12">
          <span>流程监控图 ：</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-steps :active="2" align-center>
            <el-step title="填写协查类文件档案表" description=""></el-step>
            <el-step title="移送处处长审核" description=""></el-step>
            <el-step title="...." description=""></el-step>
            <el-step title="结束" description=""></el-step>
          </el-steps>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [
          {
            name: 'user1',
            department: '中国反洗钱监测分析中心/线索移送处',
            handle: '接收协查',
            time: '2018-1-14',
            idea: '同意',
            remark: ''
          },
          {
            name: 'user2',
            department: '中国反洗钱监测分析中心/线索移送处',
            handle: '判断协查类型',
            time: '2018-1-12',
            idea: '同意',
            remark: ''
          },
          {
            name: 'user3',
            department: '中国反洗钱监测分析中心/线索移送处',
            handle: '预分配',
            time: '2018-1-20',
            idea: '不同意',
            remark: '信息不完整'
          }
        ],
        currentPage: 1,
        pagesize: 10
      }
    },
    methods: {
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

<style scoped lang="scss">
.list-block{
  margin-bottom: 30px
}

</style>