<template>
  <div class="typeManage">
    <el-card>
      <div slot="header">匹配信息类型管理</div>
      <el-row>
        <el-col :span="2" style="margin-top:7px">信息类型</el-col>
        <el-col :span="2"><el-button type="primary" @click="dialogVisible=true">新增匹配信息类型</el-button></el-col>
      </el-row>
      <el-table
        v-loading="searchLoading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.1)"
        :data="list">
        <el-table-column type="index" label="序号" width="60" fixed="left"></el-table-column>
        <el-table-column prop="typeName" label="类型名称" show-overflow-tooltip min-width="130">
          <template slot-scope="scope">
            <el-button type="text" @click="dialogVisible2=true;lookType(scope.row)">{{scope.row.typeName}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="infoSource" label="数据来源单位" show-overflow-tooltip min-width="100"></el-table-column>
        <el-table-column prop="achieveType" label="获取方式" min-width="100">
          <template slot-scope="scope">
            {{scope.row.achieveType=='0'?'文件传输':'数据库对接'}}
          </template>
        </el-table-column>
        <el-table-column prop="state" label="类型状态" min-width="80">
          <template slot-scope="scope">
            {{scope.row.state=='0'?'启用':'停用'}}
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="120">
          <template slot-scope="scope">
            <!-- <el-button type="text">启用</el-button>
            <el-button type="text">停用</el-button> -->
            <!-- <el-button type="text" @click="dialogVisible=true">编辑</el-button> -->
            <el-button type="text"  v-if="scope.row.state==='1'" @click="dialogTableVisible=true;managerId=scope.row.managerId;disab=false;gridDataInit(scope.row)">定制属性</el-button>
            <el-button type="text"  v-if="scope.row.state==='0'" @click="dialogTableVisible=true;disab=true;gridDataInit(scope.row)">查看</el-button>
            <el-button type="text" v-if="scope.row.state==='0'" @click="stop(scope.row)">暂 停</el-button>
            <el-button type="text" v-if="scope.row.state==='1'" @click="start(scope.row)">启 用</el-button>
            <el-button type="text" :disabled="scope.row.state==='0'" @click="remove(scope.$index,scope.row)">删除</el-button>   
          </template>
        </el-table-column>
      </el-table>
      <el-pagination 
        @size-change="handleSizeChange" 
        @current-change="handleCurrentChange" 
        :current-page="pageInfo.pageNum" 
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageInfo.pageSize" 
        layout="total, sizes, prev, pager, next, jumper" 
        :total="total" 
        background>
      </el-pagination>
      
      <el-dialog title="新增匹配信息类型" :visible.sync="dialogVisible" width="60%" @close="dialogClose('addForm')">
        <el-form :model="dialogForm" ref='addForm' :rules="rules">
          <el-row>
            <el-col :span="24">
              <el-form-item label="类型名称：" :label-width="formLabelWidth" prop='typeName'>
                <el-input v-model="dialogForm.typeName" maxlength="50" placeholder="最长50字符数"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="数据来源单位：" :label-width="formLabelWidth" prop='infoSource'>
                <el-input v-model="dialogForm.infoSource" maxlength="50" placeholder="最长50字符数"></el-input>
              </el-form-item>
            </el-col>
          </el-row>   
          <el-row>
            <el-col :span="24">
              <el-form-item label="获取方式：" :label-width="formLabelWidth" prop='achieveType'>
                <el-radio-group v-model="dialogForm.achieveType">
                  <el-radio label="0">文件传输</el-radio>
                  <el-radio label="1">数据库对接</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="描述：" :label-width="formLabelWidth" prop='remark'>
                <el-input  type="textarea" :rows="5" maxlength="1024" placeholder="最长1024字符数" v-model="dialogForm.remark"></el-input>
              </el-form-item>
            </el-col>
          </el-row> 
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" :loading='loading' @click="addType()">确 定</el-button>
        </div>
      </el-dialog>

      <el-dialog title="查看匹配信息类型" :visible.sync="dialogVisible2" width="60%" @close="dialogClose('dialogForm')">
        <el-form :model="dialogForm" ref='dialogForm'>
          <el-row>
            <el-col :span="24">
              <el-form-item label="类型名称：" :label-width="formLabelWidth" prop='typeName'>
                <el-input v-model="dialogForm.typeName" disabled placeholder="请输入类型名称"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="数据来源单位：" :label-width="formLabelWidth" prop='infoSource'>
                <el-input v-model="dialogForm.infoSource" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>   
          <el-row>   
            <el-col :span="12">
              <el-form-item label="获取方式：" :label-width="formLabelWidth">
                <el-input v-model="dialogForm.achieveType" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="数据更新时间：" :label-width="formLabelWidth">
                <el-input v-model="dialogForm.createDate" disabled></el-input>
                <!--
                <el-select v-model="form.createDate" placeholder="年" width="30%">
                  <el-option label="年" value="1"></el-option>
                  <el-option label="月" value="2"></el-option>
                  <el-option label="日" value="3"></el-option>
                </el-select>
                -->
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="描述：" :label-width="formLabelWidth">
                <el-input v-model="dialogForm.remark" :rows="5" disabled type="textarea"></el-input>
              </el-form-item>
            </el-col>
          </el-row> 
        </el-form>
        <div slot="footer" class="dialog-footer" >
          <el-button type="primary" @click="dialogVisible2 = false">关 闭</el-button>
        </div>
      </el-dialog>

       <el-dialog title="匹配信息类型属性定制" width="80%" :visible.sync="dialogTableVisible" @close="dialogClose('tableForm')">
        <el-form ref="tableForm" :model="tableForm" >
        <el-row style="margin-bottom:10px">
          <el-col v-if="!disab" :span="24">
            <el-button type="primary" @click="addmessage">增加</el-button >
            <el-button @click="removeParam">删除</el-button>
          </el-col>
          <el-col :span="16">
              <el-form-item v-if="showTableName" prop="tableName" label="定制属性表名：" :rules="[{ required: true, message: '请输入定制属性表名', trigger: 'blur' },{ validator: validateTableName, trigger: 'blur' }]" style="margin-top:20px" :label-width="formLabelWidth">
                <el-input v-model="tableForm.tableName" placeholder="请输入定制属性表名 例：dm_xxxx"></el-input>
              </el-form-item>
          </el-col>
          </el-row>
        <el-table :data="tableForm.gridData" highlight-current-row @selection-change="handleSelectionChange">
          <el-table-column v-if="!disab" type="selection" width="60"></el-table-column>
          <el-table-column type="index" label="序号" width="60"></el-table-column>

          <el-table-column label="字段名称" min-width="180">
            <template slot-scope="scope">
              <el-form-item :prop="'gridData.'+scope.$index+'.paramCode'" :rules="[{ required: true, message: '字段名称不能为空', trigger: 'blur'},{validator: validateTableName, trigger: 'blur'}]">
                <el-input v-model="scope.row.paramCode" style="margin-top:18px" maxlength="20" :disabled="scope.row.isDisabled" />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column  label="类型" min-width="120">
            <template slot-scope="scope">
              <div v-if='!disab'>
                <el-select v-model="scope.row.paramType">
                  <el-option label="文本(varchar)" value="varchar"></el-option>
                  <el-option label="日期(date)" value="date"></el-option>
                  <el-option label="数字(integer)" value="integer"></el-option>
                  <el-option label="文本域(text)" value="text"></el-option>
                  <el-option label="时间(datetime)" value="datetime"></el-option>
                </el-select>
              </div>
              <div v-if='disab'>
                <el-select :disabled="disab"  v-model="scope.row.paramType">
                  <el-option label="文本(varchar)" value="varchar"></el-option>
                  <el-option label="日期(date)" value="date"></el-option>
                  <el-option label="数字(integer)" value="integer"></el-option>
                  <el-option label="文本域(text)" value="text"></el-option>
                  <el-option label="时间(datetime)" value="datetime"></el-option>
                </el-select>
              </div>           
            </template>
          </el-table-column>
          <el-table-column prop="isQuery" label="查询条件" min-width="90">
            <template slot-scope="scope">
              <el-select :disabled="disab" v-model="scope.row.isQuery">
                <el-option label="是" value="0"></el-option>
                <el-option label="否" value="1"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="备注" min-width="100">
            <template slot-scope="scope">
              <!-- <span v-if="scope.row.remark">{{scope.row.remark}}</span> -->
              <el-input :disabled="disab" v-model="scope.row.remark"></el-input>
            </template>
          </el-table-column>
        </el-table>
        </el-form>
        <div v-if="!disab" slot="footer" class="dialog-footer">
          <el-button @click="dialogTableVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveParams()">保 存</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { add, select, start, stop, remove, selectParam, customAttribute, selectManager } from '@/api/sys-monitoringAnalysis/systemManage/typeManage'
import { isValidInput } from '@/utils/formValidate.js'
export default {

  data() {
    return {
      list: [],
      gridDataCache: [],
      submitParams: [],
      pageInfo: {
        pageNum: 1,
        pageSize: 10
      },
      total: 0,
      dialogVisible: false,
      dialogVisible2: false,
      dialogTableVisible: false,
      managerId: '',
      loading: false,
      searchLoading: false,
      tableForm: {
        tableName: '',
        gridData: [
          {
            paramCode: '',
            paramType: '',
            remark: '',
            isQuery: ''
          }
        ]
      },
      showTableName: false,
      disab: false,
      multipleSelection: [],
      dialogForm: {
        typeName: '',
        infoSource: '',
        remark: '',
        achieveType: '',
        createDate: ''
      },
      rules: {
        typeName: [
          { required: true, message: '类型名称不能为空', trigger: 'blur' },
          { validator: isValidInput, trigger: 'blur' }
        ],
        infoSource: [
          { required: true, message: '数据来源单位不能为空', trigger: 'blur' },
          { validator: isValidInput, trigger: 'blur' }
        ],
        achieveType: [
          { required: true, message: '请选择获取方式', trigger: 'change' }
        ],
        remark: [
          { required: true, message: '请输入描述信息', trigger: 'blur' }
        ]
      },
      formLabelWidth: '120px',
      radio: '1'
    }
  },
  methods: {
    // 切换分页条数
    handleSizeChange(size) {
      this.pageInfo.pageSize = size
      this.query()
    },
    // 点击切换分页
    handleCurrentChange(pageNum) {
      this.pageInfo.pageNum = pageNum
      this.query()
    },
    // 查询
    query() {
      this.searchLoading = true
      select(this.pageInfo).then(res => {
        if (res.code === 200) {
          this.list = res.data.data.list
          this.total = res.data.data.total
          this.searchLoading = false
        }
      })
    },
    // 新增匹配信息类型
    addType() {
      this.$refs['addForm'].validate(valid => {
        if (valid) {
          this.loading = true
          var params = Object.assign({}, this.dialogForm)
          add(params).then(res => {
            if (res.code === 200) {
              this.$message({
                type: 'success',
                message: '新增成功！'
              })
              this.loading = false
              this.dialogVisible = false
              this.query()
            } else {
              this.loading = false
            }
          }).catch(() => {
            this.loading = false
          })
        }
      })
    },
    // 启用
    start(row) {
      start({ managerId: row.managerId }).then(res => {
        if (res.code === 200) {
          this.query()
        }
      })
    },
    // 停用
    stop(row) {
      stop({ managerId: row.managerId }).then(res => {
        if (res.code === 200) {
          this.query()
        }
      })
    },
    // 删除匹配信息类型
    remove(index, row) {
      if (row.state === '0') {
        this.$message({
          type: 'error',
          message: '启用状态不能删除！'
        })
      } else {
        this.$confirm('是否删除该匹配信息', '提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            remove({ managerId: row.managerId }).then(res => {
              if (res.code === 200) {
                this.list.splice(index, 1)
                this.$message({
                  type: 'success',
                  message: '删除成功！'
                })
              }
            })
          })
          .catch(() => {})
      }
    },
    // 查看匹配信息类型
    lookType(row) {
      this.dialogForm = {
        typeName: row.typeName,
        infoSource: row.infoSource,
        remark: row.remark,
        createDate: row.createDate
      }
      this.dialogForm.achieveType = row.achieveType === '0' ? '文件传输' : '数据库对接'
    },
    // 关闭弹窗
    dialogClose(form) {
      this.$refs[form].resetFields()
      this.$refs[form].clearValidate()
      this.dialogForm = {}
      this.tableForm.gridData = []
      this.showTableName = false
      this.tableForm.tableName = ''
      this.submitParams = []
    },
    // 定制属性字段初始化
    gridDataInit(row) {
      selectParam({ managerId: row.managerId }).then(res => {
        if (res.code === 200) {
          this.tableForm.gridData = res.data
          this.tableForm.gridDataCache = JSON.parse(JSON.stringify(this.tableForm.gridData))
          if (res.data.length === 0 && row.state === '1') {
            this.showTableName = true
          }
        }
      })
      selectManager({ managerId: row.managerId }).then(res => {
        this.tableForm.tableName = res.data.tableName
      })
    },
    // 多选
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 批量删除字段信息
    removeParam() {
      if (this.multipleSelection.length === 0) {
        this.$message({
          type: 'info',
          message: '至少勾选一项！'
        })
      } else {
        this.$confirm('是否删除该字段信息', '提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            var paramIds = []
            this.multipleSelection.forEach(res => {
              if (res.paramId) {
                paramIds.push(res.paramId)
              }
            })
            var length = this.tableForm.gridData.length
            var selectLength = this.multipleSelection.length
            for (let i = 0; i < length; i++) {
              for (let j = 0; j < selectLength; j++) {
                if (this.tableForm.gridData[i] === this.multipleSelection[j]) {
                  this.tableForm.gridData.splice(i, 1)
                  i = i - 1
                }
              }
            }
            // deleteParam({ paramIds: paramIds.join(',') }).then(res => {
            //   if (res.code === 200) {
            //     this.$message({
            //       type: 'success',
            //       message: '删除成功！'
            //     })
            //   }
            // })
          }).catch(() => {})
      }
    },
    // 添加字段信息
    addmessage() {
      this.tableForm.gridData.push({
        // typeName: '',
        // infoSource: '',
        // describe: '',
        // achieveType: ''
        remark: '',
        paramCode: '',
        paramType: '',
        isQuery: ''
      })
    },
    // 保存定制属性
    saveParams() {
      this.$refs['tableForm'].validate(val => {
        if (val) {
          console.log(this.tableForm.gridData)
          for (let i = 0; i < this.tableForm.gridData.length; i++) {
            if (!(this.tableForm.gridData[i].remark !== '' || this.tableForm.gridData[i].paramCode !== '' || this.tableForm.gridData[i].paramType !== '' || this.tableForm.gridData[i].isQuery !== '')) {
              this.tableForm.gridData.splice(i, 1)
              i = i - 1
            }
          }
          if (this.tableForm.gridData.length === 0) {
            this.$message({
              type: 'error',
              message: '请添加字段再进行保存'
            })
          } else {
            var formData = new FormData()
            formData.append('listJson', JSON.stringify(this.tableForm.gridData))
            formData.append('managerId', this.managerId)
            if (this.tableForm.tableName !== '') {
              formData.append('tableName', this.tableForm.tableName)
            }
            customAttribute(formData).then(res => {
              if (res.code === 200) {
                this.$message({
                  type: 'success',
                  message: '保存成功！'
                })
              }
              this.dialogTableVisible = false
            })
          }
        }
      })
    },
    validateTableName(rule, value, callback) {
      if (!value) {
        return callback(new Error('内容不能为空'))
      } else if (!/^[a-z0-9]([a-z0-9]|_(?!_))*[a-z0-9]$/.test(value)) {
        callback(new Error('输入内容限制在20个字符以内 且只可包含字母和下划线'))
      } else {
        callback()
      }
    }
  },
  created() {
    this.query()
  }
}
</script>

<style scoped>

</style>