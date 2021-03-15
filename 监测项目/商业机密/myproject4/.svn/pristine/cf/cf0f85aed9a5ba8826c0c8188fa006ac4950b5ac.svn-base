<template>
  <div class="conjointAnalysisAdd">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>创建联合分析</span>
        <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
      </div>

      <el-form ref="form" :rules="rules" :model="form" label-width="200px">

        <el-form-item label="联合分析名称：" prop="name" class="itme-block">
          <el-input v-model="form.name"></el-input>
        </el-form-item>

        <div class="start-end">
          <el-form-item label="起止日期：" class="start" prop="startDate">
            <el-date-picker v-model="form.startDate" type="date" placeholder="开始日期"></el-date-picker>
          </el-form-item>
          <span>至</span>
          <el-form-item class="end" label-width="10px">
            <el-date-picker v-model="form.endDate" type="date" placeholder="结束日期"></el-date-picker>
          </el-form-item>
        </div>

        <el-form-item label="涉及分支机构：" class="itme-block" prop="branchValue">
          <el-select filterable v-model="form.branchValue" multiple placeholder="请选择">
            <el-option v-for="item in form.branchOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="犯罪类型：" class="itme-block" prop="crimeValue">
          <el-select filterable v-model="form.crimeValue" multiple placeholder="请选择">
            <el-option v-for="item in form.crimeOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="简介：" class="itme-block">
          <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>

        <el-form-item label="附件：" class="itme-block">
          <el-upload class="upload-demo" action="">
            <el-button type="primary" plain>点击上传</el-button>
          </el-upload>
        </el-form-item>

        <el-form-item label="联系人：" class="itme-block" prop="linkMan">
          <el-input v-model="form.linkMan" placeholder=""></el-input>
        </el-form-item>

        <el-form-item label="批量导入主体或账户信息：">
          <el-upload class="upload-demo" ref="upload" action="">
            <el-button slot="trigger" type="primary" plain>选取文件</el-button>
            <!-- <el-button style="margin-left: 10px;" type="success" plain>导入</el-button> -->
            <el-button type="text" icon="el-icon-download">模版下载</el-button>
            <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
          </el-upload>

          <el-table :data="form.tableData">
            <el-table-column type="index" label="序号" width="80"></el-table-column>
            <el-table-column label="主体名称" min-width="180">
              <template slot-scope="scope">
                <el-form-item :prop="'tableData.'+scope.$index+'.subject'" :rules="[{ required: true, message: '主体名称不能为空', trigger: 'blur'}]">
                  <el-input v-model="scope.row.subject"></el-input>

                </el-form-item>

              </template>
            </el-table-column>
            <el-table-column prop="credType" label="证件类型" min-width="180">
              <template slot-scope="scope">
                <el-form-item :prop="'tableData.'+scope.$index+'.credType.value'" :rules="[{required: true, message: '请选择证件类型', trigger: 'change'}]">
                  <el-select v-model="scope.row.credType.value" placeholder="请选择">
                    <el-option v-for="item in scope.row.credType.data" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>

                </el-form-item>

              </template>
            </el-table-column>
            <el-table-column prop="credNum" label="证件号码" min-width="180">
              <template slot-scope="scope">
                <el-form-item :prop="'tableData.'+scope.$index+'.credNum'" :rules="[{required: true, message: '证件号码不能为空', trigger: 'blur'}]">
                  <el-input v-model="scope.row.credNum"></el-input>
                </el-form-item>

              </template>
            </el-table-column>
            <el-table-column prop="name" label="账户名称" min-width="180">
              <template slot-scope="scope">
                <el-form-item :prop="'tableData.'+scope.$index+'.name'" :rules="[{required: true, message: '账户名称不能为空', trigger: 'blur'}]">
                  <el-input v-model="scope.row.name"></el-input>
                </el-form-item>

              </template>
            </el-table-column>
            <el-table-column prop="bank" label="开户行" min-width="180">
              <template slot-scope="scope">
                <el-form-item :prop="'tableData.'+scope.$index+'.bank'" :rules="[{required: true, message: '开户行不能为空', trigger: 'blur'}]">
                  <el-input v-model="scope.row.bank"></el-input>
                </el-form-item>

              </template>
            </el-table-column>
            <el-table-column prop="branch" label="负责分析的分支行" min-width="180">
              <template slot-scope="scope">
                <el-form-item :prop="'tableData.'+scope.$index+'.branch'" :rules="[{required: true, message: '分支行不能为空', trigger: 'blur'}]">
                  <el-input v-model="scope.row.branch"></el-input>
                </el-form-item>

              </template>
            </el-table-column>
            <el-table-column label="操作" width="80">
              <template slot-scope="scope">
                <el-button type="text" @click="delItem(scope.$index)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>

        <!-- <el-col :span="24">
          <el-form-item>
            <router-link :to="{name:'conjointAnalysis_list'}">
              <el-button type="primary">发布联合分析</el-button>
            </router-link>
          </el-form-item>
        </el-col> -->
        <div style="text-align: center">
          <el-button type="primary" @click="publish('form')">提交审核</el-button>
        </div>
      </el-form>
    </el-card>

    <!-- 弹出框 -->
    <el-dialog title="任务提交" :visible.sync="dialogVisible" width="600px" class="dialog-block" @close="closeDialog">
      <div class="task">
        <div class="title">任务流向：</div>
        <el-row>
          <el-col :span="24">
            <el-radio v-model="dialog.radio" label="1">送中心业务管理员审核</el-radio>
          </el-col>
        </el-row>
      </div>
      <el-row style="marginBottom:20px">
        <el-col :span="23" :offset="1">
          <el-transfer v-model="dialog.value" :data="dialog.transferData" :titles="['待选用户', '已选用户']"></el-transfer>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div class="title">意见：</div>
          <el-input v-model="dialog.advice" type="textarea" placeholder=""></el-input>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
