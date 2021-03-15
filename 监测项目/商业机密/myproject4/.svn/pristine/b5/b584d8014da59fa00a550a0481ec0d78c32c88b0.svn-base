<template>
  <div class="ruleWarning_query">
    <el-card>
      <div slot="header">
        <span>可疑交易报告预警任务查询</span>
      </div>
      <el-form label-width="130px" :model="form" ref="form">
        <template v-if="toggleSearch">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item
                label="报文名："
                prop="messagename"
                :rules="[{validator: ValidQueryInput, trigger: 'blur'}]"
              >
                <el-input
                  placeholder="请输入报文名,最长50字符"

                  maxlength="50"
                  v-model="form.messagename"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label=" 紧急程度 ：" prop="urgencydegree">
                <el-select placeholder="请选择" v-model="form.urgencyDegree" clearable>
                  <!-- <el-option label="一般" value="一般"></el-option> -->
                  <el-option label="特别紧急" value="01"></el-option>
                  <el-option label="非特别紧急" value="02"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-button type="primary" @click="onSubmit">查 询</el-button>
              <el-button @click="cleanUp" type="primary" plain>清 空</el-button>
              <el-button type="text" icon="el-icon-arrow-down" @click="toggleSearch=false">展开</el-button>
            </el-col>
          </el-row>
        </template>
        <template v-else>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item
                label="报文名："
                prop="messagename"
                :rules="[{validator: ValidQueryInput, trigger: 'blur'}]"
              >
                <el-input
                  placeholder="请输入报文名,最长50字符"
                  maxlength="50"
                  v-model="form.messagename"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label=" 紧急程度 ：" prop="urgencydegree">
                <el-select placeholder="请选择" v-model="form.urgencydegree" clearable>
                  <!-- <el-option label="一般" value="一般"></el-option> -->
                  <el-option label="特别紧急" value="01"></el-option>
                  <el-option label="非特别紧急" value="02"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label=" 报送类型 ："
                prop="submissiontype"
                :rules="[{validator: ValidQueryInput, trigger: 'blur'}]"
              >
                <el-input
                  placeholder="请输入报送类型,最长50字符"
                  maxlength="50"
                  v-model="form.submissiontype"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label=" 是否管理员分配：" prop="adminAssignment">
                <el-select placeholder="请选择" v-model="form.adminAssignment" clearable>
                  <el-option label="是" value="1"></el-option>
                  <el-option label="否" value="0"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="报告机构名称："
                prop="institutionname"
                :rules="[{validator:ValidQueryInput, trigger: 'blur'}]"
              >
                <el-input
                  placeholder="请输入报告机构名称,最长50字符"
                  maxlength="50"
                  v-model="form.institutionname"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label=" 预警编号 ："
                prop="warningnumber"
                :rules="[{validator: ValidQueryInput, trigger: 'blur'}]"
              >
                <el-input placeholder="请输入预警编号,最长50字符"  maxlength="50" v-model="form.warningnumber"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label=" 预警日期 ：" prop="earlyWarningTime">
                <el-date-picker
                  value-format="yyyy-MM-dd"
                  v-model="form.earlyWarningTime"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label=" 报送日期 ：" prop="subMissionDate">
                <el-date-picker
                  value-format="yyyyMMdd"
                  v-model="form.subMissionDate"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label=" 更新时间 ：" prop="updateTime">
                <el-date-picker
                  value-format="yyyy-MM-dd"
                  v-model="form.updateTime"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item
                label=" 操作员 ："
                prop="operator"
                :rules="[{validator: ValidQueryInput, trigger: 'blur'}]"
              >
                <el-input
                  placeholder="请输入操作员,最长50字符"
                  maxlength="50"
                  v-model="form.operator"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label=" 状态 ：" prop="state">
                <el-select placeholder="请选择" v-model="form.state" clearable>
                  <el-option label="未分配" value="未分配"></el-option>
                  <el-option label="待处理" value="待处理"></el-option>
                  <el-option label="处理中" value="处理中"></el-option>
                  <el-option label="已处理" value="已处理"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label=" 报送方向 ：" prop="submissiondirection">
                <el-select placeholder="请选择" v-model="form.submissiondirection" clearable>
                  <el-option
                    v-for="(item,index) in sourceDireArr"
                    :key="index"
                    :label="item.codeName"
                    :value="item.codeId"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" class="toggle">
            <el-col :span="8">
              <div>
                <el-form-item label="涉罪类型：" prop="crimestype">
                  <el-select
                  clearable
                    filterable
                    v-model="form.crimestype"
                    multiple
                    collapse-tags
                    placeholder="请选择"
                    @change="replenish"
                  >
                    <el-option
                      v-for="(item,index) in dialogJudgmentData"
                      :key="index"
                      :label="item.codeName"
                      :value="item.codeId"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item
                  v-if="isReplenishOne"
                  prop="supplementOne"
                  :rules="[{required:true, validator: szisValidInput1, trigger: 'blur'}]"
                >
                  <el-input
                    maxlength="100"
                    v-model="supplementOne"
                    placeholder="请填写关于司法机构或行政调查已介入的可疑交易行为的补充"
                  ></el-input>
                </el-form-item>
                <el-form-item
                  v-if="isReplenishTwo"
                  prop="supplementTwo"
                  :rules="[{required:true, validator: szisValidInput2, trigger: 'blur'}]"
                >
                  <el-input
                    maxlength="100"
                    v-model="supplementTwo"
                    placeholder="请填写关于涉嫌其他犯罪的可疑交易行为的补充"
                  ></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <div style="text-align:right; margin-bottom:10px">
            <el-button type="primary" @click="onSubmit">查 询</el-button>
            <el-button @click="cleanUp" type="primary" plain>清 空</el-button>
            <el-button type="text" icon="el-icon-arrow-up" @click="toggleSearch=true;onsubmitBloorer(true)">收起</el-button>
          </div>
        </template>
      </el-form>
      <el-table
        :data="tableData"
        tooltip-effect="dark"
        @selection-change="handleChange"
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.1)">
        <el-table-column label="序号" type="index" fixed="left"></el-table-column>
        <el-table-column prop="messagename" label="报文名" min-width="300" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button type="text" @click="Initiate(scope)">{{scope.row.messagename}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="warningnumber" label="预警编号" min-width="220" show-overflow-tooltip></el-table-column>
        <el-table-column prop="submissiontype" label="报送类型" min-width="150" show-overflow-tooltip></el-table-column>
        <el-table-column prop="institutionname" label="报告机构名称" min-width="120" show-overflow-tooltip></el-table-column>
        <el-table-column prop="submissiondate" label="报送日期" min-width="120" show-overflow-tooltip>
          <template slot-scope="scope">
            {{scope.row.submissiondate | dataTransform}}
          </template>
        </el-table-column>
        <el-table-column prop="urgencydegree" label="紧急程度" min-width="120" show-overflow-tooltip>
          <template slot-scope="scope">
            {{scope.row.urgencydegree}}
          </template>
        </el-table-column>
        <el-table-column prop="crimestype" label="涉罪类型" min-width="220" show-overflow-tooltip></el-table-column>
        <el-table-column prop="submissiondirection" label="报送方向" min-width="180" show-overflow-tooltip>
          <template slot-scope="scope">
            {{scope.row.submissiondirection}}
          </template>
        </el-table-column>
        <el-table-column prop="earlywarningtime" label="预警日期" min-width="220" show-overflow-tooltip></el-table-column>
        <el-table-column prop="adminAssignment" label="是否管理员分配" min-width="120" show-overflow-tooltip></el-table-column>
        <el-table-column prop="state" label="状态" min-width="90" show-overflow-tooltip></el-table-column>
        <el-table-column prop="operator" label="操作员" min-width="120" show-overflow-tooltip></el-table-column>
        <el-table-column prop="updateTime" label="更新时间" min-width="220" show-overflow-tooltip>
          <template slot-scope="scope">
            {{scope.row.updateStrDate}}~{{scope.row.updateEndDate}}
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="145" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" :disabled="scope.row.state  !== '未分配'" @click="btnDistribution(scope)">分配</el-button>
            <!-- <el-button type="text">收回</el-button> -->
            <el-button type="text" @click="Initiate(scope)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row style="margin-top:10px;">
        <!-- <el-col :span="8">
          <el-button type="primary" plain @click="exportData">导 出</el-button>
        </el-col>-->
        <!-- <el-col :span="16"> -->
        <el-pagination
          v-if="this.pageInfo.total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageInfo.pageNum"
          :page-size="pageInfo.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageInfo.total"
          background
        ></el-pagination>
        <!-- </el-col> -->
      </el-row>
    </el-card>
            <!-- 弹层 -->
    <el-dialog title="预警范围"  :visible.sync="warningDialogVisible" width="70%">
      <!-- <el-card shadow="never">
        <el-row :gutter="20">
          <el-col :span="10">
            <el-tree :data="treeDataList" ref="tree"  @check="handleNodeClick"  show-checkbox node-key="id" :props="defaultProps">
            </el-tree>
          </el-col>
          <el-col :span="14">
            <el-transfer  v-model="transferDataRange" :data="transferOptions" :props="{key: 'userId',label: 'name'}"></el-transfer>
          </el-col>
        </el-row>
        <div style="text-align:center;margin-top:10px">
          <el-button type="primary" :loading="distributionCheck" @click="distriButionSure">确定</el-button>
          <el-button @click="distriButionConsole">取消</el-button>
        </div>
      </el-card> -->
      <el-form>
        <organization-tree v-on:showParentComp="handlesubmitWaring" type='rule' :lableWidth="114" ref="tree"></organization-tree>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import organizationTree from '@/views/sys-monitoringAnalysis/taskManagement/seniorwarning/components/organizationTree.vue'
import { commonPattern } from '@/utils/formValidate'
import { dictionary } from '@/api/sys-monitoringAnalysis/roster-warning/common.js'
import { getListData, giveObjSuspInfo } from '@/api/sys-monitoringAnalysis/taskManagement/suspiciousWarning/warning.js'
import {
  earlyWarning,
  doubletainCentratSets
} from '@/api/sys-monitoringAnalysis/taskManagement/modelWarning/modelWarning.js'
export default {
  components: {
    organizationTree
  },
  data() {
    return {
      tableData: [],
      delArr: [],
      sourceDireArr: [],
      dialogJudgmentData: [],
      toggleSearch: true,
      isReplenishOne: false,
      isReplenishTwo: false,
      supplementOne: '',
      supplementTwo: '',
      loading: false,
      distributionCheck: false,
      form: {
        submissiondirection: '', // 报送方向
        submissiontype: '', // 报送类型
        messagename: '', // 报文名
        urgencydegree: '', // 紧急程度
        adminAssignment: '', // 是否管理员分配
        institutionname: '', // 报告机构名称
        operator: '', // 操作员
        warningnumber: '', // 预警编号
        state: '', // 状态
        crimestype: '', // 涉罪类型
        updateTime: '',
        earlyWarningTime: '',
        subMissionDate: ''
      },
      pageInfo: {
        pageNum: 1,
        pageSize: 10,
        total: 10
      },
      // 分配
      distrDataInfo: {},
      warningDialogVisible: false,
      treeDataList: [],
      defaultProps: {
        children: 'children',
        label: 'text'
      },
      transferOptions: [],
      transferDataRange: []
    }
  },
  computed: {

  },
  filters: {
    crimestypeFilfty: function(val) {
      switch (val) {
        case '01':
          return '报告中国反洗钱监测分析中心'
        case '02':
          return '报告中国反洗钱监测分析中心和人民银行当地分支机构'
        case '03':
          return '报告中国反洗钱监测分析中心和当地公安机关'
        case '04':
          return '报告中国反洗钱监测分析中心、人民银行当地分支机构和当地公安机关'
        case '99':
          return '报告中国反洗钱监测分析中心和其他机构'
        default:
          break
      }
    },
    dataTransform(val) {
      var pattern = /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/
      var formatedDate = val.replace(pattern, '$1-$2-$3')
      return formatedDate
    }
  },
  methods: {
    // 获取列表数据方法
    initList() {
      const obj = JSON.parse(JSON.stringify(this.form))
      obj.pageNum = this.pageInfo.pageNum
      obj.pageSize = this.pageInfo.pageSize
      obj.crimestype = obj.crimestype ? this.form.crimestype.join(',') : ''
      obj.warningStrDate = obj.earlyWarningTime ? obj.earlyWarningTime[0] : ''
      obj.warningEndDate = obj.earlyWarningTime ? obj.earlyWarningTime[1] : ''
      obj.updateStartTime = obj.updateTime ? obj.updateTime[0] : ''
      obj.updateEndTime = obj.updateTime ? obj.updateTime[1] : ''
      obj.subStrDate = obj.subMissionDate ? obj.subMissionDate[0] : ''
      obj.subEndDate = obj.subMissionDate ? obj.subMissionDate[1] : ''
      delete obj.subMissionDate
      delete obj.updateTime
      delete obj.earlyWarningTime
      getListData(obj).then(res => {
        if (res.code === 200) {
          this.pageInfo.total = res.data.total
          this.tableData = res.data.list
          this.loading = false
        } else {
          this.loading = false
        }
      })
        .catch(() => {
          this.loading = false
        })
    },
    // 查询
    onSubmit() {
      this.loading = true
      this.pageInfo.pageSize = 10
      this.pageInfo.pageNum = 1
      this.initList()
    },
    // 判断涉罪类型是否显示补充
    replenish() {
      if (this.form.crimestype.indexOf('1402') !== -1) {
        this.isReplenishTwo = true
      } else {
        this.isReplenishTwo = false
      }
      if (this.form.crimestype.indexOf('1401') !== -1) {
        this.isReplenishOne = true
      } else {
        this.isReplenishOne = false
      }
    },
    // 获取字典
    getDictionary(params) {
      dictionary(params).then(res => {
        if (res.code === 200) {
          switch (params) {
            case 'DORP':
              this.sourceDireArr = res.data
              break
            case 'TOSC':
              this.dialogJudgmentData = res.data
              break
            default:
              break
          }
        }
      })
    },
    ValidQueryInput(rule, value, callback) {
      if (!commonPattern.spaceBar.test(value)) {
        callback(new Error('内容不能含有空格'))
      } else if (commonPattern.specialCharInQuery.test(value)) {
        callback(new Error('内容不能填写特殊字符'))
      } else {
        callback()
      }
    },
    // 涉罪校验
    szisValidInput1(rule, value, callback) {
      if (!commonPattern.spaceBar.test(this.supplementOne)) {
        callback(new Error('内容不能含有空格'))
      } else if (
        commonPattern.specialCharInQuery.test(this.supplementOne)
      ) {
        callback(new Error('内容不能填写特殊字符'))
      } else if (this.supplementOne === '') {
        callback(new Error('请输入内容'))
      } else {
        callback()
      }
    },
    szisValidInput2(rule, value, callback) {
      if (!commonPattern.spaceBar.test(this.supplementTwo)) {
        callback(new Error('内容不能含有空格'))
      } else if (
        commonPattern.specialCharInQuery.test(this.supplementTwo)
      ) {
        callback(new Error('内容不能填写特殊字符'))
      } else if (this.supplementTwo === '') {
        callback(new Error('请输入内容'))
      } else {
        callback()
      }
    },
    isInputName(rule, value, callback) {
      if (!commonPattern.spaceBar.test(value)) {
        callback(new Error('内容不能含有空格'))
      } else if (commonPattern.specialDataName.test(value) || commonPattern.specialEngDataName.test(value)) {
        callback(new Error('内容不能填写特殊字符'))
      } else {
        callback()
      }
    },
    // 清空
    cleanUp() {
      this.$refs.form.resetFields()
      this.supplementOne = ''
      this.supplementTwo = ''
      this.isReplenishOne = false
      this.isReplenishTwo = false
      this.form = {
        submissiondirection: '', // 报送方向
        submissiontype: '', // 报送类型
        messagename: '', // 报文名
        urgencydegree: '', // 紧急程度
        adminAssignment: '', // 是否管理员分配
        institutionname: '', // 报告机构名称
        operator: '', // 操作员
        warningnumber: '', // 预警编号
        state: '', // 状态
        crimestype: '', // 涉罪类型
        updateTime: '',
        earlyWarningTime: '',
        subMissionDate: ''
      }
    },
    // 选择的数据
    handleChange(val) {
      this.delArr = val
    },
    // 查看
    Initiate(scope) {
      const pageInfo = {
        pageSize: this.pageSize,
        pageNum: this.pageNum
      }
      const searchWariSxpForm = {
        pageName: this.$route.name,
        seachInfo: this.toggleSearch,
        pageInfo: pageInfo,
        searchForm: this.form
      }
      sessionStorage.setItem('searchWariSxpForm', JSON.stringify(searchWariSxpForm))
      this.$router.push({
        name: 'modelWarning_suspicious',
        query: {
          id: scope.row.id
        }
      })
    },
    // input校验
    isValidInput(rule, value, callback) {
      if (!commonPattern.spaceBar.test(value)) {
        callback(new Error('内容不能含有空格'))
      } else if (commonPattern.specialChar.test(value) || commonPattern.specialEngMy.test(value)) {
        callback(new Error('内容不能填写特殊字符'))
      } else {
        callback()
      }
    },
    // 数字检查
    onlyNumberValidate(rule, value, callback) {
      if (value !== '') {
        if (!commonPattern.spaceBar.test(value)) {
          callback(new Error('内容不能含有空格'))
        } else if (commonPattern.specialChar.test(value) || commonPattern.specialEng.test(value)) {
          callback(new Error('内容不能填写特殊字符'))
        } else if (!commonPattern.number.test(value) && value !== '') {
          callback(new Error('必须输入数值'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    },
    // 切换分页条数
    handleSizeChange(size) {
      this.pageInfo.pageSize = size
      this.loading = true
      this.initList()
    },
    // 点击切换分页
    handleCurrentChange(pageNum) {
      this.pageInfo.pageNum = pageNum
      this.loading = true
      this.initList()
    },
    // ----分配 勾选----
    handleNodeClick(data, checked, indeterminate) {
      this.transferOptions = []
      this.transferData = []
      this.transferDataRange = []
      if (this.$refs.tree.getCheckedKeys().length) {
        var arrString = this.$refs.tree.getCheckedKeys().join()
        doubletainCentratSets(arrString).then(res => {
          if (res.code === 200) {
            this.selectedRange = res.data
            const data = res.data
            const arr = []
            for (var item in data) {
              for (let i = 0; i < data[item].length; i++) {
                arr.push(data[item][i])
              }
            }
            this.transferOptions = arr
          } else {
            this.$message({
              message: res.message,
              type: 'warning',
              duration: 6000,
              showClose: true
            })
          }
        })
      } else {
        this.transferOptions = []
        this.transferData = []
      }
    },
    btnDistribution(scope) {
      this.warningDialogVisible = true
      this.transferOptions = []
      this.transferData = []
      this.transferDataRange = []
      this.distrDataInfo = scope.row
      this.$nextTick(() => {
        this.$refs.tree.setCheckedKeys([])
      })
    },
    // 请求 分配范围数据
    requestWaringData() {
      this.treeDataList = []
      earlyWarning().then(res => {
        if (res.code === 200) {
          this.treeDataList = []
          const totalDataList = res.data.data
          totalDataList[0].disabled = true
          this.treeDataList.push(totalDataList[0])
        } else {
          this.$message({
            type: 'error',
            message: '获取预警范围出错！',
            duration: 6000,
            showClose: true
          })
        }
      })
    },
    // 预警范围 - 确定
    handlesubmitWaring(data) {
      if (data.length !== 0) {
        this.distributionCheck = true
        const arr = []
        data.forEach(res => {
          arr.push(res.userId)
        })
        this.transferDataRange = arr
        this.warningDialogVisible = false
        this.distriButionSure()
      } else {
        this.warningDialogVisible = false
      }
    },
    // 分配范围 - 确定
    distriButionSure() {
      if (this.transferDataRange.length > 0) {
        const paramsObject = this.distrDataInfo
        paramsObject.ids = this.transferDataRange.join(',')
        giveObjSuspInfo(paramsObject).then(res => {
          if (res.code === 200) {
            this.warningDialogVisible = false
            this.distributionCheck = false
            this.$message({
              type: 'success',
              message: '分配成功！',
              duration: 6000,
              showClose: true
            })
            this.loading = true
            this.initList()
          } else {
            this.distributionCheck = false
            this.$message({
              type: 'error',
              message: res.message,
              duration: 6000,
              showClose: true
            })
          }
        })
          .catch(() => {
            this.distributionCheck = false
          })
      } else {
        this.$message({
          type: 'warning',
          message: '请选择分配人员！',
          duration: 6000,
          showClose: true
        })
      }
    },
    // 分配范围 - 取消
    distriButionConsole() {
      this.warningDialogVisible = false
      this.transferOptions = []
      this.transferData = []
      this.$refs.tree.setCheckedKeys([])
    },
    onsubmitBloorer(blr) {
      if (blr) {
        this.form = {
          submissiondirection: '', // 报送方向
          submissiontype: '', // 报送类型
          messagename: this.form.messagename, // 报文名
          urgencydegree: this.form.urgencydegree, // 紧急程度
          adminAssignment: '', // 是否管理员分配
          institutionname: '', // 报告机构名称
          operator: '', // 操作员
          warningnumber: '', // 预警编号
          state: '', // 状态
          crimestype: '', // 涉罪类型
          updateTime: '',
          earlyWarningTime: '',
          subMissionDate: ''
        }
      }
    }
  },
  created() {
    if (sessionStorage.getItem('searchWariSxpForm')) {
      const searchData = JSON.parse(sessionStorage.getItem('searchWariSxpForm'))
      if (searchData.pageName === this.$route.name && searchData.ifReviewLookXqWariSxp) {
        this.toggleSearch = searchData.seachInfo
        this.pageSize = searchData.pageInfo.pageSize
        this.pageNum = searchData.pageInfo.pageNum
        this.form = searchData.searchForm
      }
      sessionStorage.removeItem('searchWariSxpForm')
    }
    this.initList()
    this.requestWaringData()
  },
  mounted() {
    this.getDictionary('TOSC')
    this.getDictionary('DORP')
  }
}
</script>
<style lang="scss">
.ruleWarning_query {
  .el-date-editor--daterange {
    min-width: 100%;
    max-width: 100%;
  }
  .el-transfer-panel__body {
    .el-checkbox-group {
      .el-checkbox {
        margin-right: 56px;
      }
    }
  }
  .el-date-editor--daterange {
    width: 100%;
  }
  .el-select {
    width: 100%;
  }
}
</style>
