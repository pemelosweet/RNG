<template>
  <div>
    <!-- <el-row>
      <el-col :span="24"  style="marginBottom:10px; textAlign:right">
        <el-button type="primary">全部导出</el-button>
        <el-button>导出已选</el-button>
      </el-col>
    </el-row> -->
   
    <el-table :data="tableData">
      <el-table-column type="selection"  width="60"></el-table-column>
      <el-table-column type="index" label="序号" width="60"></el-table-column>
      <el-table-column label="分支机构" prop="branch"></el-table-column>
      <el-table-column label="犯罪类型统计" prop="crime"></el-table-column>
      <el-table-column label="数量" prop="number"></el-table-column>
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
</template>

<script>
  export default {
    name: 'Tab1',
    data() {
      return {
        tableData: [
          {
            branch: '上海***银行',
            crime: '涉嫌与恐怖活动有关的可疑交易',
            number: '26'
          },
          {
            branch: '北京***银行',
            crime: '涉嫌与走私犯罪相关的可疑交易',
            number: '26'
          },
          {
            branch: '广东***银行',
            crime: '涉嫌与黑社会组织有关的可疑交易行为',
            number: '26'
          },
          {
            branch: '广州***银行',
            crime: '涉嫌与黑社会组织有关的可疑交易行为',
            number: '26'
          },
          {
            branch: '杭州***银行',
            crime: '涉嫌与恐怖活动有关的可疑交易',
            number: '26'
          }
        ],
        currentPage: 1,
        pagesize: 10
      }
    },
  
    methods: {
    // 分页
      handleSizeChange(size) {
        this.pagesize = size
      // console.log(`每页 ${size} 条`)
      },
      handleCurrentChange(currentPage) {
        this.currentPage = currentPage
      // console.log(`当前页: ${currentPage}`)
      }
    }
  }
</script>

<style>

</style>