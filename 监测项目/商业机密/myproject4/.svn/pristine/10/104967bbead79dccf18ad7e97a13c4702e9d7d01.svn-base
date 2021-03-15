<template>
  <div class="authorityoperator2"
    v-loading="loading"
   element-loading-text="拼命加载中"
  element-loading-spinner="el-icon-loading"
  element-loading-background="rgba(0, 0, 0, 0.1)">
    <el-card>
      <div slot="header">跨区初审</div>
        <el-form :model="form" label-width="130px" ref="form" class="form">
             <el-row>
          <el-col :span="12">
            <el-form-item label="申请所在辖区：">
              <el-select
                style="width:100%"
                v-model="form.permissionApplicationAreaList"
                placeholder="请选择"
                clearable
              >
                <el-option
                  v-for="(item,index) in localBankArr"
                  :key="index"
                  :value="item.codeId"
                  :label="item.codeName"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="审批状态： " prop="showApproveState">
              <el-select style="width:100%" v-model="form.showApproveState" clearable>
                <el-option label="待初审" value="1"></el-option>
                <el-option label="已初审" value="2"></el-option>
                <el-option label="已终审" value="3"></el-option>
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
            <el-button type="primary" @click="query">查询</el-button>
            <el-button  plain type="primary" @click="resetForm('form')">清 空</el-button>
          </el-col> -->
      	</el-row>
      </el-form>
      <div style="text-align: right">
        <el-button type="primary"  @click="query">查 询</el-button>
        <el-button  @click="resetForm('form')" type="primary" plain >清 空</el-button>
      </div>
 
      <el-table :data="tableData" style="margin-top:10px">
        <!-- <el-table-column type="selection" width="60" fixed></el-table-column> -->
        <el-table-column type="index" label="序号" width="60" fixed></el-table-column>
        <el-table-column prop="applicant" label="申请人" min-width="130"></el-table-column>
        <el-table-column prop="districtCode" label="申请所在辖区" min-width="130"></el-table-column>
        <el-table-column
          label="申请辖区"
          width="180"
          show-overflow-tooltip
          prop="permissionApplicationAreaList"
        >
          <!-- <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>{{ scope.row.permissionApplicationAreaList }}</p>
              <div
                slot="reference"
              >{{ scope.row.permissionApplicationAreaList.split(',').slice(0,3).join() }}</div>
            </el-popover>
          </template>-->
        </el-table-column>
        <el-table-column prop="beginDate" label="申请时效" min-width="160"></el-table-column>
        <el-table-column prop="createTime" label="申请日期" min-width="130"></el-table-column>
        <el-table-column prop="showApproveState" label="审批状态" min-width="120"></el-table-column>
        <!-- <el-table-column prop="laststate" label="终审状态" min-width="100"></el-table-column> -->
        <el-table-column label="操作" min-width="100" fixed="right">
          <template slot-scope="scope">
            <el-button
              type="text"
              v-if="scope.row.showApproveState === '已初审'"
              @click="handleView($event,scope)"
            >查看</el-button>
            <el-button
              type="text"
              v-if="scope.row.showApproveState === '待初审'"
              @click="handleView($event,scope)"
            >审批</el-button>
            <el-button
              type="text"
              v-if="scope.row.showApproveState === '已终审'"
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

      <el-dialog :visible.sync="dialogVisible"  width="60%">
        <span slot="title">{{ title }}</span>
        <div>
          <el-form :model="dialogForm" ref="dialogForm" :rules="rules" label-width="140px">
            <div>
              <el-col :span="12">
                <el-form-item label="申请所在辖区：">{{dialogForm.areas}}</el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="申请时效：">{{dialogForm.beginDate}}</el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="申请辖区：">{{dialogForm.permissionApplicationAreaList}}</el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="申请人：">{{dialogForm.applicant}}</el-form-item>
              </el-col>
            </div>
            <div style="width:100%">
                <el-table :data="areatableData" style="width:100%;">
              <!-- <el-table-column type="selection" width="60"></el-table-column> -->
              <el-table-column type="index" label="序号" width="60"></el-table-column>
              <el-table-column prop="menu" label="数据范围以及菜单项" min-width="180"></el-table-column>
              <el-table-column prop="query" label="查询及统计功能" min-width="80">
                <template slot-scope="scope">
                  <!-- <el-checkbox v-if="areatableData[scope.$index].itemId" v-model="pitch"></el-checkbox>
                  <el-checkbox v-else v-model="Nopitch"></el-checkbox>-->
                  <el-checkbox
                    disabled
                    v-if="dialogForm.permissionApplicationPermissionStateList[scope.$index] === '1'"
                    v-model="pitch"
                  ></el-checkbox>
                  <el-checkbox v-else v-model="scope.row.newState" disabled></el-checkbox>
                </template>
              </el-table-column>
            </el-table>
            </div>
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
                  <el-select v-model="jurisdictions.option" style="width:100%" disabled>
                    <el-option label="通过" value="1"></el-option>
                    <el-option label="不通过" value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <div class="divider divider-dashed"></div>
            <el-row style="margin-top: 20px;">
              <el-col :span="12">
                <el-form-item label="初审意见:" prop="centralFirstApproveState">
                  <el-select
                    style="width:100%"
                    v-model="dialogForm.centralFirstApproveState"
                    :disabled="isdisabled"
                  >
                    <el-option label="通过" value="1"></el-option>
                    <el-option label="不通过" value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12" style=" margin-left: -10px;">
                <el-form-item label="调整申请时效：">
                  <el-date-picker
                    :picker-options="pickerOptions0"
                    :disabled="isdisabled"
                    v-model="dialogForm.agingValue1"
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
                  :rules="[{required: true, message: '请填入不通过原因', trigger: 'blur'}]"
                >
                  <el-input
                    :disabled="isdisabled"
                    type="textarea"
                    v-model="dialogForm.centralFirstApproveExplain"
                    placeholder="请输入不同意原因，最多1000字符"
                    maxlength="1000"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="centerHide">
              <el-col :span="12">
                <el-form-item label="终审意见：">
                  <el-select
                    style="width:100%"
                    v-model="dialogForm.centralFinallyApproveState"
                    :disabled="isdisabled"
                  >
                    <el-option label="通过" value="1"></el-option>
                    <el-option label="不通过" value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12" style=" margin-left: -10px;">
                <el-form-item label="调整申请时效：">
                  <el-date-picker
                    :disabled="isdisabled"
                    v-model="dialogForm.agingValue2"
                    value-format="yyyy-MM-dd"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="24" v-if="dialogForm.centralFinallyApproveState==='2'">
                <el-form-item
                  label="不通过原因："
                  prop="centralFinallyApproveExplain"
                  :rules="[{required: true, message: '请填入不通过原因', trigger: 'blur'}]"
                >
                  <el-input
                    placeholder="请输入不同意原因，最多1000字符"
                    maxlength="1000"
                    :disabled="isdisabled"
                    style="widhth:100%"
                    v-model="dialogForm.centralFinallyApproveExplain"
                    type="textarea"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitForm('dialogForm')" v-if="hideButton">提 交</el-button>
          <el-button @click="closeT('dialogForm')">返 回</el-button>
        </span>
      </el-dialog>
       <div style="  text-align: center">
            <el-button type="primary" @click="goback" plain v-if="this.$route.query.id">返 回</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import { dictionary } from '@/api/sys-monitoringAnalysis/roster-warning/common.js'
