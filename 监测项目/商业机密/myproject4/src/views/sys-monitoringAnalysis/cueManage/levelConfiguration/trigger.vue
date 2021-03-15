<template>
  <div class="rosterWarning_levelConfiguration">
     <el-form :model="searchform"  ref="searchForm" label-width="140px" >
          <el-row>
           <el-col :span="8">
              <el-form-item  label="触发来源"  prop="codeName">
            <el-input clearable v-model="searchform.codeName" maxlength="30" placeholder="触发来源"></el-input>
          </el-form-item>
           </el-col>
                <el-col :span="8" :offset="1">
              <el-button :loading="loadingA" type="primary" @click="query">查询</el-button>
              <el-button type="primary" plain @click="clearForm">清空</el-button>
            </el-col>
         </el-row>
       </el-form>
           <el-alert title="" type="primary" :closable="false">
        <template>
          <el-button type="text" @click="exportExcel">导出</el-button>
        </template>
      </el-alert>
      <el-table style="width: 100%;margin-top:20px" :data="tableData">
          <el-table-column prop="typeNumber" label="序号" min-width="80"></el-table-column>
          <el-table-column prop="codeName" label="触发来源" min-width="110"></el-table-column>
          <!-- <el-table-column prop="state" label="敏感级别" min-width="110">
            <template slot-scope="scope">
            <el-select disabled="" v-model="scope.row.state" placeholder="请选择">
              <el-option label="不敏感" value="100"></el-option>
              <el-option label="低度敏感" value="200"></el-option>
              <el-option label="中度敏感" value="300"></el-option>
              <el-option label="高度敏感" value="400"></el-option>
            </el-select>            
            </template>
          </el-table-column> -->
          <el-table-column prop="amount2" label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="text"
                @click="detail(scope.row.id)">编辑</el-button>
              <el-button
                size="mini"
                type="text"
                @click="delItem(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
      </el-table>
       <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageInfo.pageNum"
        :page-size="pageInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageInfo.total"
        background
      ></el-pagination>
      <el-dialog title="编辑" :visible.sync="dialogFormVisible">
        <el-form :rules="rules" :model="form" ref="form">
          <el-form-item label="序号" :label-width="formLabelWidth" prop="typeNumber">
            <el-input maxlength="6" clearable v-model="form.typeNumber" placeholder="请填写"></el-input>
          </el-form-item>
          <el-form-item label="触发来源" :label-width="formLabelWidth" prop="codeName">
            <el-input maxlength="30" clearable v-model="form.codeName" placeholder="触发来源"></el-input>
          </el-form-item>
          <!-- <el-form-item label="敏感级别" :label-width="formLabelWidth" prop="state">
            <el-select clearable v-model="form.state" placeholder="请选择">
              <el-option label="不敏感" value="100"></el-option>
              <el-option label="低度敏感" value="200"></el-option>
              <el-option label="中度敏感" value="300"></el-option>
              <el-option label="高度敏感" value="400"></el-option>
            </el-select> -->
          <!-- </el-form-item> -->
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submit">保 存</el-button>
          <el-button @click="dialogFormVisible = false">取 消</el-button>          
        </div>
      </el-dialog>
  </div>
