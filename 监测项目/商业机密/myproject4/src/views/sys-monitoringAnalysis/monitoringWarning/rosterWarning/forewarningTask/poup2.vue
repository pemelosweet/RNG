<template>
  <div class="forewarningTask-poup1" :key="2" >
    <!-- 弹框内容 -->
    <div>
      <el-form :model="dialogForm" ref="searchForm" :rules="searchRules" label-width="114px">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="主体名称：" prop="subjectName">
              <el-input v-model="dialogForm.subjectName" maxlength="50" placeholder="最长50字符数" ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="证件类型：" prop="certificateType">
              <el-select v-model="dialogForm.certificateType" clearable @change="certificate" placeholder="请选择" filterable>
                <el-option v-for="(item,index) in certificateTypeArr" :key="index" :label="item.codeName" :value="item.codeId"></el-option>
              </el-select>
            </el-form-item> 
          </el-col>
          <el-col :span="8">
            <el-form-item label="证件号码：" prop="certificateNum">
              <el-input v-model="dialogForm.certificateNum" maxlength="128" placeholder="最长128字符数" ></el-input>
            </el-form-item>
          </el-col>
          </el-row>
          <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="账户号码："  prop="suspiciousAccout">
              <el-input v-model="dialogForm.suspiciousAccout" maxlength="64" placeholder="最长64字符数" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <div style="textAlign:right" class="searchBtn">
          <el-button type="primary" @click='queryData'>查询</el-button>
          <el-button type="primary" @click="cleanUp">清空</el-button>
        </div>
        <div>
          <el-table
            v-loading="loading"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.1)"
            :data="tableData" 
            @selection-change="handelSelect" 
            ref="poupTable" 
            :key="2">
            <el-table-column type="selection" width="80"></el-table-column>
            <el-table-column label="序号" type="index" fixed="left"></el-table-column>
            <el-table-column prop="subjectName" label="主体名称" min-width="140" show-overflow-tooltip></el-table-column>
            <el-table-column prop="certificateType" label="证件类型" min-width="140" show-overflow-tooltip></el-table-column>
            <el-table-column prop="certificateNum" label="证件号码" min-width="140" show-overflow-tooltip></el-table-column>
            <el-table-column label="账号" min-width="140" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-tooltip class="item" effect="dark" placement="top-start">
                  <template slot="content">
                    <div style="margin-bottom:10px" v-for="(item,index) in scope.row.susAccountDOList" :key="index">
                      {{item.suspiciousAccout}}
                    </div>
                  </template>
                  <span v-for="(item,index) in scope.row.susAccountDOList" :key="index">{{item.suspiciousAccout}}</span>
                </el-tooltip>

              </template>
            </el-table-column>
          </el-table>
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageInfo.pageNum" :page-size="pageInfo.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="pageInfo.total" background>
          </el-pagination>
        </div>
      </el-form>
      <div style="textAlign:right; paddingTop:20px">
        <el-button type="primary" @click="add">添 加</el-button>
        <el-button @click="clearSelect">返 回</el-button>
      </div>
    </div>

  </div>
</template>

