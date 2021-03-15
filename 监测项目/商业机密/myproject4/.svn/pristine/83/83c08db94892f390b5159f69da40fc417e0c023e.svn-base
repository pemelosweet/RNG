<template>
  <div class="suspWarningDeal">
    <el-card>
      <div slot="header">
        <span>可疑交易报告预警处理</span>
      </div>
      <el-form :model="modelForm" :rules="rulesForm" ref="refForm" label-width="110px">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="报文名：" prop="messageName">
              <el-input  v-model="modelForm.messageName" placeholder="内容长度不能超过100" maxlength="100"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="涉罪类型：" prop="crimesType">
              <el-select clearable v-model="modelForm.crimesType" multiple collapse-tags  placeholder="请选择">
                <el-option  v-for="item in crimesOptions" :key="item.codeId" :label="item.codeName" :value="item.codeId"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="紧急程度：" prop="urgencyDegree">
              <el-select clearable v-model="modelForm.urgencyDegree" placeholder="请选择">
                <el-option label="特别紧急" value="01"></el-option>
                <el-option label="非特别紧急" value="02"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="预警编号：" prop="warningNumber">
              <el-input  v-model="modelForm.warningNumber" placeholder="内容长度不能超过100" maxlength="100"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="报送类型：" prop="subMissionType">
              <el-select clearable v-model="modelForm.subMissionType" filterable placeholder="请选择">
                <el-option label="新增报文" value="新增报文"></el-option>
                <el-option label="修改报文" value="修改报文"></el-option>
                <el-option label="删除报文" value="删除报文"></el-option>
                <el-option label="普通报文" value="普通报文"></el-option>
                <el-option label="重发报文" value="重发报文"></el-option>
                <el-option label="补报报文" value="补报报文"></el-option>
                <el-option label="纠错报文" value="纠错报文"></el-option>
                <el-option label="补正报文" value="补正报文"></el-option>
              </el-select>
              <!-- <el-input  v-model="modelForm.subMissionType" placeholder="请输入"></el-input> -->
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="报送日期：" prop="subMissionDate">
              <el-date-picker unlink-panels clearable v-model="modelForm.subMissionDate" value-format='yyyyMMdd' type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="报告机构名称：" prop="institutionName">
              <!-- <el-input clearable v-model="modelForm.in00" placeholder="请输入"></el-input> -->
              <!-- <el-select clearable v-model="modelForm.institutionName" value-key="rinm" filterable placeholder="请选择">
                <el-option v-for="(item,idx) in reportList" :label="item.rinm" :value="item.rinm" :key="idx"></el-option>
              </el-select> -->
              <!-- monitor/statistics/code/select-org?region=all&rinm=aaaa     栋粱街口地址 -->
              <el-autocomplete  v-model="modelForm.institutionName" style="width:100%" value-key="rinm" placeholder="请输入" :fetch-suggestions="querySearchRinm" :trigger-on-focus="false"></el-autocomplete>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="预警日期：" prop="earlyWarningTime">
              <el-date-picker unlink-panels clearable v-model="modelForm.earlyWarningTime" value-format='yyyy-MM-dd' type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="状态：" prop="state">
              <el-select clearable v-model="modelForm.state" placeholder="请选择">
                <!-- <el-option label="未处理" value="未处理"></el-option>
                <el-option label="已处理" value="已处理"></el-option> -->
                  <el-option label="未分配" value="未分配"></el-option>
                  <el-option label="待处理" value="待处理"></el-option>
                  <el-option label="处理中" value="处理中"></el-option>
                  <el-option label="已处理" value="已处理"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="报送方向：" prop="subMissionDirection">
              <el-select clearable v-model="modelForm.subMissionDirection"  placeholder="请选择" class="w100">
                <el-option v-for="(item,idx) in direOptions" :label="item.codeName" :value="item.codeId" :key="idx"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <div style="text-align:right;margin-bottom:6px;">
              <el-button type="primary" @click="handleSearch">查 询</el-button>
              <el-button @click="handleClearForm" type="primary" plain>清 空</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
      <el-table :data="tableData"
       tooltip-effect="dark"
       v-loading="loadingSuspWaring"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.1)">
        <el-table-column label="序号" type="index" width="50" fixed="left"></el-table-column>
        <el-table-column label="预警编号" prop="warningNumber" width="230" show-overflow-tooltip></el-table-column>
        <el-table-column label="报文名" prop="messageName"  width="250" show-overflow-tooltip></el-table-column>
        <el-table-column label="报送类型" prop="subMissionType" min-width="120" show-overflow-tooltip></el-table-column>
        <el-table-column label="报告机构名称" prop="institutionName" width="200" show-overflow-tooltip></el-table-column>
        <el-table-column label="报送日期" prop="subMissionDate" min-width="120" show-overflow-tooltip></el-table-column>
        <el-table-column label="紧急程度" prop="urgencyDegree" min-width="120" show-overflow-tooltip></el-table-column>
        <el-table-column label="涉罪类型" prop="crimesType" width="290" show-overflow-tooltip></el-table-column>
        <el-table-column label="报送方向" prop="subMissionDirection" min-width="250" show-overflow-tooltip></el-table-column>
        <el-table-column label="预警日期" prop="earlyWarningTime" min-width="120" show-overflow-tooltip></el-table-column>
        <el-table-column label="状态" prop="state" min-width="120" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" fixed="right" width="170">
          <template slot-scope="scope">
            <el-button type="text" @click="handleGo(scope)">进入分析工具</el-button>
            <el-button type="text" @click="handleLook(scope)">创建线索表</el-button>
          </template>
        </el-table-column>
      </el-table>
          <el-pagination v-if="this.total" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNum" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total" background>
      </el-pagination>
    </el-card>

  </div>