</template>
<script>
import { MYgetsourceBusinessArr, add, modification, deleteClue, put } from '@/api/sys-monitoringAnalysis/cueManage/levelConfiguration.js'
import { common_Validate } from '@/utils/formValidate'
import { getToken } from '@/utils/auth'
export default {
  data() {
    const numJudgement = (rule, value, callback) => {
      const num = /^\d{1,}$/
      if (num.test(value) === false) {
        callback(new Error('只能输入数字'))
      } else {
        callback()
      }
    }
    return {
      token: getToken(),
      loadingA: true,
      form: {
        typeName: '触发来源字典',
        typeNumber: '',
        codeName: ''
        // state: ''
      },
      searchform: {
        codeName: ''
      },
      pageInfo: {
        pageNum: 1,
        pageSize: 10,
        total: 0
      },
      formLabelWidth: '120px',
      dialogFormVisible: false,
      tableData: [],
      id: '',
      params: {},
      dialogName: '',
      rules: {
        codeName: [{ required: true, validator: common_Validate, trigger: 'blur' }],
        // state: [{ required: true, message: '敏感级别不能为空', trigger: 'change' }],
        typeNumber: [{ required: true, message: '请输入序号', trigger: 'blur' }, { validator: numJudgement, message: '只能输入数字', trigger: 'blur' }, { max: 6, message: '序号最多6位', trigger: 'blur' }]
      }
    }
  },
  computed: {
    paramsObj() {
      const obj = Object.assign(this.searchform, {})
      // obj.pageNum = this.pageInfo.pageNum
      // obj.pageSize = this.pageInfo.pageSize
      delete obj.total
      return obj
    }
  },
  methods: {
    isTrue() {
      this.form.codeName = ''
      // this.form.state = ''
      this.form.typeNumber = ''
      this.$nextTick(function() {
        this.$refs.form.clearValidate()
      })
      this.dialogFormVisible = true
    },
    query() {
      // this.$refs.searchForm.validate(val => {
      //   if (val) {
      this.pageInfo.total = 0
      this.pageInfo.pageNum = 1
      this.params = Object.assign({}, this.paramsObj, this.pageInfo)
      this.MYgetsourceBusinessArr()
      //   }
      // })
    },
    // 获取列表
    MYgetsourceBusinessArr() {
      this.loadingA = true
      this.params = Object.assign({}, this.params, this.pageInfo)
      MYgetsourceBusinessArr(this.params, '3').then(res => {
        this.loadingA = false
        if (res.code === 200) {
          this.tableData = res.data.list
          this.pageInfo.total = res.data.total
        }
      }).catch(() => {
        this.loadingA = false
      })
    },
    // 查询条件清空
    clearForm() {
      this.searchform.codeName = ''
      this.params = {}
      this.MYgetsourceBusinessArr()
    },
    // 批量导出
    exportExcel() {
      if (this.tableData.length > 0) {
        location.href = `/monitor/clueManage/codeDispose/outFile/3?token=${this.token}`
      } else {
        this.$message({
          message: '列表为空无法导出',
          type: 'warning',
          duration: 6000
        })
      }
    },
    // 新增
    submit() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.dialogName === '编辑') {
            modification(this.id, this.form).then(res => {
              if (res.code === 200) {
                this.id = ''
                this.dialogFormVisible = false
                this.MYgetsourceBusinessArr(this.paramsObj, '3')
              }
            })
          } else {
            add(this.form).then(res => {
              if (res.code === 200) {
                this.dialogFormVisible = false
                this.MYgetsourceBusinessArr(this.paramsObj, '3')
              }
            })
          }
        } else {
          return false
        }
      })
    },
    // 回显详情页面
    detail(id) {
      this.dialogName = '编辑'
      this.$nextTick(function() {
        this.$refs.form.clearValidate()
      })
      put(id).then(res => {
        if (res.code === 200) {
          this.dialogFormVisible = true
          this.pageInfo.total = res.data.total
          this.form.codeName = res.data.codeName
          // this.form.state = res.data.state
          this.form.typeNumber = res.data.typeNumber + ''
          this.id = id
        }
      })
      // modification(){

      // }
    },
    // 切换分页条数
    handleSizeChange(size) {
      this.pageInfo.pageSize = size
      this.MYgetsourceBusinessArr(this.paramsObj, '3')
    },
    // 点击切换分页
    handleCurrentChange(pageNum) {
      this.pageInfo.pageNum = pageNum
      this.MYgetsourceBusinessArr(this.paramsObj, '3')
    },
    // 删除某条数据
    delItem(id) {
      this.$confirm('确定要删除选中的数据吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteClue(id).then(res => {
            if (res.code === 200) {
              this.$message({
                message: '删除成功',
                type: 'info',
                duration: 1000
              })
              this.MYgetsourceBusinessArr(this.paramsObj, '3')
            }
          })
        })
        .catch(() => {})
    }
  },
  mounted() {
    // this.MYgetsourceBusinessArr(this.paramsObj, '2')
  }
}
</script>

<style lang="scss">
  .header {
    .itemline {
      color: #409eff;
      padding: 0 4px;
    }
  }
</style>