<template>
  <div class="configIndicator">
    <el-card>
      <div slot="header" class="clearfix">
        <span>配置评价指标</span>
        <el-button type="text" icon="el-icon-plus" style="float:right;" @click="dialogVisible = true, dialogForm.zid = ''">新建指标版本</el-button>
      </div>
      <el-form :model="searchForm" ref="searchForm" label-width="100px">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="版本名：" prop="version" :rules="[{required: false, validator: isValidVersion, trigger: 'blur'}]">
              <el-input v-model="searchForm.version" placeholder="请输入版本名，最多输入15位" maxlength="15"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="指标状态：" prop="state">
              <el-select clearable v-model="searchForm.status" placeholder="请选择指标状态">
                <el-option label="全部" value="0"></el-option>
                <el-option label="保存" value="1"></el-option>
                <el-option label="发布" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="创建时间：" prop="createDate">
              <el-date-picker
                clearable
                value-format="yyyy-MM-dd"
                v-model="searchForm.createDate"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                unlink-panels
                placeholder
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="btnalign">
          <el-button type="primary" plain @click="queryList" v-loading="queryLoading">查 询</el-button>
          <el-button
              type="primary" plain
              @click="cleanUp"
            >清 空</el-button>
        </div>
      </el-form>
      <div style="margin-bottom:15px;">历史版本指标列表</div>
      <!-- <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"> -->
        <el-table style="width: 100%" :data="tableData" v-loading="listLoading" element-loading-text="拼命加载中..." element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.1)">
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="version" label="版本名" show-overflow-tooltip></el-table-column>
        <el-table-column prop="evaluationIndex" label="评价指标" show-overflow-tooltip></el-table-column>
        <el-table-column prop="createDate" label="创建时间" show-overflow-tooltip></el-table-column>
        <el-table-column prop="createPerson" label="创建人" show-overflow-tooltip></el-table-column>
        <el-table-column prop="status" label="指标状态" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- <el-button type="text" @click="releaseBtn(scope.row.zid)" :disabled="scope.row.status === '发布' || scope.row.createPerson !== name">发布</el-button>
            <el-button type="text" @click="openDialog(scope)" :disabled="scope.row.status !== '保存' || scope.row.createPerson !== name">编辑</el-button>
            <el-button type="text" @click="deleteBtn(scope.row.zid)" :disabled="scope.row.status !== '保存' || scope.row.createPerson !== name">删除</el-button> -->
            <el-button type="text" @click="releaseBtn(scope.row.zid)" :disabled="!(scope.row.status !== '发布' && scope.row.createPerson == name)">发布</el-button>
            <el-button type="text" @click="openDialog(scope)" :disabled="scope.row.createPerson !== name">编辑</el-button>
            <el-button type="text" @click="deleteBtn(scope.row.zid)" :disabled="scope.row.createPerson !== name">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageInfo.pageNum" :page-sizes="[10, 20, 30, 40]" :page-size="pageInfo.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pageInfo.total">
      </el-pagination>

      <!-- 弹框内容 -->
      <el-dialog :title="dialogForm.zid ? '编辑' : '新建'" :visible.sync="dialogVisible" width="50%" @open="openVisible">
        <div>
            <el-form :model="dialogForm" ref="dialogForm">
          <div>
              <el-form-item label="版本：" label-width="80px" prop="version" :rules="[{required: true, message: '版本不能为空', trigger: 'blur'},{validator: isValidVersion, trigger: 'blur'}]">
                <el-input v-model="dialogForm.version" maxlength="15" placeholder="请输入版本，最多输入15位"></el-input>
              </el-form-item>
            <el-table :data="dialogForm.idexes" style="width:100%;">
              <el-table-column type="index" width="80" label="序号">
                <template slot-scope="scope">
                  <el-form-item>
                    {{scope.$index + 1}}
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column label="指标名称" prop="indexName">
                <template slot-scope="scope">
                  <el-form-item :prop="`idexes.${scope.$index}.indexName`" :rules="[{required: true, message: '指标名称不能为空', trigger: 'blur'}, {validator: isValidInput, trigger: 'blur'}]">
                    <el-input v-model="scope.row.indexName" maxlength="50" placeholder="请输入指标名称，最多输入50位"></el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column prop="fullMark" label="满分">
                <template slot-scope="scope">
                  <el-form-item :prop="`idexes.${scope.$index}.fullMarks`" :rules="[{required: true, message: '满分不能为空', trigger: 'blur'}, {validator: validateNumber, trigger: 'blur'}]">
                    <el-input v-model="scope.row.fullMarks" maxlength="3" placeholder="请输入满分，最多输入3位"></el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="80">
                <template slot-scope="scope">
                  <el-form-item>
                    <el-button type="text" @click="tabDelBtn(scope.$index)" :disabled="scope.$index < 1">删除</el-button>
                  </el-form-item>
                </template>
              </el-table-column>
            </el-table>
          </div>
            </el-form>
        </div>
        <el-button type="primary" @click="addSingle" :loading="addSingleLoading">增加</el-button>
        <span slot="footer" class="dialog-footer">
          <el-button @click="closeDialog">取 消</el-button>
          <el-button type="primary" @click="addIndexVersion" :loading="addIndexVersionLoading">保 存</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getList, add, release, deleteList, getDetail, put } from '@/api/sys-monitoringAnalysis/dataGovernance/samplingEvaluetion/configIndicator.js'
