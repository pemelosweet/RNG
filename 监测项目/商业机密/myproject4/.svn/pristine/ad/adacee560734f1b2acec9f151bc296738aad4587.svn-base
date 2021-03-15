<template> 
  <div class="templateManage" id="templateManage">
    <el-card>
      <div slot="header" class="clearfix">
        <span style="lineHeight:32px">查询模板管理</span>
        <div style="float:right">
          <router-link :to="{name: 'dataQuery_templateManage_add', query: { title: 'new'}}">
            <el-button type="text" icon="el-icon-plus">新增</el-button>
          </router-link>
        </div>
      </div>
      <el-form :model="searchForm" ref="searchForm" class="serachBlock" :rules="rules" label-width="110px">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="模板名称：" prop="qttName">
              <el-input v-model="searchForm.qttName" placeholder="最大长度为30位" maxLength="30"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="创建时间：" prop="dateValue">
              <el-date-picker v-model="searchForm.dateValue" type="daterange" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="updataPickerOptions">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" @click="handleQuery">查 询</el-button>
            <el-button type="primary" plain @click="resetForm('searchForm')">清 空</el-button>
          </el-col>
        </el-row>
      </el-form> 
      <div class="tableContanier"> 
        <el-table :data="list" @selection-change="handleSelectionChange" v-loading="loadingBox" element-loading-text="正在查询中，请稍候……" element-loading-background="rgba(0, 0, 0, 0.1)">
          <el-table-column label="序号" type="index"></el-table-column>
          <el-table-column label="模板名称" prop="qttName" min-width="120">
            <template slot-scope="scope">
              <router-link :to="{ name:'dataQuery_templateManage_add', query: { id: scope.row.pkQtt, isView: '0', title: 'update'}}">
                <el-tooltip class="item" effect="dark" placement="top-start">
                  <div slot="content">{{ scope.row.qttName}}</div>
                  <span style="color: #409EFF;">{{ scope.row.qttName }}</span>
                </el-tooltip>
              </router-link>
            </template>
          </el-table-column>
          <el-table-column label="创建人" prop="creUser"></el-table-column>
          <el-table-column label="创建时间" prop="creDate" min-width="120"></el-table-column>
          <el-table-column label="修改时间" prop="updDate" min-width="120"></el-table-column> 
          <el-table-column prop="qttStatus" label="状态" v-if="handleAuthority">
            <template slot-scope="scope">
              {{scope.row.qttStatus}}
            </template>
          </el-table-column>
          <el-table-column label="发布/撤销发布时间" prop="releaseDate" min-width="120"></el-table-column>
          <el-table-column label="操作" width="200" fixed="right">
            <template slot-scope="scope">
              <el-button type="text" @click="handleRelease(scope)" v-if="handleAuthority && scope.row.qttStatus !== '已发布'">发布公告</el-button>
              <el-button type="text" @click="handleReleaseRevoke(scope)" v-if="(scope.row.creUser === name) && scope.row.qttStatus === '已发布'">撤销发布</el-button>
              <el-button type="text" @click="handleExport(scope)">导 出</el-button>
              <el-button type="text" @click="deleRow(scope)" v-if="scope.row.creUser === name" :disabled="handleAuthority && scope.row.qttStatus === '已发布'">删 除</el-button> <!--模板只能自己删自己的-->
              <el-button type="text" v-else :disabled="handleAuthority && scope.row.qttStatus === '已发布' || scope.row.creUser !== name">删 除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-row style="text-align: right;">
          <!-- <el-col :span="12" style="padding: 10px 0">
            <el-button type="primary" @click="handleAllRelease" v-if="handleAuthority">批量发布公告</el-button>
            <el-button type="primary" @click="handleAllExport">批量导出</el-button>
            <el-button type="primary" @click="delAll">批量删除</el-button>
          </el-col> -->
          <!-- <el-col :span="12"> -->
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" background :current-page="pageInfo.pageNum" :page-size="pageInfo.pageSize" :page-sizes="[10, 20, 30, 40,50]" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
          <!-- </el-col> -->
        </el-row>

      </div>
    </el-card> 
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getToken } from '@/utils/auth'
import { getList, delData, tplRelease, tplReleaseRevoke } from '@/api/sys-monitoringAnalysis/dataQuery/templateManage'
import { ValidQueryInput } from '@/utils/formValidate.js'

