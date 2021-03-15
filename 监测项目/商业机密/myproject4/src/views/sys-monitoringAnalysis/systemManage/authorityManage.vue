<template>
  <div class="authorityManage">
    <el-card>
      <div slot="header"> 
        反馈信息类型管理
        <el-button style="float: right;" type="primary" @click="handleAdd">新建权限配置</el-button>
      </div>
      <el-form :model="form" ref="form" label-width="84px" :rules="rules">
        <el-row>
          <el-col :span="7">
            <el-form-item label="用户角色：" prop="userName">
              <el-select v-model="form.userName" placeholder="请选择" clearable filterable>
                <el-option v-for="item in roleOptions" :label="item.roleName" :key="item.roleId" :value="item.roleName"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="状态：" prop="state">
              <el-select v-model="form.state" clearable>
                <el-option label="全部" value=""></el-option>
                <el-option label="已启用" value="0"></el-option>
                <el-option label="停用" value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-button type="primary" @click="handleQuery" :loading="loading">查 询</el-button>
          <el-button type="primary" plain style="margin-left: 10px;" @click="resetForm('form')">清 空</el-button>
        </el-row>
      </el-form>
      <el-table :data="tableData">
        <el-table-column type="index" label="序号" width="80"></el-table-column>
        <el-table-column prop="userName" label="用户角色" min-width="130"></el-table-column>
        <el-table-column prop="matchingType" label="匹配信息类型" min-width="100"></el-table-column>
        <el-table-column prop="state" label="状态" min-width="100">
          <template slot-scope="scope">
            {{ scope.row.state === '0' ? '已启用' : '停用'}}
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="80">
          <template slot-scope="scope">
            <el-button type=text v-if="scope.row.state === '0'" @click="handleStartStop(scope)">停用</el-button>
            <el-button type=text v-if="scope.row.state === '1'" @click="handleStartStop(scope)">启用</el-button>
            <el-button type=text v-if="scope.row.state === '1'" @click="handleExit(scope)">编辑</el-button>
            <el-button type=text v-if="scope.row.state === '0'" @click="handleLook(scope)">查看</el-button>
            <el-button type=text @click="handleDelete(scope)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageInfo.pageNum" :page-sizes="[10, 20, 30, 40]" :page-size="pageInfo.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total" background></el-pagination>

      <el-dialog :title="getTitle + '权限配置'" :visible.sync="dialogVisible">
        <el-form :model="dialogForm" ref="dialogForm" :rules="dialogRules">
          <el-form-item label="角色名称：" :label-width="formLabelWidth" prop="userName">
            <el-select :disabled="this.dataState === 'look'"  v-if="!isShow" v-model="dialogForm.userName" placeholder="请选择" clearable @change="handleChange">
              <el-option v-for="item in roleOptions" :label="item.roleName" :key="item.roleId" :value="item.roleName"></el-option>
            </el-select>
            <span v-if="isShow">{{dialogForm.userName}}</span>
          </el-form-item>
          <el-form-item label="匹配信息类型：" :label-width="formLabelWidth" prop="matchingType">
            <el-checkbox-group :disabled="this.dataState === 'look'"  v-model="dialogForm.matchingType">
              <el-checkbox :label="item.label" :value="item.value" v-for="item in matchingOptions" :key="item.value"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="是否启用：" :label-width="formLabelWidth" prop="state">
            <el-radio-group :disabled="this.dataState === 'look'"  v-model="dialogForm.state">
              <el-radio :label="0">启用</el-radio>
              <el-radio :label="1">停用</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="备注：" :label-width="formLabelWidth" prop="remark">
            <el-input :disabled="this.dataState === 'look'"  v-model.trim="dialogForm.remark" type="textarea" resize="none" maxlength="500" show-word-limit placeholder="最大长度为500位" :rows="4"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">关 闭</el-button>
          <el-button v-if="this.dataState !== 'look'" type="primary" @click="onSubmit" :loading="submitLoading">保 存</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { isValidInput } from '@/utils/formValidate.js'
