<template>
  <div class="programwrap">
    <el-card>
      <div slot="header" class="clearfix">
        <span>清理方案管理</span>
        <el-button style="float: right;" type="text" icon="el-icon-plus" @click="handleAdd($event)">新增</el-button>
      </div>
      <el-form :model="searchForm" ref="searchForm" :rules="rules" label-width="120px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="清理方案名称：" prop="planName">
              <el-input v-model="searchForm.planName" placeholder="最大长度为50位" maxlength="50"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="15" :offset="1">
            <el-button type="primary" @click="handleQuery" :loading="loading">查 询</el-button>
            <el-button type="primary" plain @click="resetForm('searchForm')">清 空</el-button>
          </el-col>
        </el-row>
      </el-form>
      <div class="handleBtn">
        <span>清理方案列表：</span>
      </div>
      <el-table :data="list" style="width: 100%"  v-loading="listLoading" element-loading-text="正在查询，请稍候……" element-loading-background="rgba(0, 0, 0, 0.1)">
        <el-table-column type="index" label="序号" width="60"></el-table-column>
        <el-table-column prop="planName" label="清理方案名称" min-width="110"></el-table-column>
        <el-table-column prop="ruleName" label="匹配规则" min-width="140"></el-table-column>
        <el-table-column prop="customSql" label="建立方案" min-width="140"></el-table-column>
        <el-table-column label="操作" min-width="80">
          <template slot-scope="scope">
            <el-button type="text" @click="handleEdit(scope, $event)">修改</el-button>
            <el-button type="text" @click="deleRow(scope)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageInfo.pageNum" :page-sizes="[10, 20, 30, 40]" :page-size="pageInfo.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total" background></el-pagination>
    </el-card>

    <!-- 新增/编辑清理方案 -->
    <el-dialog :title="title" :visible.sync="programVisible" width="80%" @open="open">
      <el-form label-width="130px" ref="dialogForm" :model="dialogForm" :rules="dialogRules">
        <el-row>
          <el-form-item label="清理方案名称：" prop="planName">
            <el-input v-model="dialogForm.planName" style="width: 60%;" placeholder="最大长度为50位" maxlength="50"></el-input>
          </el-form-item>
        </el-row>
        <el-row>   
          <el-form-item label="匹配规则：" prop="scanRules">
            <el-checkbox-group v-model="dialogForm.scanRules" @change="handleCheckedRulesChange">
              <el-checkbox v-for="(rule, index) in ruleOptions" :label="rule.srName" :key="index"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="建立方案：" prop="customSql">
            <el-input type="textarea" v-model="dialogForm.customSql" rows="5" show-word-limit maxlength="1000"></el-input>
            <span style="color: #f56c6c; font-size: 12px; margin-left: 10px;">提示:  修改资金收付标志的sql语句为 update dwd.dwd_t_bh_trade set tsdr(资金收付标志) = '01'; 修改交易金额的sql语句为 update dwd.dwd_t_bh_trade set crat(交易金额) = '666';</span>
          </el-form-item>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">返回</el-button>
        <el-button v-if="this.title === '新增'" type="primary" @click="addSubmit" :loading="saveLoading">保存</el-button>
        <el-button v-if="this.title === '修改'" type="primary" @click="updateSubmit" :loading="updateLoading">保存</el-button>
      </span>

    </el-dialog>
  </div>
</template>

<script>
import {
  getCleanList,
  addCleanData,
  delCleanData,
  updateCleanData
} from '@/api/sys-monitoringAnalysis/dataGovernance/dataClean/program'
import { getNqList } from '@/api/sys-monitoringAnalysis/dataGovernance/rule/index.js'
import { isValidInput, ValidQueryInput } from '@/utils/formValidate.js'