export default {
  data() {
    return {
      updataPickerOptions: { // 更正时间 选中今天及以后
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      },
      getForm: '',
      searchForm: {
        qttName: '',
        dateValue: ''
      },
      rules: {
        qttName: [{ validator: ValidQueryInput, trigger: 'blur' }, { max: 30, message: '最大长度为30位', trigger: 'blur' }]
      },
      multipleSelection: [],
      del_list: [], // 批量删除参数
      list: [],
      total: 0,
      pageInfo: {
        pageNum: 1,
        pageSize: 10
      },
      authority: 'monitor:query:Release', // 记录发布按钮权限
      roleState: null,
      loadingBox: false,
      token: getToken()
    }
  },
  nextTick() {
    this.getParams()
  },
  watch: {
    // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
    $route: 'getParams'
  },
  computed: {
    handleAuthority() {
      if (this.permissions_routers.indexOf(this.authority) !== -1) {
        return true
      } else {
        return false
      }
    },
    ...mapGetters(['permissions_routers', 'name'])
  },
  created() {
    const obj = JSON.parse(sessionStorage.getItem('searchData'))
    if (obj) {
      if (obj.ifTmpFlag) {
        this.pageInfo = obj.pageInfo
        this.searchForm = obj.searchForm
      }
    }
  },
  mounted() {
    this.getData()
    this.getParams()
  },
  methods: {
    getData() {
      const paramsObj = {
        qttName: this.searchForm.qttName,
        qttcStartDate: this.searchForm.dateValue ? this.searchForm.dateValue[0] : '',
        qttcEndDate: this.searchForm.dateValue ? this.searchForm.dateValue[1] : '',
        pageNum: this.pageInfo.pageNum,
        pageSize: this.pageInfo.pageSize
      }
      getList(paramsObj).then(res => {
        if (res.code === 200) {
          this.loadingBox = false
          res.data.list.forEach((item, index) => {
            if (item.qttStatus !== null) {
              const qttStatus = item.qttStatus
              switch (qttStatus) {
                case 0:
                  item.qttStatus = ''
                  break
                case 1:
                  item.qttStatus = '待发布'
                  break
                case 2:
                  item.qttStatus = '已发布'
                  break
                default:
                  item.qttStatus = ''
              }
            }
          })
          this.list = res.data.list
          this.total = res.data.total
          const searchData = {
            pageInfo: this.pageInfo,
            searchForm: this.searchForm
          }
          sessionStorage.setItem('searchData', JSON.stringify(searchData))
        }
      })
    },
    handleQuery() {
      this.$refs.searchForm.validate((valid) => {
        if (valid) {
          this.loadingBox = true
          this.pageInfo.pageNum = 1
          this.getData()
        } else {
          return false
        }
      })
    },
    getParams() {
      // 取到路由带过来的参数
      var routerParams = this.$route.params.form
      // 将数据放在当前组件的数据内
      this.getForm = routerParams
      if (this.getForm) {
        this.tableData.unshift(this.getForm)
      }
    },
    resetForm(formName) {
    // 重置清空操作
      this.$refs[formName].resetFields()
    },
    handleSizeChange(val) {
      // 分页
      this.pageInfo.pageSize = val
      this.getData()
    },
    handleCurrentChange(val) {
      this.pageInfo.pageNum = val
      this.getData()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    deleRow(scope) {
      this.$confirm('确定要删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const ids = scope.row.pkQtt
          delData(ids)
            .then(res => {
              if (res.code === 200) {
                this.$message({
                  showClose: true,
                  duration: 6000,
                  message: '删除成功！',
                  type: 'success'
                })
                setTimeout(() => {
                  this.getData()
                }, 10)
              }
            })
            .catch(() => {})
        })
        .catch(() => {})
    },
    // delAll() {
    //   // 批量删除
    //   const length = this.multipleSelection.length
    //   this.del_list = this.del_list.concat(this.multipleSelection)
    //   console.log('this.multipleSelection', this.multipleSelection)
    //   if (length === 0) {
    //     this.$confirm('请至少选择一条数据', '提示', { showCancelButton: false, type: 'warning' })
    //       .then(() => {
    //         // 向请求服务端删除
    //       })
    //       .catch(() => {})
    //   } else {
    //     this.$confirm('确定要删除吗？', '提示', {
    //       confirmButtonText: '确定',
    //       cancelButtonText: '取消',
    //       type: 'warning'
    //     })
    //       .then(() => {
    //         const ids = this.del_list
    //           .map(function(item) {
    //             return item.pkQtt
    //           })
    //           .toString()
    //         delData(ids)
    //           .then(res => {
    //             if (res.code === 200) {
    //               this.getData()
    //               this.$message({
    //                 type: 'success',
    //                 message: '批量删除成功!'
    //               })
    //             }
    //           })
    //           .catch(() => {})
    //       })
    //       .catch(() => {})
    //   }
    //   this.multipleSelection = []
    // },
    handleExport(scope) {
      // 导出
      const ids = scope.row.pkQtt
      if (ids) {
        location.href = '/caml-query/governor/template/exportTmp/' + ids + '?token=' + this.token
      } else {
        this.$confirm('批量导出失败', '提示', {
          showCancelButton: false,
          type: 'error'
        }).then()
          .catch()
      }
    },
    // handleAllExport() {
    //   const length = this.multipleSelection.length
    //   if (length === 0) {
    //     this.$confirm('请至少选择一条数据', '提示', { showCancelButton: false, type: 'warning' })
    //       .then(() => {
    //         // 向请求服务端删除
    //       })
    //       .catch(() => {})
    //   } else {
    //     const ids = this.multipleSelection
    //       .map(function(item) {
    //         return item.pkQtt
    //       })
    //       .toString()
    //     if (ids) {
    //       location.href = process.env.BASE_API + '/monitor/governor/template/exportTmp/' + ids + '?token=' + this.token
    //     } else {
    //       this.$message.error('批量导出失败！')
    //     }
    //   }
    // },
    handleRelease(scope) {
      // 发布
      const ids = scope.row.pkQtt
      tplRelease(ids)
        .then(res => {
          if (res.code === 200) {
            this.$message({
              showClose: true,
              duration: 6000,
              message: '发布公告成功！',
              type: 'success'
            })
            setTimeout(() => {
              this.getData()
            }, 10)
          } else {
            this.$message({
              type: 'error',
              showClose: true,
              message: res.message
            })
          }
        })
        .catch(() => {})
    },
    handleReleaseRevoke(scope) {
      // 撤销发布
      const ids = scope.row.pkQtt
      tplReleaseRevoke(ids)
        .then(res => {
          if (res.code === 200) {
            this.$message({
              showClose: true,
              duration: 6000,
              message: '撤销发布成功！',
              type: 'success'
            })
            setTimeout(() => {
              this.getData()
            }, 10)
          } else {
            this.$message({
              type: 'error',
              showClose: true,
              message: res.message
            })
          }
        })
        .catch(() => {})
    },
    release(scope) {
      this.roleState = scope.row.roleState
      if (scope.row.roleState === '2') {
        return true
      }
    }
  }
}
</script>

<style lang="scss">
.templateManage {
  .item { // 表格加省略号
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .serachBlock {
    margin-bottom: 30px;
  }
  .listBlock {
    margin-bottom: 30px;
  }
  .btnalign {
    text-align: right;
  }
}
</style>
