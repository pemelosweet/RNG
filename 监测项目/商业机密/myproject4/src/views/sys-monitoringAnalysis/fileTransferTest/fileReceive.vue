<template>
  <div>
    <el-card>
      <div slot="header">文件接收</div>
      <div>
        <el-form ref="form" :model="form" :label-position="labelPosition" label-width="110px">
          <!-- 第一行 -->
          <el-row :gutter="20" class="searchBlock">
            <el-col :span="8">
                <el-form-item label="上传日期 :">
                    <div class="chooseTime">
                      <el-date-picker 
                      v-model="form.timeSelectValue" 
                      type="daterange"
                        range-separator="至"
                      start-placeholder="开始日期" 
                      end-placeholder="结束日期"
                      :unlink-panels="true"
                      ></el-date-picker>
                    </div>
                </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item label="文件名称:">
                <el-input v-model="form.filename" placeholder="文件名模糊查询"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="2">
                <el-button type="primary">查  询</el-button>
            </el-col>
            
          </el-row>
        </el-form>
      </div>

      <el-table :data="list"
        style="width: 100%" header-cell-class-name="el-table-hearder" >
        
        <el-table-column  type="selection" min-width="60">
          <template >
            <span>全选</span>/<span>反选</span>
          </template>
        </el-table-column>

        <el-table-column prop="num" label="序号" width="60">
            <template slot-scope="scope">
              {{scope.$index+1}}
            </template>
          </el-table-column>
        
        <el-table-column label="发送人"  >
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        
        <el-table-column label="文件名称"  >
          <template slot-scope="scope">
            <span>{{ scope.row.filename }}</span>
          </template>
        </el-table-column>

        <el-table-column label="文件大小"  >
          <template slot-scope="scope">
            <span>{{ scope.row.size }}</span>
          </template>
        </el-table-column>
        
        <el-table-column label="接收日期"  >
          <template slot-scope="scope">
            <span>{{ scope.row.recvDate }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text">下载</el-button>
            <el-button type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table> 
        
      <!-- 分页 -->
      <!-- <p style="textAlign:right"> -->
      <el-row>
        <el-col :span="6" style="paddingTop:10px">
          <el-button type="primary" >批量下载</el-button>
          <el-button type="" >清空记录</el-button>
        </el-col>
        <el-col :span="18">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange" background
            :current-page="currentPage"
            :page-size="pagesize"
            :page-sizes="[10, 20, 30, 40,50]" layout="total, sizes, prev, pager, next, jumper"
            :total="tableData.length">
          </el-pagination>
        </el-col>
      </el-row>
        
    </el-card>
  </div>
</template>

<script>
  import { getList } from '@/api/sys-inland/fileReceive'
  export default {
    data() {
      return {
        // 默认开始页码
        currentPage: 1,
        // 每页显示条数
        pagesize: 10,
        labelPosition: 'right',
        tableData: [],
        list: [],
        listLoading: true,
        form: {
          filename: ''
        }
      }
    },
    methods: {
      handleSizeChange(size) {
        this.pagesize = size
      // console.log(`每页 ${size} 条`)
      },
      handleCurrentChange(currentPage) {
        this.currentPage = currentPage
      // console.log(`当前页: ${currentPage}`)
      },
      fetchData(listQuery) {
        this.listLoading = true
        getList(this.listQuery).then(response => {
          this.list = response.data.projects
          this.listLoading = false
        })
      }
    },
    created() {
      var listQuery = { currentPage: this.currentPage, pageSize: this.pageSize }
      this.fetchData(listQuery)
    }
  }
</script>

<style scoped>

</style>