<template>
  <div>
    <!-- <el-row>
      <el-col :span="24" style="marginBottom:10px; textAlign:right">
        <el-button type="primary" >全部导出</el-button>
        <el-button>导出已选</el-button>
      </el-col>
    </el-row> -->
    <el-row>
      <el-col :span="24">
        <el-table :data="tableData">
          <el-table-column type="selection" width="60"></el-table-column>
          <el-table-column type="index" label="序号" width="60"></el-table-column>
          <el-table-column label="分支机构" prop="branch"></el-table-column>
          <el-table-column label="涉及主体数" prop="submit"></el-table-column>
          <el-table-column label="涉及账户数" prop="register"></el-table-column>
          <el-table-column label="涉及金额" prop="count"></el-table-column>
        </el-table>        
      </el-col>
    </el-row>

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
    name: 'Tab3',
    data() {
      return {
        tableData: [
          {
            branch: '上海***银行',
            submit: '45',
            register: '342',
            count: '2987'

          },
          {
            branch: '上海***银行',
            submit: '123',
            register: '344',
            count: '3187'

          },
          {
            branch: '上海***银行',
            submit: '45',
            register: '342',
            count: '2987'

          },
          {
            branch: '上海***银行',
            submit: '45',
            register: '342',
            count: '2987'
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