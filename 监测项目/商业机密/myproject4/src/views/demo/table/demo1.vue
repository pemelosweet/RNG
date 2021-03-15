<template>
  <div class="app-container">

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>模块名称</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div>
      <div class="text item">

        <!-- 按钮组样式 -->
        <div class="button-group clearfix">
          <ul class="ul-inline">
            <li><el-button type="primary" plain>批量操作</el-button></li>
            <li><el-button type="primary" plain>批量操作</el-button></li>
            <li><el-button type="primary" plain>批量操作</el-button></li>
          </ul>

          <!-- <ul class="ul-inline" style="float:right">
            <li><el-button type="primary" plain>主要按钮</el-button></li>
            <li><el-button type="primary" plain>主要按钮</el-button></li>
            <li><el-button type="primary" plain>主要按钮</el-button></li>
          </ul> -->
          <el-button-group style="float:right">
            <el-button type="primary" icon="el-icon-plus"> 新建</el-button>
            <el-button type="primary" plain>主要按钮</el-button>
            <el-button type="primary" plain>主要按钮</el-button>
            <el-dropdown>
              <el-button type="primary" plain>
                更多操作<i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>更多操作1</el-dropdown-item>
                <el-dropdown-item>更多操作2</el-dropdown-item>
                <el-dropdown-item>...</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-button-group>
        </div>

        <el-table :data="list.slice((currentPage-1)*pagesize,currentPage*pagesize)" @select="handleSelectionChange" v-loading.body="listLoading" element-loading-text="Loading" fit highlight-current-row>
          <el-table-column type="selection" ></el-table-column>
          <el-table-column type="index" align="center" label='ID' width="95"></el-table-column>
          <el-table-column label="Url">
            <template slot-scope="scope">
              <router-link to=""><el-button type="text">{{scope.row.url}}</el-button></router-link>
            </template>
          </el-table-column>
          <el-table-column label="email" width="110" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.email}}</span>
            </template>
          </el-table-column>
          <el-table-column label="city" width="110" align="center">
            <template slot-scope="scope">
              {{scope.row.city}}
            </template>
          </el-table-column>
          <el-table-column class-name="status-col" label="Status" width="110" align="center">
            <template >
                <router-link to=""></router-link>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="created_at" label="Display_time" width="200">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span>{{scope.row.datetime}}</span>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="140">
            <template slot-scope="scope">
              <ul class="ul-inline">
                <li class="li-br"><el-button type="text" @click="seeLook(scope)">查看</el-button></li>
                <li>
                  <el-dropdown>
                    <span class="el-dropdown-link">
                      更多<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item>编辑</el-dropdown-item>
                      <el-dropdown-item>删除</el-dropdown-item>
                      <el-dropdown-item>分享</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </li>
              </ul>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40, 50]"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="list.length">
        </el-pagination>
      </div>
    </el-card>


  </div>
</template>

<script>
import { getList } from '@/api/table'

export default {
  data() {
    return {
      list: [],
      listLoading: true,
      // 默认开始页码
      currentPage: 1,
      // 每页显示条数
      pagesize: 10,
      multipleSelection: [],
      title: ''
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
      this.listLoading = true
      getList(this.listQuery).then(response => {
        this.list = response.data.projects
        this.listLoading = false
      })
    },
    handleSizeChange(size) {
      this.pagesize = size
      // console.log(`每页 ${size} 条`)
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage
      // console.log(`当前页: ${currentPage}`)
    },
    handleSelectionChange(val) {
      console.log(`当前页: ${this.multipleSelection}`)
      this.multipleSelection = val
      // this.title = '已选当前页' + this.multipleSelection.length + '项'
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
.app-container {
  & .ul-inline {
    & > li{
      padding:0 10px;
      &:first-child {
        padding-left: 0px;
      }
      &:last-child {
        padding-right: 0px;
      }
    }
  }
  & .el-dropdown {
    color: #409EFF;
    font-size: 12px;
  }
}

</style>