import { commonPattern } from '@/utils/formValidate'
export default {
  data() {
    return {
      queryLoading: false,
      addIndexVersionLoading: false,
      chinaNull: /[\u4e00-\u9fa5]/, // 校验中文
      specialEnglish: /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im, // 校验英文特殊符号
      sprcialChina: /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im, // 校验中文特殊符号
      englishNull: /[abcdefghijklmnopqrstuvwxyz]/im, // 校验英文
      numberNull: /[1234567890]/im, // 校验数字
      blankSpace: /[ ]/im, // 校验空格
      addSingleLoading: false,
      listLoading: false,
      dialogVisible: false,
      isNew: true,
      searchForm: {
        version: '',
        status: '0',
        startDate: '',
        endDate: '',
        createDate: ''
      },
      tableData: [],
      pageInfo: {
        pageNum: 1,
        pageSize: 10,
        total: 0
      },
      multipleSelection: [],
      dialogForm: {
        zid: '',
        version: '',
        idexes: [
          {
            indexName: '',
            fullMarks: ''
          }
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['name']),
    searchParams() {
      const obj = Object.assign({}, this.searchForm, this.pageInfo)
      delete obj.total
      if (this.searchForm.createDate) {
        obj.startDate = this.searchForm.createDate[0]
        obj.endDate = this.searchForm.createDate[1]
      }
      delete obj.total
      return obj
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
    // var listQuery = { currentPage: this.currentPage, pageSize: this.pageSize }
    // this.fetchData(listQuery)
  },
  methods: {
    // 校验 只能输入数字
    // 校验只能输入数字
    validateNumber(rule, value, callback) {
      if (this.specialEnglish.test(value) || this.sprcialChina.test(value)) {
        callback(new Error('禁止输入特殊字符'))
      } else if (this.blankSpace.test(value)) {
        callback(new Error('禁止输入空格'))
      } else if (this.chinaNull.test(value)) {
        callback(new Error('禁止输入中文'))
      } else if (this.englishNull.test(value)) {
        callback(new Error('禁止输入英文'))
      } else if (Number(value) > 100 || Number(value) < 1) {
        callback(new Error('范围1~100'))
      } else {
        callback()
      }
    },
    // 校验
    isValidVersion(rule, value, callback) {
      if (commonPattern.specialCharInQuery.test(value)) {
        callback(new Error('禁止输入特殊字符'))
      } else if (this.blankSpace.test(value)) {
        callback(new Error('禁止输入空格'))
      } else if (this.chinaNull.test(value)) {
        callback(new Error('禁止输入中文'))
      } else {
        callback()
      }
    },
    // 校验禁止输入空格特殊字符
    isValidInput(rule, value, callback) {
      if (!commonPattern.spaceBar.test(value)) {
        callback(new Error('内容不能含有空格'))
      } else if (commonPattern.specialChar.test(value) || commonPattern.specialEng.test(value)) {
        callback(new Error('内容不能填写特殊字符'))
      } else {
        callback()
      }
    },
    openVisible() {
      if (this.dialogForm.zid === '') {
        this.dialogForm = {
          zid: '',
          version: '',
          idexes: [
            {
              indexName: '',
              fullMarks: ''
            }
          ]
        }
      }
      setTimeout(() => {
        this.$refs.dialogForm.clearValidate()
      }, 0)
    },
    tabDelBtn(index) {
      this.$confirm('确定要删除选中的数据 ?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.dialogForm.idexes.splice(index, 1)
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        })
        .catch(() => {})
    },
    closeDialog() {
      this.dialogVisible = false
      this.isNew = true
    },
    // 详情
    openDialog(scope) {
      getDetail(scope.row.zid).then(res => {
        if (res.code === 200) {
          this.dialogVisible = true
          this.isNew = false
          this.dialogForm.version = res.data.version
          this.dialogForm.idexes = res.data.idexes
          this.dialogForm.zid = res.data.zid
          console.log(res.data)
        }
      }).catch(() => {

      })
    },
    // 清空搜索条件
    cleanUp() {
      this.searchForm = {
        version: '',
        status: '0',
        startDate: '',
        endDate: '',
        createDate: ''
      }
      // this.queryList()
    },
    // 查询列表
    queryList() {
      this.$refs.searchForm.validate((val) => {
        if (val) {
          // const listQuery = {}
          this.queryLoading = true
          this.listLoading = true
          getList(this.searchParams).then(res => {
            if (res) {
              this.queryLoading = false
              if (res.code === 200) {
                this.listLoading = false
                this.tableData = res.data.list
                this.pageInfo.total = res.data.total
              } else {
                this.listLoading = false
              }
            } else {
              this.listLoading = false
              this.queryLoading = false
            }
          }).catch(() => {
            this.listLoading = false
            this.queryLoading = false
          })
        } else {
          return false
        }
      })
    },
    // 列表没调数据发布
    releaseBtn(id) {
      release(id).then(res => {
        if (res.code === 200) {
          this.$message({
            message: '发布成功',
            type: 'success'
          })
          this.queryList()
        }
      })
    },
    // 删除列表单行数据
    deleteBtn(id) {
      this.$confirm('确定要删除选中的数据 ?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteList(id).then(res => {
            if (res.code === 200) {
              this.$message({
                message: '删除成功',
                type: 'success'
              })
              this.queryList()
            }
          })
        })
        .catch(() => {})
    },
    // 添加一行
    addSingle() {
      if (this.dialogForm.idexes.length > 19) {
        this.addSingleLoading = true
        this.$message({
          type: 'warning',
          message: '最多可增加20条！',
          duration: 6000,
          showClose: true,
          onClose: function() {
            this.addSingleLoading = false
          }.bind(this)
        })
      } else {
        const temObj = {
          indexName: '',
          fullMarks: ''
        }
        this.dialogForm.idexes.push(temObj)
      }
    },
    // 新增指标版本
    addIndexVersion() {
      this.$refs.dialogForm.validate((valid) => {
        if (valid) {
          this.addIndexVersionLoading = true
          if (this.dialogForm.zid === '') {
            const obj = Object.assign({}, this.dialogForm)
            delete obj.zid
            add(obj).then(res => {
              if (res.code === 200) {
                this.addIndexVersionLoading = false
                this.$message({
                  message: '新增成功',
                  type: 'success'
                })
                this.dialogVisible = false
                this.pageInfo.pageNum = 1
                this.queryList()
              } else {
                this.$message({
                  type: 'warning',
                  message: res.message,
                  duration: 6000,
                  showClose: true,
                  onClose: function() {
                    this.addIndexVersionLoading = false
                  }.bind(this)
                })
              }
            }).catch(() => {
              this.addIndexVersionLoading = false
            })
          } else {
            put(this.dialogForm).then(res => {
              if (res.code === 200) {
                this.addIndexVersionLoading = false
                // this.listLoading = false
                this.$message({
                  message: '编辑成功',
                  type: 'success'
                })
                this.dialogVisible = false
                this.isNew = true
                this.queryList()
              } else {
                this.$message({
                  type: 'warning',
                  message: res.message,
                  duration: 6000,
                  showClose: true,
                  onClose: function() {
                    this.addIndexVersionLoading = false
                  }.bind(this)
                })
              }
            }).catch(() => {
              this.addIndexVersionLoading = false
            })
          }
        } else {
          return false
        }
      })
    },
    handleSizeChange(size) {
      this.pageInfo.pageNum = 1
      this.pageInfo.pageSize = size
      this.queryList()
    },
    handleCurrentChange(currentPage) {
      this.pageInfo.pageNum = currentPage
      this.queryList()
      // console.log(`当前页: ${currentPage}`)
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
      // this.title = '已选当前页' + this.multipleSelection.length + '项'
    }
  },
  mounted() {
    this.queryList()
  }
}
</script>

<style lang="scss">
.configIndicator {
  .btnalign {
    text-align: right;
  }
  .el-date-editor--daterange {
    min-width: 100%;
  }
  .el-select {
    width: 100%;
  }
}
</style>
