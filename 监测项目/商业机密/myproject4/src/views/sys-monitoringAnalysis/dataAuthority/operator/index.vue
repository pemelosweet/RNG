<template>
  <div class="authorityoperator"
    v-loading="loading"
   element-loading-text="拼命加载中"
  element-loading-spinner="el-icon-loading"
  element-loading-background="rgba(0, 0, 0, 0.1)">
    <el-card>
      <div slot="header">
        <span>权限申请</span>
        <div style="float: right;">
          <el-button type="text" @click="areaApply1">辖区内申请</el-button>
          <!-- <span class="itemline">|</span>
          <el-button type="text" @click="crossApply1">跨区申请</el-button> -->
        </div>
      </div>

      <el-form :model="form" label-width="120px" ref="form" class="form">
        <el-row>
          <el-col :span="12">
            <el-form-item label="申请类型：" prop="applicationType">
              <el-select style="width:100%" v-model="form.applicationType" clearable>
                <el-option label="辖区内申请" value="0"></el-option>
                <!-- <el-option label="跨区申请" value="1"></el-option> -->
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="审批状态： " prop="showApproveState">
              <el-select style="width:100%" v-model="form.showApproveState" clearable>
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
                style="width:100%"
                v-model="form.rangeDate"
                type="daterange"
                value-format="yyyy-MM-dd"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="8" style="margin-left:120px">
            <el-button type="primary" @click="onSubmit">查询</el-button>
            <el-button type="primary"  plain @click="resetForm('form')">清 空</el-button>
          </el-col> -->
        </el-row>
      </el-form>
			<div style="text-align: right">
        <el-button type="primary"  @click="onSubmit">查 询</el-button>
        <el-button  @click="resetForm('form')" type="primary" plain >清 空</el-button>
      </div>

      <el-table :data="tableData" style="margin-top:10px">
        <!-- <el-table-column type="selection" width="60"></el-table-column> -->
        <el-table-column type="index" label="序号" width="60"></el-table-column>
        <el-table-column prop="applicationType" label="申请类型" min-width="130"></el-table-column>
        <!-- <el-table-column prop="applicant" label="申请人" min-width="130"></el-table-column> -->
        <el-table-column prop="createTime" label="申请日期" min-width="130"></el-table-column>
        <el-table-column prop="showApproveState" label="审批状态" min-width="130"></el-table-column>
        <!-- <el-table-column prop="areaState" label="辖区审批状态" min-width="120"></el-table-column>
        <el-table-column prop="headofficeState" label="总行审批状态" min-width="100"></el-table-column>-->
        <el-table-column label="操作" min-width="100">
          <template slot-scope="scope">
            <el-button
              type="text"
              v-if="scope.row.applicationType === '辖区内申请'"
              @click="handleView1(scope)"
            >查看</el-button>
            <el-button
              type="text"
              v-if="scope.row.applicationType !== '辖区内申请'"
              @click="handleView(scope)"
            >查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageInfo.pageNum"
        :page-size="pageInfo.pagesize"
        :page-sizes="[10, 20, 30, 40]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageInfo.total"
        background
      ></el-pagination>
      <el-dialog title="辖区内申请" :visible.sync="areaVisible" width="60%">
        <el-form :model="areaForm" :disabled="areaDisabled" ref="areaForm">
          <div style="width:100%">
            <el-table :data="areatableData2" style="width:100%;">
              <!-- <el-table-column type="selection" width="60"></el-table-column> -->
              <el-table-column type="index" label="序号" width="60"></el-table-column>
              <el-table-column prop="menu" label="数据范围以及菜单项" min-width="180"></el-table-column>
              <el-table-column prop="queryState" label="查询及统计功能" min-width="80">
                
                <template slot-scope="scope">
                  <!-- <el-checkbox
                    v-model="areatableData[scope.$index].queryState"
                    @change="handleCheckAllChange"
                  ></el-checkbox> -->
                  <div v-if="areaDisabled">
                    <el-checkbox
                      v-if="areaForm.permissionApplicationPermissionStateList[scope.$index] === '1'"
                      v-model="mandatory"
                    ></el-checkbox>
                    <el-checkbox v-else v-model="scope.row.newState"></el-checkbox>
                  </div>

                  <!-- <el-checkbox v-model="scope.row.isChecked"></el-checkbox> -->
                </template>
              </el-table-column>
            </el-table>
            <el-col :span="24">
                <el-form-item label="申请原因：" >
                  <el-input type="textarea" v-model="areaForm.applyReason"></el-input>
                </el-form-item>
              </el-col>
            <el-row style="margin-top: 10px;" v-if="fristHide">
              <el-col :span="12">
                <el-form-item label="辖区内审批意见：" prop="option">
                  <el-select v-model="areaForm.districtApproveState" style="width:100%">
                    <el-option label="通过" value="1"></el-option>
                    <el-option label="不通过" value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="24" v-if="areaForm.districtApproveState==='2'">
                <el-form-item label="不通过原因：" prop="reason">
                  <el-input
                    v-model="areaForm.districtApproveExplain"
                    type="textarea"
                    style="width:100%"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <div class="divider divider-dashed" v-if="middleHide"></div>
            <el-row style="margin-top: 10px;" v-if="middleHide">
              <el-col :span="12">
                <el-form-item label="初审意见：" prop="option">
                  <el-select v-model="areaForm.centralFirstApproveState">
                    <el-option label="通过" value="1"></el-option>
                    <el-option label="不通过" value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="调整申请时效：">
                  <el-date-picker
                    v-model="areaForm.agingValue"
                    value-format="yyyy-MM-dd"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="24" v-if="areaForm.centralFirstApproveState==='2'">
                <el-form-item label="不通过原因：" prop="reason">
                  <el-input type="textarea" v-model="areaForm.centralFirstApproveExplain"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <div class="divider divider-dashed" v-if="lasttHide"></div>
            <el-row style="margin-top: 10px;" v-if="lasttHide">
              <el-col :span="12">
                <el-form-item label="终审意见：" prop="option">
                  <el-select v-model="areaForm.centralFinallyApproveState">
                    <el-option label="通过" value="1"></el-option>
                    <el-option label="不通过" value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="调整申请时效：">
                  <el-date-picker
                    v-model="areaForm.agingValue2"
                    value-format="yyyy-MM-dd"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="24" v-if="areaForm.centralFinallyApproveState==='2'">
                <el-form-item label="不通过原因：" prop="reason">
                  <el-input type="textarea" v-model="areaForm.centralFinallyApproveExplain"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="areaSubmit" v-if="buttonHide">提 交</el-button>
          <el-button @click="areaVisible = false" v-if="!buttonHide">关 闭</el-button>
          <el-button @click="areaVisible = false" v-if="buttonHide">返 回</el-button>
        </span>
      </el-dialog>
      <!-- 辖区新增弹框 -->
      <el-dialog title="辖区内申请" :visible.sync="areaVisible1" width="60%">
        <div style="width:100%">
          <el-table :data="areatableData"   style="width:100%;">
            <el-table-column type="index" label="序号" width="60"></el-table-column>
            <el-table-column prop="menu" label="数据范围以及菜单项" min-width="180"></el-table-column>
            <el-table-column prop="queryState" label="查询及统计功能" min-width="80">
              <template slot-scope="scope">
                <el-checkbox
                  v-model="scope.row.state"
                  :disabled="scope.row.disableds"
                  v-if="scope.row.disableds"
                ></el-checkbox>
                <el-checkbox
                  v-model="scope.row.state"
                  :disabled="scope.row.disableds"
                  v-if="!scope.row.disableds"
                ></el-checkbox>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <el-form :model="areaData" ref="areaAddForm" :rules="areaAddFormRule">
         <el-col :span="24">
                <el-form-item label="申请原因：" prop="applyReason">
                  <el-input maxlength="1000" type="textarea" v-model="areaData.applyReason"></el-input>
                </el-form-item>
              </el-col>
        </el-form>
       
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="areaNewSubmit" :loading="grey">提 交</el-button>
          <el-button @click="areaVisible1=false">返回</el-button>
        </span>
      </el-dialog>
      <!-- 跨区新增弹框 -->
      <el-dialog title="跨区申请" :visible.sync="crossAddVisible" width="60%">
        <div>
          <el-form
            :model="crossAddForm"
            ref="crossAddForm"
            :rules="crossRules1"
            label-width="140px"
          >
            <div>
              <el-col :span="12">
                <el-form-item label="申请所在辖区：" prop="permissionApplicationAreaList">
                  <el-select
                    style="width:100%"
                    v-model="crossAddForm.permissionApplicationAreaList"
                    placeholder="请选择"
                    multiple
                    filterable
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
                <el-form-item label="申请时效：" prop="showApplicationDates">
                  <el-date-picker
                    v-model="crossAddForm.showApplicationDates"
                    type="daterange"
                    :picker-options="pickerOptions0"
                    value-format="yyyy-MM-dd"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </div>
            <!-- {{crosstableData}} -->
            <div style="width:100%;">
                <el-table :data="crosstableData" ref="crosstableData" style="width:100%;">
              <!-- <el-table-column type="selection" width="60"></el-table-column> -->
              <el-table-column type="index" label="序号" width="60"></el-table-column>
              <el-table-column prop="menu" label="数据范围以及菜单项" min-width="180"></el-table-column>
              <el-table-column prop="queryState" label="查询及统计功能" min-width="80">
                <template slot-scope="scope">
                  <el-checkbox v-model="scope.row.state" :disabled="scope.row.kqdisabled"></el-checkbox>
                </template>
              </el-table-column>
            </el-table>
            </div>
          
          </el-form>
        </div>
        <el-form :model="crossData" ref="crossData" :rules="crossDataRules">
         <el-col :span="24">
                <el-form-item label="申请原因：" prop="applyReason">
                  <el-input  maxlength="1000" type="textarea" v-model="crossData.applyReason"></el-input>
                </el-form-item>
              </el-col>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="onCrossSubmit1('crossAddForm')" :loading="greys">提 交</el-button>
          <el-button @click="crossAddVisible = false">返 回</el-button>
        </span>
      </el-dialog>
      <!-- 跨区申请弹框 -->
      <el-dialog title="跨区申请" :visible.sync="crossVisible" width="60%">
        <div>
          <el-form
            :model="crossForm"
            ref="crossForm"
            :rules="crossRules"
            label-width="130px"
            :disabled="crossDisabled"
          >
            <div>
              <el-col :span="12">
                <el-form-item label="申请所在辖区：" >
                  <el-select
                    style="width:100%"
                    v-model="crossForm.permissionApplicationAreaList"
                    placeholder="请选择"
                    multiple
                    filterable
                  >
                    <el-option
                      v-for="item in crossForm.options"
                      :key="item.code"
                      :label="item.codeName"
                      :value="item.code"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="申请时效：" prop="showApplicationDates">
                  <el-date-picker
                    v-model="crossForm.showApplicationDates"
                    type="daterange"
                    value-format="yyyy-MM-dd"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                  ></el-date-picker>
                  <!-- <el-date-picker
                    v-model="crossForm.showApplicationDates"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                  </el-date-picker>-->
                </el-form-item>
              </el-col>
            </div>
            <!-- {{crosstableData}} -->
            <div style="width:100%">
               <el-table :data="crosstableData" ref="crosstableData" style="width:100%;">
              <!-- <el-table-column type="selection" width="60"></el-table-column> -->
              <el-table-column type="index" label="序号" width="60"></el-table-column>
              <el-table-column prop="menu" label="数据范围以及菜单项" min-width="180"></el-table-column>
              <el-table-column prop="queryState" label="查询及统计功能" min-width="80">
                <template slot-scope="scope">
                  <div v-if="crossDisabled">
                    <el-checkbox
                      v-if="crossForm.permissionApplicationPermissionStateList[scope.$index] === '1'"
                      v-model="mandatory"
                    ></el-checkbox>
                    <el-checkbox v-else v-model="scope.row.newState"></el-checkbox>
                  </div>

                  <el-checkbox v-if="!crossDisabled" v-model="scope.row.state"></el-checkbox>
                </template>
              </el-table-column>
            </el-table>
            </div>
           <el-col :span="24">
                <el-form-item label="申请原因：" prop="applyReason" label-width="100px" style="margin-top:15px">
                  <el-input type="textarea" v-model="crossForm.applyReason"></el-input>
                </el-form-item>
              </el-col>
            <el-row style="margin-top: 10px;" v-if="fristHide">
              <el-col :span="12">
                <el-form-item label="辖区内审批意见：" prop="option">
                  <el-select v-model="crossForm.districtApproveState" style="width:100%">
                    <el-option label="通过" value="1"></el-option>
                    <el-option label="不通过" value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="24" v-if="crossForm.districtApproveState==='2'">
                <el-form-item label="不通过原因：" prop="reason">
                  <el-input type="textarea" v-model="crossForm.districtApproveExplain"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <div class="divider divider-dashed" v-if="middleHide"></div>
            <el-row style="margin-top: 10px;" v-if="middleHide">
              <el-col :span="12">
                <el-form-item label="初审意见：" prop="option">
                  <el-select v-model="crossForm.centralFirstApproveState" style="width:100%">
                    <el-option label="通过" value="1"></el-option>
                    <el-option label="不通过" value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="调整申请时效：">
                  <el-date-picker
                    v-model="areaForm.agingValue"
                    value-format="yyyy-MM-dd"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="24" v-if="crossForm.centralFirstApproveState==='2'">
                <el-form-item label="不通过原因：" prop="reason">
                  <el-input type="textarea" v-model="crossForm.centralFirstApproveExplain"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <div class="divider divider-dashed" v-if="lasttHide"></div>
            <el-row style="margin-top: 10px;" v-if="lasttHide">
              <el-col :span="12">
                <el-form-item label="终审意见：" prop="option">
                  <el-select v-model="crossForm.centralFinallyApproveState" style="width:100%">
                    <el-option label="通过" value="1"></el-option>
                    <el-option label="不通过" value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="调整申请时效：">
                  <el-date-picker
                    v-model="areaForm.agingValue2"
                    value-format="yyyy-MM-dd"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="24" v-if="crossForm.centralFinallyApproveState==='2'">
                <el-form-item label="不通过原因：" prop="reason">
                  <el-input type="textarea" v-model="crossForm.centralFinallyApproveExplain"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="onCrossSubmit('crossForm')" v-if="buttonHide">提 交</el-button>
          <el-button @click="crossVisible = false" v-if="!buttonHide">关 闭</el-button>
          <el-button @click="crossVisible = false" v-if="buttonHide">返 回</el-button>
        </span>
      </el-dialog>
      <div style="  text-align: center">
            <el-button type="primary" @click="closeT" plain v-if="this.$route.query.id">返 回</el-button>
      </div>
    </el-card>
  </div>
