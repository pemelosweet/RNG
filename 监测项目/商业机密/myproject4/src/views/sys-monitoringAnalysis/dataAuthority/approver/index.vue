<template >
  <div class="authorityapprover"
     v-loading="loading"
   element-loading-text="拼命加载中"
  element-loading-spinner="el-icon-loading"
  element-loading-background="rgba(0, 0, 0, 0.1)">
    <el-card>
      <div slot="header">权限审批</div>
      <el-form :model="form" label-width="120px" ref="form" class="form">
        <el-row>
          <el-col :span="12">
            <el-form-item label="申请类型：" prop="applicationType">
              <el-select v-model="form.applicationType" clearable style="width:100%">
                <el-option label="辖区内申请" value="0"></el-option>
                <!-- <el-option label="跨区申请" value="1"></el-option> -->
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="审批状态： " prop="showApproveState">
              <el-select v-model="form.showApproveState" clearable style="width:100%">
                <el-option label="辖区内待审批" value="0"></el-option>
                <el-option label="辖区内已审批" value="1"></el-option>
                <!-- <el-option label="已初审" value="2"></el-option>
                <el-option label="已终审" value="3"></el-option> -->
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="申请日期：" prop="rangeDate">
              <el-date-picker
                value-format="yyyy-MM-dd"
                v-model="form.rangeDate"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="8" style="margin-left:120px;">
            <el-button type="primary" @click="onSubmit">查询</el-button>
            <el-button  plain type="primary" @click="resetForm('form')">清 空</el-button>
          </el-col> -->
        </el-row>
      </el-form>
      <div style="text-align: right">
        <el-button type="primary"  @click="onSubmit">查 询</el-button>
        <el-button  @click="resetForm('form')" type="primary" plain >清 空</el-button>
      </div>
      <el-table :data="tableData" style="margin-top:10px">
        <!-- <el-table-column type="selection" width="60" fixed></el-table-column> -->
        <el-table-column type="index" label="序号" width="60" fixed></el-table-column>
        <el-table-column prop="applicant" label="申请人" min-width="130"></el-table-column>
        <el-table-column prop="applicationType" label="申请类型" min-width="130"></el-table-column>
        <el-table-column prop="createTime" label="申请日期" min-width="130"></el-table-column>
        <el-table-column prop="showApproveState" label="审批状态" min-width="120"></el-table-column>
        <!-- <el-table-column prop="headofficestate" label="总行审批状态" min-width="100"></el-table-column> -->
        <el-table-column label="操作" min-width="100" fixed="right">
          <template slot-scope="scope">
            <!-- {{scope.row.showApproveState}} -->
            <el-button
              type="text"
              v-if="scope.row.showApproveState === '辖区内待审批'"
              @click="handleView($event,scope)"
            >审批</el-button>
            <el-button
              type="text"
              v-if="scope.row.showApproveState !== '辖区内待审批'"
              @click="handleView($event,scope)"
            >查看</el-button>
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

      <el-dialog :visible.sync="dialogVisible" width="60%">
        <span slot="title">{{ title }}</span>
        <div>
          <el-form :model="dialogForm" ref="dialogForm" :rules="rules" label-width="140px">
            <div v-if="hideHeader">
              <el-col :span="12">
                <el-form-item label="申请所在辖区：">
                  <el-select
                    :disabled="Disabled"
                    style="width:100%"
                    v-model="dialogForm.permissionApplicationAreaList"
                    placeholder="请选择"
                    multiple
                    clearable
                  >
                    <el-option
                      v-for="item in localBankArr"
                      :key="item.code"
                      :label="item.codeName"
                      :value="item.codeId"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="申请时效：">
                  <el-date-picker
                    :disabled="Disabled"
                    v-model="dialogForm.dialogdateValue"
                    value-format="yyyy-MM-dd"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </div>
            <el-table :data="areatableData" style="width:100%;" :disabled="Disabled">
              <!-- <el-table-column type="selection" width="60"></el-table-column> -->
              <el-table-column type="index" label="序号" width="60"></el-table-column>
              <el-table-column prop="menu" label="数据范围以及菜单项" min-width="180"></el-table-column>
              <el-table-column prop="query" label="查询及统计功能" min-width="80">
                <template slot-scope="scope">
                  <el-checkbox
                    :disabled="Disabled"
                    v-if="dialogForm.permissionApplicationPermissionStateList[scope.$index] === '1'"
                    v-model="pitch"
                  ></el-checkbox>
                  <el-checkbox v-else v-model="scope.row.newState" :disabled="Disabled"></el-checkbox>
                </template>
              </el-table-column>
            </el-table>
            <el-row style="margin-top: 10px;">
               <el-col :span="24">
                <el-form-item label="申请原因：" prop="applyReason"  style="margin-top:15px">
                  <el-input disabled type="textarea" v-model="dialogForm.applyReason"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row style="margin-top: 10px;">
              <el-col :span="12">
                <el-form-item label="辖区内审批意见：" prop="districtApproveState">
                  <el-select
                    v-model="dialogForm.districtApproveState"
                    :disabled="dialogDisabled"
                    style="width:100%"
                  >
                    <el-option label="通过" value="1"></el-option>
                    <el-option label="不通过" value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="24" v-if="dialogForm.districtApproveState==='2'">
                <el-form-item
                  label="不通过原因："
                  prop="districtApproveExplain"
                  :rules="[{ required: true, message: '请填入不通过原因', trigger: 'blur'}]"
                >
                  <el-input
                    type="textarea"
                    v-model="dialogForm.districtApproveExplain"
                    placeholder="请输入不同意原因，最多1000字符"
                    :disabled="dialogDisabled"
                    maxlength="1000"
                    
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <div class="divider divider-dashed" v-if="centerFristHide"></div>
            <el-row style="margin-top: 20px;" v-if="centerFristHide">
              <el-col :span="12">
                <el-form-item label="初审意见:">
                  <el-select
                    v-model="dialogForm.centralFirstApproveState"
                    :disabled="Disabled"
                    style="width:100%"
                  >
                    <el-option label="通过" value="1"></el-option>
                    <el-option label="不通过" value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="调整申请时效：">
                  <el-date-picker
                    v-model="dialogForm.agingValue"
                    :disabled="Disabled"
                    value-format="yyyy-MM-dd"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="24" v-if="dialogForm.centralFirstApproveState==='2'">
                <el-form-item
                  label="不通过原因："
                  prop="centralFirstApproveExplain"
                  :rules="[{required: true,  message: '请填入不通过原因', trigger: 'blur'}]"
                >
                  <el-input
                    placeholder="请输入不同意原因，最多1000字符"
                    maxlength="1000"
                    type="textarea"
                    v-model="dialogForm.centralFirstApproveExplain"
                    :disabled="Disabled"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="centerLastHide">
              <el-col :span="12">
                <el-form-item label="终审意见：">
                  <el-select
                    v-model="dialogForm.centralFinallyApproveState"
                    :disabled="Disabled"
                    style="width:100%"
                  >
                    <el-option label="通过" value="1"></el-option>
                    <el-option label="不通过" value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="调整申请时效：">
                  <el-date-picker
                    v-model="dialogForm.agingValue2"
                    :disabled="Disabled"
                    value-format="yyyy-MM-dd"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col
                :span="24"
                v-if="dialogForm.centralFinallyApproveState==='2'"
                style="width:100%"
              >
                <el-form-item
                  label="不通过原因："
                  prop="centralFinallyApproveExplain"
                  :rules="[{required: true, message: '请填入不通过原因',  trigger: 'blur'}]"
                >
                  <el-input
                    placeholder="请输入不同意原因，最多1000字符"
                    maxlength="1000"
                    type="textarea"
                    v-model="dialogForm.centralFinallyApproveExplain"
                    :disabled="Disabled"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitForm('dialogForm')" v-if="hideButton">提 交</el-button>
          <el-button @click="dialogVisible = false" v-if="hideHeader">关 闭</el-button>
          <el-button @click="dialogVisible = false" v-if="!hideHeader">返 回</el-button>
        </span>
      </el-dialog>
       <div style="  text-align: center">
            <el-button type="primary" @click="closeT" plain v-if="this.$route.query.id">返 回</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import { dictionary } from '@/api/sys-monitoringAnalysis/roster-warning/common.js'