import { commonPattern } from '@/utils/formValidate'
import {
  getList,
  getArea,
  clue2,
  viewDetails
} from '@/api/sys-monitoringAnalysis/dataAuthority/operator/office.js'
export default {
  data() {
    return {
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7// 如果没有后面的-8.64e7就是不可以选择今天的
        }
      },
      loading: false,
      localBankArr: [],
      MyLocalBankArr: [],
      title: '', // 弹框标题
      dialogDisabled: true, // 弹框是否只读
      dialogVisible: false,
      isdisabled: false, // 只读
      centerHide: false,
      hideButton: true, // 按钮隐藏
      pitch: true,
      options: [],
      form: {
        permissionApplicationAreaList: '',
        showApproveState: '',
        rangeDate: ''
      },
      dialogForm: {
        applyReason: '',
        option: '',
        agingValue: '',
        queryState: false,
        exportState: false,
        statistics: false,
        centralFirstApproveState: '',
        centralFirstApproveExplain: '',
        agingValue1: [],
        centralFinallyApproveState: '',
        centralFinallyApproveExplain: '',
        agingValue2: []
      },
      // dialogStartform: {
      //   reason: '',
      //   option: '',
      //   agingValue: [],
      //   agingValue1: []
      // },
      jurisdictions: {
        option: '同意'
      },
      dialogStartrules: {
        centralFirstApproveState: [
          { required: true, message: '请选择初审意见', trigger: 'change' }
        ],
        centralFirstApproveExplain: [
          { required: true, message: '请输入初审不通过原因', trigger: 'change' },
          { min: 2, max: 200, message: '长度在 2 到 200 个字符', trigger: 'blur' }
        ]
      },
      rules: {
        applyReason: [{ message: '请输入申请内容', trigger: 'blur' }],
        centralFirstApproveState: [
          { required: true, message: '请选择初审意见', trigger: 'change' }
        ],
        centralFirstApproveExplain: [
          { required: true, message: '请输入初审不通过原因', trigger: 'change' },
          { min: 2, max: 200, message: '长度在 2 到 200 个字符', trigger: 'blur' }
        ]
      },
      currentPage: 1,
      tableData: [
        // { districtCode: '北京', showApproveState: '待初审' },
        // { districtCode: '山西', showApproveState: '已初审' },
        // { districtCode: '湖北', showApproveState: '已终审' }
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
      ],
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
      ],
      selectedOptions: [],
      pageInfo: {
        pageNum: 1,
        pageSize: 10
      }
    }
  },
  // 列表查询参数
  computed: {
    searchParams() {
      const obj = Object.assign({}, this.form, this.pageInfo)
      delete obj.rangeDate
      delete obj.permissionApplicationAreaList
      delete obj.total
      obj.districtCode = this.form.permissionApplicationAreaList
      if (this.form.rangeDate) {
        obj.minDate = this.form.rangeDate[0]
        obj.maxDate = this.form.rangeDate[1]
      }
      return obj
    }
  },
  mounted() {
    this.initList(this.pageInfo)
    this.region()
    this.getDictionary('FZJG')
  },
  methods: {
    // 获取数据字典
    getDictionary(params) {
      dictionary(params).then(res => {
        if (res.code === 200) {
          switch (params) {
            case 'FZJG':
              // this.localBankArr = res.data.slice(1)
              // 去掉反洗钱中心+按codeId排序
              this.MyLocalBankArr = res.data.slice()
              this.MyLocalBankArr.forEach(el => {
                if (el.codeId.length === 14) {
                  this.localBankArr.push(el)
                  this.localBankArr.sort(function(a, b) {
                    return a.codeId.substr(1) - b.codeId.substr(1)
                  })
                } else {
                  return
                }
              })
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
    // 关 闭
    goback() {
      this.$router.go(-1)
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
            obj.applicant = el.userId
            obj.districtCode = el.districtCode
            obj.beginDate = el.beginDate + '~' + el.endDate
            obj.createTime = el.createTime.substring(0, 10)
            obj.showApproveState = el.showApproveState
            const type1 = []
            el.permissionApplicationAreaList.forEach(item => {
              type1.push(item.areaId)
            })
            obj.permissionApplicationAreaList = type1.join(',')
            arr.push(obj)
          })

          this.tableData = arr
        }
      }).catch(() => {
        this.loading = false
      })
    },
    // 地区引入
    region(params) {
      getArea(params).then(res => {
        if (res.code === 200) {
          const arry = res.data // 获取的数据
          this.options = arry
        }
      })
    },
    // 查询
    query() {
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
            obj.applicant = el.userId
            obj.districtCode = el.districtCode
            obj.beginDate = el.beginDate + '~' + el.endDate
            obj.createTime = el.createTime.substring(0, 10)
            obj.showApproveState = el.showApproveState
            const type1 = []
            el.permissionApplicationAreaList.forEach(item => {
              type1.push(item.areaId)
            })
            obj.permissionApplicationAreaList = type1.join(',')
            arr.push(obj)
          })
          this.tableData = arr
        }
      }).catch(() => {
        this.loading = false
      })
    },
    closeT(name) {
      this.dialogVisible = false
      this.resetForm(name)
    },
    // 清 空
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.form.permissionApplicationAreaList = ''
    },
    // 查看
    handleView(e, scope) {
      viewDetails(scope.row.id).then(res => {
        if (res.code === 200) {
          if (res.data.applicationType === '跨区申请') {
            this.areatableData = this.crosstableData
          }
          this.dialogVisible = true
          this.title = e.target.innerText
          const arr1 = res.data
          arr1.areas = scope.row.districtCode
          arr1.applicant = scope.row.applicant
          arr1.permissionApplicationAreaList = scope.row.permissionApplicationAreaList
          arr1.beginDate = scope.row.beginDate
          this.dialogForm.option = arr1.centralFirstApproveState === '2' ? '不通过' : '通过'
          this.dialogForm.reason = arr1.centralFirstApproveExplain
          const type1 = []
          arr1.permissionApplicationPermissionStateList.forEach(item => {
            type1.push(item.state)
          })
          arr1.permissionApplicationPermissionStateList = type1
          if (arr1.centralFirstBeginDate) {
            const FristTime = []
            FristTime.push(arr1.centralFirstBeginDate, arr1.centralFirstEndDate)
            arr1.agingValue1 = FristTime
          } else {
            arr1.agingValue1 = []
          }
          if (arr1.centralFinallyBeginDate) {
            const LastTime = []
            LastTime.push(arr1.centralFinallyBeginDate, arr1.centralFinallyEndDate)
            arr1.agingValue2 = LastTime
          } else {
            arr1.agingValue2 = []
          }
          const arr2 = arr1
          arr2.permissionApplicationPermissionStateList.splice(3, 1)
          arr2.permissionApplicationPermissionStateList.splice(6, 2)
          this.dialogForm = arr2
          if (scope.row.showApproveState === '待初审') {
            this.centerHide = false // 中心终审
            this.hideButton = true // 按钮
            this.isdisabled = false // 仅查看
            this.dialogForm.centralFirstApproveState = ''
            this.dialogForm.agingValue1 = []
            setTimeout(() => {
              this.$refs.dialogForm.clearValidate()
            }, 10)
          }
          if (scope.row.showApproveState === '已初审') {
            this.centerHide = false
            this.hideButton = false
            this.isdisabled = true // 仅查看
          }
          if (scope.row.showApproveState === '已终审') {
            this.centerHide = true
            this.hideButton = false
            this.isdisabled = true // 仅查看
          }
        }
      })
    },
    // 提交
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const obj1 = {}
          obj1.id = this.dialogForm.id
          obj1.centralFirstApproveState = this.dialogForm.centralFirstApproveState
          obj1.centralFirstApproveExplain = this.dialogForm.centralFirstApproveExplain
          obj1.centralFirstBeginDate = this.dialogForm.agingValue1[0]
          obj1.centralFirstEndDate = this.dialogForm.agingValue1[1]
          obj1.applyReason = this.dialogForm.applyReason
          clue2(obj1)
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
        this.$refs.dialogForm.resetFields()
      })
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
    }
  }
}
</script>
<style lang="scss"  >
.authorityoperator2 {
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
}
</style>