</template>
<script>
// import TreeSelect from '@/components/TreeSelect'
import { commonPattern } from '@/utils/formValidate'
import { dictionary } from '@/api/sys-monitoringAnalysis/roster-warning/common.js'
import {
  getList,
  getArea,
  clue,
  createState,
  viewDetails
} from '@/api/sys-monitoringAnalysis/dataAuthority/operator/index.js'
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

      loading: false,
      isRmb: true,
      newStates: false,
      fristHide: false,
      middleHide: false,
      lasttHide: false,
      mandatory: true,
      areaDisabled: false, // 辖区弹框是否只读
      crossDisabled: false, // 跨区弹框是否只读
      areaVisible: false, // 辖区弹框关闭
      buttonHide: true,
      crossAddVisible: false,
      areaVisible1: false,
      grey: false,
      greys: false,
      MyLocalBankArr: [],
      localBankArr: [],
      form: {
        applicationType: '',
        showApproveState: '',
        rangeDate: ''
      },
      areaData: {
        applyReason: ''
      },
      crossData: {
        applyReason: ''
      },
      areaForm: {
        queryState: false,
        districtApproveExplain: ''
      },
      crossVisible: false,
      crossAddForm: {
        permissionApplicationAreaList: [],
        showApplicationDates: []
      },
      crossForm: {
        permissionApplicationAreaList: [],
        options: [],
        region: '',
        showApplicationDates: [],
        queryState: false
      },
      areaAddFormRule: {

      },
      crossDataRules: {
        applyReason: [{ required: true, message: '请填写申请原因', trigger: 'blur' }]
      },
      crossRules1: {
        permissionApplicationAreaList: [
          { required: true, validator: this.isAreas, trigger: 'change' }
        ],
        showApplicationDates: [{ required: true, message: '请选择日期', trigger: 'change' }]
      },
      crossRules: {
        permissionApplicationAreaList: [
          { required: true, message: '请选择地区', trigger: 'change' }
        ],
        showApplicationDates: [{ required: true, message: '请选择日期', trigger: 'change' }]
      },
      pageInfo: {
        pageNum: 1,
        pageSize: 10,
        total: 10
      },
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
      areatableData2: [
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
      ],
      step: 0,
      step1: 0,
      type: '',
      checkBoxData: [],
      singleRuleData: [],
      currentRow: null,
      currentPage: 1
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
    isAreas(rule, value, callback) {
      const arr = []
      this.crosstableData.forEach(item => {
        if (item.state === true) {
          arr.push(item.itemId)
        }
      })
      if (arr.length > 3) {
        arr.forEach(el => {
          if (value.length === 0) {
            callback(new Error('请选择地区'))
          } else {
            callback()
          }
        })
      }
      if (arr.length === 3) {
        arr.forEach(el => {
          if (arr.indexOf('4') !== -1 && arr.indexOf('5') !== -1 && arr.indexOf('12') !== -1) {
            callback()
          } else {
            if (value.length === 0) {
              callback(new Error('请选择地区'))
            } else {
              callback()
            }
          }
        })
      }
      if (arr.length === 2) {
        if (arr.indexOf('4') !== -1 && arr.indexOf('5') !== -1) {
          callback()
        } else if (arr.indexOf('4') !== -1 && arr.indexOf('12') !== -1) {
          callback()
        } else if (arr.indexOf('5') !== -1 && arr.indexOf('12') !== -1) {
          callback()
        } else {
          if (value.length === 0) {
            callback(new Error('请选择地区'))
          } else {
            callback()
          }
        }
      }
      if (arr.length === 1) {
        arr.forEach(el => {
          if (el === '4' || el === '12' || el === '5') {
            callback()
          } else {
            if (value.length === 0) {
              callback(new Error('请选择地区'))
            } else {
              callback()
            }
          }
        })
      }
      if (arr.length === 0) {
        if (value.length === 0) {
          callback(new Error('请选择地区'))
        } else {
          callback()
        }
      }
    },
    // input校验
    isValidInput(rule, value, callback) {
      if (!commonPattern.spaceBar.test(value)) {
        callback(new Error('内容不能含有空格'))
      } else if (commonPattern.specialChar.test(value) || commonPattern.specialEng.test(value)) {
        callback(new Error('内容不能填写特殊字符'))
      } else {
        callback()
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
          this.crossForm.options = arry
        }
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
            arr.push(obj)
          })
          this.tableData = arr
        }
      }).catch(() => {
        this.loading = false
      })
    },
    // 辖区新增提交
    areaNewSubmit() {
      const obj1 = {}
      const arry = []
      this.areatableData.forEach(el => {
        const obj = {}
        if (el.disableds) {
          return
        } else {
          if (el.state) {
            obj.itemId = el.itemId
            obj.state = el.state === true ? '1' : '0'
          } else {
            return
          }
        }
        arry.push(obj)
      })
      console.log(arry)
      obj1.applyReason = this.areaData.applyReason
      obj1.applicationType = 0
      obj1.permissionApplicationPermissionStateList = arry
      if (obj1.permissionApplicationPermissionStateList.length) {
        this.grey = true
        clue(obj1)
          .then(res => {
            if (res.code === 200) {
              this.$message({
                message: '申请成功',
                type: 'success',
                duration: 6000
              })
              this.areaVisible1 = false
              this.grey = false
              this.initList(this.pageInfo)
            } else {
              this.grey = false
            }
          })
          .catch(() => {
            this.grey = false
          })
      } else {
        this.$message({
          message: '请至少选择一项菜单项',
          type: 'warning',
          duration: 6000
        })
      }
    },
    // 辖区内提交
    areaSubmit() {
      this.step = 0
      const arry = this.areatableData
      const permissionApplicationPermissionStateList = []
      const obj1 = {}
      arry.forEach(item => {
        const obj = {}
        obj.itemId = item.itemId
        obj.state = item.state === false ? '0' : '1'
        permissionApplicationPermissionStateList.push(obj)
      })
      obj1.permissionApplicationPermissionStateList = permissionApplicationPermissionStateList
      obj1.applicationType = 0
      obj1.permissionApplicationPermissionStateList.forEach(item => {
        if (item.state === '1') {
          this.step++
        }
      })
      if (this.step !== 0) {
        clue(obj1)
          .then(res => {
            if (res.code === 200) {
              this.$message({
                message: '申请成功',
                type: 'success',
                duration: 6000
              })
            }
          })
          .then(() => {
            this.areaVisible = false
            this.initList(this.pageInfo)
          })
      } else {
        this.$message({
          message: '请至少选择一项菜单项',
          type: 'warning',
          duration: 6000
        })
      }
    },
    onCrossSubmit1(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$refs.crossData.validate(valid => {
            if (valid) {
              // crossAddForm
              this.step1 = 0
              const arry = this.crosstableData
              const permissionApplicationPermissionStateList = []
              const obj1 = {}
              arry.forEach(item => {
                const obj = {}
                obj.itemId = item.itemId
                obj.state = item.state === false ? '0' : '1'
                permissionApplicationPermissionStateList.push(obj)
              })
              const permissionApplicationAreaList = []
              this.crossAddForm.permissionApplicationAreaList.forEach(item => {
                const obj = {}
                obj.areaId = item
                permissionApplicationAreaList.push(obj)
              })
              obj1.applyReason = this.crossData.applyReason
              obj1.permissionApplicationPermissionStateList = permissionApplicationPermissionStateList
              obj1.permissionApplicationAreaList = permissionApplicationAreaList
              obj1.beginDate = this.crossAddForm.showApplicationDates[0]
              obj1.endDate = this.crossAddForm.showApplicationDates[1]
              obj1.applicationType = 1
              obj1.permissionApplicationPermissionStateList.forEach(item => {
                if (item.state === '1') {
                  this.step1++
                }
              })
              if (this.step1 !== 0) {
                this.greys = true
                clue(obj1)
                  .then(res => {
                    if (res.code === 200) {
                      this.crossAddVisible = false
                      this.initList(this.pageInfo)
                      this.$message({
                        message: '申请成功',
                        type: 'success',
                        duration: 6000
                      })
                      setTimeout(() => {
                        this.greys = false
                      }, 0)
                    } else {
                      this.greys = false
                    }
                  })
                  .catch(() => {
                    this.greys = false
                  })
              } else {
                this.$message({
                  message: '请至少选择一项菜单项',
                  type: 'warning',
                  duration: 6000
                })
              }
            }
          })
        }
      })
    },
    // 跨区申请提交
    onCrossSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.step1 = 0
          const arry = this.crosstableData
          const permissionApplicationPermissionStateList = []
          const obj1 = {}
          arry.forEach(item => {
            const obj = {}
            obj.itemId = item.itemId
            obj.state = item.state === false ? '0' : '1'
            permissionApplicationPermissionStateList.push(obj)
          })
          const permissionApplicationAreaList = []
          this.crossForm.permissionApplicationAreaList.forEach(item => {
            const obj = {}
            obj.areaId = item
            permissionApplicationAreaList.push(obj)
          })
          obj1.permissionApplicationPermissionStateList = permissionApplicationPermissionStateList
          obj1.permissionApplicationAreaList = permissionApplicationAreaList
          obj1.beginDate = this.crossForm.showApplicationDates[0]
          obj1.endDate = this.crossForm.showApplicationDates[1]
          obj1.applicationType = 1
          // this.$refs.crossForm.resetFields()
          obj1.permissionApplicationPermissionStateList.forEach(item => {
            if (item.state === '1') {
              this.step1++
            }
          })
          if (this.step1 !== 0) {
            this.$refs.crossForm.resetFields()
            clue(obj1)
              .then(res => {
                if (res.code === 200) {
                  this.$message({
                    message: '申请成功',
                    type: 'success',
                    duration: 6000
                  })
                }
              })
              .then(() => {
                this.crossVisible = false
                this.initList(this.pageInfo)
              })
          } else {
            this.$message({
              message: '请至少选择一项菜单项',
              type: 'warning',
              duration: 6000
            })
          }
        }
      })
    },
    areaApply1() {
      this.areaVisible1 = true
      this.areaData.applyReason = ''
      setTimeout(() => {
        this.$refs.areaAddForm.resetFields()
      }, 0)
      createState().then(res => {
        if (res.code === 200) {
          const arr1 = res.data
          arr1.forEach(el => {
            switch (el.state) {
              case '1':
                el.state = true
                break
              case '0':
                el.state = false
                break
              default:
                break
            }
            el.disableds = el.state
            this.areatableData.forEach(item => {
              if (el.itemId === item.itemId) {
                el.menu = item.menu
              }
            })
          })
          arr1.splice(3, 1)
          arr1.splice(10, 1)
          this.areatableData = arr1
          console.log(arr1, '0000')
        }
      })
    },
    areaApply() {
      this.middleHide = false
      this.lasttHide = false
      this.fristHide = false
      this.areaDisabled = false // 辖区弹框是否只读
      this.areaVisible = true // 辖区弹框关闭
      this.buttonHide = true
      this.crossForm.permissionApplicationAreaList = []
      this.crossForm.showApplicationDates = []
      setTimeout(() => {
        this.$refs.areaForm.resetFields()
      }, 0)
      this.areatableData.forEach(item => {
        item.state = false
      })
    },
    crossApply1() {
      this.crossAddVisible = true
      this.region()
      this.crossData.applyReason = ''
      setTimeout(() => {
        this.$refs.crossAddForm.resetFields()
      }, 0)
      this.crosstableData.forEach(item => {
        item.state = false
      })
    },
    crossApply() {
      this.middleHide = false
      this.lasttHide = false
      this.fristHide = false
      this.crossDisabled = false
      this.crossVisible = true
      this.buttonHide = true
      this.region()
      setTimeout(() => {
        this.$refs.crossForm.resetFields()
      }, 0)
      this.crosstableData.forEach(item => {
        item.state = false
      })
    },
    resetForm(formName) {
      setTimeout(() => {
        this.$refs[formName].resetFields()
      }, 10)
    },
    // 关 闭
    closeT() {
      this.$router.go(-1)
    },
    // 查看
    handleView(scope) {
      viewDetails(scope.row.id, scope.row.applicationType === '辖区内申请' ? 0 : 1).then(res => {
        if (res.code === 200) {
          this.buttonHide = false
          const arr1 = res.data
          const type1 = []
          arr1.permissionApplicationPermissionStateList.forEach(item => {
            type1.push(item.state)
          })
          arr1.permissionApplicationPermissionStateList = type1
          const type2 = []
          type2.push(arr1.beginDate, arr1.endDate)
          arr1.showApplicationDates = type2
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

          this.areaForm = arr1
          const arr2 = arr1
          arr2.permissionApplicationPermissionStateList.splice(3, 1)
          arr2.permissionApplicationPermissionStateList.splice(6, 2)
          this.crossForm = arr2
          if (scope.row.showApproveState === '辖区内待审批') {
            this.fristHide = false
            this.middleHide = false
            this.lasttHide = false
          }
          if (scope.row.showApproveState === '辖区内已审批') {
            this.fristHide = true
            this.middleHide = false
            this.lasttHide = false
          }
          if (scope.row.showApproveState === '已初审') {
            this.fristHide = true
            this.middleHide = true
            this.lasttHide = false
          }
          if (scope.row.showApproveState === '已终审') {
            this.fristHide = true
            this.middleHide = true
            this.lasttHide = true
          }
          if (scope.row.applicationType === '辖区内申请') {
            this.areaDisabled = true // 辖区弹框是否只读
            this.areaVisible = true // 辖区弹框是否关闭
          }
          if (scope.row.applicationType === '跨区申请') {
            const arry = res.data
            const type = []
            arry.permissionApplicationAreaList.forEach(item => {
              type.push(item.areaName)
            })
            arry.permissionApplicationAreaList = type
            this.crossDisabled = true // 跨区弹框是否只读
            this.crossVisible = true // 跨区弹框是否关闭
          }
        }
      })
    },
    handleView1(scope) {
      viewDetails(scope.row.id, scope.row.applicationType === '辖区内申请' ? 0 : 1).then(res => {
        if (res.code === 200) {
          this.buttonHide = false
          var arr1 = {}
          arr1 = res.data
          const type1 = []
          arr1.permissionApplicationPermissionStateList.forEach(item => {
            type1.push(item.state)
          })
          arr1.permissionApplicationPermissionStateList = type1
          arr1.permissionApplicationPermissionStateList.splice(3, 1)
          this.areaForm = arr1
          if (scope.row.showApproveState === '辖区内待审批') {
            this.fristHide = false
            this.middleHide = false
            this.lasttHide = false
          }
          if (scope.row.showApproveState === '辖区内已审批') {
            this.fristHide = true
            this.middleHide = false
            this.lasttHide = false
          }
          if (scope.row.showApproveState === '已初审') {
            this.fristHide = true
            this.middleHide = true
            this.lasttHide = false
          }
          if (scope.row.showApproveState === '已终审') {
            this.fristHide = true
            this.middleHide = true
            this.lasttHide = true
          }
          if (scope.row.applicationType === '辖区内申请') {
            this.areaDisabled = true // 辖区弹框是否只读
            this.areaVisible = true // 辖区弹框是否关闭
          }
        }
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

<style lang="scss"  scoped>
.authorityoperator {
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
