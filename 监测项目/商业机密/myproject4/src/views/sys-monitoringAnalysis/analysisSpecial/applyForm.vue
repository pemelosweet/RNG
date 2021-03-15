<template>
  <div class="analysisSpecial-applyForm">
    <el-card>
      <div slot="header" class="clearfix">
        <span>关于xxx线索</span>
        <div style="float:left">

        </div>
      </div>

      <el-form :model="form"  class="formBlock" ref="validForm" :rules="rules">
        <el-row>
          <el-col :span="20">
            <el-form-item label="线索分析：" prop="overview.analyze" label-width="160px">
              <el-input v-model="form.overview.analyze"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="20">
            <el-form-item label="线索来源：" prop="overview.source" label-width="160px">
              <el-input v-model="form.overview.source"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="20">
            <el-form-item label="专项类别：" prop="overview.special" label-width="160px">
              <el-select v-model="form.overview.special" multiple placeholder="请选择" >
                <el-option value="1" label="1">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="20">
            <el-form-item label="线索描述：" prop="overview.describe" label-width="160px">
              <el-input type="textarea" v-model="form.overview.describe"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="20">
            <el-form-item label="附件：" label-width="160px">
              <el-upload class="upload-demo" action="">
                <el-button type="primary" plain>点击上传</el-button>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>

        <div style="margin-bottom:30px">
          <div style="margin-bottom:10px">
            <strong>批量导入主体或账户信息</strong>
            <el-upload action="" style="display: inline-block;marginLeft:20px">
              <el-button slot="trigger" type="primary" plain>选取文件</el-button>
              <el-button type="text" style="marginLeft:10px" icon="el-icon-download">模板下载</el-button>
            </el-upload>
          </div>
          <el-row>
            <el-col :span="23" :offset="1">
              <el-table :data="form.tableData" class="table">
                <el-table-column type="index" label="序号" width="80"></el-table-column>
                <el-table-column label="主体名称" min-width="180">
                  <template slot-scope="scope">
                    <el-form-item :prop="'tableData.'+scope.$index+'.subject'" :rules="[{required: true, message:'主体名称不能为空', trigger:'blur'}]">
                      <el-input v-model="scope.row.subject"></el-input>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column prop="credType" label="证件类型" min-width="180">
                  <template slot-scope="scope">
                    <el-form-item :prop="'tableData.'+scope.$index+'.credType.value'" :rules="[{required: true, message:'证件类型不能为空', trigger:'change'}]">
                      <el-select v-model="scope.row.credType.value" placeholder="请选择">
                        <el-option v-for="item in scope.row.credType.data" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column prop="credNum" label="证件号码" min-width="180">
                  <template slot-scope="scope">
                    <el-form-item :prop="'tableData.'+scope.$index+'.credNum'" :rules="[{required: true, message:'证件号码不能为空', trigger:'blur'}]">
                      <el-input v-model="scope.row.credNum"></el-input>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column prop="name" label="账户名称" min-width="180">
                  <template slot-scope="scope">
                    <el-form-item :prop="'tableData.'+scope.$index+'.name'" :rules="[{required: true, message:'账户名称不能为空', trigger:'blur'}]">
                      <el-input v-model="scope.row.name"></el-input>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column prop="bank" label="开户行" min-width="180">
                  <template slot-scope="scope">
                    <el-form-item :prop="'tableData.'+scope.$index+'.bank'" :rules="[{required: true, message:'开户行不能为空', trigger:'blur'}]">
                      <el-input v-model="scope.row.bank"></el-input>
                    </el-form-item>
                  </template>
                </el-table-column>
                <!-- <el-table-column prop="branch" label="负责分析的分支行" min-width="180">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.branch"></el-input>
                  </template>
                </el-table-column> -->
                <el-table-column label="操作" fixed="right">
                  <template slot-scope="scope">
                    <el-button type="text" @click="delItem(scope.$index)">删除</el-button>
                  </template>
                </el-table-column>

              </el-table>

            </el-col>
          </el-row>

        </div>

        <el-form-item label="分析结果：">
          <el-upload action="">
            <el-button type="primary" plain>选择文件</el-button>
          </el-upload>

        </el-form-item>
      </el-form>

      <div style="textAlign:center">
        <!-- <el-button type="primary" plain>重新发布</el-button> -->

        <el-button type="primary" @click="submitCheck('validForm')" >提交审核</el-button>

        <router-link :to="{name:'analysisSpecial_query'}" style="margin-left:20px">
          <el-button>返 回</el-button>
        </router-link>
      </div>

      <!-- 弹窗 -->
      <el-dialog title="任务提交" :visible.sync="dialog.dialogVisible" width="600px" class="dialog-block" @close="closeFn">
        <div class="task">
          <div class="title">
            <span style="margin-right:20px">任务流向：</span>
            <el-radio v-model="dialog.radio" label="1">送中心业务管理员审核</el-radio>
          </div>

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
          <el-button @click="dialog.dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialog.dialogVisible = false">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>

  </div>
</template>

<script>
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
        overview: {
          analyze: '',
          source: '',
          special: '',
          describe: ''
        },
        tableData: [
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
            credNum: '',
            name: '',
            bank: '',
            branch: ''
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
            credNum: '',
            name: '',
            bank: '',
            branch: ''
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
            credNum: '',
            name: '',
            bank: '',
            branch: ''
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
            credNum: '',
            name: '',
            bank: '',
            branch: ''
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
            credNum: '',
            name: '',
            bank: '',
            branch: ''
          }
        ]
      },

      rules: {
        overview: {
          // 不能为空
          analyze: [{ required: true, message: '线索分析不能为空', trigger: 'blur' }],
          source: [{ required: true, message: '线索来源不能为空', trigger: 'blur' }],
          special: [{ required: true, message: '专项类别不能为空', trigger: 'change' }],
          describe: [{ required: true, message: '线索描述不能为空', trigger: 'blur' }]
        }
      },

      dialog: {
        dialogVisible: false,
        radio: '1',
        transferData: generateData(),
        value: [1, 4],
        advice: ''
      }
    }
  },
  methods: {
    closeFn() {
      this.$router.push({ name: 'analysisSpecial_query' })
    },

    // 删除某条数据
    delItem(index) {
      this.$confirm('确定删除数据吗 ？', '提示', {
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
    submitCheck(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialogVisible = true
        } else {
          return false
        }
      })
    }
  },
  created() {}
}
</script>

<style lang="scss">
.analysisSpecial-clueSave {
  .formBlock {
    margin-bottom: 20px;
    .el-select {
      width: 100%;
    }
    .table {
      .el-form-item {
        margin-bottom: 0;
      }
      .el-table__row {
        td {
          height: 62px;
          padding: 14px 0 0 0;
          .cell {
            height: 100%;
            .el-checkbox-group {
              line-height: 28px;
            }
          }
        }
      }
    }
  }
  .dialog-block {
    .title {
      margin-bottom: 10px;
    }
    .task {
      margin-bottom: 30px;
    }
  }
}
</style>