import { getList, getQuery, deleteData, addData, updateData, updateState, getRoleList } from '@/api/sys-monitoringAnalysis/systemManage/authorityManage.js'
export default {
  data() {
    return {
      form: {
        userName: '',
        state: ''
      },
      rules: {
        userName: [{ validator: isValidInput, trigger: 'blur' }]
      },
      tableData: [],
      pageInfo: {
        pageNum: 1,
        pageSize: 10
      },
      total: 0,
      isShow: false,
      dialogVisible: false,
      formLabelWidth: '120px',
      dialogForm: {
        userName: '',
        matchingType: [],
        state: '',
        remark: ''
      },
      dialogRules: {
        userName: [{ required: true, message: '请选择角色', trigger: 'change' }],
        matchingType: [{ required: true, message: '请至少选择一个匹配类型', trigger: 'change' }],
        state: [{ required: true, message: '请选择状态', trigger: 'change' }],
        remark: [{ max: 500, message: '最大长度为500位', trigger: 'blur' }]
      },
      matchingOptions: [
        {
          label: '反馈信息',
          value: '0'
        },
        {
          label: '线索',
          value: '1'
        },
        {
          label: '主体',
          value: '2'
        }
      ],
      roleOptions: [],
      remarkRemnant: 500, // 记录textarea字数
      dataState: '',
      submitLoading: false,
      loading: false
    }
  },
  computed: {
    getTitle() {
      var title = ''
      if (this.dataState === 'create') {
        title = '新增'
      } else if (this.dataState === 'update') {
        title = '编辑'
      }
      return title
    }
  },
  created() {
    this.getRoleList()
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      this.isShow = false
      this.dataState = ''
      this.remarkRemnant = 500
      getList(this.pageInfo).then(res => {
        if (res.code === 200) {
          this.tableData = res.data.list
          this.total = res.data.total
        }
      }).catch()
    },
    getRoleList() {
      getRoleList().then(res => {
        if (res.code === 200) {
          this.roleOptions = res.data
        }
      }).catch()
    },
    handleQuery() {
      this.pageInfo.pageNum = 1
      this.loading = true
      getQuery(this.form).then(res => {
        if (res.code === 200) {
          this.loading = false
          this.tableData = res.data.list
          this.total = res.data.total
        } else {
          this.loading = false
        }
      }).catch(() => {
        this.loading = false
      })
    },
    handleChange(val) {
      this.roleOptions.find(item => {
        if (item.roleName === val) {
          this.roleCode = item.roleCode
        }
      })
    },
    handleStartStop(scope) {
      if (scope.row.state === '1') {
        scope.row.state = '0'
      } else if (scope.row.state === '0') {
        scope.row.state = '1'
      }
      const obj = {
        roleId: scope.row.roleId,
        state: scope.row.state
      }
      updateState(obj).then(res => {
        if (res.code === 200) {
          if (scope.row.state === '0') {
            this.$message.success('启用成功！')
          } else {
            this.$message.success('停用成功！')
          }

          setTimeout(() => {
            this.getData()
          }, 10)
        }
      }).catch()
    },
    handleSizeChange(val) {
      this.pageInfo.pageSize = val
      this.getData()
    },
    handleCurrentChange(val) {
      this.pageInfo.pageNum = val
      this.getData()
    },
    // remarkInput() {
    //   var txtVal = this.dialogForm.remark.length
    //   this.remarkRemnant = 500 - txtVal
    // },
    handleDelete(scope) {
      const state = scope.row.state
      if (state === '0') {
        this.$confirm('启用状态的权限配置不允许删除！', '提示', {
          confirmButtonText: '确定',
          showCancelButton: false,
          type: 'warning'
        }).then(() => {}).catch()
      } else {
        this.$confirm('确定要删除当前权限配置吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const roleId = scope.row.roleId
          deleteData(roleId).then(res => {
            if (res.code === 200) {
              this.$message.success('删除成功！')
              setTimeout(() => {
                this.getData()
              }, 100)
            }
          }).catch()
        }).catch(() => {})
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    onSubmit() { // 保存
      this.$refs['dialogForm'].validate((valid) => {
        if (valid) {
          const obj = Object.assign({}, this.dialogForm)
          obj.matchingType = obj.matchingType.toString()
          obj.roleCode = this.roleCode
          if (this.dataState === 'create') {
            this.submitLoading = true
            addData(obj).then(res => {
              if (res.code === 200) {
                this.submitLoading = false
                this.$message.success('新增成功！')
                this.dialogVisible = false
                setTimeout(() => {
                  this.getData()
                }, 10)
              } else {
                this.submitLoading = false
              }
            }).catch(() => {
              this.submitLoading = false
            })
          } else if (this.dataState === 'update') {
            this.submitLoading = true
            updateData(obj).then(res => {
              if (res.code === 200) {
                this.submitLoading = false
                this.$message.success('修改成功！')
                this.dialogVisible = false
                setTimeout(() => {
                  this.getData()
                }, 10)
              } else {
                this.submitLoading = false
              }
            }).catch(() => {
              this.submitLoading = false
            })
          }
        } else {
          return false
        }
      })
    },
    handleAdd() {
      this.dialogVisible = true
      this.dataState = 'create'
      this.isShow = false
      this.$nextTick(function() {
        this.$refs['dialogForm'].resetFields()
      })

      this.getRoleList()
    },
    // 编辑
    handleExit(scope) {
      this.dialogVisible = true
      this.dataState = 'update'
      this.isShow = true
      this.dialogForm = {
        userName: '',
        matchingType: [],
        state: '',
        remark: ''
      }
      const obj = Object.assign({}, scope.row) // copy obj
      obj.state = Number(obj.state)
      obj.matchingType = obj.matchingType === '' ? [] : obj.matchingType.split(',')
      this.dialogForm = obj
    },

    // 查看
    handleLook(scope) {
      this.dialogVisible = true
      this.dataState = 'look'
      const obj = Object.assign({}, scope.row) // copy obj
      obj.state = Number(obj.state)
      obj.matchingType = obj.matchingType === '' ? [] : obj.matchingType.split(',')
      this.dialogForm = obj
    }
  }
}
</script>

<style lang="scss">
.authorityManage {
  .divider.divider-horizontal {
    margin: 0 0 20px 0;
  }
}
</style>
