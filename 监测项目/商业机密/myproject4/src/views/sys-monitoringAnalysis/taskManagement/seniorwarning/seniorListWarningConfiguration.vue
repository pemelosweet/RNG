<template>
  <div class="seniorListWarningConfiguration">
    <el-card>
      <div slot="header">
        <span>高级名单预警配置</span>
        <el-button type="text" style="float:right" @click="handleAdd">新建+</el-button>
      </div>
      <el-form :model="modelForm" :rules="rulesForm" ref="refForm" label-width="100px">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="涉罪类型" prop="preliminaryJudgment">
              <el-select clearable v-model="modelForm.preliminaryJudgment" placeholder="请选择">
                <el-option v-for="(item,idx) in modelNameTableData" :label="item.codeName" :value="item.codeId" :key="idx"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="预警范围" prop="warningRange">
              <el-input  v-model="modelForm.warningRange" maxlength="100" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="预警处室" prop="thrproductlist">
              <el-input  v-model="modelForm.thrproductlist" maxlength="100" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="创建人" prop="createUser">
              <el-input  v-model="modelForm.createUser" maxlength="100" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="创建时间" prop="createTime">
              <el-date-picker value-format="yyyy-MM-dd" unlink-panels clearable v-model="modelForm.createTime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="状态" prop="state">
              <el-select clearable v-model="modelForm.state" placeholder="请选择" class="w100">
                <el-option label="启用" value="启用"></el-option>
                <el-option label="停用" value="停用"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="更新人" prop="updateUser">
              <el-input  v-model="modelForm.updateUser" maxlength="100" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="更新时间" prop="updateTime">
              <el-date-picker value-format="yyyy-MM-dd" unlink-panels clearable v-model="modelForm.updateTime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="8">
            <el-form-item label="预警编号" prop="">
              <el-input  v-model="modelForm.in00" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col> -->
        </el-row>
        <div style="text-align:right;margin-bottom:6px;">
          <!-- <el-button type="primary" @click="kai">cestbon，</el-button> -->
          <el-button type="primary" @click="handleSearch">查 询</el-button>
          <el-button @click="handleClearForm">清 空</el-button>
        </div>
      </el-form>

      <el-table 
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.1)" 
        :data="tableData" 
        tooltip-effect="dark">
        <el-table-column label="序号" type="index" width="50" fixed="left"></el-table-column>
        <!-- <el-table-column label="预警编号" prop="in00" min-width="120" show-overflow-tooltip></el-table-column> -->
        <el-table-column label="涉罪类型" prop="preliminaryJudgment" min-width="120" show-overflow-tooltip></el-table-column>
        <el-table-column label="预警范围" prop="warningRange" min-width="120" show-overflow-tooltip></el-table-column>
        <el-table-column label="状态" prop="state" min-width="120" show-overflow-tooltip></el-table-column>
        <el-table-column label="创建人" prop="createUser" min-width="120" show-overflow-tooltip></el-table-column>
        <el-table-column label="创建时间" prop="createTime" min-width="120" show-overflow-tooltip></el-table-column>
        <el-table-column label="更新人" prop="updateUser" min-width="120" show-overflow-tooltip></el-table-column>
        <el-table-column label="更新时间" prop="updateTime" min-width="120" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" fixed="right" width="125">
          <template slot-scope="scope">
            <el-button v-if="scope.row.state === '启用'" type="text" @click="handleStop(scope)">停用</el-button>
            <el-button v-else type="text" @click="handleGo(scope)">启用</el-button>
            <el-button v-if="scope.row.state === '启用'" type="text" @click="handleLook(scope)">查看</el-button>
            <el-button v-else type="text" @click="handleEdit(scope)">编辑</el-button>
            <el-button type="text" @click="handleDel(scope)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNum" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total" background>
      </el-pagination>
    </el-card>

  </div>