</template>
<script>
import { noSpaceAndTs, ValidQueryInput } from '@/utils/formValidate.js'
import { getRinmName } from '@/api/common/industry'
// , delDataValidInput
import { getDirectionapi } from '@/api/sys-monitoringAnalysis/taskManagement/suspiciousWarning/newSuspWarningConfigur.js'
import { getReportapi } from '@/api/sys-monitoringAnalysis/taskManagement/suspiciousWarning/newSuspWarningConfigur.js'
import {
  sendgetListData
} from '@/api/sys-monitoringAnalysis/suspWarningDeal/suspWarningDeal.js'
// import {
//   jumpIndex
// } from '@/api/sys-monitoringAnalysis/warningProcessing/view'
import {
  getCrimapi
} from '@/api/sys-monitoringAnalysis/taskManagement/suspiciousWarning/newSuspWarningConfigur.js'
import {
  creatXsTable
} from '@/api/sys-monitoringAnalysis/warningProcessing/view'
export default {
  name: 'suspWarningDeal',
  data() {
    return {
      modelForm: {
        messageName: '',
        crimesType: '',
        urgencyDegree: '',
        warningNumber: '',
        subMissionType: '',
        subMissionDate: '',
        institutionName: '',
        earlyWarningTime: '',
        state: '',
        subMissionDirection: ''
      },
      crimesOptions: [],
      loadingSuspWaring: false,
      tableData: [],
      total: null,
      pageSize: 10,
      pageNum: 1,
      rulesForm: {
        messageName: [
          { validator: ValidQueryInput, trigger: 'blur' },
          { max: 100, message: '最大长度不能超过100位', trigger: 'blur' }],
        // crimesType: [
        //   { validator: noSpaceAndTs, trigger: 'change' }],
        urgencyDegree: [
          { validator: noSpaceAndTs, trigger: 'change' },
          { max: 100, message: '最大长度不能超过100位', trigger: 'change' }],
        warningNumber: [
          { validator: ValidQueryInput, trigger: 'blur' },
          { max: 100, message: '最大长度不能超过100位', trigger: 'blur' }],
        subMissionType: [
          { validator: noSpaceAndTs, trigger: 'change' },
          { max: 100, message: '最大长度不能超过100位', trigger: 'change' }],
        institutionName: [
          { validator: ValidQueryInput, trigger: 'blur' },
          { max: 100, message: '最大长度不能超过100位', trigger: 'blur' }],
        state: [
          { validator: noSpaceAndTs, trigger: 'change' },
          { max: 100, message: '最大长度不能超过100位', trigger: 'change' }],
        subMissionDirection: [
          { validator: noSpaceAndTs, trigger: 'change' },
          { max: 100, message: '最大长度不能超过100位', trigger: 'change' }],
        earlyWarningTime: [],
        subMissionDate: []

      },
      direOptions: [], // 报送方向
      reportList: [] // 报告机构数据
    }
  },
  computed: {
    paramsObj: function() {
      return {
        pageSize: this.pageSize,
        pageNum: this.pageNum,
        messageName: this.modelForm.messageName ? this.modelForm.messageName : null,
        crimesType: this.modelForm.crimesType ? this.modelForm.crimesType.join(',') : null,
        urgencyDegree: this.modelForm.urgencyDegree ? this.modelForm.urgencyDegree : null,
        warningNumber: this.modelForm.warningNumber ? this.modelForm.warningNumber : null,
        subMissionType: this.modelForm.subMissionType ? this.modelForm.subMissionType : null,
        institutionName: this.modelForm.institutionName ? this.modelForm.institutionName : null,
        state: this.modelForm.state ? this.modelForm.state : null,
        subMissionDirection: this.modelForm.subMissionDirection ? this.modelForm.subMissionDirection : null,

        subStrDate: this.modelForm.subMissionDate ? this.modelForm.subMissionDate[0] : null,
        subEndDate: this.modelForm.subMissionDate ? this.modelForm.subMissionDate[1] : null,
        warningStrDate: this.modelForm.earlyWarningTime ? this.modelForm.earlyWarningTime[0] : null,
        warningEndDate: this.modelForm.earlyWarningTime ? this.modelForm.earlyWarningTime[0] : null
      }
    }
  },
  mounted() {
    if (sessionStorage.getItem('searchDataSuspWaring')) {
      const searchData = JSON.parse(sessionStorage.getItem('searchDataSuspWaring'))
      if (searchData.pageName === this.$route.name && searchData.ifReviewSuspWaring) {
        this.pageSize = searchData.pageInfo.pageSize
        this.pageNum = searchData.pageInfo.pageNum
        this.modelForm = searchData.searchForm
      }
      sessionStorage.removeItem('searchDataSuspWaring')
    }
    this.loadingSuspWaring = true
    this.getDataList()
    this.$refs.refForm.resetFields()
    this.getSerchData()
    this.getCrimeInvolved()
  },
  methods: {
    // 获取涉罪类型
    getCrimeInvolved() {
      getCrimapi().then(res => {
        if (res.code === 200) {
          this.crimesOptions = res.data
        }
      })
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.loadingSuspWaring = true
      this.getDataList()
    },
    handleCurrentChange(val) {
      this.pageNum = val
      this.loadingSuspWaring = true
      this.getDataList()
    },
    getSerchData() {
      getDirectionapi().then(res => {
        if (res.code === 200) {
          this.direOptions = res.data
        } else {
          this.$message({
            message: res.message,
            type: 'error',
            duration: 6000,
            showClose: true
          })
        }
      })
      getReportapi().then(res => {
        if (res.code === 200) {
          this.reportList = res.data
        } else {
          this.$message({
            message: res.message,
            type: 'error',
            duration: 6000,
            showClose: true
          })
        }
      })
    },
    // 获取机构名称
    querySearchRinm(query, cb) {
      if (query !== '') {
        if (query !== '') {
          getRinmName(query).then(res => {
            if (res.code === 200) {
              cb(res.data)
            }
          })
        }
      } else {
        // this.rinmData = []
      }
    },
    getDataList() {
      sendgetListData(this.paramsObj).then(res => {
        if (res.code === 200) {
          this.tableData = res.data.list
          this.total = res.data.total
          this.loadingSuspWaring = false
        } else {
          this.loadingSuspWaring = false
          this.$message({
            message: res.message,
            type: 'error',
            duration: 6000,
            showClose: true
          })
        }
      })
        .catch(() => {
          this.loadingSuspWaring = false
        })
    },
    // 查询
    handleSearch() {
      this.$refs.refForm.validate((valid) => {
        if (valid) {
          this.loadingSuspWaring = true
          this.pageSize = 10
          this.pageNum = 1
          this.getDataList()
        }
      })
    },

    // 清空
    handleClearForm() {
      this.$refs.refForm.resetFields()
    //   this.loadingSuspWaring = true
    //   this.getDataList()
    },

    // 进入分析工具
    handleGo(scope) {
      window.open('http://' + window.inAnalysisTools + '/datac/jsp/security/askLogin', '_blank')
    },

    // 创建线索表
    handleLook(scope) {
      const pageInfo = {
        pageSize: this.pageSize,
        pageNum: this.pageNum
      }
      const searchDataSuspWaring = {
        pageName: this.$route.name,
        pageInfo: pageInfo,
        searchForm: this.modelForm
      }
      sessionStorage.setItem('searchDataSuspWaring', JSON.stringify(searchDataSuspWaring))
      creatXsTable(scope.row.id).then(res => {
        if (res.code === 200) {
          if (res.data === 'false') {
            this.$router.push({
              name: 'cueManage_autonomousAnalysisInfo',
              query: {
                activeName: 'second',
                keyIndex: '2',
                triggerForm: '可疑交易报告预警',
                index: scope.row.warningNumber
              }
            })
          } else {
            this.$message({
              message: res.message,
              type: 'warning',
              duration: 6000,
              showClose: true
            })
          }
        } else {
          this.$message({
            message: res.message,
            type: 'error',
            duration: 6000
          })
        }
      })
    }

  }
}
</script>
<style lang="scss" scoped>
.suspWarningDeal {
  .el-date-editor--daterange {
    width: 100% !important;
  }
  .el-date-editor {
    width: 100%;
  }
  .el-select {
    width: 100%;
  }
}
</style>