<script>
import { analyst } from '@/api/sys-monitoringAnalysis/roster-warning/warning-task.js'
import { dictionary } from '@/api/sys-monitoringAnalysis/roster-warning/common.js'
import { commonPattern, ValidQueryInput } from '@/utils/formValidate'
export default {
  data() {
    return {
      dialogForm: {
        subjectName: '',
        certificateType: '',
        certificateNum: '',
        suspiciousAccout: ''
      },
      certificateTypeArr: [],
      tableData: [],
      selectArr: [],
      params: {},
      loading: false,
      pageInfo: {
        pageNum: 1,
        pageSize: 10,
        total: 0
      },
      searchRules: {
        subjectName: [{ validator: this.delDataValidInput, trigger: 'blur' }],
        certificateNum: [{ validator: this.onlyNumberValidate, trigger: 'blur' }, { validator: ValidQueryInput, trigger: 'blur' }],
        suspiciousAccout: [{ validator: this.onlyNumberValidate1, trigger: 'blur' }, { validator: ValidQueryInput, trigger: 'blur' }]
      }
    }
  },
  computed: {
    searchParams() {
      const obj = Object.assign({}, this.dialogForm)
      delete obj.total
      return obj
    }
  },
  methods: {
    // 获取数据字典
    getDictionary(params) {
      dictionary(params).then(res => {
        if (res.code === 200) {
          switch (params) {
            case 'SFZJ':
              this.certificateTypeArr = res.data
              break
            default:
              break
          }
        }
      })
    },
    delDataValidInput(rule, value, callback) {
      if (commonPattern.specialCharInQuery.test(value)) {
        callback(new Error('内容不能填写特殊字符'))
      } else if (commonPattern.headerAndFooter.test(value)) {
        callback(new Error('首尾不能有空格'))
      } else {
        callback()
      }
    },
    // 切换分页条数
    handleSizeChange(size) {
      this.pageInfo.pageSize = size
      this.fetchData()
    },
    // 点击切换分页
    handleCurrentChange(pageNum) {
      this.pageInfo.pageNum = pageNum
      this.fetchData()
    },
    queryData() {
      this.pageInfo.pageNum = 1
      this.params = Object.assign({}, this.searchParams, this.pageInfo)
      this.fetchData()
    },
    // 请求数据
    fetchData() {
      this.$refs.searchForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.params = Object.assign({}, this.params, this.pageInfo)
          analyst(this.params).then(res => {
            if (res.code === 200) {
              // lcnId laId subjectName sourceBusiness sourceDire  iNum证件号码  wType：类型  subjectType impName  listSourceDocNum remark listAccountDOList
              res.data.list.forEach(item => {
                item.iNum = item.certificateNum
                item.wType = 'analyst'
                item.subjectType = item.subjectType
                item.subjectIType = item.certificateType
                item.listAccountDOList = []
                if (item.susAccountDOList) {
                  item.susAccountDOList.forEach(item2 => {
                    item.listAccountDOList.push({ accNum: item2.suspiciousAccout })
                  })
                }
              })
              this.tableData = res.data.list
              this.pageInfo.total = res.data.total
              this.loading = false
            } else {
              this.loading = false
            }
          })
            .catch(err => {
              this.loading = false
              console.log(err)
            })
        }
      })
    },
    handelSelect(val) {
      this.selectArr = val
    },
    add() {
      if (this.selectArr.length > 0) {
        this.dataFn()
      } else {
        this.dialogFormVisible = false
        this.$emit('listFn', {
          Visible: this.dialogFormVisible
        })
      }
    },
    clearSelect() {
      this.dialogFormVisible = false

      this.dataFn()
    },
    dataFn() {
      this.selectArr.forEach(res => {
        res.wType = 'analyst'
      })
      this.$emit('listFn', {
        Visible: this.dialogFormVisible,
        selectArr: this.selectArr,
        showTableItem: 'analyst'
      })
    },
    cleanUp() {
      this.dialogForm = {
        subjectName: '',
        certificateType: '',
        certificateNum: '',
        suspiciousAccout: ''
      }
    },
    // 证件类型校验
    certificate() {
      switch (this.dialogForm.certificateType) {
        case '110003':
          this.rules.certificateNum = [
            { message: '请填正确的身份证号码', trigger: 'blur' },
            { pattern: /^[a-zA-Z0-9]{15}$|^[a-zA-Z0-9]{18}$/, message: '请输入正确的身份证号码,15或18位', trigger: 'blur' }
          ]
          break
        case '110001':
          this.rules.certificateNum = [
            { message: '请填正确的身份证号码', trigger: 'blur' },
            { pattern: /^[a-zA-Z0-9]{15}$|^[a-zA-Z0-9]{18}$/, message: '请输入正确的身份证号码,15或18位', trigger: 'blur' }
          ]
          break
        case '':
          this.rules.certificateNum = [{ validator: this.onlyNumberValidate, trigger: 'blur' }, { validator: ValidQueryInput, trigger: 'blur' }]
          break
        default:
          this.rules.certificateNum = [{ max: 128, validator: this.onlyNumberValidate, trigger: 'blur' }, { validator: ValidQueryInput, trigger: 'blur' }]
          break
      }
    },
    onlyNumberValidate(rule, value, callback) {
      if (value !== null && value !== '' && value !== undefined) {
        if (value.length <= 5 || value.length >= 129) {
          callback(new Error('内容应在6-128位之间'))
        } else if (commonPattern.headerAndFooter.test(value)) {
          callback(new Error('首尾不能有空格'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    },
    onlyNumberValidate1(rule, value, callback) {
      if (value !== null && value !== '' && value !== undefined) {
        if (commonPattern.headerAndFooter.test(value)) {
          callback(new Error('首尾不能有空格'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
  },
  mounted() {
    this.getDictionary('SFZJ')
    this.fetchData()
  }
}
</script>

<style lang="scss">
.forewarningTask-poup1 {
  .el-select {
    width: 100%;
  }
}
</style>