</template>
<script>
import { ValidQueryInput, isValidBlank } from '@/utils/formValidate.js'
import { getListapi, stopListapi, deleteListapi, pushInfo, getCrimapi } from '@/api/sys-monitoringAnalysis/taskManagement/seniorwarning/seniorListWarningConfiguration.js'
export default {
  name: 'seniorListWarningConfiguration',
  data() {
    return {
      searchFlag: false, // 查询标志
      modelForm: {
        preliminaryJudgment: '',
        warningRange: '',
        thrproductlist: '',
        createUser: '',
        createTime: [],
        state: '',
        updateUser: '',
        updateTime: [],
        in00: ''
      },
      tableData: [
      ],
      total: null,
      pageSize: 10,
      pageNum: 1,
      loading: false,
      modelNameTableData: [], // 涉罪类型
      rulesForm: {
        preliminaryJudgment: [
          { validator: ValidQueryInput, trigger: 'blur' }
        ],
        warningRange: [
          { validator: isValidBlank, trigger: 'blur' }, { validator: ValidQueryInput, trigger: 'blur' }
        ], thrproductlist: [
          { validator: ValidQueryInput, trigger: 'blur' }
        ], createUser: [
          { validator: ValidQueryInput, trigger: 'blur' }
        ], updateUser: [
          { validator: ValidQueryInput, trigger: 'blur' }
        ]
      }

    }
  },
  mounted() {
    if (sessionStorage.getItem('searchData')) {
      const searchData = JSON.parse(sessionStorage.getItem('searchData'))
      if (searchData.pageName === this.$route.name && searchData.isReview) {
        this.pageNum = searchData.pageNum
        this.pageSize = searchData.pageSize
        this.modelForm = searchData.searchForm
        this.searchFlag = true
      }
    }
    sessionStorage.removeItem('searchData')
    this.getData()
    this.getCriData()
  },
  methods: {
    kai() {
      pushInfo().then(res => {
        if (res.code === 200) {
          alert('miesste凯')
        }
      })
    },
    // 涉罪类型
    getCriData() {
      getCrimapi().then(res => {
        if (res.code === 200) {
          this.modelNameTableData = res.data
        }
      })
    },
    getData() {
      this.loading = true
      let obj = {}
      if (this.searchFlag) {
        obj = JSON.parse(JSON.stringify(this.modelForm))
        obj.pageNum = this.pageNum
        obj.pageSize = this.pageSize
        obj.createStartTime = obj.createTime ? obj.createTime[0] : ''
        obj.createEndTime = obj.createTime ? obj.createTime[1] : ''
        obj.updateStartTime = obj.updateTime ? obj.updateTime[0] : ''
        obj.updateEndTime = obj.updateTime ? obj.updateTime[1] : ''
        delete obj.createTime
        delete obj.updateTime
      } else {
        obj.pageNum = this.pageNum
        obj.pageSize = this.pageSize
      }

      getListapi(obj).then(res => {
        if (res.code === 200) {
          this.tableData = res.data.list
          this.total = res.data.total
          this.loading = false
        } else {
          this.loading = false
        }
      })
        .catch(err => {
          this.loading = false
          console.log(err)
        })
    },
    // 分页
    handleSizeChange(val) {
      this.pageSize = val
      this.getData()
    },
    handleCurrentChange(val) {
      this.pageNum = val
      this.getData()
    },

    //   新建
    handleAdd() {
      this.$router.push({
        name: 'new_seniorlistWarningConfigur',
        query: {
          pageFlag: 'new'
        }
      })
    },

    // 查询
    handleSearch() {
      this.$refs.refForm.validate(valid => {
        if (valid) {
          this.searchFlag = true
          this.pageNum = 1
          this.getData()
        }
      })
    },

    // 清空
    handleClearForm() {
      this.$refs.refForm.resetFields()
      this.searchFlag = false
      this.pageNum = 1
      this.getData()
    },

    // 停用
    handleStop(scope) {
      const obj = {
        analyzeId: scope.row.analyzeId,
        state: '停用'
      }
      stopListapi(obj).then(res => {
        if (res.code === 200) {
          this.$message({
            message: '已停用',
            type: 'success'
          })
          this.getData()
        }
      })
    },

    // 启用
    handleGo(scope) {
      const obj = {
        analyzeId: scope.row.analyzeId,
        state: '启用'
      }
      stopListapi(obj).then(res => {
        if (res.code === 200) {
          this.$message({
            message: '已启用',
            type: 'success'
          })
          this.getData()
        }
      })
    },

    // 查看
    handleLook(scope) {
      const searchData = {
        pageName: this.$route.name,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        searchForm: this.modelForm,
        params: this.params
      }
      sessionStorage.setItem('searchData', JSON.stringify(searchData))
      this.$router.push({
        name: 'new_seniorlistWarningConfigur',
        query: {
          pageFlag: 'view',
          analyzeId: scope.row.analyzeId
        }
      })
    },

    // 编辑
    handleEdit(scope) {
      const searchData = {
        pageName: this.$route.name,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        searchForm: this.modelForm,
        params: this.params
      }
      sessionStorage.setItem('searchData', JSON.stringify(searchData))
      this.$router.push({
        name: 'new_seniorlistWarningConfigur',
        query: {
          pageFlag: 'edit',
          analyzeId: scope.row.analyzeId
        }

      })
    },

    // 删除
    handleDel(scope) {
      this.$confirm('此操作将永久删除该项，确定要删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (scope.row.state === '启用') {
          this.$message({
            message: '启用中的配置不允许删除',
            type: 'error'
          })
          return
        } else {
          deleteListapi(scope.row.analyzeId).then(res => {
            if (res.code === 200) {
              this.$message({
                message: '删除成功',
                type: 'success'
              })
              this.getData()
            }
          }
          )
        }
      }).catch(() => { })
    }
  }
}
</script>
<style lang="scss" scoped>
.seniorListWarningConfiguration {
  .el-date-editor--daterange {
    width: 100% !important;
  }
  .el-date-editor {
    width: 100%;
  }
  .el-select {
    width: 100%;
  }
}
</style>