import { commonPattern } from '@/utils/formValidate'
import {
  getList,
  clue,
  viewDetails
} from '@/api/sys-monitoringAnalysis/dataAuthority/approver/index.js'
// import TreeSelect from '@/components/TreeSelect'
export default {
  // components: {
  //   TreeSelect
  // },
  data() {
    return {
      loading: false,
      localBankArr: [],
      pitch: true,
      dialogDisabled: true, // 弹框是否只读
      centerFristHide: true,
      centerLastHide: true,
      Disabled: true,
      dialogVisible: false,
      hideHeader: false,
      hideButton: true,
      title: '',
      form: {
        source: '',
        state: '',
        date: ''
      },
      dialogForm: {
        applyReason: '',
        permissionApplicationAreaList: [],
        agingValue: [],
        agingValue2: [],
        options: [],
        queryState: false,
        exportState: false,
        statistics: false,
        districtApproveExplain: '',
        districtApproveState: ''
      },
      rules: {
        districtApproveState: [{ required: true, message: '请选择审批意见', trigger: 'change' }],
        applyReason: [{ message: '请输入申请内容', trigger: 'blur' }],
        districtApproveExplain: [{ required: true, message: '请填入不通过原因', trigger: 'change' }]
      },
      pageInfo: {
        pageNum: 1,
        pageSize: 10
      },
      currentPage: 1,
      tableData: [],
      areatableData: [
        {
          menu: '大额交易',
          newState: 1,
          itemId: '1',
          state: false
        },
        {
          menu: '可疑交易及报告',
          itemId: '2',
          newState: 1,
          state: false
        },
        {
          menu: '大额迟报数据',
          itemId: '3',
          newState: 1,
          state: false
        },
        // {
        //   menu: '客户身份信息',
        //   itemId: '4',
        //   newState: 1,
        //   state: false
        // },
        {
          menu: '大额交易统计分析',
          itemId: '5',
          newState: 1,
          state: false
        },
        {
          menu: '支付机构大额统计分析',
          itemId: '6',
          newState: 1,
          state: false
        },
        {
          menu: '可疑交易统计分析',
          itemId: '7',
          newState: 1,
          state: false
        },
        {
          menu: '按交易主体统计',
          itemId: '8',
          newState: 1,
          state: false
        },
        {
          menu: '账户资金流向分析',
          itemId: '9',
          newState: 1,
          state: false
        },
        {
          menu: '义务机构报告与补正及时率统计',
          itemId: '10',
          newState: 1,
          state: false
        },
        {
          menu: '义务机构报告情况时间序列分析',
          itemId: '11',
          newState: 1,
          state: false
        }
        // {
        //   menu: '自定义统计分析',
        //   itemId: '12',
        //   newState: 1,
        //   state: false
        // }
      ],
      crosstableData: [
        {
          menu: '大额交易',
          newState: 1,
          itemId: '1',
          state: false
        },
        {
          menu: '可疑交易及报告',
          itemId: '2',
          newState: 1,
          state: false
        },
        {
          menu: '大额迟报数据',
          itemId: '3',
          newState: 1,
          state: false
        },
        {
          menu: '大额交易统计分析',
          itemId: '5',
          newState: 1,
          state: false

        },
        {
          menu: '支付机构大额统计分析',
          itemId: '6',
          newState: 1,
          state: false
        },
        {
          menu: '可疑交易统计分析',
          itemId: '7',
          newState: 1,
          state: false
        },
        // {
        //   menu: '按交易主体统计',
        //   itemId: '8',
        //   newState: 1,
        //   state: false
        // },
        // {
        //   menu: '账户资金流向分析',
        //   itemId: '9',
        //   newState: 1,
        //   state: false
        // },
        {
          menu: '义务机构报告与补正及时率统计',
          itemId: '10',
          newState: 1,
          state: false
        },
        {
          menu: '义务机构报告情况时间序列分析',
          itemId: '11',
          newState: 1,
          state: false
        }
      ]

    }
  },
  // 列表查询参数
  computed: {
    searchParams() {
      const obj = Object.assign({}, this.form, this.pageInfo)
      delete obj.rangeDate
      delete obj.total
      if (this.form.rangeDate) {
        obj.minDate = this.form.rangeDate[0]
        obj.maxDate = this.form.rangeDate[1]
      }
      return obj
    }
  },
  mounted() {
    this.initList(this.pageInfo)
    this.getDictionary('FZJG')
  },
  methods: {
    // 获取数据字典
    getDictionary(params) {
      dictionary(params).then(res => {
        if (res.code === 200) {
          switch (params) {
            case 'FZJG':
              this.localBankArr = res.data.slice(1)
              break
            default:
              break
          }
        }
      })
    },
    // input校验
    isValidInput(rule, value, callback) {
      if (Number(value) === 0) {
        callback(new Error('内容不能为空'))
      } else {
        if (!commonPattern.spaceBar.test(value)) {
          callback(new Error('内容不能含有空格'))
        } else if (commonPattern.specialChar.test(value) || commonPattern.specialEng.test(value)) {
          callback(new Error('内容不能填写特殊字符'))
        } else {
          callback()
        }
      }
    },
    // 获取列表数据方法
    initList(params) {
      this.loading = true
      getList(params).then(res => {
        this.loading = false
        if (res.code === 200) {
          this.pageInfo.total = res.data.total
          const arry = res.data.list // 获取的数据
          const arr = []
          arry.forEach(el => {
            const obj = {} // 新对象存我想要的四个字段
            obj.applicationType = el.applicationType // 申请类型
            obj.id = el.id // ID
            obj.districtApproveState = el.districtApproveState
            obj.centralFirstApproveState = el.centralFirstApproveState
            obj.centralFinallyApproveState = el.centralFinallyApproveState
            obj.districtApproveExplain = el.districtApproveExplain
            obj.centralFirstApproveExplain = el.centralFirstApproveExplain
            obj.centralFinallyApproveExplain = el.centralFinallyApproveExplain
            obj.createTime = el.createTime.substring(0, 10) // 申请日期
            obj.showApproveState = el.showApproveState // 审批状态
            obj.applicant = el.userId
            arr.push(obj)
          })
          this.tableData = arr
        }
      }).catch(() => {
        this.loading = false
      })
    },
    // 查询
    onSubmit() {
      this.loading = true
      getList(this.searchParams).then(res => {
        this.loading = false
        if (res.code === 200) {
          this.pageInfo.total = res.data.total
          const arry = res.data.list // 获取的数据
          const arr = []
          arry.forEach(el => {
            const obj = {} // 新对象存我想要的四个字段
            obj.applicationType = el.applicationType // 申请类型
            obj.id = el.id // ID
            obj.createTime = el.createTime.substring(0, 10) // 申请日期
            obj.showApproveState = el.showApproveState // 审批状态
            obj.applicant = el.userId
            arr.push(obj)
          })
          this.tableData = arr
        }
      }).catch(() => {
        this.loading = false
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const obj1 = {}
          obj1.id = this.dialogForm.id
          obj1.districtApproveState = this.dialogForm.districtApproveState
          obj1.districtApproveExplain = this.dialogForm.districtApproveExplain
          obj1.applyReason = this.dialogForm.applyReason
          clue(obj1)
            .then(res => {
              if (res.code === 200) {
                this.$message({
                  message: '审批成功',
                  type: 'success',
                  duration: 6000
                })
              }
            })
            .then(() => {
              this.dialogVisible = false
              this.initList(this.pageInfo)
            })
        } else {
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    // 切换分页条数
    handleSizeChange(size) {
      this.pageInfo.pageSize = size
      this.initList(this.searchParams)
    },
    // 点击切换分页
    handleCurrentChange(pageNum) {
      this.pageInfo.pageNum = pageNum
      this.initList(this.searchParams)
    },
    // 关 闭
    closeT() {
      this.$router.go(-1)
    },
    handleView(e, scope) {
      this.dialogVisible = true
      this.title = e.target.innerText
      console.log(scope.row.id, 22)
      viewDetails(scope.row.id, scope.row.applicationType === '辖区内申请' ? 0 : 1).then(res => {
        if (res.code === 200) {
          if (scope.row.applicationType === '跨区申请') {
            this.hideHeader = true
          } else {
            this.hideHeader = false
          }
          const arr1 = res.data
          const type = []
          arr1.permissionApplicationAreaList.forEach(item => {
            type.push(item.areaId)
          })
          arr1.permissionApplicationAreaList = type
          const type1 = []
          arr1.permissionApplicationPermissionStateList.forEach(item => {
            type1.push(item.state)
          })
          arr1.permissionApplicationPermissionStateList = type1
          const type2 = []
          type2.push(arr1.beginDate, arr1.endDate)
          arr1.applicationType = scope.row.applicationType
          arr1.dialogdateValue = type2
          if (arr1.centralFirstBeginDate) {
            const type3 = []
            type3.push(arr1.centralFirstBeginDate, arr1.centralFirstEndDate)
            arr1.agingValue = type3
          } else {
            arr1.agingValue = []
          }
          if (arr1.centralFinallyBeginDate) {
            const type4 = []
            type4.push(arr1.centralFinallyBeginDate, arr1.centralFinallyEndDate)
            arr1.agingValue2 = type4
          } else {
            arr1.agingValue2 = []
          }

          if (scope.row.applicationType === '辖区内申请') {
            const arr1 = res.data
            arr1.permissionApplicationPermissionStateList.splice(3, 1)
            this.dialogForm = arr1
            console.log(this.dialogForm, 8987878)
          } else {
            this.areatableData = this.crosstableData
            const arr2 = res.data
            arr2.permissionApplicationPermissionStateList.splice(3, 1)
            arr2.permissionApplicationPermissionStateList.splice(6, 2)
            this.dialogForm = res.data
          }

          if (scope.row.showApproveState === '辖区内待审批') {
            this.dialogForm.districtApproveState = ''
            this.dialogForm.districtApproveExplain = ''
            setTimeout(() => {
              this.$refs.dialogForm.clearValidate()
            }, 10)
            this.hideButton = true
            this.dialogDisabled = false
            this.centerFristHide = false
            this.centerLastHide = false
          }
          if (scope.row.showApproveState === '辖区内已审批') {
            this.hideButton = false
            this.dialogDisabled = true
            this.centerFristHide = false
            this.centerLastHide = false
          }
          if (scope.row.showApproveState === '已初审') {
            this.hideButton = false
            this.dialogForm.districtApproveState = '同意'
            this.dialogDisabled = true
            this.centerFristHide = true
            this.centerLastHide = false
          }
          if (scope.row.showApproveState === '已终审') {
            this.hideButton = false
            this.dialogDisabled = true
            this.centerFristHide = true
            this.centerLastHide = true
          }
        }
      })
    }
  }
}
</script>
<style lang="scss"  >
.authorityapprover {
  .itemline {
    font-size: 16px;
    color: #409eff;
    padding: 0 4px 0 8px;
  }
  .el-date-editor--daterange {
    min-width: 100%;
     width: 50% !important;
  }
  .vue-treeselect__control {
    height: 29px;
    line-height: 29px;
  }
  // .vue-treeselect__multi-value-item {
  //   // line-height: 16px;
  // }
}
</style>