const branchsOptions = [
  { label: '分支机构1', value: '1' },
  { label: '分支机构2', value: '2' },
  { label: '分支机构3', value: '3' },
  { label: '分支机构4', value: '4' },
  { label: '分支机构5', value: '5' },
  { label: '分支机构6', value: '6' },
  { label: '分支机构7', value: '7' },
  { label: '分支机构8', value: '8' },
  { label: '分支机构9', value: '9' },
  { label: '分支机构10', value: '10' },
  { label: '分支机构11', value: '11' },
  { label: '分支机构12', value: '12' },
  { label: '分支机构13', value: '13' }
]
const crimeOptions = [
  { label: '关于xx类型的犯罪1', value: '1' },
  { label: '关于xx类型的犯罪2', value: '2' },
  { label: '关于xx类型的犯罪13', value: '3' },
  { label: '关于xx类型的犯罪14', value: '4' },
  { label: '关于xx类型的犯罪15', value: '5' },
  { label: '关于xx类型的犯罪16', value: '6' },
  { label: '关于xx类型的犯罪17', value: '7' }
]
export default {
  data() {
    const generateData = _ => {
      const data = []
      for (let i = 1; i <= 8; i++) {
        data.push({
          key: i,
          label: `分析${i}处 `
        })
      }
      return data
    }
    return {
      form: {
        name: '',
        region: '',
        startDate: '',
        endDate: '',
        branchValue: [],
        branchOptions: branchsOptions,
        crimeValue: [],
        crimeOptions: crimeOptions,
        linkMan: 'xxx',
        desc: '',
        tableData: [
          {
            subject: '主体1',
            credType: {
              value: '',
              data: [
                {
                  value: '1',
                  label: '居民身份证或临时身份证'
                },
                {
                  value: '2',
                  label: '军官或者武警身份证件'
                },
                {
                  value: '3',
                  label: ' '
                }
              ]
            },
            credNum: '222223232323',
            name: '',
            bank: 'xx开户行',
            branch: 'xx开户行'
          },
          {
            subject: '',
            credType: {
              value: '',
              data: [
                {
                  value: '1',
                  label: '居民身份证或临时身份证'
                },
                {
                  value: '2',
                  label: '军官或者武警身份证件'
                },
                {
                  value: '3',
                  label: '...'
                }
              ]
            },
            credNum: '1111111122323',
            name: '',
            bank: 'xx开户行',
            branch: 'xx开户行'
          },
          {
            subject: '主体2',
            credType: {
              value: '',
              data: [
                {
                  value: '1',
                  label: '居民身份证或临时身份证'
                },
                {
                  value: '2',
                  label: '军官或者武警身份证件'
                },
                {
                  value: '3',
                  label: '...'
                }
              ]
            },
            credNum: '222232323232',
            name: '',
            bank: 'xx开户行',
            branch: 'xx开户行'
          }
        ]
      },

      rules: {
        name: [{ required: true, message: '联合分析名称不能为空', trigger: 'blur' }],
        startDate: [{ required: true, message: '开始日期不能为空', trigger: 'blur' }],
        branchValue: [
          { type: 'array', required: true, message: '至少选择一个涉及分支机构', trigger: 'change' }
        ],
        crimeValue: [
          { type: 'array', required: true, message: '至少选择一个犯罪类型', trigger: 'change' }
        ],
        linkMan: [{ required: true, message: '联系人不能为空', trigger: 'blur' }],
        tableData: {
          subject: [{ required: true, message: '主体名称不能为空', trigger: 'blur' }]
        }
      },
      dialogVisible: false,
      dialog: {
        radio: '1',
        transferData: generateData(),
        value: [1, 4],
        advice: ''
      }
    }
  },
  methods: {
    closeDialog() {
      this.$router.push({ name: 'conjointAnalysis_list' })
    },
    delItem(index) {
      this.$confirm('确定要删除选中的数据 ?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.form.tableData.splice(index, 1)
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        })
        .catch(() => {})
    },
    publish(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialogVisible = true
        } else {
          return false
        }
      })
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
.conjointAnalysisAdd {
  .el-select {
    display: block;
  }
  .line {
    text-align: center;
  }

  .el-table thead tr th {
    padding: 8px 0;
  }
   .itme-block {
    width: 84%;
  }
  .start-end {
    .start {
      width: 400px;
      display: inline-block;
    }
    .end {
      display: inline-block;
      width: 400px;
    }
  }

  .el-table thead tr th {
    padding: 8px 0;
  }
  .el-table .el-table__row td {
    height: 62px;
    padding: 14px 0 0 0;
    .cell {
      height: 100%;
      .el-form-item {
        margin-bottom: 0;
      }
    }
  }
  .upload-demo {
    margin-bottom: 5px;
  }
  .inline-input {
    margin-left: 30px;
  }
  .dialog-block {
    .title {
      font-size: 16px;
      color: #333;
      margin-bottom: 10px;
    }
    .task {
      margin-bottom: 30px;
      .title {
        font-size: 16px;
        color: #333;
        margin-bottom: 10px;
      }
    }
    .el-transfer__button.el-button--primary {
      min-width: 32px;
      min-height: 32px;
    }
  }
}
</style>
