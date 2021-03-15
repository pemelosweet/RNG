<template >
  <div class="authorityapprover"
     v-loading="loading"
   element-loading-text="拼命加载中"
  element-loading-spinner="el-icon-loading"
  element-loading-background="rgba(0, 0, 0, 0.1)">
    <el-card>
      <div slot="header">{{ titles }}</div>
        <div>
          <el-form :model="dialogForm" ref="dialogForm" :rules="rules" label-width="140px">
            <div v-if="hideHeader">
              <el-col :span="12">
                <el-form-item label="申请人所在辖区：">
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
            <div class="divider divider-dashed" v-show="centerFristHide"></div>
            <el-row style="margin-top: 20px;" v-show="centerFristHide&&this.types === '1'">
              <el-col :span="12">
                <el-form-item 
                label="初审意见:" 
                 prop="centralFirstApproveState"   >
                  <el-select
                  :disabled="title!=='辖区内已审批'"
                    v-model="dialogForm.centralFirstApproveState"
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
                    :picker-options="pickerOptions0"
                   :disabled="title!=='辖区内已审批'"
                    v-model="dialogForm.agingValue"
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
                  :disabled="title!=='辖区内已审批'"
                    placeholder="请输入不同意原因，最多1000字符"
                    maxlength="1000"
                    type="textarea"
                    v-model="dialogForm.centralFirstApproveExplain"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="centerLastHide&&this.types === '1'">
              <el-col :span="12">
                <el-form-item label="终审意见："
                  prop="centralFinallyApproveState"
                  :rules="[{required: true, message: '请填入终审意见',  trigger: 'blur'}]"
                >
                  <el-select
                   :disabled="title!=='已初审'"
                    v-model="dialogForm.centralFinallyApproveState"
                   
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
                    :disabled="title!=='已初审'"
                    :picker-options="pickerOptions1"
                    v-model="dialogForm.agingValue2"
                    @change="changeDate"
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
                    :disabled="title!=='已初审'"
                    placeholder="请输入不同意原因，最多1000字符"
                    maxlength="1000"
                    type="textarea"
                    v-model="dialogForm.centralFinallyApproveExplain"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
              <div style="text-align:center" >
                <el-button type="primary" @click="submitForm('dialogForm')" v-if="hideButton">提 交</el-button>
                <el-button type="primary" @click="submitForm2('dialogForm')" v-if="title==='辖区内已审批'&&this.types === '1'">提 交</el-button>
                    <el-button type="primary" @click="onSubmit('dialogForm')" v-if="title==='已初审'">提 交</el-button>
                <el-button @click="goBack" v-if="hideHeader">关 闭</el-button>
                <el-button @click="goBack" v-if="!hideHeader">返 回</el-button>
            </div>
          </el-form>
          
        </div>
    </el-card>
  </div>
</template>

