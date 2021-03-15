<template>
  <div class="authorityapprover1"
      v-loading="loading"
   element-loading-text="拼命加载中"
  element-loading-spinner="el-icon-loading"
  element-loading-background="rgba(0, 0, 0, 0.1)">
    <el-card>
      <div slot="header">跨区审批</div>
    
        <el-form :model="form" label-width="130px" ref="form" class="form">
            <el-row>
          <el-col :span="12">
            <el-form-item label="申请所在辖区：">
              <el-select
                v-model="form.permissionApplicationAreaList"
                placeholder="请选择"
                style="width:100%"
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
              <el-select v-model="form.showApproveState" clearable style="width:100%">
                <!-- <el-option label="待初审" value="1"></el-option> -->
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
          <!-- <el-col :span="8" style="margin-left:120px">
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
        <el-table-column property="districtCode" label="申请所在辖区" min-width="130"></el-table-column>
        <!-- <el-table-column prop="type" label="申请类型" min-width="130"></el-table-column> -->
        <!-- <el-table-column prop="address" label="申请所在辖区" min-width="160"></el-table-column> -->
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
        <el-table-column property="beginDate" label="申请时效" min-width="130"></el-table-column>
        <el-table-column property="createTime" label="申请日期" min-width="130"></el-table-column>
        <!-- <el-table-column prop="opinion" label="初审意见" min-width="120"></el-table-column> -->
        <el-table-column property="showApproveState" label="审批状态" min-width="100"></el-table-column>
        <el-table-column label="操作" min-width="100" fixed="right">
          <template slot-scope="scope">
            <el-button
              type="text"
              v-if="scope.row.showApproveState === '待初审'"
              @click="handleView($event,scope)"
            >查看</el-button>
            <el-button
              type="text"
              v-if="scope.row.showApproveState === '已初审'"
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

      <el-dialog :visible.sync="dialogVisible" width="60%">
        <span slot="title">{{ title }}</span>
        <div>
          <el-form :model="dialogForm" ref="dialogForm" label-width="140px">
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
              <el-row style="margin-top: 10px;">
               <el-col :span="24">
                <el-form-item label="申请原因：" prop="applyReason"  style="margin-top:15px">
                  <el-input disabled type="textarea" v-model="dialogForm.applyReason"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :data="approvaldata" style="margin-top: 10px;">
              <el-col :span="24">
                <el-form-item label="辖区内审批意见：" label-width="140px">{{approvaldata.proposal}}</el-form-item>
              </el-col>
            </el-row>
            <div class="divider divider-dashed" v-if="initialValue"></div>
            <el-row
              style="margin-top: 10px;"
              :data="preliminarydata"
              ref="preliminarydata"
              v-if="initialValue"
            >
              <el-col :span="24">
                <el-form-item label="初审意见：">{{preliminarydata.proposal}}</el-form-item>
              </el-col>
              <el-col :span="24" v-if="preliminarydata.proposal!=='同意'">
                <el-form-item label="不通过原因：">{{preliminarydata.reason}}</el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="调整申请时效：">{{preliminarydata.time}}</el-form-item>
              </el-col>
            </el-row>

            <!-- </el-form> -->

            <div class="divider divider-dashed" v-if="initialValue"></div>

            <!-- <el-form
            :model="dialogFinalform"
            ref="dialogFinalform"
            :rules="dialogFinalrules"
            :disabled="dialogFinalDisabled"
            v-if="initialValue"
            >-->
            <el-row>
              <el-col :span="12">
                <el-form-item label="终审意见：" prop="centralFinallyApproveState" label-width="120px">
                  <el-select
                    v-model="dialogForm.centralFinallyApproveState"
                    style="width:100%"
                    :disabled="disables"
                  >
                    <el-option label="通过" value="1"></el-option>
                    <el-option label="不通过" value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12" label-width="120px">
                <el-form-item label="调整申请时效：" prop="timeValue" style=" margin-left: -10px;">
                  <el-date-picker
                   :picker-options="pickerOptions0"
                    :disabled="disables"
                    v-model="dialogForm.timeValue"
                    type="daterange"
                    value-format="yyyy-MM-dd"
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
                  label-width="120px"
                  :rules="[{required: true,message: '请填入不通过原因', trigger: 'blur'}]"
                >
                  <el-input
                    type="textarea"
                    v-model="dialogForm.centralFinallyApproveExplain"
                    :disabled="disables"
                    placeholder="请输入不同意原因，最多1000字符"
                    maxlength="1000"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="onSubmit('dialogForm')" v-if="hideButton">提交</el-button>
          <el-button @click="dialogVisible = false">返 回</el-button>
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
  getArea,
  clue3,
  viewDetails
} from '@/api/sys-monitoringAnalysis/dataAuthority/approver/office.js'
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
      disables: true,
      title: '', // 弹框标题
      Nopitch: false,
      initialValue: true,
      pitch: true,
      dialogDisabled: true,
      dialogFinalDisabled: false,
      dialogVisible: false,
      options: [],
      hideButton: true,
      form: {
        permissionApplicationAreaList: '',
        showApproveState: '',
        rangeDate: ''
      },
      approvaldata: {
        proposal: '通过'
      },
      preliminarydata: {
        proposal: '',
        reason: '',
        time: ''
      },
      dialogForm: {
        applyReason: '',
        option: '',
        agingValue: false,
        queryState: false,
        exportState: false,
        statistics: false,
        centralFinallyApproveState: '',
        centralFinallyApproveExplain: '',
        timeValue: []
      },
      dialogFinalrules: {
        applyReason: [{ message: '请输入申请内容', trigger: 'blur' }],
        centralFinallyApproveState: [
          { required: true, message: '请选择终极审批意见', trigger: 'change' }
        ],
        centralFinallyApproveExplain: [
          { required: true, message: '请填入不通过原因', trigger: 'blur' }
        ]
      },
      currentPage: 1,
      tableData: [],
      selectedOptions: [],
      pageInfo: {
        pageNum: 1,
        pageSize: 10,
        total: 10,
        centralSelectType: 1
      },
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
      ]
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
    this.getDictionary('FZJG')
    this.initList(this.pageInfo)
    this.region()
  },
  methods: {
    // 获取数据字典
    getDictionary(params) {
      dictionary(params).then(res => {
        if (res.code === 200) {
          switch (params) {
            case 'FZJG':
              // this.localBankArr = res.data.slice(1)
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
    // 关 闭
    closeT() {
      this.$router.go(-1)
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
    // 查看
    handleView(e, scope) {
      // this.dialogFinalform.centralFinallyApproveState = ''
      viewDetails(scope.row.id).then(res => {
        if (res.code === 200) {
          if (res.data.applicationType === '跨区申请') {
            this.areatableData = this.crosstableData
          }
          const arr1 = res.data
          arr1.applicant = scope.row.applicant
          arr1.areas = scope.row.districtCode
          arr1.permissionApplicationAreaList = scope.row.permissionApplicationAreaList
          arr1.beginDate = scope.row.beginDate
          const type1 = []
          arr1.permissionApplicationPermissionStateList.forEach(item => {
            type1.push(item.state)
          })
          arr1.permissionApplicationPermissionStateList = type1
          this.preliminarydata.reason = arr1.centralFirstApproveExplain
          this.preliminarydata.proposal = arr1.centralFirstApproveState === '2' ? '不同意' : '同意'
          if (arr1.centralFirstBeginDate) {
            this.preliminarydata.time = arr1.centralFirstBeginDate + '~' + arr1.centralFirstEndDate
          } else {
            this.preliminarydata.time = '初审未调整申请时效'
          }

          if (arr1.centralFinallyBeginDate) {
            const type2 = []
            type2.push(arr1.centralFinallyBeginDate, arr1.centralFinallyEndDate)
            arr1.timeValue = type2
          } else {
            arr1.timeValue = []
          }
          const arr2 = arr1
          arr2.permissionApplicationPermissionStateList.splice(3, 1)
          arr2.permissionApplicationPermissionStateList.splice(6, 2)
          this.dialogForm = arr2
          this.dialogVisible = true
          this.title = e.target.innerText
          if (scope.row.showApproveState === '待初审') {
            this.disables = true
            this.dialogFinalDisabled = false
            this.hideButton = false
            this.initialValue = false
          }
          if (scope.row.showApproveState === '已初审') {
            this.disables = false
            this.dialogFinalDisabled = false
            this.dialogForm.centralFinallyApproveState = ''
            this.dialogForm.centralFinallyApproveExplain = ''
            this.dialogForm.timeValue = []
            setTimeout(() => {
              this.$refs.dialogForm.clearValidate()
            }, 10)
            this.hideButton = true
            this.initialValue = true
          }
          if (scope.row.showApproveState === '已终审') {
            this.disables = true
            this.dialogFinalDisabled = true
            this.hideButton = false
            this.initialValue = true
          }
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
    // 清 空
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.form.permissionApplicationAreaList = ''
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
    onSubmit(formName) {
      // 提交审批
      this.$refs[formName].validate(valid => {
        if (valid) {
          const obj1 = {}
          obj1.id = this.dialogForm.id
          obj1.centralFinallyApproveState = this.dialogForm.centralFinallyApproveState
          obj1.centralFinallyApproveExplain = this.dialogForm.centralFinallyApproveExplain
          obj1.centralFinallyBeginDate = this.dialogForm.timeValue[0]
          obj1.centralFinallyEndDate = this.dialogForm.timeValue[1]
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
            })
            .then(() => {
              this.crossVisible = false
              this.initList(this.pageInfo)
            })
          this.dialogVisible = false
        } else {
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss" >
.authorityapprover1 {
  .block {
    .el-form-item__content {
      display: inline-block;
    }
  }
  .vue-treeselect__control {
    height: 29px;
    line-height: 29px;
  }
  .el-date-editor--daterange {
    min-width: 100%;
     width: 50% !important;
  }
  .form {
    .el-date-editor--daterange {
      min-width: 100%;
       width: 50% !important;
    }
  }
}
</style>