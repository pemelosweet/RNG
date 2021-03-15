<template>
  <div class="cueManage_investigation_archives">
    
    <div class="tableContainer">
      <el-row>
        <el-form>
          <el-col :span="12">
            <el-form-item label="附件列表:">
              <el-upload ref="upload" :action="uploadUrl" :headers="headers" :file-list="fileList" :before-upload="beforeUpload" :on-success="successUpload" :limit="1">
                <el-button size="small" type="primary">上传附件</el-button>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-form>
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
import { getToken } from '@/utils/auth'
import FileUpload from '@/components/FileUpload/index'
// import { relatedAccessories } from '@/api/administration'
export default {
  props: {
    applyID: {
      type: String
    }
  },
  components: {
    FileUpload
  },
  data() {
    return {
      files: '',
      fileList: [],
      tableData: [
        {
          name: '反馈信息XXXXXXXXXXXXXXXXX附件.doc'
        },
        {
          name: '反馈信息XXXXXXXXXXXXXXXXX附件.jpg'
        },
        {
          name: '反馈信息XXXXXXXXXXXXXXXXX附件.rar'
        },
        {
          name: '关于***附件'
        },
        {
          name: '关于***附件'
        }

      ],
      currentPage: 1,
      pagesize: 10,
      headers: {
        Authorization: getToken()
      }
    }
  },
  computed: {
    uploadUrl() {
      return '/monitor/thread/adm/upload/' + this.applyID
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
      this.$confirm('确定删除此附件吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.tableData.splice(index, 1)
      }).catch(() => {})
    },
    successUpload(response, file, fileList) {
      if (response.code === 200) {
        this.$message({
          message: '上传成功',
          type: 'success'
        })
      } else {
        this.$message({
          message: response.messeage,
          type: 'error'
        })
      }
    },
    beforeUpload(file) {
      if (this.applyID === '') {
        this.$message({
          message: '您还没有提交表单，请提交成功后上传',
          type: 'info'
        })
        return false
      }
    }
  }
}
</script>

<style scope>
.uploadContainer{
  margin-bottom: 30px

}

</style>