export default {
  name: 'program',
  data() {
    return {
      loading: false,
      listLoading: false,
      saveLoading: false,
      updateLoading: false,
      searchForm: {
        planName: '',
        planCode: ''
      },
      dialogForm: {
        planName: '',
        customSql: '',
        scanRules: []
      },
      programVisible: false, // 弹框
      title: '',
      list: [],
      total: 1,
      pageInfo: {
        // 默认开始页码
        pageNum: 1,
        // 每页显示条数
        pageSize: 10
      },
      // 弹框复选框参数
      ruleOptions: [],
      matchId: '',
      isIndeterminate: true,
      rules: {
        planName: [
          { validator: ValidQueryInput, trigger: 'blur' },
          { max: 50, message: '最大长度为50位', trigger: 'blur' }
        ]
      },
      dialogRules: {
        planName: [
          { required: true, message: '内容不能为空', trigger: 'blur' },
          { validator: isValidInput, trigger: 'blur' },
          { max: 50, message: '最大长度为50位', trigger: 'blur' }
        ],
        customSql: [
          { required: true, message: '内容不能为空', trigger: 'blur' },
          { max: 1000, message: '最大长度为1000位', trigger: 'blur' }
        ]
      },
      planId: ''
    }
  },
  mounted() {
    this.getData()
    this.getRuleList()
  },
  methods: {
    getData() {
      // 获取列表
      const paramsObj = {
        planName: this.searchForm.planName,
        planCode: this.searchForm.planCode,
        pageNum: this.pageInfo.pageNum,
        pageSize: this.pageInfo.pageSize
      }
      this.listLoading = true
      getCleanList(paramsObj)
        .then(res => {
          if (res.code === 200) {
            this.loading = false
            this.listLoading = false
            this.list = res.data.list
            this.total = res.data.total
          } else {
            this.loading = false
            this.listLoading = false
          }
        })
        .catch(() => {
          this.loading = false
          this.listLoading = false
        })
    },
    handleQuery() {
      this.$refs['searchForm'].validate(valid => {
        if (valid) {
          // 查询操作
          this.pageInfo.pageNum = 1
          this.loading = true
          this.getData()
        }
      })
    },
    resetForm(formName) {
      // 重置清空操作
      this.$refs[formName].resetFields()
    },
    open() {
      if (this.$refs.dialogForm) {
        this.$refs.dialogForm.resetFields()
      }
    },
    handleSizeChange(val) {
      this.pageInfo.pageSize = val
      this.getData()
    },
    handleCurrentChange(pageNum) {
      this.pageInfo.pageNum = pageNum
      this.getData()
    },
    handleAdd(e) {
      this.programVisible = true
      this.title = e.target.innerText
      this.getRuleList()
    },
    getRuleList() {
      getNqList()
        .then(res => {
          if (res.code === 200) {
            this.ruleOptions = res.data.list
          }
        })
        .catch()
    },
    addSubmit() {
      // 添加提交操作
      this.$refs['dialogForm'].validate(valid => {
        if (valid) {
          const paramsObj = this.getParamObj()
          this.saveLoading = true
          addCleanData(paramsObj)
            .then(res => {
              if (res.code === 200) {
                this.saveLoading = false
                this.$message({ type: 'success', message: '新增成功！' })
                this.programVisible = false
                this.getData()
              } else {
                this.saveLoading = false
                this.$message({ type: 'error', message: res.message })
              }
            })
            .catch(() => {
              this.saveLoading = false
            })
        } else {
          return false
        }
      })
    },
    handleEdit(scope, e) {
      this.programVisible = true
      this.$nextTick(() => {
        // this.$refs['dialogForm'].resetFields()
        this.dialogForm.planName = ''
        this.dialogForm.scanRules = []
        this.dialogForm.customSql = ''
        // 修改
        this.getRuleList()

        this.dialogForm.planName = scope.row.planName
        this.dialogForm.scanRules = scope.row.ruleName === '' ? [] : scope.row.ruleName.split(',')
        this.dialogForm.customSql = scope.row.customSql
        // const obj = Object.assign({}, scope.row)
        // this.dialogForm = obj
        // if (scope.row.ruleName) {
        //   this.dialogForm.scanRules = obj.ruleName.split(',')
        // }
        this.title = e.target.innerText

        this.planId = scope.row.planId
      })
    },
    updateSubmit() {
      // 修改操作
      this.$refs['dialogForm'].validate(valid => {
        if (valid) {
          const paramsObj = this.getUpdateParamObj()
          this.updateLoading = true
          updateCleanData(paramsObj).then(res => {
            if (res.code === 200) {
              this.updateLoading = false
              this.getData()
              this.$message.success('修改成功！')
            } else {
              this.$message({ type: 'error', message: res.message })
            }
          })
          this.programVisible = false
        } else {
          return false
        }
      })
    },
    getParamObj() {
      const matchObj = []
      this.ruleOptions.forEach(item => {
        this.dialogForm.scanRules.map(item2 => {
          if (item.srName === item2) {
            matchObj.push({ srName: item.srName, srId: item.srId })
          }
        })
      })

      const paramsObj = {
        planName: this.dialogForm.planName,
        customSql: this.dialogForm.customSql,
        scanRules: matchObj
      }
      return paramsObj
    },
    getUpdateParamObj() {
      const matchObj = []
      this.ruleOptions.forEach(item => {
        this.dialogForm.scanRules.map(item2 => {
          if (item.srName === item2) {
            matchObj.push({ srName: item.srName, srId: item.srId })
          }
        })
      })

      const paramsObj = {
        planName: this.dialogForm.planName,
        customSql: this.dialogForm.customSql,
        scanRules: matchObj,
        planId: this.planId
      }
      return paramsObj
    },
    // 关闭弹框
    handleClose(done) {
      this.programVisible = false
    },
    // 确定删除
    deleRow(scope) {
      this.$confirm('是否删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const id = scope.row.planId
          delCleanData(id).then(res => {
            if (res.code === 200) {
              this.getData()
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
            }
          })
        })
        .catch(() => {})
    },
    handleCheckedRulesChange(val) {
      // if (this.optionFlag === '0') {

      // } else {
      //   for (var k in this.ruleOptions) {
      //     for (var m in this.dialogForm.scanRules) {
      //       if (this.ruleOptions[k].srName.toString() === this.dialogForm.scanRules[m].toString()) {
      //         this.matchObj = { srName: this.ruleOptions[k].srName, srId: this.ruleOptions[k].srId }
      //         this.matchArr.push(this.matchObj)
      //       }
      //     }
      //   }
      // }

    }
  }
}
</script>

<style lang="scss">
.programwrap {
  .handleBtn {
    padding-bottom: 10px;
  }
  .el-transfer-panel {
    width: 34%;
  }
  .btnalign {
    text-align: right;
  }
}
</style>
