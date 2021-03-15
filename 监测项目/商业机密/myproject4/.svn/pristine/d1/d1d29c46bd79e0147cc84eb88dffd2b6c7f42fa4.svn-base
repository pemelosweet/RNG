<template>
  <div class="cueManage_investigation_archives">
    <el-row class="uploadContainer">
      <el-col :span="20" :offset="2">
        <File-Upload :accepts="accepts"></File-Upload>
      </el-col>
    </el-row>
    <div class="tableContainer">
      <el-row>
        <el-col :span="12">
          <span>附件列表</span>
        </el-col>
      </el-row>
          <el-table :data="tableData">
            <el-table-column label="序号" type="index"></el-table-column>
            <el-table-column label="附件名称" prop="name"></el-table-column>
            <el-table-column label="操作" width="140">
              <template slot-scope="scope">
                <el-button type="text">下载</el-button>
                <el-button type="text" @click="delRow(scope)">删除</el-button>
              </template>
            </el-table-column>
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


  </div>
</template>

<script>
import FileUpload from '@/components/FileUpload/index'
export default {
  components: {
    FileUpload
  },
  data() {
    return {
      accepts: ['zip', 'rar'],
      tableData: [
        {
          name: '关于***国际协查单'
        },
        {
          name: '关于***附件'
        },
        {
          name: '关于***附件'
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
    },
    delRow(scope) {
      const index = scope.$index
      this.$confirm('确定要删除此附件吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.tableData.splice(index, 1)
      }).catch(() => {})
    }
  }
}
</script>

<style scope>
.uploadContainer{
  margin-bottom: 30px

}

</style>