<script>
import { dictionary } from '@/api/sys-monitoringAnalysis/roster-warning/common.js'
import { commonPattern } from '@/utils/formValidate'
import {
  clue,
  viewDetails
} from '@/api/sys-monitoringAnalysis/dataAuthority/approver/index.js'
import {
  clue2
} from '@/api/sys-monitoringAnalysis/dataAuthority/operator/office.js'
import {
  clue3
} from '@/api/sys-monitoringAnalysis/dataAuthority/approver/office.js'
// import TreeSelect from '@/components/TreeSelect'
export default {
  // components: {
  //   TreeSelect
  // },
  data() {
    return {
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7// 如果没有后面的-8.64e7就是不可以选择今天的
        }
      },
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7// 如果没有后面的-8.64e7就是不可以选择今天的
        }
      },
      types: '',
      titles: '',
      loading: false,
      localBankArr: [],
      pitch: true,
      dialogDisabled: true, // 弹框是否只读
      centerFristHide: true,
      centerLastHide: true,
      Disabled: true,
      hideHeader: true,
      hideButton: false,
      title: '',
      form: {
        source: '',
        state: '',
        date: ''
      },
      dialogForm: {
        applyReason: '',
        centralFirstApproveState: '',
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
        centralFirstApproveState: [{ required: true, message: '请选择初审意见', trigger: 'change' }],
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
    },
    value1() {
      return this.dialogForm.agingValue2
    }
  },
  mounted() {
    var a = this.$route.query
    var pkid = a.id.split(',')[0]
    this.types = a.id.split(',')[1]
    var powerType = a.id.split(',')[2]
    console.log(powerType, 22)
    this.handleView(pkid, this.types)

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
                this.goBack()
              }
            })
        } else {
          return false
        }
      })
    },
    // 提交
    submitForm2(formName) {
      this.$refs.dialogForm.validate(valid => {
        if (valid) {
          const obj1 = {}
          obj1.id = this.dialogForm.id
          obj1.centralFirstApproveState = this.dialogForm.centralFirstApproveState
          obj1.centralFirstApproveExplain = this.dialogForm.centralFirstApproveExplain
          obj1.centralFirstBeginDate = this.dialogForm.agingValue[0]
          obj1.centralFirstEndDate = this.dialogForm.agingValue[1]
          obj1.applyReason = this.dialogForm.applyReason
          clue2(obj1)
            .then(res => {
              if (res.code === 200) {
                this.$message({
                  message: '审批成功',
                  type: 'success',
                  duration: 6000
                })
                this.goBack()
              }
            })
        } else {
          return false
        }
        this.$refs.dialogForm.resetFields()
      })
    },
    onSubmit(formName) {
      // 提交审批
      this.$refs[formName].validate(valid => {
        if (valid) {
          const obj1 = {}
          obj1.id = this.dialogForm.id
          obj1.centralFinallyApproveState = this.dialogForm.centralFinallyApproveState
          obj1.centralFinallyApproveExplain = this.dialogForm.centralFinallyApproveExplain
          obj1.centralFinallyBeginDate = this.dialogForm.agingValue2[0]
          obj1.centralFinallyEndDate = this.dialogForm.agingValue2[1]
          obj1.applyReason = this.dialogForm.applyReason
          clue3(obj1)
            .then(res => {
              if (res.code === 200) {
                this.$message({
                  message: '审批成功',
                  type: 'success',
                  duration: 6000
                })
              }
              this.goBack()
            })
        } else {
          return false
        }
      })
    },
    goBack() {
      this.$router.go(-1)
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    // 切换分页条数
    handleSizeChange(size) {
      this.pageInfo.pageSize = size
    },
    // 点击切换分页
    handleCurrentChange(pageNum) {
      this.pageInfo.pageNum = pageNum
    },
    handleView(id, type) {
      viewDetails(id, type).then(res => {
        if (res.code === 200) {
          this.title = res.data.showApproveState
          if (res.data.applicationType === '跨区申请') {
            this.areatableData = this.crosstableData
            const arr2 = res.data
            arr2.permissionApplicationPermissionStateList.splice(3, 1)
            arr2.permissionApplicationPermissionStateList.splice(6, 2)
            this.hideHeader = true
          } else {
            const arr1 = res.data
            arr1.permissionApplicationPermissionStateList.splice(3, 1)
            console.log(this.dialogForm, 8987878)
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
          arr1.applicationType = type
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
          this.dialogForm = arr1
          if (this.title === '辖区内待审批') {
            this.titles = '审批'
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
          if (this.title === '辖区内已审批' && this.types === '0') {
            this.titles = '查看'
            this.hideButton = false
          }
          if (this.title === '辖区内已审批' && this.types === '1') {
            this.titles = '审批'
            setTimeout(() => {
              this.$refs.dialogForm.clearValidate()
            }, 10)
            this.dialogForm.centralFirstApproveState = ''
            this.hideButton = false
            this.dialogDisabled = true
            this.centerFristHide = true
            this.centerLastHide = false
          }
          if (this.title === '待初审') {
            this.titles = '审批'
            setTimeout(() => {
              this.$refs.dialogForm.clearValidate()
            }, 10)
            this.hideButton = true
            this.dialogDisabled = true
            this.centerFristHide = true
            this.centerLastHide = false
          }
          if (this.title === '已初审') {
            this.titles = '审批'
            setTimeout(() => {
              this.$refs.dialogForm.clearValidate()
            }, 10)
            this.dialogForm.centralFinallyApproveState = ''
            this.hideButton = false
            // this.dialogForm.districtApproveState = '同意'
            this.dialogDisabled = true
            this.centerFristHide = true
            this.centerLastHide = true
          }
          if (this.title === '已终审') {
            this.titles = '查看'
            setTimeout(() => {
              this.$refs.dialogForm.clearValidate()
            }, 10)
            this.hideButton = false
            this.dialogDisabled = true
            this.centerFristHide = true
            this.centerLastHide = true
          }
        }
      })
    },
    changeDate(val) {
      console.log(val)
    }
  },
  watch: {
    value1(val) {
      console.log(val, '222222222222')
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