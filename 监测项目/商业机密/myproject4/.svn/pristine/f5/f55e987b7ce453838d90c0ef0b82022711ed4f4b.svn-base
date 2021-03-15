<template>
  <div class="technologyModel">
    <el-card>
      <div slot="header">发布列表</div>
      <el-form ref="modelForm" :model="form" :rules="modelFormRules" label-width="120px">
            <el-row>
                <el-col :span="8">
                <el-form-item label="项目名称：" prop="productName">
                    <el-input  style="width:100%" v-model.trim="form.productName" maxlength="50" placeholder="长度不能超过50"></el-input>
                </el-form-item>
                </el-col>

                <el-col :span="8">
                <el-form-item label="名称：" prop="modelName">
                    <el-input  style="width:100%" v-model.trim="form.modelName" maxlength="50" placeholder="长度不能超过50"></el-input>
                </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="审核时间：" prop="auditTime">
                        <el-date-picker v-model="form.auditTime" type="daterange" value-format="yyyy-MM-dd HH:mm:ss" :default-time="['00:00:00', '23:59:59']" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
                    </el-form-item>
                </el-col>

            </el-row>
            <el-row>
                <el-col :span="8">
                <el-form-item label="疑似涉罪类型:" prop="suspectOffenceType">
                    <el-input  v-model.trim="form.suspectOffenceType" maxlength="50" placeholder="长度不能超过50"></el-input>
                </el-form-item>
                </el-col>

                <el-col :span="8">
                <el-form-item label="更新时间：" prop="updateTime">
                    <el-date-picker v-model="form.updateTime" type="daterange" value-format="yyyy-MM-dd HH:mm:ss" :default-time="['00:00:00', '23:59:59']"  range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
                </el-form-item>
                </el-col>
                 <!-- <el-col :span="10">
                    <el-form-item label="审核时间：" prop="auditTime">
                        <el-date-picker v-model="form.auditTime" type="daterange" value-format="yyyy-MM-dd HH:mm:ss" :default-time="['00:00:00', '23:59:59']" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
                    </el-form-item>
                </el-col> -->
                <el-col :span="8">
                <el-form-item label="审核人：" prop="auditor">
                    <el-input  v-model.trim="form.auditor" maxlength="50" placeholder="长度不能超过50"></el-input>
                </el-form-item>
                </el-col>
            </el-row>

            <el-form-item class="valable">
                <el-button type="primary" @click="searchPag">查询</el-button>
                <el-button @click="clearForm" type="primary" plain>清空</el-button>
            </el-form-item>
    </el-form>
    <!-- 表格区域 -->
    <div class="titlefix" style="margin:10px">
        <span style="lineHeight:32px;float:left">发布列表：</span>
        <div style="float:left;margin:0 0 15px 15px">
            <el-button  type="primary" plain @click="batchDelete">批量删除</el-button>
        </div>
    </div>
      <el-table :data="data"
        v-loading="loadingRelease"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.1)"
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" fixed="left"></el-table-column>
        <!-- <el-table-column type="index" label="序号"></el-table-column> -->
        <el-table-column label="项目名称" prop="productName" min-width="150" show-overflow-tooltip></el-table-column>
        <el-table-column prop="modelAId" label="名称" min-width="300" show-overflow-tooltip>
          <!-- <template slot-scope="scope">
              <el-button style="color:#606266" type="text">{{scope.row.modelName}}</el-button>
          </template> -->
        </el-table-column>
        <el-table-column label="模型标识" min-width="200" prop="entryName">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>{{ scope.row.entryName }}</p>
              <div slot="reference" class="name-wrapper">
                <p style="white-space:nowrap;text-overflow:ellipsis;overflow:hidden;">{{ scope.row.entryName }}</p>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="suspectOffenceType" label="疑似涉罪类型" min-width="180" show-overflow-tooltip></el-table-column>
        <!-- <el-table-column prop="submitter" label="提交人" min-width="140"></el-table-column>
        <el-table-column prop="submissionTime" label="提交时间" min-width="160" sortable='custom'></el-table-column> -->
        <el-table-column prop="auditor" label="审核人" min-width="140" show-overflow-tooltip></el-table-column>
        <el-table-column prop="auditTime" label="审核时间" min-width="150" sortable='custom' show-overflow-tooltip></el-table-column>
        <!-- <el-table-column prop="upDownType" label="发布状态" min-width="120" ></el-table-column> -->
        <el-table-column prop="updateTime" label="更新时间" min-width="120" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" min-width="250" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" size="medium" @click="toOnline(scope)">进入工作流</el-button>
            <el-button type="text" size="medium" @click="lookSHInfo(scope)">查看审核信息</el-button>
            <el-button type="text" size="medium" @click="deleteModel(scope)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" background :current-page="pageInfo.pageNum" :page-size="pageInfo.pageSize" :page-sizes="[10, 20, 30, 40,50]" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import {
  selectqueryonline,
  goDeleteds,
  toaudit,
  deletedsOnLine,
  pldeletedsOnLine
} from '@/api/sys-monitoringAnalysis/technologyModel/index'
import { adminisValidInput, ValidQueryInput } from '@/utils/formValidate.js'
export default {
  data() {
    return {
      dialogAuditListVisible: false,
      pageInfo: {
        pageNum: 1,
        pageSize: 10
      },
      total: 5,
      loadingRelease: false,
      auditList: {
        radio: '通过',
        auditOpinion: ''
      },
      title: '技术',
      value4: '',
      data: [],
      form: {
        productName: '',
        modelName: '',
        suspectOffenceType: '',
        submitter: '',
        submissionTime: [],
        forecastCycle: '',
        auditor: '',
        auditTime: [],
        auditType: [],
        updateTime: []
      },
      scope: [],
      modelFormRules: {
        productName: [
          { validator: ValidQueryInput, trigger: 'blur' },
          { max: 50, message: '长度不能超过50', trigger: 'blur' }
        ],
        modelName: [
          { validator: ValidQueryInput, trigger: 'blur' },
          { max: 50, message: '长度不能超过50', trigger: 'blur' }
        ],
        submitter: [
          { validator: adminisValidInput, trigger: 'blur' },
          { max: 50, message: '长度不能超过50', trigger: 'blur' }
        ],
        suspectOffenceType: [
          { validator: ValidQueryInput, trigger: 'blur' },
          { max: 50, message: '长度不能超过50', trigger: 'blur' }
        ],
        auditor: [
          { validator: ValidQueryInput, trigger: 'blur' },
          { max: 50, message: '长度不能超过50', trigger: 'blur' }
        ]
      },
      sortVal: '',
      sortName: '',
      selOrderId: []
    }
  },
  computed: {
    paramsObj: function() {
      return {
        pageSize: this.pageInfo.pageSize,
        pageNum: this.pageInfo.pageNum,
        productName: this.form.productName ? this.form.productName : null,
        modelAId: this.form.modelName ? this.form.modelName : null,
        suspectOffenceType: this.form.suspectOffenceType ? this.form.suspectOffenceType : null,
        submitter: this.form.submitter ? this.form.submitter : null,
        submitSTime: this.form.submissionTime[0] ? this.form.submissionTime[0] : null,
        submitETime: this.form.submissionTime[1] ? this.form.submissionTime[1] : null,
        auditor: this.form.auditor ? this.form.auditor : null,
        auditSTime: this.form.auditTime ? this.form.auditTime[0] : null,
        auditETime: this.form.auditTime ? this.form.auditTime[1] : null,
        updateSTime: this.form.updateTime ? this.form.updateTime[0] : null,
        updateETime: this.form.updateTime ? this.form.updateTime[1] : null,
        upDownType: this.form.auditType.length ? this.form.auditType.join(',') : null,
        sortVal: this.sortVal ? this.sortVal : null,
        sortName: this.sortName ? this.sortName : null
      }
    }
  },
  created() {

  },
  mounted() {
    this.loadingRelease = true
    this.getList()
    this.title = this.$route.params.title
  },
  methods: {
    sortChange({ column, prop, order }) {
      if (prop !== null) {
        this.sortVal = order === 'ascending' ? 'asc' : 'desc'
        this.sortName = prop
      } else {
        this.sortVal = null
        this.sortName = null
      }
      this.getList()
    },
    // 获取列表
    getList() {
      selectqueryonline(this.paramsObj).then(res => {
        if (res.code === 200) {
          this.data = res.data.list
          this.total = res.data.total
          this.loadingRelease = false
        } else {
          this.loadingRelease = false
          this.$message({
            type: 'error',
            message: res.message,
            duration: 6000,
            showClose: true
          })
        }
      })
        .catch(() => {
          this.loadingRelease = false
        })
    },
    // 检测是否是IE浏览器
    isIE() {
      if (!!window.ActiveXObject || 'ActiveXObject' in window) {
        return true
      } else {
        return false
      }
    },
    toOnline(scope) {
      if (this.isIE()) {
        this.$alert('请使用非ie浏览器访问如下链接，登陆sophon系统 链接：' + window.sophonAddress, '提示', {
          confirmButtonText: '确定',
          callback: action => {
          }
        })
      } else {
        window.open(window.sophonAddress, '_blank')
        //  + ':8066/projects/96cd91ff-0956-45c0-a85d-2743397b8665/workflow'
      }
    },
    // 分页
    handleSizeChange(val) {
      this.pageInfo.pageSize = val
      this.loadingRelease = true
      this.getList()
    },
    handleCurrentChange(val) {
      this.pageInfo.pageNum = val
      this.loadingRelease = true
      this.getList()
    },
    // 查询
    searchPag() {
      this.$refs.modelForm.validate((valid) => {
        if (valid) {
          this.loadingRelease = true
          this.pageInfo.pageNum = 1
          this.pageInfo.pageSize = 10
          this.getList()
        }
      })
    },
    // 清空
    clearForm() {
      this.$refs['modelForm'].resetFields()
    //   this.loadingRelease = true
    //   this.getList()
    },
    // 审核意见
    sendAssemblyData() {
      const params = {
        modelAId: this.scope.row.modelAId,
        auditType: this.auditList.radio,
        auditOpinion: this.auditList.auditOpinion
      }
      toaudit(params).then(res => {
        if (res.code === 200) {
          this.$message({
            type: 'warning',
            message: '审核成功',
            duration: 6000,
            showClose: true
          })
          this.dialogAuditListVisible = false
          this.getList()
        }
      })
    },
    lookSHInfo(scope) {
      this.$router.push({
        name: 'modelPlatform_lookDataSHInfo',
        query: {
          aId: encodeURI(scope.row.modelAId),
          modelKey: scope.row.entryName
        }
      })
    },
    // 单删除
    deleteModel(scope) {
      this.$confirm('确定要删除嘛？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deletedsOnLine(scope.row.modelOnlyId).then(res => {
          if (res.code === 200) {
            this.$message({
              type: 'success',
              message: '删除成功!',
              duration: 6000,
              showClose: true
            })
            this.getList()
          } else {
            this.$message({
              type: 'success',
              message: res.message,
              duration: 6000,
              showClose: true
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消',
          duration: 6000,
          showClose: true
        })
      })
    },
    // 批量删除
    batchDelete() {
      if (this.selOrderId.length > 0) {
        this.$confirm('确定要删除选中的数据？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            pldeletedsOnLine(this.selOrderId.join(',')).then(res => {
              if (res.code === 200) {
                this.$message({
                  type: 'success',
                  message: '删除成功!',
                  duration: 6000,
                  showClose: true
                })
                this.getList()
              } else {
                this.$message({
                  type: 'warning',
                  message: res.message,
                  duration: 6000,
                  showClose: true
                })
              }
            })
          })
          .catch(() => {
            this.$message({
              message: '已取消删除',
              type: 'info',
              duration: 6000,
              showClose: true
            })
          })
      } else {
        this.$message({
          type: 'warning',
          message: '请选择要删除的数据 ！',
          duration: 6000,
          showClose: true
        })
      }
    },
    // 批量 选中的
    handleSelectionChange(val) {
      this.selOrderId = []
      if (val) {
        val.forEach(val => {
          if (val) {
            this.selOrderId.push(val.modelOnlyId)
          }
        })
      }
    },
    // 删除名单
    delRosterFn(params) {
      goDeleteds(params).then(res => {
        if (res.code === 200) {
          this.$message({
            type: 'success',
            message: '删除成功!',
            duration: 6000,
            showClose: true
          })
          this.getList()
          this.$refs.rosterTable.clearSelection()
        } else {
          this.$message({
            type: 'error',
            message: res.message,
            duration: 6000,
            showClose: true
          })
        }
      })
        .catch(() => { })
    },
    // 下线
    techModel(scope) {
      this.$confirm('确定要下线嘛?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // this.$message({
        //   type: 'success',
        //   message: '删除成功!'
        // })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消',
          duration: 6000,
          showClose: true
        })
      })
    }
  }
}
</script>

<style scoped lang="scss">
.technologyModel {
    .el-card{
        .el-card__body{
          .el-form {
            margin-bottom: 14px;
            padding-top:10px;
            border-radius: 10px;
            border: 1px solid #f2f2f2;
            .el-select {
                width: 100%;
            }
            .el-date-editor--daterange {
            width: 100% !important;
            }
              .valable{
                  width:100%;
                  text-align:right;
                  .el-form-item__content button {
                      margin:0 10px;
                  }
              }
            }
         .titlefix{
             margin: 5px;
            }
        .el-table {
            margin-top:52px;
        }
        }
    }
}
</style>
